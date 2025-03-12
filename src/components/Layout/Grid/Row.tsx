import { type ReactNode } from 'react';
import styles from './Row.module.scss';

type RowProps = {
    children: ReactNode;
    className?: string;
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
}

const Row = ({
    children,
    className,
    justify = 'start',
}: RowProps) => {
    const classes = [
        styles.row,
        justify && styles[`justify-${justify}`],
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export default Row;