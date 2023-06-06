import React, { useEffect, useState } from 'react';
import { L } from "../../../lib/abpUtility";
import './style.css';
import '../admin_table.css';
import Switch from 'antd/es/switch';
import CardProductComponent from '../../../components/CardProductComponent';
import { Button, Col, Pagination, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const SCENES_KEY = "Product";

export interface IProductProps {
    location: any;
}

export default function Product(props: IProductProps) {

    const [loadding, setLoadding] = useState<boolean>(false);

    const onClickLoading = (checked: boolean) => {
        setLoadding(checked);
    };

    return (
        <>
            <Row className='HFMPGCWHjl'>
                <Col>dasdas</Col>
            </Row>
            <Row>
                <Switch defaultChecked onChange={onClickLoading} />
                <div className='eEHkFSvSqm'>
                    <div className='QUhXwWlRme'>
                        <span>
                            <Button data-animation-offset="1.0" icon={<EditOutlined />} />
                            <Button data-animation-offset="2.0" icon={<EditOutlined />} />
                            <Button data-animation-offset="3.0" icon={<EditOutlined />} />
                            <Button data-animation-offset="4.0" icon={<EditOutlined />} />
                            <Button data-animation-offset="5.0" icon={<EditOutlined />} />
                            <Button data-animation-offset="6.0" icon={<EditOutlined />} />
                            <Button data-animation-offset="7.0" icon={<EditOutlined />} />
                            <Button data-animation-offset="8.0" icon={<EditOutlined />} />
                        </span>
                        <CardProductComponent loadding={loadding} />
                    </div>
                </div>
            </Row>
            <Row className='OLYsXqSNHi'>
                <Pagination
                    total={85}
                    showSizeChanger
                    showQuickJumper
                    showTotal={(total) => `Total ${total} items`}
                />
            </Row>
        </>
    )
}