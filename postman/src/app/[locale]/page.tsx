import { useTranslations } from 'next-intl';
import Viarbles from '@/assets/icons/viarbles.svg';
import Code from '@/assets/icons/code.svg';
import History from '@/assets/icons/history.svg';
import styles from '@/app/page.module.css';
import CreateRequest from '../_components/CreateRequest';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <section className={styles.mainSection}>
      <aside className={styles.aside}>
        <div className={styles.asideButton}>
          <Viarbles className={styles.asideSVG} />
          <p className={styles.asideButtonsText}>{t('viarbles')}</p>
        </div>
        <div className={styles.asideButton}>
          <Code className={styles.asideSVG} />
          <p className={styles.asideButtonsText}>{t('code')}</p>
        </div>
        <div className={styles.asideButton}>
          <History className={styles.asideSVG} />
          <p className={styles.asideButtonsText}>{t('history')}</p>
        </div>
      </aside>
      <section className={styles.requestsSection}>
        <CreateRequest />
      </section>
    </section>
  );
}
