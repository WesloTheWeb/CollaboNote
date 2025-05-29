import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { UserSettingsPage } from "@/components/Pages";
import { getUserSettings } from "@/utils/getUserSettings";

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect('/');
    };

    const userSettings = await getUserSettings(session.user.id);

    if (!userSettings) {
        return (
            <div>
                <h2>Settings page</h2>
                <p>Error loading user settings. Please try again later.</p>
            </div>
        );
    };

    return (
        <>
            <h2>Settings page</h2>
            <p>
                Here is where you can edit your account information.
            </p>
            <UserSettingsPage initialUserSettings={userSettings} />
        </>
    );
}