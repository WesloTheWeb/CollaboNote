import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const guestEmail = process.env.GUEST_EMAIL || 'guest@collabonote.demo';
    const guestPassword = process.env.GUEST_PASSWORD || 'guest123';
    
    // Return credentials for client-side signIn
    return NextResponse.json({
      success: true,
      credentials: {
        email: guestEmail,
        password: guestPassword
      }
    });
  } catch (error) {
    console.error('Guest login API error:', error);
    return NextResponse.json(
      { success: false, message: 'Guest login failed' },
      { status: 500 }
    );
  }
}