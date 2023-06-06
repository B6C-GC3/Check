import * as React from 'react';
import { Button, Checkbox, Col, Divider, Input, Select } from 'antd';
import { L } from "../../../../lib/abpUtility";
import Form from 'antd/lib/form';
import '../style.css'
import { useEffect, useState } from 'react';
import service from '../services'
import Authv2Component from './authv2Component';
import { TenantCommonDto } from '../dtos/tenantRep';
import { notifyError } from '../../../../components/Common/notification';
import { ToClientExceptionNotifyError } from '../../../../services/dto/clientExceptionDto';
import { useHistory } from "react-router-dom";

const { Option } = Select;
declare var abp: any;
const SCENES_KEY = 'USER_LOGIN';

export interface ISigninProps {
    location: any;
}

export default function Signin(props: ISigninProps) {

    const [loadding, setloadding] = useState<boolean>(false);
    const [valueSearch, setvalueSearch] = useState<string[] | undefined>(undefined);
    const history = useHistory();
    const onFinish = async (values: any) => {
        // fix tạm thời - xóa hết cookie
        abp.auth.clearToken();
        setloadding(true);
        let checktoken = await service.isTenantAvailable({ tenancyName: "Default" });
        if (checktoken && !checktoken.error) {
            abp.multiTenancy.setTenantIdCookie(checktoken.result.tenantId);
            let dataAuth = await service.loggin(
                {
                    usernameOrEmailAddress: values.username,
                    password: values.password
                },
                checktoken.result.tenantId);

            if (dataAuth && !dataAuth.error) {
                var expireDate = new Date(Date.now() + (dataAuth.result.expireInSeconds * 1000));
                abp.auth.setToken(dataAuth.result.accessToken, expireDate);
                if (dataAuth.result.accessToken) {
                    var a = await service.setCookie();
                }
                //window.location.href = "/";
            }
            else {
                notifyError("Cảnh Báo", "Thông tin tài khoản mật khẩu không chính xác!");
            }
        }
        else {
            notifyError("Cảnh Báo", checktoken?.messageError);
        }

        await service.authenticate(undefined);
        setloadding(false);
    };

    var timeout: any = 0;
    const onSearch = (value: string) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            setvalueSearch([value]);
        }, 500);
    };

    const onFinishFailed = (errorInfo: any) => {
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
                    <span className="ant-form-text">{L("Đăng Nhập", "COMMON")}</span>
                </div>
                <Form.Item
                    label={L("Email", "COMMON")}
                    name="username"
                    rules={[{ required: true, message: L("Tài khoản không được để trống!", "COMMON") }]}
                >
                    <Input className='pymbnJsxsL' placeholder={L("Tài khoản", "COMMON")} />
                </Form.Item>
                <Form.Item
                    label={L("Mật khẩu", "COMMON")}
                    name="password"
                    rules={[{ required: true, message: L("Mật khẩu không để trống!", "COMMON") }]}
                >
                    <Input.Password className='pymbnJsxsL' placeholder={L("Mật khẩu", "COMMON")} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 20 }}>
                    <Checkbox>{L("Remember me", "COMMON")}</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                    <Button className='pymbnJsxsL' type="primary" loading={loadding} block htmlType="submit">
                        {L("Đăng Nhập", "COMMON")}
                    </Button>
                </Form.Item>
                <div className='PAutlFXLff'>
                    <div><a href="/user/signup">{L("Đăng ký ngay!", "COMMON")}</a></div>
                    <div><a href="">{L("Đổi mật khẩu!", "COMMON")}</a></div>
                </div>
                <Divider orientation="center">Or</Divider>
                <Authv2Component location={undefined} />
            </Form>
        </Col>
    )
};