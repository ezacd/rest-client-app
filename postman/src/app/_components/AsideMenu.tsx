import { useTranslations } from 'next-intl';
import Viarbles from '@/assets/icons/viarbles.svg';
import Code from '@/assets/icons/code.svg';
import History from '@/assets/icons/history.svg';
import styles from '@/app/_components/components-styles/AsideMenu.module.css';

export default function Aside() {
  const t = useTranslations('HomePage');

  return (
    <aside className={styles.aside}>
      <button className={styles.asideButton}>
        <Viarbles className={styles.asideSVG} />
        <p className={styles.asideButtonsText}>{t('viarbles')}</p>
      </button>
      <button className={styles.asideButton}>
        <Code className={styles.asideSVG} />
        <p className={styles.asideButtonsText}>{t('code')}</p>
      </button>
      <button className={styles.asideButton}>
        <History className={styles.asideSVG} />
        <p className={styles.asideButtonsText}>{t('history')}</p>
      </button>
    </aside>
  );
}
