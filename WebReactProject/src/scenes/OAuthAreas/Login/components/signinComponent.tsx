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

const { Option } = Select;
declare var abp: any;
//const key = 'login';

export interface ISigninProps {
    location: any;
}

export default function Signin(props: ISigninProps) {

    const [loadding, setloadding] = useState<boolean>(false);
    const [tenantCommon, settenantCommon] = useState<TenantCommonDto[]>([]);
    const [valueSearch, setvalueSearch] = useState<string[] | undefined>(undefined);

    const _fetchData = async () => {

        let result = await service.loadTenant({
            propertySearch: [],
            valuesSearch: valueSearch,
            propertyOrder: undefined,
            valueOrderBy: true,
            pageIndex: 1,
            pageSize: 10
        });

        if (result && !result.error) {
            settenantCommon(result.result?.items);
        }
        else {
            // let errorMessage = ToClientExceptionNotifyError(result.messageError);
            // notifyError("Đã sảy ra lỗi nội bộ", errorMessage.content);
        }
    }

    useEffect(() => {
        _fetchData();
    }, [])

    useEffect(() => {
        _fetchData();
    }, [valueSearch]);

    const onFinish = async (values: any) => {
        setloadding(true);
        let checktoken = await service.isTenantAvailable({ tenancyName: values.tenant });
        if (checktoken && !checktoken.error) {
            abp.multiTenancy.setTenantIdCookie(checktoken.result.tenantId);
            let dataAuth = await service.loggin(
                {
                    usernameOrEmailAddress: values.username,
                    password: values.password
                },
                checktoken.result.tenantId);

            if (dataAuth && !dataAuth.error) {
                abp.auth.setToken(dataAuth.result.accessToken);
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
                <object className='URQKddgnba' data="../logo192.png" type="image/png">
                    <img src="../logo192.png" alt="" />
                </object>
                <div className='nRqxyzTkGx'>
                    <span className="ant-form-text">{L("Đăng Nhập", "COMMON")}</span>
                </div>
                <Form.Item
                    label={L("Phân hệ", "COMMON")}
                    name="tenant"
                    style={{ cursor: 'pointer' }}
                >
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder={L("Tìm kiếm và lựa chọn phân hệ", "COMMON")}
                        optionFilterProp="children"
                        onSearch={onSearch}
                        //filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA!.children as unknown as string)
                                .toLowerCase()
                                .localeCompare((optionB!.children as unknown as string).toLowerCase())
                        }
                    >
                        {tenantCommon
                            ? tenantCommon.map((m) => (<Option key={m.tenancyName} value={m.tenancyName}>{m.name}</Option>))
                            : <></>
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label={L("Tài khoản", "COMMON")}
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
                    <Button type="primary" loading={loadding} block htmlType="submit">
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