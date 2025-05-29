import { UserSettingsInterface } from "@/redux/slices/userSettingsSlice";

export type UserSettingsFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    bio?: string;
};

export interface UserSettingsPageProps {
    initialUserSettings: UserSettingsInterface;
};
