//#region  import
import {
  MenuUnfoldOutlined, MenuFoldOutlined, DashboardOutlined, SettingOutlined
} from "@ant-design/icons";
import './index.css'
import { Button, Layout, Menu } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { L } from "../../../lib/abpUtility";
const { Sider } = Layout;

declare var abp: any;
const SCREEN_KEY = "ADMIN_MENU";
//#endregion

export interface IMenuSliderAdminProps {
  // đây
  location: any;
}

export default function MenuSlider(props: IMenuSliderAdminProps) {

  const [collapsed, setcollapsed] = useState(true);

  return (
    <Sider key="sliderKey" trigger={null} collapsible collapsed={collapsed}>
      <div className="shrtdylg">
        <Button key="collapsed"
          onClick={() => setcollapsed(!collapsed)}
          style={{ width: "100%", margin: "0px 0px", borderRadius: "0" }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={["item0_1"]}
          defaultOpenKeys={["item0_1"]}
          mode="inline"
          theme="dark"
          key="Menu"
        >
          <Menu.Item key="item0" defaultChecked={true} icon={React.createElement(DashboardOutlined)}>
            <Link to="/admin">{L("Trình điều khiển", SCREEN_KEY)}</Link>
          </Menu.Item>
          <Menu.SubMenu key="A" title="Admin">
            <Menu.Item key="1"><Link to="/admin/category/cai-dat">Mục lục sản phẩm</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/admin/product-attribute">Tham số sản phẩm</Link></Menu.Item>
            <Menu.Item key="2.1"><Link to="/admin/attribute-value">Giá trị tham số</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/admin/adress">Địa chỉ</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/admin/setting-menu">Hiển thị</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/admin/phan-he">Phân hệ</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/admin/supplier">Nhà cung cấp</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/admin/phan-he">Phân hệ</Link></Menu.Item>
            <Menu.Item key="8"><Link to="/admin/role-permission">Vai trò phân hệ</Link></Menu.Item>
            <Menu.Item key="9"><Link to="/admin/setting-role-basic">Người dùng phân hệ</Link></Menu.Item>
            <Menu.Item key="10"><Link to="/admin/setting-role">Nhóm Phân hệ</Link></Menu.Item>
            <Menu.Item key="11"><Link to="/admin/role-internal">Vai trò Nội bộ</Link></Menu.Item>
            <Menu.Item key="12"><Link to="/admin/setting-role">Người dùng nội bộ</Link></Menu.Item>
            <Menu.Item key="13"><Link to="/admin/setting-role">Nhóm nội bộ</Link></Menu.Item>
            <Menu.Item key="14"><Link to="/admin/supplier-attribute-product">Thuộc tính sản phẩm nhà cung cấp</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="S" title="Supplier">
            <Menu.Item key="1"><Link to="/admin/add-product">Thêm sản phẩm</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/admin/product">Sản phẩm</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="U" title="User"></Menu.SubMenu>
        </Menu>
      </div>
    </Sider>
  );
}
