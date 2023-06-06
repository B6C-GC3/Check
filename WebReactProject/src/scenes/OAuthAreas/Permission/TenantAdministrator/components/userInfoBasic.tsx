import { CopyOutlined, InfoCircleOutlined, ReloadOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, message, Row, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import randomPassword from '../../../../../utils/randomPasword';
import { UserTenantDto } from '../dtos/userTenantDto';

export interface IUserInfoBasic {
    data?: UserTenantDto;
    onOk: (value: UserTenantDto) => void;
}

export default function UserInfoBasic(props: IUserInfoBasic) {
    const [form] = Form.useForm();
    const RANDOM_MAX = 20;
    const RANDOM_MIN = 10;
    const RANDOM_DELAY = 1000;

    const [password, setrandompass] = useState<string>
        (randomPassword(RANDOM_MIN, RANDOM_MAX, true, true, true, true));
    const [onLoading, setonLoading] = useState<boolean>(false);
    const usernameWatch = Form.useWatch(["username"], form);
    const emailWatch = Form.useWatch(["email"], form);
    const phoneWatch = Form.useWatch(["phone"], form);
    const passwordWatch = Form.useWatch(["password"], form);

    useEffect(() => {
        props.onOk({
            userName: usernameWatch,
            email: emailWatch,
            phone: phoneWatch,
            password: passwordWatch
        });
    }, [usernameWatch, emailWatch, phoneWatch, passwordWatch])

    useEffect(() => {
        if (props.data) {
            form.setFieldsValue({
                username: props.data.userName,
                email: props.data.email,
                phone: props.data.phone,
                password: props.data.password
            })
        }
        else {
            form.setFieldsValue({
                username: '',
                email: '',
                phone: '',
                password: randomPassword(RANDOM_MIN, RANDOM_MAX, true, true, true, true).toString()
            })
        }

    }, []);

    useEffect(() => {
        form.setFieldValue('password', password);
    }, [password]);

    return (
        <>
            <Row gutter={[0, 10]} className='sqiTEQQJpx' >
                <Col span={16} offset={4}>
                    <Form
                        form={form}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    pattern: /^(?=[a-zA-Z0-9._]{6,250}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                                    message: 'Tài khoản không đúng định dạng (6-250 ký tự a-z A-Z 0-9 và _ .). Ví dụ : Tai_khoan99'
                                },
                                { required: true, message: 'Please input your username!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    pattern: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                                    message: 'Email không đúng định dạng'
                                },
                                { required: true, message: 'Please input your username!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    pattern: /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}/,
                                    message: 'Số điện thoại không đúng định dạng'
                                },
                                { required: true, message: 'Không để trống số điện thoại!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,120}$/,
                                    message: 'Mật khẩu không đúng định dạng (độ dài : 8-120,1 ký tự thường, hoa, số và #?!@$%^&*_-)'
                                },
                                { required: true, message: 'Mật khẩu không để trống!' }
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <div>
                                        <Tooltip title='Làm mới'>
                                            <Button type='link'
                                                icon={<SyncOutlined spin={onLoading} />}
                                                onClick={() => {
                                                    setonLoading(true);
                                                    setTimeout(() => {
                                                        setrandompass(randomPassword(RANDOM_MIN, RANDOM_MAX, true, true, true, true));
                                                        setonLoading(false);
                                                    }, RANDOM_DELAY);
                                                }} />
                                        </Tooltip>
                                        <Tooltip title='Sao chép'>
                                            <Button type='link'
                                                icon={<CopyOutlined />}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(form.getFieldValue(password));
                                                    message.success('Copy thành công!');
                                                }} />
                                        </Tooltip>
                                    </div>
                                } />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}
