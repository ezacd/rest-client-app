import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import LogOutLogo from '@/assets/icons/logout.svg';
import styles from '@/app/page.module.css';
import '../globals.css';
import Link from 'next/link';
import HeaderLangChange from '../_components/HeaderLangChange';
import { Locale } from '@/i18n/request';

export const metadata: Metadata = {
  title: 'Postman',
  description: 'Postman web app',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={styles.body}>
        <NextIntlClientProvider messages={messages}>
          <header className={styles.header}>
            <h1>Postman</h1>
            <div className={styles.headerButtons}>
              <HeaderLangChange />
              <LogOutLogo
                className={`${styles.logoutLogo} ${styles.headerSvg}`}
              />
            </div>
          </header>
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>
            <Link href="https://github.com/ezacd" className={styles.footerLink}>
              ezacd
            </Link>
            <p>2025</p>
            <Link href="http://rs.school/" className={styles.footerLink}>
              RSchool
            </Link>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
