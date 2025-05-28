import { UserInitialsProps } from "@/interfaces";

export const getUserInitials = (name?: UserInitialsProps) => {
    if (!name) return 'U';

    const names = name.split(' ');
    return names.length > 1
        ? `${names[0][0]}${names[1][0]}`.toUpperCase()
        : name[0].toUpperCase();
};

// ? Utility pure functions independent of state.