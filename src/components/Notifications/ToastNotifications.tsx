'use client';

import { useState, useEffect } from 'react';
import { CircleCheck, CircleAlert, AlertTriangle, Info, X } from 'lucide-react';
import classes from './ToastNotifications.module.scss';

const {
    toastContainer,
    toastHeader,
    toastBody,
    closeButton,
    icon,
} = classes;

export type ToastType = 'success' | 'warning' | 'notice' | 'info';

interface ToastProps {
    type?: ToastType;
    header: string;
    message: string;
    duration?: number;
    onClose?: () => void;
};

const Toast = ({
    type = 'notice',
    header,
    message,
    duration = 5000,
    onClose
}: ToastProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration]);

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CircleCheck className={icon} size={24} data-testid="success-icon" />;
            case 'warning':
                return <AlertTriangle className={icon} size={24} data-testid="warning-icon" />;
            case 'notice':
                return <CircleAlert className={icon} size={24} data-testid="notice-icon" />;
            case 'info':
                return <Info className={icon} size={24} data-testid="info-icon" />;
            default:
                return null;
        };
    };

    if (!isVisible) return null;

    return (
        <div className={`${toastContainer} ${classes[type]}`}>
            <div className={toastHeader}>
                {getIcon()}
                <h3>{header}</h3>
                <button
                    onClick={handleClose}
                    className={closeButton}
                    aria-label="Close notification"
                >
                    <X size={18} />
                </button>
            </div>
            <div className={toastBody}>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Toast;