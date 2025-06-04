import { Award } from 'lucide-react';
import { BannerProps } from '@/interfaces';
import classes from './Banner.module.scss';

const { 
    bannerContainer, 
    bannerStatic, 
    bannerUsercard, 
    bannerSuccess, 
    bannerError, 
    bannerWarning, 
    bannerInfo 
} = classes;

const Banner = ({ type, variant, message, className }: BannerProps) => {
    const bannerClasses = [
        bannerContainer,
        variant === 'static' ? bannerStatic : bannerUsercard,
        type === 'success' ? bannerSuccess :
        type === 'error' ? bannerError :
        type === 'warning' ? bannerWarning : bannerInfo,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={bannerClasses}>
            {variant === 'usercard' && type === 'success' && (
                <Award size={12} />
            )}
            {message}
        </div>
    );
};

export default Banner;