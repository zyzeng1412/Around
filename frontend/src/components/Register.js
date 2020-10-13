import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../constants';

export class Register extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = values => {
    console.log('Received values of form: ', values);
    fetch(`${API_ROOT}/signup`, {
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
        throw new Error(response.statusText);
      })
      .then((data) => {
        console.log(data);
        message.success('Registration succeed!');
        this.props.history.push('/login');
      })
      .catch((err) => {
        console.error(err);
        message.error('Registration failed.');
      });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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

    return (
      <Form {...formItemLayout} onFinish={this.handleSubmit} className="register">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Password" hasFeedback
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              validator: this.validateToNextPassword,
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback
        name="confirm"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          {
            validator: this.compareToFirstPassword,
          },
        ]}
        >
          <Input.Password onBlur={this.handleConfirmBlur} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <p>I already have an account, go back to <Link to="/login">login</Link></p>
        </Form.Item>
      </Form>
    );
  }
}
