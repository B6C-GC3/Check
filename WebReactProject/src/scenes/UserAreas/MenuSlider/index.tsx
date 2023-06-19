//#region  import
import {
  MenuUnfoldOutlined, MenuFoldOutlined, DashboardOutlined, SettingOutlined, UserOutlined, FundOutlined
} from "@ant-design/icons";
import './index.css'
import { Button, Layout, Menu } from "antd";
import * as React from "react";
const { Sider } = Layout;

declare var abp: any;

//#endregion
export interface IMenuSliderAdminProps {
  // đây
  location: any;
}

const key = "menuslideradmin"; // đây

export default function MenuSlider(props: IMenuSliderAdminProps) {

  return (
    <Sider className="zQxXggEDzi">
      <ul>
        <li><a href="/user"><UserOutlined /> Thông tin tài khoản</a></li>
        <li><a href="/user/cart"><FundOutlined /> Giỏ hàng</a></li>
        <li><a href="/user/checkout"><FundOutlined /> Quản lý đơn hàng</a></li>
      </ul>
    </Sider>
  );
}
