import styles from '@/components/asideMenu/AsideMenu.module.css';
import CodeGeneration, {
  CodeGenerationAsideMenu,
} from './asideMenuButtons/CodeGeneration';
import History, { HistoryAsideMenu } from './asideMenuButtons/History';
import { useState } from 'react';

type BurgerMenuState = {
  isOpen: boolean;
  menuType: 'history' | 'codeGeneration' | null;
};

type HistoryProps = {
  burgerMenu: BurgerMenuState;
  setBurgerMenu: (value: BurgerMenuState) => void;
};

export default function Aside() {
  const [burgerMenu, setBurgerMenu] = useState<BurgerMenuState>({
    isOpen: false,
    menuType: null,
  });

  return (
    <aside className={styles.aside}>
      {burgerMenu.isOpen ? (
        <OpenAsideMenu burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu} />
      ) : (
        <BaseAside burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu} />
      )}
    </aside>
  );
}

function BaseAside({ burgerMenu, setBurgerMenu }: HistoryProps) {
  return (
    <>
      {' '}
      <CodeGeneration burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu} />
      <History burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu} />
    </>
  );
}

function OpenAsideMenu({ burgerMenu, setBurgerMenu }: HistoryProps) {
  return burgerMenu.menuType === 'history' ? (
    <HistoryAsideMenu setBurgerMenu={setBurgerMenu} />
  ) : (
    <CodeGenerationAsideMenu setBurgerMenu={setBurgerMenu} />
  );
}
