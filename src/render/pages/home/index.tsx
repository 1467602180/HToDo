import React, { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';

const Home: FC = () => {
  return (
    <PageContainer
      header={{
        title: '这里是你的计划清单',
      }}
      ghost
      extra={[
        <ModalForm
          title="新增计划"
          width={500}
          key="add"
          trigger={
            <Button icon={<PlusOutlined />} size="small" type="primary">
              新增计划
            </Button>
          }
        >
          <ProFormText
            label="计划名称"
            name="name"
            rules={[{ required: true, message: '不能为空' }]}
          />
          <ProFormTextArea label="计划描述" name="describe" />
        </ModalForm>,
      ]}
    >
      <ProCard ghost gutter={[8, 8]} wrap>
        <ProCard
          style={{ background: '#fff9f9', color: '#fcd0ce' }}
          title="重要紧急"
          colSpan={12}
        >
          demo
        </ProCard>
        <ProCard
          title="重要不紧急"
          style={{ background: '#fffdf5', color: '#fdecae' }}
          colSpan={12}
        >
          demo
        </ProCard>
        <ProCard
          title="不重要紧急"
          style={{ background: '#f8f9ff', color: '#c5d0ff' }}
          colSpan={12}
        >
          demo
        </ProCard>
        <ProCard
          title="不紧急不重要"
          style={{ background: '#f8fdfc', color: '#c5f1e4' }}
          colSpan={12}
        >
          demo
        </ProCard>
        <ProCard title="待规划" colSpan={24}>
          demo
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default Home;
