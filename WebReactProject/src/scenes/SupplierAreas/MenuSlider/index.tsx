//#region  import
import {
  MenuUnfoldOutlined, MenuFoldOutlined, DashboardOutlined, SettingOutlined
} from "@ant-design/icons";
import './index.css'
import { Button, Layout, Menu } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { Sider } = Layout;

declare var abp: any;

//#endregion
export interface IMenuSliderAdminProps {
  // đây
  location: any;
}

const key = "menuslidersupplier"; // đây

export default function MenuSlider(props: IMenuSliderAdminProps) {

  const [collapsed, setcollapsed] = useState(false);

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
          <Menu.Item key="item0_1" defaultChecked={true} icon={React.createElement(DashboardOutlined)}>
            <Link to="/supplier">Trình điều khiển</Link>
          </Menu.Item>

          <Menu.SubMenu key="menu001" icon={<SettingOutlined />} title="Cấu hình">
            <Menu.Item key="menu001_1">
              <Link to="/supplier/category/cai-dat">Category</Link>
            </Menu.Item>
            <Menu.Item key="menu001_2">
              <Link to="/supplier/bank-card">Thẻ ngân hàng</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="menu002" icon={<SettingOutlined />} title="Sản phẩm">
            <Menu.Item key="menu002_1">
              <Link to="/supplier/product">Tổng quan</Link>
            </Menu.Item>
            <Menu.Item key="menu002_2">
              <Link to="/supplier/add-product">Thêm sản phẩm</Link>
            </Menu.Item>
            <Menu.Item key="menu002_3">
              <Link to="/supplier/product-comment">Đánh giá sản phẩm</Link>
            </Menu.Item>
            <Menu.Item key="menu002_4">
              <Link to="/supplier/product-edit">Chỉnh sửa sản phẩm</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="menu003" icon={<SettingOutlined />} title="Đơn hàng">
            <Menu.Item key="menu003_1">
              <Link to="/supplier/order">Tổng quan</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="menu004" icon={<SettingOutlined />} title="Tài chính">
            <Menu.Item key="menu004_1">
              <Link to="/supplier/finance">Tổng quan</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="menu005" icon={<SettingOutlined />} title="Vận chuyển">
            <Menu.Item key="menu005_1">
              <Link to="/supplier/transport">Tổng quan</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="menu006" icon={<SettingOutlined />} title="Chiến dịch">
            <Menu.Item key="menu006_1">
              <Link to="/supplier/marketing">Tổng quan</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="menu007" icon={<SettingOutlined />} title="Diễn đàn">
            <Menu.Item key="menu007_1">
              <Link to="/supplier/marketing">Tổng quan</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="menu008" icon={<SettingOutlined />} title="Quà và giảm giá">
            <Menu.Item key="menu008_1">
              <Link to="/supplier/gift">Tổng quan</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="menu009" icon={<SettingOutlined />} title="Tin Nhắn">
            <Menu.Item key="menu009_1">
              <Link to="/supplier/message">Tổng quan</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="menu010" icon={<SettingOutlined />} title="Thăm dò ý kiến">
            <Menu.Item key="menu010_1">
              <Link to="/supplier/poll">Tổng quan</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="menu011" icon={<SettingOutlined />} title="Kho hàng">
            <Menu.Item key="menu011_1">
              <Link to="/supplier/warehouse">Tổng quan</Link>
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="menu9999" icon={<SettingOutlined />} title="Thông tin">
            <Menu.Item key="menu9999_1" defaultChecked={true}>
              <Link to="/supplier/info">Cơ bản</Link>
            </Menu.Item>
            <Menu.Item key="menu9999_2" defaultChecked={true}>
              <Link to="/supplier/staff">Nhân Viên</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    </Sider>
  );
}
