import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined, SafetyCertificateOutlined, SyncOutlined } from '@ant-design/icons';
import { Form, Radio, Button, Input, DatePicker, Select } from 'antd';
import * as React from 'react';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import './index.css';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { LanguageSystemDto } from './dtos/languageSystem';
import services from './services';
import { notifyError, notifySuccess } from '../../../components/Common/notification';
import { UserInfoDto, UserInfoResDto, UserInfoSexeUL } from './dtos/userInfoDto';
import moment from 'moment';

declare var abp: any;
const SCREEN_KEY = "USER_DASHBOARD";
const { Option } = Select;

export interface IDashboardProps {
    location: any;
}

export default function Dashboard(props: IDashboardProps) {
    const [form] = Form.useForm();
    const [language, setLanguage] = useState<LanguageSystemDto[]>([]);
    const [userInfo, setUserInfo] = useState<UserInfoResDto>();

    const _getLaguageSystem = async () => {
        var rsl = await services.GetAllLaguage();

        if (rsl.error === false || rsl.result !== undefined) {
            setLanguage(rsl.result);
        }
        else {
            notifyError("ERROR", "ERROR");
        }
    }

    const _getUserInfo = async () => {
        var rsl = await services.GetUserInfo();

        if (rsl.error === false || rsl.result !== undefined) {
            setUserInfo(rsl.result);
        }
        else {
            notifyError("ERROR", "ERROR");
        }
    }

    useEffect(() => {
        _getLaguageSystem();
        _getUserInfo();
    }, []);

    useEffect(() => {
        form.setFieldsValue({
            name: userInfo?.name,
            sexe: userInfo?.sexe,
            email: userInfo?.email,
            numberPhone: userInfo?.numberPhone,
            nationality: userInfo?.nationality,
            dateOfBirth: dayjs(userInfo?.dateOfBirth, "YYYY-MM-DD"),
            avatarUrl: userInfo?.avatarUrl,
            nickname: userInfo?.nickname
        });
    }, [userInfo])

    const onFinish = async (values: UserInfoDto) => {
        if (values !== undefined) {
            // MM/DD/YYYY
            values.dateOfBirth = dayjs(values.dateOfBirth, "YYYY-MM-DD").add(1, 'day').toString();
            let rsl = await services.SetInfoUser(values);

            if (rsl.error === false || rsl.result !== undefined) {
                rsl.result === 1 ? notifySuccess("SUCCESS", "SUCCESS") : notifyError("ERROR", "ERROR");
            }
            else {
                notifyError("ERROR", "ERROR");
            }
        }
    };

    const _clearInput = (name: string, value: any) => {
        form.setFieldValue(name, value);
    }

    return (
        <>
            <div className='cGnfxJYuGz'>
                <div className='uPhLZgNOZx'>
                    <div>Thông tin cá nhân</div>
                    <Form
                        form={form}
                        layout="horizontal"
                        onFinish={onFinish}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                    >
                        <div className='rEIjpdVTlm'>
                            <Form.Item name="avatarUrl" className='rAuZyoYbkt'>
                                <div className='tMZzhkTole'>
                                    {/* <UserOutlined /> */}
                                    <img src={abp.appServiceUrl + userInfo?.avatarUrl} alt="" />
                                    <SyncOutlined className="uLtwSxSGIF" />
                                </div>
                            </Form.Item>
                            <div className='cYOthkTGIq'>
                                <Form.Item label="Họ và tên" name="name">
                                    <Input
                                        defaultValue={userInfo?.name}
                                        placeholder="Enter your username"
                                        suffix={<span className='oUzDnHSCOk' onClick={() => _clearInput("name", "")}>x</span>}
                                    />
                                </Form.Item>
                                <Form.Item label="Nickname" name="nickname">
                                    <Input
                                        placeholder="Enter your Nickname"
                                        suffix={<span className='oUzDnHSCOk' onClick={() => _clearInput("nickname", "")}>x</span>}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Form.Item label="Ngày sinh" name="dateOfBirth">
                                    <DatePicker
                                        locale={locale}
                                        style={{ width: "100%" }}
                                        format={"DD/MM/YYYY"}
                                        onChange={(val: any) => {
                                            form.setFieldValue("dateOfBirth", val)
                                        }} />
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <Form.Item label="Giới tính" name="sexe">
                                <Radio.Group>
                                    <Radio value={UserInfoSexeUL.Male}> Nam </Radio>
                                    <Radio value={UserInfoSexeUL.Female}> Nữ </Radio>
                                    <Radio value={UserInfoSexeUL.Other}> Khác </Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item label="Quốc tịch" name="nationality">
                                <Select
                                    style={{ width: "100%" }}
                                    showSearch
                                    onChange={(e) => console.log('e', e)}
                                    filterOption={(inputValue: any, option: any) =>
                                        option.children.join('').toLowerCase().includes(inputValue.toLowerCase())
                                    }
                                >
                                    {language.map(m => <Option key={m.id} value={m.id}><i className={m.icon} /> {m.displayName} </Option>)}
                                </Select>
                            </Form.Item>
                        </div>
                        <Form.Item className='oQAuNUaODe'>
                            <Button type="primary" htmlType="submit">Cập nhật</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='kRwSTgmncZ uPhLZgNOZx' >
                    <div>Số điện thoại và Email</div>
                    <div className='idyNyDxJQj'>
                        <div>
                            <PhoneOutlined />
                            <div>
                                <span>Số điện thoại</span>
                                <span>{userInfo?.numberPhone === null ? "Thêm số điện thoại" : userInfo?.numberPhone}</span>
                            </div>
                        </div>
                        <Button>Cập nhật</Button>
                    </div>
                    <div className='idyNyDxJQj'>
                        <div>
                            <MailOutlined />
                            <div>
                                <span>Địa chỉ email</span>
                                <span>{userInfo?.email === null ? "Thêm địa chỉ Email" : userInfo?.email}</span>
                            </div>
                        </div>
                        <Button>Cập nhật</Button>
                    </div>
                    <div className='letgckBtZQ'>Mật khẩu</div>
                    <div className='idyNyDxJQj'>
                        <div>
                            <LockOutlined />
                            <div>
                                <span>Thiết lập mật khẩu</span>
                                <span>Thay đổi khoảng 3 tháng trước</span>
                            </div>
                        </div>
                        <Button>Cập nhật</Button>
                    </div>
                    <div className='idyNyDxJQj'>
                        <div>
                            <SafetyCertificateOutlined />
                            <div>
                                <span>Thiết lập mã PIN</span>
                                <span>Thay đổi khoảng 3 tháng trước</span>
                            </div>
                        </div>
                        <Button>Cập nhật</Button>
                    </div>
                    <div className='letgckBtZQ'>Liên kết tài khoản</div>
                </div>
            </div>
        </>
    )
};