import { useEffect, useRef } from 'react';
import styles from './Tab.module.css';
import { TabMeta } from './TabPanel';

export interface TabProps {
  tabMeta: TabMeta;
  selected: boolean;
  vertical: boolean;
  onSelected: () => void;
  onSelectNew: (direction: 'Prev' | 'Next' | 'Start' | 'End') => void;
}

export function Tab({
  tabMeta,
  selected,
  vertical,
  onSelected,
  onSelectNew
}: TabProps) {
  const classNames = [
    styles.component,
    vertical ? styles.vertical : styles.horizontal
  ];

  const ref = useRef<HTMLButtonElement>(null);

  selected && classNames.push(styles.selected);

  useEffect(() => {
    if (selected) {
      ref?.current?.focus();
    }
  }, [selected, ref]);

  const handleKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        onSelectNew('Prev');
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        onSelectNew('Next');
        break;
      case 'Home':
        onSelectNew('Start');
        break;
      case 'End':
        onSelectNew('End');
        break;
    }
  };

  return (
    <button
      ref={ref}
      role={'tab'}
      tabIndex={selected ? 0 : -1}
      aria-selected={selected}
      className={classNames.join(' ')}
      onKeyDown={(e) => handleKeyboard(e)}
      onClick={() => onSelected()}
    >
      {tabMeta.caption}
    </button>
  );
}
