import styles from '@/app/page.module.css';
import Aside from '../_components/AsideMenu';
import RequestSection from '../_components/RequestSection';

export default function HomePage() {
  return (
    <section className={styles.mainSection}>
      <Aside />
      <section className={styles.requestsSection}>
        <RequestSection />
      </section>
    </section>
  );
}
