import { useCallback, useEffect, useState } from 'react';
import * as localforage from 'localforage';
import dayjs from 'dayjs';
let _ = require('loadsh');

export type ToDoType = {
  id: string;
  name: string;
  type: number;
  describe?: string;
  images?: any[];
};

export type DoneToDoType = ToDoType & { created: string };

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
    await refreshLocalData(data);
    setToDo((value) => {
      return [...value, data];
    });
  }, []);
  const editData = (value: ToDoType[], data: ToDoType) => {
    value.forEach((item) => {
      if (item.id === data.id) {
        item.images = data.images;
        item.type = data.type;
        item.name = data.name;
        item.describe = data.describe;
      }
    });
  };
  const editLocalData = async (data: ToDoType) => {
    const localData: ToDoType[] | null = await localforage.getItem('todo');
    if (localData) {
      editData(localData, data);
      await localforage.setItem('todo', localData);
    }
  };
  const editToDo = useCallback(async (data: ToDoType) => {
    await editLocalData(data);
    setToDo((value) => {
      const copyValue = _.cloneDeep(value);
      editData(copyValue, data);
      return Object.assign(copyValue);
    });
  }, []);
  const doneLocalData = async (data: ToDoType) => {
    const localData: ToDoType[] | null = await localforage.getItem('todo');
    if (localData) {
      await localforage.setItem(
        'todo',
        localData.filter((item) => item.id !== data.id),
      );
    }
    const localDoneData: DoneToDoType[] | null = await localforage.getItem(
      'doneToDo',
    );
    const newLocalDoneData: DoneToDoType[] = [];
    if (localDoneData) {
      newLocalDoneData.push(...localDoneData, {
        ...data,
        created: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
    } else {
      newLocalDoneData.push({
        ...data,
        created: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    await localforage.setItem('doneToDo', newLocalDoneData);
  };
  const doneToDo = useCallback(async (data: ToDoType) => {
    await doneLocalData(data);
    setToDo((value) => {
      return value.filter((item) => item.id !== data.id);
    });
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
    editToDo,
    doneToDo,
  };
};

export default todo;
