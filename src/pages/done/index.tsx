import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import localforage from 'localforage';
import { DoneToDoType } from '@/models/todo';
import { cardMapEnum } from '@/maps/cardMap';
import { Image, Space } from 'antd';

const done = () => {
  const columns: ProColumns<DoneToDoType, 'text'>[] | undefined = [
    {
      title: '计划名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '计划规划',
      dataIndex: 'type',
      align: 'center',
      valueEnum: cardMapEnum(),
    },
    {
      title: '计划描述',
      dataIndex: 'describe',
      align: 'center',
    },
    {
      title: '图片描述',
      align: 'center',
      render: (dom, entity) => (
        <Space>
          {entity.images?.map((item, index) => (
            <Image
              width={50}
              height={50}
              key={`${index}`}
              src={item.originFileObj}
            />
          ))}
        </Space>
      ),
    },
    {
      title: '完成时间',
      align: 'center',
      dataIndex: 'created',
    },
  ];
  return (
    <PageContainer title={'完成清单'}>
      <ProTable<DoneToDoType>
        columns={columns}
        rowKey={'id'}
        search={false}
        pagination={{ defaultPageSize: 10 }}
        request={async ({ current, pageSize }) => {
          const localDoneData: DoneToDoType[] | null =
            await localforage.getItem('doneToDo');
          if (localDoneData) {
            return {
              success: true,
              total: localDoneData.length,
              data: localDoneData
                .reverse()
                .filter(
                  (item, index) =>
                    index >= ((current || 1) - 1) * (pageSize || 10) &&
                    index < (current || 1) * (pageSize || 10),
                ),
            };
          }
          return {
            success: false,
          };
        }}
      />
    </PageContainer>
  );
};

export default done;
