import * as React from "react";
import './style.css'
import { Breadcrumb, Col, Input, Row } from "antd";
import AppComponentBase from "../../ComponentGlobal";
//import "antd/dist/antd.css";
import { Helmet } from "react-helmet";
import LocalizationSelect from "../../LocalizationSelect";
import Search from "antd/lib/input/Search";
import { BellOutlined, HomeOutlined, SearchOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
declare var abp: any;

export interface IHeaderSupplierProps {
  collapsed?: any;
  toggle?: any;
}

export interface IHeaderSupplierState { }
class HeaderSupplier extends AppComponentBase<
  IHeaderSupplierProps,
  IHeaderSupplierState
> {
  public render() {
    return (
      <div className="LnnmANqsmU">
        <div className="biOoNRMTcn">
          <Breadcrumb
            items={[
              {
                href: '',
                title: <HomeOutlined />,
              },
              {
                href: '',
                title: (
                  <>
                    <UserOutlined />
                    <span>Application List</span>
                  </>
                ),
              },
              {
                title: 'Application',
              },
            ]}
          />
          <div>Dashboard</div>
        </div>
        <div >
          <Row gutter={[10, 10]} className="UsOtXrnlIG">
            <div className="tIergMVJuj">
              <Input placeholder="large size" prefix={<SearchOutlined />} />
            </div>
            <div className="noNeJumIOX">
              <div><LocalizationSelect /></div>
              <div><UserOutlined /></div>
              <div><BellOutlined /></div>
              <div><SettingOutlined /></div>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

export default HeaderSupplier;
