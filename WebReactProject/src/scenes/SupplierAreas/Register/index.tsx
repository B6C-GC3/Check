import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import AddComponents from './components/addComponents';
import Add from './components/addComponents';


import './index.css';

const { Option } = Select;

declare var abp: any;
const SCREEN_KEY = "SUPPLIER_REGISTER";

export interface IRegisterComponents {

}

export default function Register(props: IRegisterComponents) {
    const [onActive, setonActive] = useState<boolean>(true);
    return (
        <>
            <div className='mPrgyjrQhE'>
                <Button type='primary' onClick={() => setonActive(true)}>Register Now</Button>
            </div>

            <AddComponents onActive={onActive} onClose={() => { setonActive(false) }} />
        </>
    )
}
