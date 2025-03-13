import HistorySvg from '@/assets/icons/history.svg';
import styles from '@/app/_components/asideMenu/asideMenuButtons/History.module.css';
import { useTranslations } from 'next-intl';
import CloseSvg from '@/assets/icons/close.svg';

type BurgerMenuState = {
  isOpen: boolean;
  menuType: 'history' | 'codeGeneration' | null;
};

type HistoryProps = {
  burgerMenu: BurgerMenuState;
  setBurgerMenu: (value: BurgerMenuState) => void;
};

type setHistoryProps = {
  setBurgerMenu: (value: BurgerMenuState) => void;
};

export default function History({ burgerMenu, setBurgerMenu }: HistoryProps) {
  const t = useTranslations('HomePage');

  const handleClick = () => {
    setBurgerMenu({
      isOpen: !burgerMenu.isOpen,
      menuType: 'history',
    });
  };

  return (
    <>
      <button className={styles.asideButton} onClick={handleClick}>
        <HistorySvg className={styles.asideSVG} />
        <p className={styles.asideButtonsText}>{t('history')}</p>
      </button>
    </>
  );
}

export function HistoryAsideMenu({ setBurgerMenu }: setHistoryProps) {
  const handleClick = () => {
    setBurgerMenu({ isOpen: false, menuType: 'history' });
  };

  return (
    <div>
      <div className={styles.closeSvgBox} onClick={handleClick}>
        <CloseSvg className={styles.closeSvg} />
      </div>
      <ul className={styles.historyAsideMenuUl}>
        <li>history</li>
      </ul>
    </div>
  );
}
