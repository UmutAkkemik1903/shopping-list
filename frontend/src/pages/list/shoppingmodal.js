import React from 'react';
import { Button, Modal, Form, notification, Space, Select, InputNumber, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { createShoppingList, fetchTableData } from '../../redux/actions/shoppingListActions';

const App = ({ open, setOpen, products, listId }) => {
    const [api, contextHolder] = notification.useNotification();
    const { loading } = useSelector((state) => state.products);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        form.resetFields();
    };

    const handleSubmit = async (values) => {
        console.log('Form values before submission:', values);
        const payload = {
            ...values,
            list_id: listId,
        };

        try {
            await dispatch(createShoppingList(payload));
            message.success('Ürünler listeye başarıyla eklendi!');
            dispatch(fetchTableData());
            setOpen(false);
            form.resetFields();
        } catch (error) {
            message.error('Ürünler listeye eklenirken bir hata oluştu! ' + error.message);
        }
    };

    return (
        <Modal
            title="Liste Oluştur"
            centered
            open={open}
            onOk={handleClose}
            onCancel={handleClose}
            width={1000}
            footer={null}
        >
            {contextHolder}
            <Form onFinish={handleSubmit} form={form}>
                <Form.List name="products">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{ display: 'flex', marginBottom: 8 }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'product_id']}
                                        rules={[{ required: true, message: 'Kullanıcı seçin!' }]}
                                    >
                                        <Select placeholder="Kullanıcı Seçin">
                                            {products && products.map(product => (
                                                <Select.Option key={product.id} value={product.id}>
                                                    {product.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'quantity']}
                                        rules={[{ required: true, message: 'Miktar girin!' }]}
                                    >
                                        <InputNumber min={1} defaultValue={1} />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Alan Ekle
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Gönder
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default App;
