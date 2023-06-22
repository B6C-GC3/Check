import React from "react";
import { Card, Select } from "antd";
import { L } from "../../lib/abpUtility";
import './style.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, Brush } from "recharts";
import utils from "../../utils/utils";

const { Option } = Select;
interface IChartComponent<T> {
    data: T[],
    loading: boolean
    title: String,
    keyGen: string[],
    activeDot?: Number | undefined,
    XAxis?: string | undefined,
    YAxis?: string | undefined,
    numberItem?: number | undefined
}

export default function ChartComponent<T>(props: IChartComponent<T>) {
    const _processNameObject = () => {
        return (
            <>{props.keyGen.map((m: any, index: number) =>
                <Line type='linear'
                    dataKey={m}
                    name={m + " of pages"}
                    stroke={utils._randomColor(index)}
                    activeDot={{ r: 3 }}
                    strokeWidth={2}
                    dot={false}
                />)
            }
            </>
        )
    }
    return (
        <>
            <Card
                title={props.title}
                size="small"
                type='inner'
                loading={props.loading}
                style={{ marginBottom: '5px' }}
            >
                <Select placeholder="Chọn chế độ hiển thị">
                    <Option key={1}> 1 Ngày</Option>
                    <Option key={2}> 1 Tuần</Option>
                    <Option key={3}> 1 Tháng</Option>
                    <Option key={4}> 1 Quý</Option>
                </Select>
                <ResponsiveContainer>
                    <LineChart
                        data={props.data}
                        syncId="anyId"
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis width={30} />
                        <Legend verticalAlign="top" />
                        <Brush
                            height={0}
                            startIndex={props.data.length > 15 ? props.data.length - 15 : 0}
                            endIndex={props.data.length - 1} />
                        <Tooltip />
                        {_processNameObject()}
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </>
    );
}

