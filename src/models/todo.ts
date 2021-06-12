import { useCallback, useEffect, useState } from 'react';
import * as localforage from 'localforage';

export type ToDoType = {
  name: string;
  type: number;
  describe?: string;
  images?: string[];
};

const todo = () => {
  const [todo, setToDo] = useState<ToDoType[]>([]);
  // 更新本地存储
  const refreshLocalData = async (data: ToDoType) => {
    const localData: ToDoType[] | null = await localforage.getItem('todo');
    let newData = [];
    if (localData) {
      newData.push(...localData);
    }
    newData.push(data);
    await localforage.setItem('todo', newData);
  };
  // 更新todo状态
  const addToDo = useCallback(async (data: ToDoType) => {
    setToDo((value) => {
      return [...value, data];
    });
    await refreshLocalData(data);
  }, []);

  useEffect(() => {
    localforage.getItem('todo').then((res: any) => {
      if (res) {
        setToDo(res);
      }
    });
  }, []);
  return {
    todo,
    addToDo,
  };
};

export default todo;
