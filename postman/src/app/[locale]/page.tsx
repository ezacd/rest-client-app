'use client';

import styles from '@/app/page.module.css';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Aside from '@/components/asideMenu/AsideMenu';
import RequestSection from '@/components/RequestSection';

export default function HomePage() {
  return (
    <Provider store={store}>
      <section className={styles.mainSection}>
        <Aside />
        <section className={styles.requestsSection}>
          <RequestSection />
        </section>
      </section>
    </Provider>
  );
}
