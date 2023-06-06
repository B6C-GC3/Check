import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Row, Col, Card, Statistic, Divider } from 'antd';
import * as React from 'react';
import { useState } from 'react';
import './index.css'

declare var abp: any;
const SCREEN_KEY = "SUPPLIER_DASHBOARD";
export interface IDashboardProps {
    location: any;
}
export default function Dashboard(props: IDashboardProps) {

    return (
        <>
            <Row gutter={[8, 8]}>
                <Col span={6}>
                    <Card>

                    </Card>
                </Col>
                <Col span={6}>
                    <Card>

                    </Card>
                </Col>
                <Col span={6}>
                    <Card>

                    </Card>
                </Col>
                <Col span={6}>
                    <Card>

                    </Card>
                </Col>
                <Col span={8}>
                    <Card>

                    </Card>
                </Col>
                <Col span={8}>
                    <Card>

                    </Card>
                </Col>
                <Col span={8}>
                    <Card>

                    </Card>
                </Col>
            </Row>
            <Divider orientation="left">Cascader example</Divider>
            <Row gutter={[8, 8]}>
                <Col span={6}>
                    <Card>

                    </Card>
                </Col>
                <Col span={18}>
                    <Card>

                    </Card>
                </Col>
            </Row>
            <Divider orientation="left">Cascader example</Divider>
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <Card>

                    </Card>
                </Col>
                <Col span={12}>
                    <Card>

                    </Card>
                </Col>
            </Row>
            <Divider orientation="left">Cascader example</Divider>
            <Row gutter={[8, 8]}>
                <Col span={6}>
                    <Card>

                    </Card>
                </Col>
                <Col span={6}>
                    <Card>

                    </Card>
                </Col>
                <Col span={6}>
                    <Card>

                    </Card>
                </Col>
                <Col span={6}>
                    <Card>

                    </Card>
                </Col>
                <Col span={8}>
                    <Card>

                    </Card>
                </Col>
                <Col span={8}>
                    <Card>

                    </Card>
                </Col>
                <Col span={8}>
                    <Card>

                    </Card>
                </Col>
            </Row>
            <Divider orientation="left">Cascader example</Divider>
            <Row gutter={[8, 8]}>
                <Col span={18}>
                    <Card>

                    </Card>
                </Col>
                <Col span={6}>
                    <Card>

                    </Card>
                </Col>
            </Row>
            <Divider orientation="left">Cascader example</Divider>
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <Card>

                    </Card>
                </Col>
                <Col span={12}>
                    <Card>

                    </Card>
                </Col>
            </Row>
        </>
    )
};