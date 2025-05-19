import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import db from '../../../lib/db';
import { randomUUID } from 'crypto';

// Function to ensure User table exists
async function ensureUserTableExists() {
  try {
    // Check if User table exists
    const tableExists = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'User'
      );
    `);
    
    if (!tableExists.rows[0].exists) {
      console.log('User table does not exist, creating it...');
      
      // Create the User table based on Prisma schema
      await db.query(`
        CREATE TABLE "User" (
          id TEXT PRIMARY KEY,
          "firstName" TEXT NOT NULL,
          "lastName" TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          "termsAccepted" BOOLEAN DEFAULT false,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      console.log('User table created successfully');
    } else {
      console.log('User table already exists');
    }
    
    return true;
  } catch (error) {
    console.error('Error ensuring User table exists:', error);
    return false;
  }
}

// GET handler to test API and database connection
export async function GET() {
  try {
    // Ensure User table exists
    await ensureUserTableExists();
    
    // Test database connection
    const result = await db.query('SELECT NOW() as server_time');
    return NextResponse.json({ 
      status: "ok", 
      message: "Registration API is working with PostgreSQL",
      serverTime: result.rows[0].server_time
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      status: "error", 
      message: "Database connection failed", 
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

// Validation schema for registration data
const registrationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export async function POST(request: NextRequest) {
  try {
    console.log("Registration POST request received");
    
    // Ensure User table exists
    await ensureUserTableExists();
    
    // Parse the request body
    let body;
    try {
      body = await request.json();
      console.log("Request body received:", body);
    } catch (error) {
      console.error("Error parsing JSON request:", error);
      return NextResponse.json(
        { success: false, message: "Invalid JSON request" }, 
        { status: 400 }
      );
    }
    
    // Validate input data
    const validationResult = registrationSchema.safeParse(body);
    if (!validationResult.success) {
      console.log("Validation failed:", validationResult.error.format());
      return NextResponse.json(
        { 
          success: false, 
          errors: validationResult.error.format() 
        }, 
        { status: 400 }
      );
    }
    
    const { firstName, lastName, email, password, termsAccepted } = validationResult.data;
    
    try {
      // Check if user with this email already exists
      console.log("Checking if email exists:", email);
      const existingUserResult = await db.query(
        'SELECT * FROM "User" WHERE email = $1', 
        [email]
      );
      
      if (existingUserResult.rowCount && existingUserResult.rowCount > 0) {
        console.log("Email already exists:", email);
        return NextResponse.json(
          { 
            success: false, 
            message: 'A user with this email already exists' 
          }, 
          { status: 409 }
        );
      }
      
      // Hash the password
      console.log("Hashing password");
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      // Generate a unique ID
      const userId = randomUUID();
      
      // Current timestamp
      const now = new Date().toISOString();
      
      // Create the user in the database
      console.log("Creating new user");
      // Sanitize inputs further for extra security
      const sanitizedFirstName = firstName.trim().substring(0, 100);
      const sanitizedLastName = lastName.trim().substring(0, 100);
      const sanitizedEmail = email.trim().toLowerCase().substring(0, 255);
      
      const insertResult = await db.query(
        'INSERT INTO "User" (id, "firstName", "lastName", email, password, "termsAccepted", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, "firstName", "lastName", email, "createdAt"',
        [userId, sanitizedFirstName, sanitizedLastName, sanitizedEmail, hashedPassword, termsAccepted, now, now]
      );
      
      const newUser = insertResult.rows[0];
      console.log("User created successfully:", newUser.id);
      
      // Return success response
      return NextResponse.json(
        {
          success: true,
          message: "Registration successful! You can now log in.",
          user: {
            id: newUser.id,
            firstName: newUser["firstName"],
            lastName: newUser["lastName"],
            email: newUser.email,
            // Don't include exact timestamp for security
            createdAt: new Date(newUser["createdAt"]).toISOString().split('T')[0]
          }
        },
        { status: 201 }
      );
      
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database error: ' + (dbError instanceof Error ? dbError.message : String(dbError))
        }, 
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred during registration', 
        error: error instanceof Error ? error.message : String(error)
      }, 
      { status: 500 }
    );
  }
}