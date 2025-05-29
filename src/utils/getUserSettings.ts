import { UserSettingsInterface } from "@/redux/slices/userSettingsSlice";
import db from "@/lib/db";

export async function getUserSettings(userId: string): Promise<UserSettingsInterface | null> {
    try {
        const result = await db.query(
            'SELECT id, "firstName", "lastName", email, bio, "createdAt", "updatedAt" FROM "User" WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return null;
        }

        const user = result.rows[0];

        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            bio: user.bio || '',
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    } catch (error) {
        console.error('Error fetching user settings:', error);
        return null;
    };
};