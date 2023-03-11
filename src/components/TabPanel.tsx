import { useState } from 'react';
import { Tab } from './Tab';
import styles from './TabPanel.module.css';

export interface TabMeta {
  id: string;
  caption: string;
  disabled?: boolean;
}

export interface TabPanelProps {
  tabMeta: TabMeta[];
  vertical?: boolean;

  leftRender?: () => React.ReactElement;
  rightRender?: () => React.ReactElement;
  panelRender: (tabMeta: TabMeta | undefined) => React.ReactElement;
}

export function TabPanel({
  tabMeta,
  vertical = false,
  leftRender,
  rightRender,
  panelRender: panel
}: TabPanelProps) {
  const [selected, setSelected] = useState<number>(0);
  const maxIndex = tabMeta.length - 1;

  return (
    <div
      className={vertical ? styles.dirRow : styles.dirCol}
      style={{ width: 'fit-content' }}
    >
      <div className={vertical ? styles.dirCol : styles.dirRow}>
        {leftRender?.() ?? null}
        <div
          role='tablist'
          className={vertical ? styles.dirCol : styles.dirRow}
        >
          {tabMeta.map((meta, index) => (
            <Tab
              key={meta.id}
              tabMeta={meta}
              vertical={vertical}
              selected={selected === index}
              onSelected={() => setSelected(index)}
              onSelectNew={(dir) => {
                switch (dir) {
                  case 'Next':
                    setSelected(rotate(selected + 1, maxIndex));
                    break;
                  case 'Prev':
                    setSelected(rotate(selected - 1, maxIndex));
                    break;
                  case 'Start':
                    setSelected(rotate(selected + 999999, maxIndex));
                    break;
                  case 'End':
                    setSelected(rotate(selected - 999999, maxIndex));
                    break;
                }
              }}
            />
          ))}
        </div>
        {rightRender?.() ?? null}
      </div>
      <div className={vertical ? styles.vertical : styles.horizontal} />
      <div role='tabpanel' className={styles.component}>
        {panel(tabMeta[selected])}
      </div>
    </div>
  );
}

function rotate(newIndex: number, maxIndex: number): number {
  if (newIndex > maxIndex) {
    return 0;
  }
  if (newIndex < 0) {
    return maxIndex;
  }
  return newIndex;
}
