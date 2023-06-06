import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Col } from "antd";
import { adminRouters } from "../Router/router.config";
import Layout, { Content } from "antd/lib/layout/layout";
import HeaderAdmin from "../HeaderComponent/HeaderAdmin";
import MenuSlider from "../../scenes/AdminAreas/MenuSlider";

class AdminLayout extends React.Component<any> {
  render() {
    return (
      <Col className="container">
        <Layout>
          <MenuSlider location={undefined} />
          <Layout className="site-layout">
            <Content
              className="site-layout-background"
            >
              <HeaderAdmin />
              <div style={{ margin: '5px' }}><Switch>
                {adminRouters
                  .filter((item: any) => !item.isLayout)
                  .map((item: any, index: number) => (
                    <Route
                      key={index}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                    />
                  ))}
                <Redirect from="/admin" to="/admin" />
              </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Col>
    );
  }
}
export default AdminLayout;
