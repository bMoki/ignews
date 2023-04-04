import Image from 'next/image'
import styles from './styles.module.scss'
import logo from '../../public/images/logo.svg'
import { SignInButton } from '../SignInButton'
import { ActiveLink } from '../ActiveLink/Index'

export function Header() {


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={logo} alt="ig.news" width={110} height={31} />
                <nav>
                    <ActiveLink href='/' activeClassName={styles.active}>Home</ActiveLink>
                    <ActiveLink href='/posts' activeClassName={styles.active}>Posts</ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}