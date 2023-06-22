import React from "react";
import { Card, Select } from "antd";
import { L } from "../../../../lib/abpUtility";
import '../index.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, Brush } from "recharts";
import utils from "../../../../utils/utils";

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
    style?: any;
}

export default function RevenueChartComponent<T>(props: IChartComponent<T>) {
    const _processNameObject = () => {
        return (
            <>{props.keyGen.map((m: any, index: number) =>
                <Line type='linear'
                    dataKey={m}
                    name={m + " of pages"}
                    strokeDasharray={index !== 1 ? "1 3 2" : ""}
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
                className="cfEdpDCjaO"
                loading={props.loading}
                style={props.style}
            >
                {/* <Select placeholder="Chọn chế độ hiển thị">
                    <Option key={1}> 1 Ngày</Option>
                    <Option key={2}> 1 Tuần</Option>
                    <Option key={3}> 1 Tháng</Option>
                    <Option key={4}> 1 Quý</Option>
                </Select> */}
                <ResponsiveContainer>
                    <LineChart
                        data={props.data}
                        syncId="anyId"
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis width={30} tickCount={10} />
                        <Tooltip />
                        {_processNameObject()}
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </>
    );
}
