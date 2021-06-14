import React, { FC, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Button, Drawer, Image, Modal, Popover, Space } from 'antd';
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
import { getBase64, getFile } from '@/utils';
import { ToDoType } from '@/models/todo';
import cardMap, { cardMapEnum } from '@/maps/cardMap';
import ProDescriptions, {
  ProDescriptionsItemProps,
} from '@ant-design/pro-descriptions';
import dayjs from 'dayjs';

const Home: FC = () => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [currentToDo, setCurrentToDo] = useState<ToDoType>({
    id: '',
    describe: '',
    images: [],
    name: '',
    type: 0,
  });
  const { todo, addToDo, editToDo, doneToDo } = useModel('todo', (model) => ({
    todo: model.todo,
    addToDo: model.addToDo,
    editToDo: model.editToDo,
    doneToDo: model.doneToDo,
  }));
  const onFinish = async (values: { images: any[] } | any) => {
    try {
      if (values.images) {
        for (let index = 0; index < values.images.length; index++) {
          values.images[index].originFileObj = await getBase64(
            values.images[index].originFileObj,
          );
          delete values.images[index].xhr;
        }
      }
      values.id = dayjs().unix();
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
        destroyOnClose: true,
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
  const descColumn: ProDescriptionsItemProps<ToDoType, 'text'>[] = [
    {
      title: '计划名称',
      dataIndex: 'name',
    },
    {
      title: '计划规划',
      dataIndex: 'type',
      valueEnum: cardMapEnum(),
    },
    {
      title: '计划描述',
      dataIndex: 'describe',
      valueType: 'textarea',
    },
    {
      title: '图片描述',
      dataIndex: 'images',
      render: (dom, entity) =>
        entity.images ? (
          <Space wrap>
            {entity.images.map((item, index) => (
              <Image
                width={50}
                height={50}
                src={item.originFileObj}
                key={`${index}`}
              />
            ))}
          </Space>
        ) : (
          '-'
        ),
    },
  ];
  const onEditFinish = async (values: ToDoType) => {
    try {
      if (values.images) {
        for (let index = 0; index < values.images.length; index++) {
          values.images[index].originFileObj = await getBase64(
            values.images[index].originFileObj,
          );
          delete values.images[index].xhr;
        }
      }
      values.id = currentToDo.id;
      await editToDo(values);
      setCurrentToDo(values);
      return true;
    } catch (e) {
      return false;
    }
  };
  const descExtra = (
    <Space>
      <ModalForm
        onFinish={onEditFinish}
        modalProps={{
          mask: false,
          destroyOnClose: true,
        }}
        initialValues={{
          ...currentToDo,
          images: currentToDo.images?.map((item) => ({
            ...item,
            originFileObj: getFile(item.originFileObj),
          })),
        }}
        title={'编辑计划'}
        width={500}
        trigger={
          <Button size={'small'} type={'primary'}>
            编辑
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
      </ModalForm>
      <Button
        size={'small'}
        onClick={() => {
          Modal.confirm({
            title: '操作提示',
            content: `确定将"${currentToDo.name}"标记为已完成吗？`,
            onOk: async () => {
              await doneToDo(currentToDo);
              setDrawerVisible(false);
            },
          });
        }}
        type={'primary'}
        danger
      >
        标记完成
      </Button>
    </Space>
  );
  return (
    <PageContainer
      header={{
        title: '这里是你的计划清单',
      }}
      ghost
      extra={extra()}
    >
      <ProCard ghost gutter={[8, 8]} wrap>
        {cardMap.map((item) => (
          <ProCard
            key={item.title}
            style={{
              background: item.background,
              color: item.color,
              height: '100%',
            }}
            title={item.title}
            colSpan={item.colSpan}
          >
            {todo.length > 0 ? (
              <Space wrap>
                {filterDataType(item.type).map((item, index) => (
                  <Popover
                    key={`${index}`}
                    title={'计划描述'}
                    content={item.describe || '无描述'}
                  >
                    <Button
                      onClick={() => {
                        setCurrentToDo(item);
                        setDrawerVisible(true);
                      }}
                      type={'primary'}
                    >
                      {item.name}
                    </Button>
                  </Popover>
                ))}
              </Space>
            ) : null}
            {todo.length === 0 ? '无计划' : null}
          </ProCard>
        ))}
      </ProCard>
      <Drawer
        title={'计划详情'}
        mask={false}
        width={500}
        visible={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
        }}
      >
        <ProDescriptions<ToDoType>
          extra={descExtra}
          bordered
          dataSource={currentToDo}
          column={1}
          columns={descColumn}
        />
      </Drawer>
    </PageContainer>
  );
};

export default Home;
