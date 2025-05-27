import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Pool } from "pg"
import bcrypt from "bcrypt"

// Extend NextAuth types to include id
declare module "next-auth" {
  interface User {
    id: string
  }
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

// Create connection pool for NextAuth with improved configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { 
    rejectUnauthorized: false 
  } : false,
  max: process.env.NODE_ENV === 'production' ? 5 : 10, // Reduced for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

// Test the connection on startup
pool.on('connect', () => {
  console.log('NextAuth database pool connected successfully');
});

pool.on('error', (err) => {
  console.error('NextAuth database pool error:', err);
});

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null
        }

        try {
          // Test connection first
          await pool.query('SELECT 1');
          
          // Query your existing User table
          const result = await pool.query(
            'SELECT * FROM "User" WHERE email = $1',
            [credentials.email.toLowerCase().trim()]
          )

          if (result.rows.length === 0) {
            console.log('User not found for email:', credentials.email);
            return null
          }

          const user = result.rows[0]

          // Verify password
          const passwordMatch = await bcrypt.compare(credentials.password, user.password)

          if (!passwordMatch) {
            console.log('Password mismatch for user:', credentials.email);
            return null
          }

          console.log('Authentication successful for user:', credentials.email);

          // Return user object that matches NextAuth User type
          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
          }
        } catch (error) {
          console.error("Authentication error:", error)
          
          // Log more specific error information
          if (error instanceof Error) {
            if (error.message.includes('ENOTFOUND')) {
              console.error('Database host not found - check DATABASE_URL');
            } else if (error.message.includes('ECONNREFUSED')) {
              console.error('Database connection refused');
            } else if (error.message.includes('timeout')) {
              console.error('Database connection timeout');
            }
          }
          
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.uid as string
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === 'development',
};