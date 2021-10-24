import { Table, Tag, Space, Button } from 'antd';
import { useEffect, useState } from 'react';
import { deleteAppointment, getAppointmentsByCenter, getAppointmentsByUser, getUser, getUserByPk, updateUser } from '../api/functions';

const renderDate = (iso) => {
    let date = new Date(iso);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes() + "0";

    if (dt < 10) {
    dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    console.log(year+'-' + month + '-'+dt);
    return <p>{month}/{dt}/{year} {hour}:{minute}</p>
}

let flag = false;
const redeemAppointment = async (pk, reward, username, end_time) => {
    let date = end_time;
    let info = {
        experience: reward,
        time_since_last: end_time,
        times_donated: 1
    };
    await updateUser(username, info);
    console.log(pk + "primary key " + reward + " ");
    await delAppointment(pk); 
    flag = true;
};

const delAppointment = async (pk) => {
    await deleteAppointment(pk);
    flag = true;
}


const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Booked',
    dataIndex: 'booked',
    key: 'booked',
    render: (text) => {
      if (text) {
        return <p>True</p>;
      }
    }
  },
  {
    title: 'Start Time',
    dataIndex: 'start_time',
    key: 'start_time',
    render: (text) => {
        return renderDate(text)
    }
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    key: 'end_time',
    render: (text) => {
        return renderDate(text)
    }
  },
  {
    title: 'Donation Type',
    dataIndex: 'donation_type',
    key: 'donation_type',
    render: text => {
        let color = 'volcano';
        let op = 'Blood';
        if (text === "PLS") {
            color = 'gold';
            op = 'Plasma'
        }
        return (
            <Tag color={color} key={op}>
            {op.toUpperCase()}
            </Tag>
        );
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Button onClick={() => redeemAppointment(record.id, record.reward, record.username, record.end_time)}>Complete</Button>
        <Button danger onClick={() => delAppointment(record.id)}>Delete</Button>
      </Space>
    ),
  },
];

// const sample = [
//     {
//         username: "hello",
//         email: "e",
//         booked: true,
//         start_time: "2021-11-02T00:00:00",
//         end_time: "2021-11-02T00:00:30",
//         donation_type: "PLS"
//     }
// ]

let fetching = false;

const AppointmentTable = () => {
    let [data, setData] = useState([]);

    const fetchAppointmentData = async () => {
        if (data.length > 0 && !flag) {
            return;
        }

        if (!fetching) {
            fetching = true;
            let response = await getAppointmentsByCenter("Red Cross");
            console.log("got it!");
            let arr = [];

            for (let i = 0; i < response.length; i++) {
                let userInfo = await getUserByPk(response[i]["user"]);
                response[i]["username"] = userInfo["username"];
                response[i]["email"] = userInfo["email"];
                console.log(response[i]["username"]);
                arr.push(response[i]);
            }

            setData(arr);
            console.log("set arr");
            fetching = false;
        }

        if (flag) {
            flag = !flag;
        }
    }

    useEffect(() => {
        fetchAppointmentData();
        return (
            <Table columns={columns} dataSource={data} />
        )
    }, [data, delAppointment, redeemAppointment])

    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default AppointmentTable;  