import React, { FC, useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { FormInstance, ProFormSwitch } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';

const { ipcRenderer } = window.require('electron');

const Setting: FC = () => {
  const formRef = useRef<FormInstance>();
  useEffect(() => {
    ipcRenderer.send('getDevToolState');
    ipcRenderer.on(
      'resultDevToolState',
      (event: any, { isOpen }: { isOpen: boolean }) => {
        formRef.current?.setFieldsValue({
          develop: isOpen,
        });
      },
    );
    return () => {
      ipcRenderer.removeAllListeners('resultDevToolState');
    };
  }, []);
  return (
    <PageContainer ghost title={<></>}>
      <ProCard>
        <ProForm formRef={formRef} layout={'horizontal'} submitter={false}>
          <ProFormSwitch
            label={'开发者模式'}
            name={'develop'}
            fieldProps={{
              onChange: (value) => {
                if (value) {
                  ipcRenderer.send('openDevTool');
                } else {
                  ipcRenderer.send('closeDevTool');
                }
              },
            }}
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default Setting;
