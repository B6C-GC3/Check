import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Col } from 'antd';
import Footer from '../../components/Footer';
import { userRouter } from '../Router/router.config';
import HeaderComponent from '../HeaderComponent/HeaderUser';
import { PayCircleFilled } from '@ant-design/icons';

export interface ILayoutProps {
  history: any;
  location: any;
  match: any;
}

export default function UserLayout(props: ILayoutProps) {

  return (
    <Col>
      <div>
        <Switch>
          {userRouter
            .filter((item: any) => !item.isLayout)
            .map((item: any, index: number) => (
              <Route key={index} path={item.path} component={item.component} exact={item.exact} />
            ))}
          <Redirect from="/" to="/" />
        </Switch>
      </div>
      <Footer />
    </Col>
  );
}

