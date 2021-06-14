import { BasicLayoutProps } from '@ant-design/pro-layout';
import { history } from 'umi';
import { Button, Space } from 'antd';
import {
  HomeOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

export const layout: BasicLayoutProps = {
  logo: <></>,
  collapsed: true,
  title: 'HToDo',
  collapsedButtonRender: false,
  navTheme: 'light',
  onMenuHeaderClick: () => {
    history.replace('/home');
  },
  layout: 'mix',
  headerTheme: 'light',
  rightContentRender: () => (
    <Space>
      <Button
        onClick={() => {
          history.replace('/setting');
        }}
        icon={<SettingOutlined />}
        type="link"
      />
    </Space>
  ),
  menuDataRender: () => [
    {
      name: 'ToDo',
      icon: <HomeOutlined />,
      path: '/home',
    },
    {
      name: 'Done',
      icon: <UnorderedListOutlined />,
      path: '/done',
    },
    {
      name: 'Setting',
      icon: <SettingOutlined />,
      path: '/setting',
    },
  ],
};
