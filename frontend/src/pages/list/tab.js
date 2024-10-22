import React from 'react';
import { Tabs } from 'antd';
import List from './index';
import Archive from './archive';
import { useDispatch } from 'react-redux';
import { fetchArchiveData, fetchTableData } from '../../redux/actions/listActions';

const App = () => {
  const dispatch = useDispatch();

  const handleTabChange = (key) => {
    fetchData(key);
  };

  const fetchData = (key) => {
    if (key === '1') {
      dispatch(fetchTableData());
    } else {
      dispatch(fetchArchiveData());
    }
  };

  const items = [
    {
      key: '1',
      label: 'Liste',
      children: <List />,
    },
    {
      key: '2',
      label: 'Arşiv',
      children: <Archive />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={handleTabChange} />
  );
};

export default App;
