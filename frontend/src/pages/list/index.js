import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTableData, updateList, archived } from '../../redux/actions/listActions';
import { Table, Spin, Alert, Form, Input, Button, Typography, Popconfirm,message  } from 'antd';
import ListCreateModal from './modal';

const List = () => {
  const dispatch = useDispatch();
  const { loading, lists, error } = useSelector((state) => state.lists);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState('');

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const isEditing = (record) => record.list_id === editingId;

  const edit = (record) => {
    form.setFieldsValue({
      list_name: '',
      ...record,
    });
    setEditingId(record.list_id);
  };

  const cancel = () => {
    setEditingId('');
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

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;
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

  const columns = [
    {
      title: 'Liste Adı',
      dataIndex: 'list_name',
      key: 'list_name',
      editable: true,
    },
    {
      title: 'Eklenme Tarihi',
      dataIndex: 'list_created_at',
      key: 'list_created_at',
    },
    {
        title: 'Aksiyon',
        dataIndex: 'list_id',
        key: 'list_id',
        render: (_, record) => {
          const editable = isEditing(record); 
          return (
            <>
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
                  Düzenle
                </Typography.Link>
              )}
              <Popconfirm 
                title="Silmek istiyor musunuz?" 
                onConfirm={() => archivedSubmit(record.list_id)}
              >
                <a>Arşivle</a>
              </Popconfirm>
            </>
          );
        },
    }
  ]      
         
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
      <Button style={{float:'right',marginBottom:5}} type="primary" onClick={() => handleOpenModal()}>
        Liste Oluştur
      </Button>
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
          size="middle"
          rowKey={(record) => record.list_id}
        />
      </Form>
    </>
  );
};

export default List;
