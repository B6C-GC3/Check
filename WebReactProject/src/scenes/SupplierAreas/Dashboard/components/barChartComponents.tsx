import { Card } from 'antd';
import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Bar, Tooltip } from 'recharts';

export default function BarChartComponents() {
  return (
    <>
      <Card bordered={false} className='bUjCmiWFAt' style={{ width: "calc(30% - 20px)" }}>
        <ResponsiveContainer>
          <BarChart
            width={500}
            height={300}
            data={datav2}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis width={30} tickCount={10} />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  )
}


const datav2 = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];