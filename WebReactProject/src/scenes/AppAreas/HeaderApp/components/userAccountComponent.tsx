import { CheckOutlined, SettingOutlined, DesktopOutlined, EllipsisOutlined, UserOutlined, IdcardFilled } from '@ant-design/icons';
import { Badge, Divider, Dropdown, Menu, Skeleton } from 'antd';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';

declare var abp: any;
const SCENES_KEY = "HOME_APP";

export interface IUserAccountComponentProps {
}

export default function UserAccountComponent(props: IUserAccountComponentProps) {
    return (
        <>
            <Dropdown
                trigger={['click']}
                overlay={
                    <Menu className="ccSjlOHyqP">
                        <Skeleton loading={false} paragraph={{ rows: 4 }} className='WDxBhLbkIQ'>
                            <div className='WDxBhLbkIQ'>
                                <div>
                                    <object data="/default-image.jpg" type="image/webp">
                                        <img src="./avatar-user-default.webp" alt="" />
                                    </object>
                                    <span><a href="/user">Trần Hải Nam</a></span>
                                </div>
                                <Divider />
                                <div>
                                    <span>Admin : <a href="/admin">Trần Hải Nam</a></span>
                                    <span>Nhà cung cấp : <a href="/supplier">Trần Hải Nam</a></span>
                                    <span>Giỏ hàng : <a href="/user">Trần Hải Nam</a></span>
                                </div>
                            </div>
                        </Skeleton>
                        <Menu.Divider />
                        <Menu.Item key="sadfsa" >
                            <a href="/login" className="UWRJovyiDd">
                                <div className="gakytfzMKN">
                                    <IdcardFilled />
                                </div>
                                <span className="oGIMckcgVW">
                                    Cài đặt và quyền riêng tư
                                </span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="sadfsa" >
                            <a href="/login" className="UWRJovyiDd">
                                <div className="gakytfzMKN">
                                    <IdcardFilled />
                                </div>
                                <span className="oGIMckcgVW">
                                    Cài đặt và quyền riêng tư
                                </span>
                            </a>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="sadfsa" >
                            <a href="/user/login">Đăng Nhập</a>
                            <a href="/user/login">Đăng Xuất</a>
                        </Menu.Item>
                    </Menu>
                }>

                {true
                    ? <Badge size='small' className="wuurxwiIVq" count={0}>
                        <UserOutlined className='hdfutmacic AgTldeKgHQ' />
                    </Badge>
                    : <>
                        <img src="" alt="" />
                    </>}
            </Dropdown>
        </>
    )
}
