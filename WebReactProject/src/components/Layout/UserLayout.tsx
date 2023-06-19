import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Col, Layout } from 'antd';
import Footer from '../../components/Footer';
import { userRouter } from '../Router/router.config';
import HeaderComponent from '../HeaderComponent/HeaderUser';
import { PayCircleFilled } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import MenuSlider from '../../scenes/UserAreas/MenuSlider';
import HeaderSupplier from '../HeaderComponent/HeaderSupplier';

export interface ILayoutProps {
  history: any;
  location: any;
  match: any;
}

export default function UserLayout(props: ILayoutProps) {

  return (
    <Col className="container">
      <HeaderSupplier />
      <Layout>
        <MenuSlider location={undefined} />
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
          >
            <div style={{ margin: "10px 0" }}>
              <Switch>
                {userRouter
                  .filter((item: any) => !item.isLayout)
                  .map((item: any, index: number) => (
                    <Route
                      key={index}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                    />
                  ))}
                <Redirect from="/user" to="/user" />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Col>
  );
}

