import * as React from "react";
import './style.css'
import { Col, Row } from "antd";
import AppComponentBase from "../../ComponentGlobal";
//import "antd/dist/antd.css";
import { Helmet } from "react-helmet";
import LocalizationSelect from "../../LocalizationSelect";
import Search from "antd/lib/input/Search";
declare var abp: any;

export interface IHeaderAdminProps {
  collapsed?: any;
  toggle?: any;
}

export interface IHeaderAdminState { }
class HeaderAdmin extends AppComponentBase<
  IHeaderAdminProps,
  IHeaderAdminState
> {
  public render() {
    return (
      <Col className="aGrmknEhRc">
        <Helmet>
          <link rel="stylesheet" href={abp.serviceAlbumCss + "/headerAdmin.css"} />
        </Helmet>
        <Row className="LnnmANqsmU">
          <Col span={4} className="biOoNRMTcn">
            <a href="#">
              <img src="" />
            </a>
          </Col>
          <Col span={20}>
            <Row gutter={[10, 10]} className="UsOtXrnlIG">
              <Col span={20} className="tIergMVJuj">
                <Search placeholder="Nhập dữ liệu tìm kiếm" className="NThvCrGafX" enterButton />
              </Col>
              <Col span={4} className="NoNeJumIOX">
                <div><LocalizationSelect /></div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default HeaderAdmin;
