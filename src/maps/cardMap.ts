export type CardMapType = {
  type: number;
  background: string;
  color: string;
  title: string;
  colSpan: number;
};

const cardMap: CardMapType[] = [
  {
    type: 0,
    background: '#fff9f9',
    color: '#fcd0ce',
    title: '重要紧急',
    colSpan: 12,
  },
  {
    type: 1,
    background: '#fffdf5',
    color: '#fdecae',
    title: '重要不紧急',
    colSpan: 12,
  },
  {
    type: 2,
    background: '#f8f9ff',
    color: '#c5d0ff',
    title: '不重要紧急',
    colSpan: 12,
  },
  {
    type: 3,
    background: '#f8fdfc',
    color: '#c5f1e4',
    title: '不紧急不重要',
    colSpan: 12,
  },
  {
    type: 4,
    title: '待规划',
    colSpan: 24,
    background: '#ffffff',
    color: '#000000',
  },
];

export type CardMapEnumType = {
  [index: number]: {
    text: string;
    color: string;
  };
};

export const cardMapEnum = (): CardMapEnumType => {
  const result: CardMapEnumType = {};
  cardMap.forEach((item, index) => {
    result[index] = {
      text: item.title,
      color: item.color,
    };
  });
  return result;
};

export default cardMap;
