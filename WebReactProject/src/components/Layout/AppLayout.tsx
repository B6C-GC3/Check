import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Col } from 'antd';
import Footer from '../../components/Footer';
import { appRouter } from '../Router/router.config';
import HeaderAppComponent from '../../scenes/AppAreas/HeaderApp';
import { Helmet } from 'react-helmet';

declare var abp: any;

export interface ILayoutProps {
    history: any;
    location: any;
    match: any;
}

export default function AppLayout(props: ILayoutProps) {
    return (
        <>
            <Helmet>
                <title>Wekee.vn</title>
            </Helmet>
            <Col className="container">
                <HeaderAppComponent />
                <div className='KgMhYbsupu'>
                    <div>
                        <Switch>
                            {appRouter
                                .filter((item: any) => !item.isLayout)
                                .map((item: any, index: number) => (
                                    <Route key={index} path={item.path} component={item.component} exact={item.exact} />
                                ))}
                            <Redirect from="/" to="/" />
                        </Switch>
                    </div>
                </div>
                <Footer />
            </Col>
        </>
    );
}
