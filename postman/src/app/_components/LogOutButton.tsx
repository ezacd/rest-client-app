'use client';

import LogOutLogo from '@/assets/icons/logout.svg';
import styles from '@/app/page.module.css';
import { signOut } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useRouter } from 'next/navigation';

export default function LogOut() {
  const router = useRouter();

  const handleClick = () => {
    signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch((e) => {
        console.log('Logout Catch ', e.message);
      });
  };

  return (
    <button className={styles.logoutBox} onClick={handleClick}>
      <LogOutLogo className={`${styles.logoutLogo} ${styles.headerSvg}`} />
    </button>
  );
}
