import React, { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-form';
import todoMap from '@/maps/todoMap';
import { useModel } from 'umi';
import { getBase64 } from '@/utils';
import { ToDoType } from '@/models/todo';

const Home: FC = () => {
  const { todo, addToDo } = useModel('todo', (model) => ({
    todo: model.todo,
    addToDo: model.addToDo,
  }));
  const onFinish = async (values: { images: any[] } | any) => {
    try {
      if (values.images) {
        for (let index = 0; index < values.images.length; index++) {
          values.images[index] = await getBase64(
            values.images[index].originFileObj,
          );
        }
      }
      await addToDo(values);
      return true;
    } catch (e) {
      return false;
    }
  };
  const extra = () => [
    <ModalForm
      modalProps={{
        mask: false,
      }}
      onFinish={onFinish}
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
      <ProFormSelect
        label="计划规划"
        name="type"
        rules={[{ required: true, message: '不能为空' }]}
        options={todoMap}
      />
      <ProFormTextArea label="计划描述" name="describe" />
      <ProFormUploadDragger label="图片描述" name="images" />
    </ModalForm>,
  ];
  const filterDataType = (type: number): ToDoType[] => {
    return todo.filter((item) => item.type === type);
  };

  return (
    <PageContainer
      header={{
        title: '这里是你的计划清单',
      }}
      ghost
      extra={extra()}
    >
      <ProCard ghost gutter={[8, 8]} wrap>
        <ProCard
          style={{ background: '#fff9f9', color: '#fcd0ce' }}
          title="重要紧急"
          colSpan={12}
        >
          <Space>
            {filterDataType(0).map((item, index) => (
              <Button key={`${index}`} type={'primary'}>
                {item.name}
              </Button>
            ))}
          </Space>
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
