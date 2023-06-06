import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Col } from "antd";
import { adminRouters, supplierRouters } from "../Router/router.config";
import Layout, { Content } from "antd/lib/layout/layout";
import MenuSlider from "../../scenes/SupplierAreas/MenuSlider";
import HeaderSupplier from "../HeaderComponent/HeaderSupplier";

class SupplierLayout extends React.Component<any> {
  render() {
    return (
      <Col className="container">
        <Layout>
          <MenuSlider location={undefined} />
          <Layout className="site-layout">
            <Content
              className="site-layout-background"
            >
              <HeaderSupplier />
              <div style={{ margin: '5px' }}><Switch>
                {supplierRouters
                  .filter((item: any) => !item.isLayout)
                  .map((item: any, index: number) => (
                    <Route
                      key={index}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                    />
                  ))}
                <Redirect from="/supplier" to="/supplier" />
              </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Col>
    );
  }
}
export default SupplierLayout;
