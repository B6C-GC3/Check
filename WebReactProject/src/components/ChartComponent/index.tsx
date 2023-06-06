import React from "react";
import { Card } from "antd";
import { L } from "../../lib/abpUtility";
import './style.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, Brush } from "recharts";
import utils from "../../utils/utils";

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
        // var a = Object.getOwnPropertyNames(props.data[0]);
        return (
            <>{props.keyGen.map((m: any, index: number) =>
                <Line type="monotone"
                    dataKey={m}
                    stroke={utils._randomColor(index)}
                    activeDot={{ r: 0 }}
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
                type="inner"
                loading={props.loading}
                style={{ marginBottom: '5px' }}

            >
                <ResponsiveContainer>
                    <LineChart
                        style={{ width: '500', height: '300' }}
                        data={props.data}
                        syncId="anyId"
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Brush startIndex={props.numberItem === undefined ? props.data.length - 10 : props.numberItem} />
                        <Tooltip />
                        <Legend />
                        {_processNameObject()}
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </>
    );
}
