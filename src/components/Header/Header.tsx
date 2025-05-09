import Link from 'next/link';
import { navigationHeader } from '@/config';
import classes from './Header.module.scss';

const { siteHeader } = classes;

const Header = () => {

    return (
        <header className={siteHeader}>
            <h1>
                <Link href="/">
                    CollaboNote
                </Link>
            </h1>
            <nav>
                {navigationHeader.map((nav) => {
                    return (
                        <Link
                            key={nav.navigation}
                            href={nav.navigation}>
                            {nav.navigation}
                        </Link>
                    )
                })}
            </nav>
        </header>
    );
};

export default Header;