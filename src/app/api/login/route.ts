import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
    try {
        // Get request body
        const body = await request.json();

        // Validate the input
        const validationResult = loginSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    errors: validationResult.error.format()
                },
                { status: 400 }
            );
        };

        const { email, password } = validationResult.data;

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // ! If user doesn't exist or password doesn't match
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid email or password'
                },
                { status: 401 }
            );
        };

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid email or password'
                },
                { status: 401 }
            );
        };

        // Return user data (without password)
        return NextResponse.json(
            {
                success: true,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred during login'
            },
            { status: 500 }
        );
    };
};