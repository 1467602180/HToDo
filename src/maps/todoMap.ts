type todoMapType = {
  label: string;
  value: string | number;
};

const todoMap: todoMapType[] = [
  {
    label: '重要紧急',
    value: 0,
  },
  {
    label: '重要不紧急',
    value: 1,
  },
  {
    label: '不重要紧急',
    value: 2,
  },
  {
    label: '不重要不紧急',
    value: 3,
  },
  {
    label: '待规划',
    value: 4,
  },
];

export default todoMap;
