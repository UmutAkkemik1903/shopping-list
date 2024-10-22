import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, notification, Input,message } from 'antd';
import { createList, fetchTableData } from '../../redux/actions/listActions';

const App = ({ open, setOpen }) => {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.lists);
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            await dispatch(createList(values));
            message.success('Liste başarıyla eklendi!');
            dispatch(fetchTableData());
            setOpen(false);
            form.resetFields();
        } catch (error) {
            message.error('Liste eklenirken bir hata oluştu!');
        }
    };

    const handleClose = () => {
        setOpen(false);
        form.resetFields();
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
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Lütfen bir liste adını doldurun!' }]}
                >
                    <Input />
                </Form.Item>
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
