import styles from '@/app/page.module.css';
import CreateRequest from '../_components/CreateRequest';
import Aside from '../_components/AsideMenu';
import QueryParamsTable from '../_components/QueryParamsTable';

export default function HomePage() {
  return (
    <section className={styles.mainSection}>
      <Aside />
      <section className={styles.requestsSection}>
        <CreateRequest />
        <QueryParamsTable />
      </section>
    </section>
  );
}
