import type { Metadata } from 'next';
import LangLogo from '@/assets/icons/lang.svg';
import LogOutLogo from '@/assets/icons/logout.svg';
import styles from '@/app/page.module.css';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Postman',
  description: 'Postman web app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <header className={styles.header}>
          <h1>Postman</h1>
          <div className={styles.headerButtons}>
            <LangLogo className={`${styles.langLogo} ${styles.headerSvg}`} />
            <LogOutLogo
              className={`${styles.logoutLogo} ${styles.headerSvg}`}
            />
          </div>
        </header>
        <main>{children}</main>
        <footer className={styles.footer}>
          <Link href="https://github.com/ezacd" className={styles.footerLink}>
            ezacd
          </Link>
          <p>2025</p>
          <Link href="http://rs.school/" className={styles.footerLink}>
            RSchool
          </Link>
        </footer>
      </body>
    </html>
  );
}
