import * as React from 'react';
import { Button, Card, Checkbox, Col, Input, Modal, Select, Tooltip } from 'antd';
import { L } from "../../../../lib/abpUtility";
import Form, { FormInstance } from 'antd/lib/form';
import '../style.css'
import { useState } from 'react';
import { ExclamationCircleOutlined, PoweroffOutlined, RedoOutlined } from '@ant-design/icons';

const { Option } = Select;
//const key = 'login';

export interface IForgotPasswordProps {
    location: any;
}

export default function ForgotPassword(props: IForgotPasswordProps) {

    const [loadding, setloadding] = useState<boolean>(false);

    const onFinish = (values: any) => {
        setloadding(true);
        setTimeout(function () { //Start the timer
            setloadding(false);
            confirm();
        }, 5000);
    };

    const onFinishFailed = (errorInfo: any) => {
    };
    const confirm = () => {
        Modal.confirm({
            title: <>{L("Thông Báo!", "COMMON")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <>{L("Xác nhận thông tin bằng Email đã đăng ký", "COMMON")}</>,
            okText: <>{L("OK", "COMMON")}</>,
            cancelText: <>{L("CANCEL", "COMMON")}</>,
        });
    };

    return (
        <Col className='QGschfHCeo'>
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='fxgoyaPanE'
            >
                <div className='URQKddgnba'>
                    <img src="" alt="" />
                </div>
                <div className='nRqxyzTkGx'>
                    <span className="ant-form-text">{L("Quên mật khẩu", "COMMON")}</span>
                </div>
                <Form.Item
                    label={L("Phân hệ", "COMMON")}
                    name="tenant"
                    style={{ cursor: 'pointer' }}
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA!.children as unknown as string)
                                .toLowerCase()
                                .localeCompare((optionB!.children as unknown as string).toLowerCase())
                        }
                    >
                        <Option value="1">Not Identified</Option>
                        <Option value="2">Closed</Option>
                        <Option value="3">Communicated</Option>
                        <Option value="4">Identified</Option>
                        <Option value="5">Resolved</Option>
                        <Option value="6">Cancelled</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label={L("Tài khoản", "COMMON")}
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                    <Button type="primary" loading={loadding} block htmlType="submit">
                        {L("Đăng Nhập", "COMMON")}
                    </Button>
                </Form.Item>
                <div className='PAutlFXLff'>
                    <div><a href="">{L("Đăng ký ngay!", "COMMON")}</a></div>
                    <div><a href="">{L("Đổi mật khẩu!", "COMMON")}</a></div>
                </div>
            </Form>
        </Col>
    )
};