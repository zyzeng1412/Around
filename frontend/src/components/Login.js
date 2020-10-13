import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../constants';

export class Login extends React.Component {
  handleSubmit = values  => {
    console.log('Received values of form: ', values);
    fetch(`${API_ROOT}/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error(response.stateText);
      })
      .then((data) => {
        console.log(data);
        this.props.handleLoginSucceed(data);
        message.success('Login succeed!');
      })
      .catch((err) => {
        console.error(err);
        message.error('Login failed.');
      });
  };

  render() {
    return (
      <Form onFinish={this.handleSubmit} className="login-form">
        <Form.Item
          rules={[{ required: true, message: 'Please input your username!' }]}
          name="username"
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Please input your Password!' }]}
          name="password"
        >
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}
