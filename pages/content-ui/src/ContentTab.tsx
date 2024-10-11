import React from 'react';
import { Button, Form, Input, message, Tabs } from 'antd';
import { PlusOutlined, RobotOutlined, ToolOutlined, SettingOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

export default function AccessibleFunctionalUI() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    message.success('Test case added successfully!');
    form.resetFields();
  };

  return (
    <div className="p-2 bg-gray-100 max-w-md mx-auto">
      <Tabs defaultActiveKey="1" type="card" className="mb-2">
        <TabPane
          tab={
            <span className="flex items-center">
              <RobotOutlined className="mr-1" />
              Auto Capture
            </span>
          }
          key="1">
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
                placeholder="Enter test steps"
                className="text-sm"
                rows={3}
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
                className="w-full bg-blue-500 hover:bg-blue-600 focus:bg-blue-600">
                Add Test Case
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane
          tab={
            <span className="flex items-center">
              <ToolOutlined className="mr-1" />
              Function 2
            </span>
          }
          key="2">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <h3 className="font-medium mb-2">Function 2</h3>
            <p className="text-sm">
              This is a placeholder for Function 2 content. Add your specific functionality here.
            </p>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span className="flex items-center">
              <SettingOutlined className="mr-1" />
              Function 3
            </span>
          }
          key="3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <h3 className="font-medium mb-2">Function 3</h3>
            <p className="text-sm">
              This is a placeholder for Function 3 content. Add your specific functionality here.
            </p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
