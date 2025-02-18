import type { Metadata } from 'next';
import LangLogo from '@/assets/icons/lang.svg';
import LogOutLogo from '@/assets/icons/logout.svg';
import styles from '@/app/page.module.css';
import './globals.css';

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
        <footer></footer>
      </body>
    </html>
  );
}
