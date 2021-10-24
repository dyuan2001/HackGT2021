import { Table, Tag, Space } from 'antd';
import { getLeaderboard } from '../api/functions';
import { useEffect, useState } from 'react';

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Donations',
    dataIndex: 'times_donated',
    key: 'username',
  },
  {
    title: 'Experience',
    dataIndex: 'experience',
    key: 'username',
  },
];

let fetching = false;

const Leaderboard = () => {
  let [data, setData] = useState([]);

  const fetchLeaderboardData = () => {
      if (data.length > 0) {
          return;
      }

      if (!fetching) {
          fetching = true;
          getLeaderboard()
          .then((response) => {
            console.log("done " + response[0]["username"]);
            setData(response);
            fetching = false;
          })
      }
  }

  useEffect(() => {
    fetchLeaderboardData()
    return (
        <Table columns={columns} dataSource={data} />
    )
  }, [data])

  return (
      <Table columns={columns} dataSource={data} />
  )
}

export default Leaderboard;