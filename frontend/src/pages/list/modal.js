import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, notification, Input } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { createList, fetchTableData } from '../../redux/actions/listActions';

const App = ({ open, setOpen }) => {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.lists);
    const [form] = Form.useForm();

    const openNotification = (message) => {
        api.open({
            message: 'Liste',
            description: message,
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };
    const handleSubmit = async (values) => {
        try {
            await dispatch(createList(values));
            openNotification('Liste başarıyla oluşturuldu.');
            dispatch(fetchTableData());
            setOpen(false);
            form.resetFields();
        } catch (error) {
            openNotification('Liste oluşturulamadı.');
        }
    };

    const handleSubmitArchive = async (values) => {
        try {
            await dispatch(createList(values));
            openNotification('Liste başarıyla oluşturuldu.');
            dispatch(fetchTableData());
            setOpen(false);
            form.resetFields();
        } catch (error) {
            openNotification('Liste oluşturulamadı.');
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
