import * as React from 'react';
import {Col } from 'antd';
import { FormInstance } from 'antd/lib/form';

//const key = 'login';

export interface ILogoutProps extends FormInstance {
    location?: any;
}

export default function Logout(props: ILogoutProps) {
    return (
        <Col>
           Logout
        </Col>
    )
};