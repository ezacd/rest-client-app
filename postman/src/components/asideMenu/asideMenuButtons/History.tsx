import HistorySvg from '@/assets/icons/history.svg';
import styles from '@/components/asideMenu/asideMenuButtons/History.module.css';
import Trash from '@/assets/icons/trash.svg';
import { useTranslations } from 'next-intl';
import CloseSvg from '@/assets/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  setBody,
  setHeadersParams,
  setHistory,
  setParams,
  setRequestValue,
} from '@/store/requestSlice';

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
  const history = useSelector((state: RootState) => state.request.history);
  const dispatch = useDispatch();
  const t = useTranslations('HomePage');

  const handleClickClose = () => {
    setBurgerMenu({ isOpen: false, menuType: 'history' });
  };

  const handleClickHistoryElement = (index: number) => {
    const request = {
      url: history[index].request.url,
      http_method: history[index].request.http_method,
    };
    dispatch(setRequestValue(request));
    dispatch(setBody(history[index].body));
    dispatch(setHeadersParams(history[index].headers));
    dispatch(
      setParams(
        history[index].params
          ? history[index].params
          : [{ key: '', value: '', checked: true }],
      ),
    );
  };

  const handleDeleteClick = (deleteIndex: number) => {
    const newHistory = history.filter((item, index) => deleteIndex !== index);
    dispatch(setHistory(newHistory));
  };

  return (
    <div>
      <div className={styles.closeSvgBox} onClick={handleClickClose}>
        <CloseSvg className={styles.closeSvg} />
      </div>
      <h2 className={styles.historyH2}>{t('history')}</h2>

      <ul className={styles.historyAsideMenuUl}>
        {history.map((item, index) => (
          <li
            key={index}
            id={String(index)}
            className={styles.historyAsideMenuLi}
            onClick={() => handleClickHistoryElement(index)}
          >
            <p className={styles.historyAsideMenuLiMethod}>
              {item.request.http_method}
            </p>
            <p className={styles.historyAsideMenuLiRequest}>
              {item.request.url}
            </p>
            <Trash
              className={styles.trash}
              onClick={() => handleDeleteClick(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
