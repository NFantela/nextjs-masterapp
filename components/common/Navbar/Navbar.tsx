import { FC } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.scss';

interface Link {
    href: string
    label: string
}

interface NavbarProps {
    links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links = [] }) => (
    <nav className={styles.nav}>
        Todo make me links defined by page
        <Link href="/">
            <a>All</a>
        </Link>
        {links?.map((l) => (
            <Link href={l.href} key={l.href}>
                <a>{l.label}</a>
            </Link>
        ))}
    </nav>
);


export default Navbar;