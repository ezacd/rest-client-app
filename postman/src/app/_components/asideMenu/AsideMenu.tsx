import styles from '@/app/_components/asideMenu/AsideMenu.module.css';
import CodeGeneration from './asideMenuButtons/CodeGeneration';
import History from './asideMenuButtons/History';

export default function Aside() {
  return (
    <aside className={styles.aside}>
      <CodeGeneration />
      <History />
    </aside>
  );
}
