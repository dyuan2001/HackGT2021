import { Form, DatePicker, TimePicker, Button } from 'antd';
import { Input, Select } from 'antd';
import { createAppointment } from '../api/functions';

const { Option } = Select;

const { RangePicker } = DatePicker;
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
const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};
const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const TimeRelatedForm = () => {
  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const rangeValue = fieldsValue['range-picker'];
    const rangeTimeValue = fieldsValue['range-time-picker'];
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
    };
    const time = String(values['date-picker']) + "T" + String(values['time-picker']);
    createAppointment(true, time, time, values['donation'], values['clinic']);
    
    console.log('Received values of form: ', values, time);
  };

  return (
    <Form name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
      <Form.Item name="clinic" label="Clinic Selection" rules={[{ required: true }]}>
        <Select
          placeholder="Select a Clinic"
          allowClear
        >
          <Option value="Red Cross">Red Cross</Option>
        </Select>
      </Form.Item>
      <Form.Item name="donation" label="Donation Selection" rules={[{ required: true }]}>
        <Select
          placeholder="Select a donation type"
          allowClear
        >
          <Option value="BLD">Blood</Option>
          <Option value="PLS">Plasma</Option>\
        </Select>
      </Form.Item>
      <Form.Item name="date-picker" label="DatePicker" {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="time-picker" label="TimePicker" {...config}>
        <TimePicker />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TimeRelatedForm