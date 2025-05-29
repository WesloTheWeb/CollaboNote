import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';

// GET - Fetch user settings
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch user settings from database
    const result = await db.query(
      'SELECT id, "firstName", "lastName", email, bio, "createdAt", "updatedAt" FROM "User" WHERE id = $1',
      [session.user.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const user = result.rows[0];
    
    // Return user settings (excluding sensitive data like password)
    const userSettings = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      bio: user.bio || '',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return NextResponse.json({
      success: true,
      userSettings
    });

  } catch (error) {
    console.error('Error fetching user settings:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update user settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, bio } = body;

    // Validate input
    if (!firstName || !lastName) {
      return NextResponse.json(
        { success: false, message: 'First name and last name are required' },
        { status: 400 }
      );
    }

    // Update user settings in database
    const result = await db.query(
      'UPDATE "User" SET "firstName" = $1, "lastName" = $2, bio = $3, "updatedAt" = CURRENT_TIMESTAMP WHERE id = $4 RETURNING id, "firstName", "lastName", email, bio, "createdAt", "updatedAt"',
      [firstName.trim(), lastName.trim(), bio?.trim() || null, session.user.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    const updatedUser = result.rows[0];
    
    const userSettings = {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      bio: updatedUser.bio || '',
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      userSettings
    });

  } catch (error) {
    console.error('Error updating user settings:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}