import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Typography, notification } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { loginUser } from '../../redux/actions/authActions';
import '../../css/Login.css';

const { Title } = Typography;

const LoginComponent = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Giriş Hatası',
            description: error || 'Lütfen, kullanıcı adı veya şifrenizi kontrol ediniz!',
        });
    };

    const handleSubmit = (values) => {
        dispatch(loginUser(values.email, values.password));
        if (error) openNotificationWithIcon('error');
    };

    return (
        <div className="login-container">
            {contextHolder}
            <Title>Giriş Yap</Title>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Lütfen e-posta adresinizi girin!' }]}
                >
                    <Input
                        prefix={<MailOutlined />}
                        placeholder="Email"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Giriş Yap</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginComponent;
