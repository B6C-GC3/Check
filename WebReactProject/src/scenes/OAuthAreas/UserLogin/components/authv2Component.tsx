import { FacebookFilled, GooglePlusCircleFilled, PlusSquareFilled, SearchOutlined, TwitterSquareFilled } from '@ant-design/icons';
import { Button, Row } from 'antd';
import * as React from 'react';
import { L } from "../../../../lib/abpUtility";
import '../style.css'

//const key = 'login';

export interface IAuthv2ComponentProps {
    location: any;
}

export default function Authv2Component(props: IAuthv2ComponentProps) {

    return (
        <div className='PKGoeHvDPv'>
            <Button type="primary" icon={<FacebookFilled />}>Facebook</Button>
            <Button type="primary" icon={<TwitterSquareFilled />}>Twitter</Button>
            <Button type="primary" icon={<GooglePlusCircleFilled />}>Google</Button>
            <Button type="primary" icon={<PlusSquareFilled />}>More</Button>
        </div>
    )
};