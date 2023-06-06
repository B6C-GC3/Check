import { CheckOutlined, SettingOutlined, DesktopOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Menu } from 'antd';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';

declare var abp: any;
const SCENES_KEY = "HOME_APP";

export interface ISettingAppProps {
}

export default function SettingAppComponents(props: ISettingAppProps) {
    return (
        <>
            <Dropdown
                trigger={['click']}
                overlay={
                    <Menu className="ccSjlOHyqP">
                        <div className="ygsRYzMMyV">
                            <span>Cài đặt ứng dụng</span>
                            <Dropdown
                                trigger={['click']}
                                overlay={<Menu className="ccSjlOHyqP">
                                    <Menu.Item key="sada" >
                                        <CheckOutlined /> Đánh dấu tất cả đã đọc
                                    </Menu.Item>
                                    <Menu.Item key="sadas" >
                                        <SettingOutlined />  Cài đặt thông báo
                                    </Menu.Item>
                                    <Menu.Item key="dasdsasdasda" >
                                        <DesktopOutlined />  Mở thông báo
                                    </Menu.Item>
                                </Menu>}>
                                <EllipsisOutlined className='YLvdaHYdIV' />
                            </Dropdown>
                        </div>
                        <Menu.Divider />
                        <div className="DXObXwsQyb">
                            <span>Mới nhất</span>
                            <span>Xem tất cả</span>
                        </div>
                        <Menu.Item key="sadfsa" >
                            <a href="/login" className="UWRJovyiDd">
                                <div className="bRDSowVZlW">
                                    <img src={abp.appServiceUrl + "/product/wekee-wekee-146121821_430393218381317_505496019680432805_n-210306-07102021--210518-07102021-S80x80.jpg"} alt="" />
                                </div>
                                <span className="qGjeERhsix">
                                    <span>hello anh và mọi người , chúc anh và mọi người xem live vui vẻ. anh mở hàng cho mọi người trong top 4 nha a</span>
                                    <span>4 giờ</span>
                                </span>
                                <span className="oqNMgqILWc"><EllipsisOutlined className='YLvdaHYdIV' /></span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="sadfsa" >
                            <a href="/login" className="UWRJovyiDd">
                                <div className="bRDSowVZlW">
                                    <img src={abp.appServiceUrl + "/product/wekee-wekee-146121821_430393218381317_505496019680432805_n-210306-07102021--210518-07102021-S80x80.jpg"} alt="" />
                                </div>
                                <span className="qGjeERhsix">
                                    <span>hello anh và mọi người , chúc anh và mọi người xem live vui vẻ. anh mở hàng cho mọi người trong top 4 nha a</span>
                                    <span>4 giờ</span>
                                </span>
                                <span className="oqNMgqILWc"><EllipsisOutlined className='YLvdaHYdIV' /></span>
                            </a>
                        </Menu.Item>
                        <div className="DXObXwsQyb">
                            <span>Trước đó</span>
                            <span></span>
                        </div>
                        <Menu.Item key="sadfsa" >
                            <a href="/login" className="UWRJovyiDd">
                                <div className="bRDSowVZlW">
                                    <img src={abp.appServiceUrl + "/product/wekee-wekee-146121821_430393218381317_505496019680432805_n-210306-07102021--210518-07102021-S80x80.jpg"} alt="" />
                                </div>
                                <span className="qGjeERhsix">
                                    <span>hello anh và mọi người , chúc anh và mọi người xem live vui vẻ. anh mở hàng cho mọi người trong top 4 nha a</span>
                                    <span>4 giờ</span>
                                </span>
                                <span className="oqNMgqILWc"><EllipsisOutlined className='YLvdaHYdIV' /></span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="sadfsa" >
                            <a href="/login" className="UWRJovyiDd">
                                <div className="bRDSowVZlW">
                                    <img src={abp.appServiceUrl + "/product/wekee-wekee-146121821_430393218381317_505496019680432805_n-210306-07102021--210518-07102021-S80x80.jpg"} alt="" />
                                </div>
                                <span className="qGjeERhsix">
                                    <span>hello anh và mọi người , chúc anh và mọi người xem live vui vẻ. anh mở hàng cho mọi người trong top 4 nha a</span>
                                    <span>4 giờ</span>
                                </span>
                                <span className="oqNMgqILWc"><EllipsisOutlined className='YLvdaHYdIV' /></span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="sadfsa" >
                            <a href="/login" className="UWRJovyiDd">
                                <div className="bRDSowVZlW">
                                    <img src={abp.appServiceUrl + "/product/wekee-wekee-146121821_430393218381317_505496019680432805_n-210306-07102021--210518-07102021-S80x80.jpg"} alt="" />
                                </div>
                                <span className="qGjeERhsix">
                                    <span>hello anh và mọi người , chúc anh và mọi người xem live vui vẻ. anh mở hàng cho mọi người trong top 4 nha a</span>
                                    <span>4 giờ</span>
                                </span>
                                <span className="oqNMgqILWc"><EllipsisOutlined className='YLvdaHYdIV' /></span>
                            </a>
                        </Menu.Item>
                        <Menu.Item key="sadfsa" >
                            <a href="/login">Đăng Nhập</a>
                        </Menu.Item>
                    </Menu>
                }>

                <Badge size='small' className="wuurxwiIVq" count={0}>
                    <SettingOutlined className='hdfutmacic' />
                </Badge>
            </Dropdown>
        </>
    )
}
