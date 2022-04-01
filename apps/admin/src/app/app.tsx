import { Form, Select, Button, Upload } from 'antd';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import 'antd/dist/antd.css';
import './app.module.css';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const dummyRequest = ({ file, onSuccess }: UploadRequestOption): void => {
  setTimeout(() => {
    onSuccess && onSuccess('ok');
  }, 0);
};

const App = () => {
  const onFinish = (values: any) => {
    const fd = new FormData();
    fd.append('country', values.country);

    for (const file of values.files) {
      fd.append('files', file.originFileObj, file.name);
    }

    axios.post('http://localhost:3334/api/stage-property/upload', fd);

    console.log('Received values of form: ', values, fd.getAll('files'));
  };

  return (
    <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
      <Form.Item
        name="country"
        label="Select"
        hasFeedback
        rules={[{ required: true, message: 'Please select your country!' }]}
      >
        <Select placeholder="Please select a country">
          <Option value="china">China</Option>
          <Option value="usa">U.S.A</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item
          name="files"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger customRequest={dummyRequest} name="files" multiple>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
