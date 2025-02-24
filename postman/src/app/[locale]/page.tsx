import styles from '@/app/page.module.css';
import CreateRequest from '../_components/CreateRequest';
import Aside from '../_components/AsideMenu';

export default function HomePage() {
  return (
    <section className={styles.mainSection}>
      <Aside />
      <section className={styles.requestsSection}>
        <CreateRequest />
      </section>
    </section>
  );
}
