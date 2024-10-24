import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArchiveData, deleteList } from '../../redux/actions/listActions';
import { Table, Spin, Alert, message, Popconfirm } from 'antd';

const ArchivedList = () => {
    const dispatch = useDispatch();
    const { loading, lists, error } = useSelector((state) => state.lists);

    useEffect(() => {
        dispatch(fetchArchiveData());
    }, [dispatch]);

    const deleteSubmit = async (key) => {
        try {
          await dispatch(deleteList(key));
          dispatch(fetchArchiveData()); 
          message.success('Silme işlemi başarılı!');
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
          message.error('Silme işlemi sırasında bir hata oluştu!');
        }
      };

    if (loading) return <Spin />;
    if (error) return <Alert message={`Error: ${error}`} type="error" />;

    const expandColumns = [
        {
            title: 'Eklenme Tarihi',
            dataIndex: 'product_created_at',
            key: 'product_created_at',
        },
        {
            title: 'Ürün Adı',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Miktar',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];
    const columns = [
        {
            title: 'Liste Adı',
            dataIndex: 'list_name',
            key: 'list_name',
        },
        {
            title: 'Eklenme Tarihi',
            dataIndex: 'list_created_at',
            key: 'list_created_at',
        },
        {
            title: 'Aksiyon',
            key: 'operation',
            render: (_,record) =>               
            <Popconfirm title="Silmek istiyor musunuz?" onConfirm={() => deleteSubmit(record.list_id)}>
                <a>Sil</a>
            </Popconfirm>,
        },
    ];
    const expandedRowRender = (record) => (
        <Table
            columns={expandColumns}
            dataSource={record.products}
            pagination={false}
            rowKey="product_id"
        />
    );

    return (
        <>
        <Table
        bordered
        columns={columns}
        dataSource={lists}
        expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: [],
        }}
        size="middle"
        rowKey="created_at"
        />
        </>  
    );
};

export default ArchivedList;
