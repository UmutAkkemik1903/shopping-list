import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableData, updateList, archived } from '../../redux/actions/listActions';
import { updateQuantity, updateStatusApproved,updateStatusDestroy,deleteProductList } from '../../redux/actions/shoppingListActions';
import { Table, Spin, Alert, Form, Input, Button, Space, Typography, Popconfirm, message, Checkbox, InputNumber } from 'antd';
import ListCreateModal from './listModal';
import { productData } from '../../redux/actions/productActions';
import ShoppingListCreateModal from './shoppingmodal';
import { CloseOutlined, CheckOutlined,DeleteOutlined, EditOutlined,PlusOutlined } from '@ant-design/icons';

const List = () => {
  const dispatch = useDispatch();
  const { loading, lists, error } = useSelector((state) => state.lists);
  const { products } = useSelector((state) => state.products);
  const [open, setOpen] = useState(false);
  const [shoppingOpen, setShoppingOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState('');
  const [quantityEditingId, setQuantityEditingId] = useState('');
  const [currentListId, setCurrentListId] = useState(null);
  const [receivedItems, setReceivedItems] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTableData());
      lists.forEach(list => {
        list.products.forEach(product => {
          if (product.status == 1) {
            setReceivedItems((prev) => ({
              ...prev,
              [product.product_id]: true,
            }));
          }
        });
      });
    };
  
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(productData());
  }, [dispatch]);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleShoppingListOpenModal = (listId) => {
    setCurrentListId(listId);
    setShoppingOpen(true);
  };

  const isEditing = (record) => record.list_id === editingId;
  const isQuantityEditing = (record) => record.product_id === quantityEditingId;

  const edit = (record) => {
    form.setFieldsValue({
      list_name: '',
      ...record,
    });
    setEditingId(record.list_id);
  };

  const editQuantity = (record) => {
    form.setFieldsValue({
      quantity: record.quantity,
    });
    setQuantityEditingId(record.product_id);
  };

  const cancel = () => {
    setEditingId('');
    setQuantityEditingId('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      await dispatch(updateList(key, row));
      dispatch(fetchTableData());
      message.success('Liste başarıyla güncellendi!');
      setEditingId('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      message.error('Liste güncellenirken bir hata oluştu!');
    }
  };

  const saveQuantity = async (key) => {
    try {
      const row = await form.validateFields();
      await dispatch(updateQuantity(key, row.quantity));
      dispatch(fetchTableData());
      message.success('Ürün miktarı başarıyla güncellendi!');
      setQuantityEditingId('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      message.error('Ürün miktarı güncellenirken bir hata oluştu!');
    }
  };

  const statusApprove = async (key) => {
    try {
      const row = await form.validateFields();
      await dispatch(updateStatusApproved(key));
  
      setReceivedItems((prev) => ({
        ...prev,
        [key]: true,
      }));
  
      await dispatch(fetchTableData());
      message.success('Ürün alındı olarak işaretlendi!');
      setQuantityEditingId('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      message.error('Bir terslik oldu!');
    }
  };
  
  const statusDestroy = async (key) => {
    try {
      const row = await form.validateFields();
      await dispatch(updateStatusDestroy(key));
  
      setReceivedItems((prev) => ({
        ...prev,
        [key]: false,
      }));
  
      await dispatch(fetchTableData());
      message.success('Ürün alınmadı olarak işaretlendi!');
      setQuantityEditingId('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      message.error('Bir terslik oldu!');
    }
  };
  
  

  const archivedSubmit = async (key) => {
    try {
      await dispatch(archived(key));
      dispatch(fetchTableData());
      message.success('Silme işlemi başarılı!');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      message.error('Silme işlemi sırasında bir hata oluştu!');
    }
  };

  const deleteSubmit = async (key) => {
    try {
      await dispatch(deleteProductList(key));
      dispatch(fetchTableData());
      message.success('Silme işlemi başarılı!');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      message.error('Silme işlemi sırasında bir hata oluştu!');
    }
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: true, message: `Lütfen ${title} girin!` }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  if (loading) return <Spin />;
  if (error) return <Alert message={`Error: ${error}`} type="error" />;

  const expandColumns = [
    {
      title: '',
      key: 'received',
      render: (_, record) =>
        receivedItems[record.product_id] ? <Checkbox checked={true} /> : null,
    },
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
      editable: true,
    },
    {
      title: 'Aksiyon',
      key: 'operation',
      render: (_, record) => {
        const quantityEditable = isQuantityEditing(record);
        return (
          <Space size="middle">
            {quantityEditable ? (
              <span>
                <Typography.Link
                  onClick={() => saveQuantity(record.product_id)}
                  style={{ marginRight: 8 }}
                >
                  Kaydet
                </Typography.Link>
                <Popconfirm title="İptal etmek istiyor musunuz?" onConfirm={cancel}>
                  <a>İptal</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                style={{ marginRight: 8 }}
                onClick={() => editQuantity(record)}
              >
            <Button style={{backgroundColor:'#ad6800', color:'white' }} variant="solid"><EditOutlined/></Button>
              </Typography.Link>
            )}
            {record.status === null ? (
            <Button color="warning" variant="solid" onClick={() => statusApprove(record.product_id)}><CheckOutlined/></Button>)
             : 
             (<Button color="danger" variant="solid" onClick={() => statusDestroy(record.product_id)}><CloseOutlined/></Button> )}
            <Popconfirm
              title="Silmek istiyor musunuz?"
              onConfirm={() => deleteSubmit(record.product_id)}
            >
             <Button color="danger" variant="solid" ><DeleteOutlined/></Button>

            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const columns = [
    {
      title: 'Liste Adı',
      dataIndex: 'list_name',
      key: 'list_name',
      editable: true,
    },
    {
      title: 'Eklenme Tarihi',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Aksiyon',
      dataIndex: 'list_id',
      key: 'list_id',
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <Space size="middle">
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.list_id)}
                  style={{ marginRight: 8 }}
                >
                  Kaydet
                </Typography.Link>
                <Popconfirm title="İptal etmek istiyor musunuz?" onConfirm={cancel}>
                  <a>İptal</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                style={{ marginRight: 8 }}
                disabled={editingId !== ''}
                onClick={() => edit(record)}
              >
            <Button style={{backgroundColor:'#ad6800', color:'white' }}><EditOutlined/></Button>
              </Typography.Link>
            )}
            <Button style={{backgroundColor:'#7cb305', color:'white' }} onClick={() => handleShoppingListOpenModal(record.list_id)}><PlusOutlined/></Button>
            <Popconfirm
              title="Arşive kaldırılsın mı?"
              onConfirm={() => archivedSubmit(record.list_id)}
            >
              <Button style={{backgroundColor:'#cf1322', color:'white' }}><DeleteOutlined/></Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const expandedRowRender = (record) => (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={expandColumns.map((col) => {
          if (!col.editable) {
            return col;
          }
          return {
            ...col,
            onCell: (record) => ({
              record,
              inputType: col.dataIndex === 'quantity' ? 'number' : 'text',
              dataIndex: col.dataIndex,
              title: col.title,
              editing: isQuantityEditing(record),
            }),
          };
        })}
        dataSource={record.products}
        pagination={false}
        rowKey="product_id"
      />
    </Form>
  );

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Button style={{ float: 'right', marginBottom: 5 }} type="primary" onClick={() => handleOpenModal()}>
        Liste Oluştur
      </Button>
      <ShoppingListCreateModal open={shoppingOpen} setOpen={setShoppingOpen} products={products} listId={currentListId} />
      <ListCreateModal open={open} setOpen={setOpen} />
      <Form form={form} component={false}>
        <Table
          bordered
          columns={mergedColumns}
          dataSource={lists}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: [],
          }}
          size="middle"
          rowKey={(record) => record.list_id}
        />
      </Form>
    </>
  );
};

export default List;
