import React from 'react';
import { Form, Input, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export class CreatePostForm extends React.Component {
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  beforeUpload = () => false;

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout}>
        <Form.Item label="Message"
          rules={[{ required: true, message: 'Please input message.' }]}
          name="message"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image/Video">
          <div className="dropbox"
            rules={[{ required: true, message: 'Please select an image.' }]}
            name="image"
            valuePropName='fileList'
            getValueFromEvent={this.normFile}
          >
              <Upload.Dragger name="files" beforeUpload={this.beforeUpload}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>,
          </div>
        </Form.Item>
      </Form>
    );
  }
}
