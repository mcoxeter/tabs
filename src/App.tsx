import './App.css';
import { TabMeta, TabPanel } from './components/TabPanel';

function App() {
  const tabMeta: TabMeta[] = [
    {
      id: '1',
      caption: 'Computers'
    },
    {
      id: '2',
      caption: 'Fitness'
    },
    {
      id: '3',
      caption: 'Skiing'
    }
  ];
  return (
    <div className='App'>
      <button>test</button>
      <TabPanel
        tabMeta={tabMeta}
        leftRender={() => <button>left</button>}
        rightRender={() => <button>right</button>}
        panelRender={(meta) => <div>{meta?.caption}</div>}
      ></TabPanel>
    </div>
  );
}

export default App;
