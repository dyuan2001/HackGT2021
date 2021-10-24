import React, {  } from 'react';
import {
  Form,
  Input,
  Button,
  Typography
} from 'antd';
import { login } from '../api/functions';
const { Title, Paragraph, Text, Link } = Typography;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const LoginPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const username = values.username;
    const password = values.password;

    login(username, password);


    console.log('Received values of form: ', values);
  };

  return (
    <div style={{ width: '40%', margin: 'auto', paddingTop: '10%'}}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Paragraph>
        Click <a href="/RegistrationPage">here</a> to sign up.
        </Paragraph>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;