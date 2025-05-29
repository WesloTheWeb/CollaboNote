import FormBuilder from "@/components/FormBuilder/FormBuilder"
import { UserSettingsPage } from "@/components/Pages"
import { settingsFormConfig } from "@/config/formsConfig/settingsFormConfig"

export default function SettingsPage() {

    return (
        <>
            <h2>Settings page</h2>
            <p>
                Here is where you can edit your account information.
            </p>
            <UserSettingsPage />
        </>
    )
};

