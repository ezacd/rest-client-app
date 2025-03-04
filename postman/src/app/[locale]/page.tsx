'use client';

import styles from '@/app/page.module.css';
import Aside from '../_components/AsideMenu';
import RequestSection from '../_components/RequestSection';
import { Provider } from 'react-redux';
import { store } from '../_store/store';

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
