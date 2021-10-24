import { Table, Tag, Space } from 'antd';
import { getAppointmentsByUser } from '../api/functions';
import { useEffect, useState } from 'react';

const columns = [
  {
    title: 'Start Time',
    dataIndex: 'start_time',
    key: 'id',
    render: text => <a>{text}</a>,
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    key: 'id',
  },
  {
    title: 'Donation Type',
    dataIndex: 'donation_type',
    key: 'id',
  },
];

let fetching = false;

const AppointmentsUser = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchAppointmentData = () => {
        if (data.length > 0) {
            return;
        }
  
        if (!fetching) {
            fetching = true;
            getAppointmentsByUser()
            .then((response) => {
              setData(response);
            })
        }
    }

    fetchAppointmentData()
    return (
        <Table columns={columns} dataSource={data} />
    )
  }, [data])

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default AppointmentsUser;