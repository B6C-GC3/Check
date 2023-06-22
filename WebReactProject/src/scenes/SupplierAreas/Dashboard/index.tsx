import * as React from 'react';
import { useState } from 'react';
import './index.css'
import RevenueChartComponent from './components/revenueChartComponent';
import { Card, Space, Statistic, Tag, Table } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import BarChartComponents from './components/barChartComponents';
import type { ColumnsType } from 'antd/es/table';

declare var abp: any;
const SCREEN_KEY = "SUPPLIER_DASHBOARD";

export interface IDashboardProps {
    location: any;
}

export default function Dashboard(props: IDashboardProps) {

    return (
        <>
            <div className='vfqVMuXEsF'>

            </div>
            <div className='jlcaNFyBnC'>
                <Card bordered={false} className='efsKzbtqxG'>
                    <Statistic
                        className='jGkyFZODZN'
                        title="Thu nhập hôm nay"
                        value={11.28}
                        precision={2}
                        prefix={"$"}
                        suffix={<ShoppingCartOutlined />}
                    />
                    <div>Tăng trưởng <span>30%</span> so với tháng trước</div>
                </Card>
                <Card bordered={false} className='efsKzbtqxG'>
                    <Statistic
                        className='jGkyFZODZN'
                        title="Thu nhập hôm nay"
                        value={11.28}
                        precision={2}
                        prefix={"$"}
                        suffix={<ShoppingCartOutlined />}
                    />
                    <div>Tăng trưởng <span>30%</span> so với tháng trước</div>
                </Card>
                <Card bordered={false} className='efsKzbtqxG'>
                    <Statistic
                        className='jGkyFZODZN'
                        title="Thu nhập hôm nay"
                        value={11.28}
                        precision={2}
                        prefix={"$"}
                        suffix={<ShoppingCartOutlined />}
                    />
                    <div>Tăng trưởng <span>30%</span> so với tháng trước</div>
                </Card>
                <Card bordered={false} className='efsKzbtqxG'>
                    <Statistic
                        className='jGkyFZODZN'
                        title="Thu nhập hôm nay"
                        value={11.28}
                        precision={2}
                        prefix={"$"}
                        suffix={<ShoppingCartOutlined />}
                    />
                    <div>Tăng trưởng <span>30%</span> so với tháng trước</div>
                </Card>
            </div>
            <div style={{ display: "flex" }}>
                <RevenueChartComponent style={{ width: "70%" }} data={data} loading={false} title={""} keyGen={["uv", "pv", "amt"]} />
                <BarChartComponents />
            </div>
            <div style={{ display: "flex" }}>
                <Card bordered={false} className='bUjCmiWFAt aoIjSipJnN'>
                    <Table
                        columns={columns}
                        dataSource={dataTable}
                        size='small'
                        pagination={{
                            size: "small",
                            position: ['bottomCenter'],
                            pageSize: 5,
                            total: 10,
                            pageSizeOptions: ["1", "10", "20", "50", "100"],
                        }} />
                </Card>
                <Card bordered={false} className='bUjCmiWFAt fByYjHpiGF'>
                    <Table
                        columns={columns}
                        dataSource={dataTable}
                        size='small'
                        pagination={{
                            size: "small",
                            position: ['bottomCenter'],
                            pageSize: 5,
                            total: 10,
                            pageSizeOptions: ["1", "10", "20", "50", "100"],
                        }} />
                </Card>
            </div>
        </>
    )
};

const data = [
    {
        "name": "15",
        "uv": 131,
        "pv": 334,
        "amt": 183
    },
    {
        "name": "16",
        "uv": 1283,
        "pv": 2,
        "amt": 941
    },
    {
        "name": "17",
        "uv": 308,
        "pv": 487,
        "amt": 900
    },
    {
        "name": "18",
        "uv": 1269,
        "pv": 211,
        "amt": 814
    },
    {
        "name": "19",
        "uv": 558,
        "pv": 39,
        "amt": 814
    },
    {
        "name": "20",
        "uv": 721,
        "pv": 152,
        "amt": 1827
    },
    {
        "name": "21",
        "uv": 670,
        "pv": 1753,
        "amt": 652
    },
    {
        "name": "22",
        "uv": 811,
        "pv": 720,
        "amt": 128
    },
    {
        "name": "23",
        "uv": 1544,
        "pv": 182,
        "amt": 623
    },
    {
        "name": "24",
        "uv": 590,
        "pv": 757,
        "amt": 477
    },
    {
        "name": "25",
        "uv": 633,
        "pv": 892,
        "amt": 66
    },
    {
        "name": "26",
        "uv": 663,
        "pv": 647,
        "amt": 1566
    },
    {
        "name": "27",
        "uv": 712,
        "pv": 1487,
        "amt": 148
    }
];

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const dataTable: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];