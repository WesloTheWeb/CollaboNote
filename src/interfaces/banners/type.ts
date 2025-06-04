export type BannerType = 'success' | 'error' | 'warning' | 'info';
export type BannerVariant = 'static' | 'usercard';

export interface BannerProps {
    type: BannerType;
    variant: BannerVariant;
    message: string;
    className?: string;
};