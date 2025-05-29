import { MenuItem, MenuSection, UserRole, AccountTier, GuestAccess } from "@/config";

export interface UserSession {
    role: UserRole;
    tier: AccountTier;
    isGuest?: boolean;
};

/**
 * Check if a user can access a specific menu item
 */
export function canAccessMenuItem(item: MenuItem, user: UserSession): boolean {
    const access = item.access;

    // If no access restrictions, everyone can access
    if (!access) return true;

    // Check role restrictions
    if (access.roles && !access.roles.includes(user.role)) {
        return false;
    }

    // Check tier restrictions
    if (access.tiers && !access.tiers.includes(user.tier)) {
        return false;
    }

    return true;
};

/**
 * Get the access level for a guest user
 */
export function getGuestAccess(item: MenuItem): GuestAccess {
    return item.access?.guestAccess || 'full';
};

/**
 * Check if an item should show upgrade prompt
 */
export function shouldShowUpgrade(item: MenuItem, user: UserSession): boolean {
    if (!item.access?.requiresUpgrade) return false;

    // Show upgrade if user can't access due to tier restrictions
    if (item.access.tiers && !item.access.tiers.includes(user.tier)) {
        return true;
    }

    return false;
};

/**
 * Filter menu sections based on user permissions
 */
export function filterMenuForUser(
    menuConfig: MenuSection[],
    user: UserSession
): MenuSection[] {
    return menuConfig.map(section => ({
        ...section,
        items: section.items.filter(item => {
            // Always show if feature is not implemented (for development)
            if (!item.featureImplemented) return true;

            // Check basic access
            return canAccessMenuItem(item, user);
        })
    })).filter(section => section.items.length > 0); // Remove empty sections
};

/**
 * Get menu items that need special handling (read-only, upgrade prompts, etc.)
 */
export function getMenuItemState(item: MenuItem, user: UserSession) {
    const canAccess = canAccessMenuItem(item, user);
    const guestAccess = user.role === 'guest' ? getGuestAccess(item) : 'full';
    const needsUpgrade = shouldShowUpgrade(item, user);

    return {
        canAccess,
        isReadOnly: guestAccess === 'read-only',
        isHidden: guestAccess === 'hidden',
        needsUpgrade,
        isDisabled: !item.featureImplemented || !canAccess || guestAccess === 'hidden'
    };
};