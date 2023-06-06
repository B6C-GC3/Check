import * as React from 'react';
import { Button, Card, Checkbox, Col, Input, Select } from 'antd';
import { L } from "../../../../lib/abpUtility";
import Form, { FormInstance } from 'antd/lib/form';
import '../style.css';
import { useState } from 'react';
import { ToClientExceptionNotifyError, ToClientExceptionNotifyErrorCommon } from '../../../../services/dto/clientExceptionDto';
import services from '../services';
import { notifySuccess } from '../../../../components/Common/notification';

const { Option } = Select;

const SCENES_KEY = 'USER_LOGIN';
declare var abp: any;

export interface ISignupProps {
    location: any;
}

export default function Signup(props: ISignupProps) {

    const [loadding, setloadding] = useState<boolean>(false);

    const onFinish = async (values: any) => {
        setloadding(true);
        var result = await services.registerAccount({
            emailAddress: values.username,
            password: values.password
        });

        if (result && result.error) {
            ToClientExceptionNotifyError(result.messageError, SCENES_KEY);
        }
        else {
            notifySuccess(L("SUCCESS", "COMMON"), L("SUCCESS_SIGNUP", SCENES_KEY));
        }
        setloadding(false);

        setTimeout(function () {
            window.location.href = "/user/login";
        }, 5000);
    };

    const onFinishFailed = (errorInfo: any) => {
        ToClientExceptionNotifyErrorCommon("");
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
                    <object data="../logo192.png" type="image/png">
                        <img src="../logo192.png" alt="" />
                    </object>
                </div>
                <div className='nRqxyzTkGx'>
                    <span className="ant-form-text">{L("SIGNUP_TITLE", SCENES_KEY)}</span>
                </div>
                <Form.Item
                    label={L("Email", SCENES_KEY)}
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: L("REQUAIRED_EMAIL", SCENES_KEY)
                        },
                        {
                            pattern: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                            message: <>{L("EMAIL_VALIDATE", SCENES_KEY)}</>
                        }
                    ]}
                >
                    <Input className='pymbnJsxsL' placeholder={L("Email_INPUT", SCENES_KEY)} />
                </Form.Item>
                <Form.Item
                    label={L("Password", SCENES_KEY)}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: L("REQUAIRED_PASSWORD", SCENES_KEY)
                        },
                        {
                            pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                            message: <>{L("PASSWORD_VALIDATE", SCENES_KEY)}</>
                        }
                    ]}
                >
                    <Input.Password className='pymbnJsxsL' placeholder={L("Password_INPUT", SCENES_KEY)} />
                </Form.Item>

                <Form.Item
                    label={L("Password_Confirm", SCENES_KEY)}
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: L("Password_Confirm", SCENES_KEY)
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(L("TWO_PASSWORD_DOESNT_MATCH", SCENES_KEY)));
                            },
                        })]}
                >
                    <Input.Password className='pymbnJsxsL' placeholder={L("Password_INPUT", SCENES_KEY)} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 20 }}>
                    <Checkbox> {L("REMEMBER_PASSWORD", SCENES_KEY)}</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                    <Button className='pymbnJsxsL' type="primary" loading={loadding} block htmlType="submit">
                        {L("SIGNUP_BUTTON", SCENES_KEY)}
                    </Button>
                </Form.Item>
                <div className='PAutlFXLff'>
                    <div><a href="/user/login">{L("SIGNIN_TAG_A", SCENES_KEY)}</a></div>
                    <div><a href="">{L("Đổi mật khẩu!", SCENES_KEY)}</a></div>
                </div>
            </Form>
        </Col>
    )
};