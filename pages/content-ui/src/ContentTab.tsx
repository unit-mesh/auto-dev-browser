import React, { useState } from 'react';
import { Tabs, Form, Input, Button, message, Space } from 'antd';
import { RobotOutlined, ToolOutlined, SettingOutlined, PlayCircleOutlined, EditOutlined } from '@ant-design/icons';

export default function EnhancedAutoTestUI() {
  const [form] = Form.useForm();
  const [isCapturing, setIsCapturing] = useState(false);

  const onFinish = (values: string) => {
    console.log('Optimized test case:', values);
    message.success('Test case optimized successfully!');
  };

  const startCapture = async () => {
    setIsCapturing(true);
    try {
      // 模拟调用接口
      const response = await fetch('https://api.example.com/start-capture', {
        method: 'POST',
      });
      const data = await response.json();

      // 假设 API 返回捕获的步骤
      const capturedSteps = data.steps.join('\n');

      // 将捕获的步骤添加到现有的 Test Steps 中
      const currentSteps = form.getFieldValue('testSteps') || '';
      const updatedSteps = currentSteps ? `${currentSteps}\n${capturedSteps}` : capturedSteps;

      form.setFieldsValue({ testSteps: updatedSteps });
      message.success('Capture completed and steps added!');
    } catch (error) {
      console.error('Error during capture:', error);
      message.error('Failed to capture steps. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  const items = [
    {
      key: '1',
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
      key: '2',
      label: (
        <span className="flex items-center">
          <ToolOutlined className="mr-1" />
          Function 2
        </span>
      ),
      children: (
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Function 2</h3>
          <p className="text-sm">This is a placeholder for Function 2 content. Add your specific functionality here.</p>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <span className="flex items-center">
          <SettingOutlined className="mr-1" />
          Function 3
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
      <Tabs defaultActiveKey="1" type="card" items={items} className="mb-2" />
    </div>
  );
}
