import * as React from 'react';
import { Menu } from 'antd';
import {useState } from 'react';

const HeaderComponent = () => {

  const [selectedKeys, setSelectedKeys] = useState([""]);

  return (
    <Menu selectedKeys={selectedKeys} mode="horizontal">
      <Menu.Item key="home" >
        <a href="/home">Home</a>
      </Menu.Item>
      <Menu.Item key="login" >
        <a href="/login">Đăng Nhập thường</a>
      </Menu.Item>
      <Menu.Item key="login-tenant" >
        <a href="/login-tenant">Đăng Nhập Phân hệ</a>
      </Menu.Item>
      <Menu.Item key="admin" >
        <a href="/admin">Admin</a>
      </Menu.Item>
      <Menu.Item key="supplier" >
        <a href="/supplier">Supplier</a>
      </Menu.Item>
      <Menu.Item key="tenantApp" >
        <a href="/tenant-app">Server subsystem</a>
      </Menu.Item>
    </Menu>
  );
};
export default HeaderComponent;
