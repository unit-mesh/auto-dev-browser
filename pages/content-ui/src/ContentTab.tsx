import React, { useState } from 'react';
import { Tabs, Form, Input, Button, message, Space } from 'antd';
import {
  RobotOutlined,
  ToolOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  EditOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import type { eventWithTime } from 'rrweb';
import { record } from 'rrweb';
import { listenerHandler } from '@rrweb/types';

// on close props
export interface ContentTabProps {
  onClose: () => void;
}

export default function ContentTab({ onClose }: ContentTabProps) {
  const [form] = Form.useForm();
  const [isCapturing, setIsCapturing] = useState(false);
  const [events, setEvents] = useState<eventWithTime[]>([]);
  const [recordingFn, setRecordingFn] = useState<listenerHandler | undefined | null>(null);

  const startCapture = async () => {
    setIsCapturing(true);
    try {
      const stopFn = record({
        emit(event) {
          setEvents(prevEvents => [...prevEvents, event]);
        },
      });
      setRecordingFn(stopFn);

      // // 假设 API 返回捕获的步骤
      // const capturedSteps = ""
      //
      // // 将捕获的步骤添加到现有的 Test Steps 中
      // const currentSteps = form.getFieldValue('testSteps') || '';
      // const updatedSteps = currentSteps ? `${currentSteps}\n${capturedSteps}` : capturedSteps;
      //
      // form.setFieldsValue({ testSteps: updatedSteps });
      // message.success('Capture completed and steps added!');
    } catch (error) {
      console.error('Error during capture:', error);
      message.error('Failed to capture steps. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  const onFinish = () => {
    // load events set to form
    form.setFieldsValue({ testSteps: JSON.stringify(events, null, 2) });
    // clear events
    setEvents([]);
    // stop recording
    if (recordingFn) {
      setRecordingFn(null);
    }
  };

  const items = [
    {
      key: '1',
      label: (
        <span className="flex items-center">
          <ToolOutlined className="mr-1" />
          常用功能
        </span>
      ),
      children: (
        <div className="rounded-lg bg-white p-2 shadow-sm">
          <h3 className="mb-2 font-medium">Chat</h3>
          <p className="text-sm">This is a placeholder for Function 2 content. Add your specific functionality here.</p>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <span className="flex items-center">
          <RobotOutlined className="mr-1" />
          Auto Test
        </span>
      ),
      children: (
        <Form form={form} name="autoTestForm" onFinish={onFinish} layout="vertical" className="space-y-2">
          <Form.Item
            name="testGoals"
            label={<span className="font-medium">Test Goals</span>}
            rules={[{ required: true, message: 'Test goals are required' }]}>
            <Input.TextArea
              placeholder="Enter test goals"
              className="text-sm"
              rows={2}
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>
          <Form.Item
            name="testSteps"
            label={<span className="font-medium">Test Steps</span>}
            rules={[{ required: true, message: 'Test steps are required' }]}>
            <Input.TextArea
              placeholder="Enter test steps or use 'Start Capture'"
              className="text-sm"
              rows={3}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item>
            <Space className="w-full">
              <Button
                type="primary"
                onClick={startCapture}
                icon={<PlayCircleOutlined />}
                loading={isCapturing}
                className="flex-1 bg-green-500 hover:bg-green-600 focus:bg-green-600">
                {isCapturing ? 'Capturing...' : 'Start Capture'}
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onFinish}
                icon={<EditOutlined />}
                className="flex-1 bg-blue-500 hover:bg-blue-600 focus:bg-blue-600">
                Optimize Steps
              </Button>
            </Space>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '3',
      label: (
        <span className="flex items-center">
          <SettingOutlined className="mr-1" />
          知识挖掘
        </span>
      ),
      children: (
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Function 3</h3>
          <p className="text-sm">This is a placeholder for Function 3 content. Add your specific functionality here.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="p-2 bg-gray-100 max-w-md mx-auto">
      <Tabs
        defaultActiveKey="1"
        type="card"
        items={items}
        tabBarExtraContent={<CloseOutlined onClick={onClose} style={{ cursor: 'pointer' }} />}
        className="mb-2"
      />
    </div>
  );
}
