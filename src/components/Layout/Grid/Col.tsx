import { type ReactNode } from 'react';
import styles from './Col.module.scss';

type ColProps = {
    children: ReactNode;
    className?: string;
    size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

const Col = ({
    children,
    className,
    size,
    sm,
    md,
    lg,
}: ColProps) => {
    const classes = [
        styles.col,
        size && styles[`col-${size}`],
        sm && styles[`col-sm-${sm}`],
        md && styles[`col-md-${md}`],
        lg && styles[`col-lg-${lg}`],
        className
    ].filter(Boolean).join(' ');

    return (
        <section className={classes}>
            {children}
        </section>
    );
};

export default Col;