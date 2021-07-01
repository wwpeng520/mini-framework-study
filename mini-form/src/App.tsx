import { Tabs } from 'antd4';
import AntdForm3Page from './pages/AntdForm3Page';
import AntdForm4Page from './pages/AntdForm4Page';

const { TabPane } = Tabs;

// import AntdFormPage from './pages/MyRcFieldFormPage';
// import MyRCFormPage0 from './pages/MyRCFormPage0';
// import MyRCFormPage from './pages/MyRCFormPage';

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <Tabs>
        <TabPane tab='antd3' key='1'>
          <AntdForm3Page />
        </TabPane>
        <TabPane tab='antd4' key='2'>
          <AntdForm4Page />
        </TabPane>
      </Tabs>
    </div>
  );
}
