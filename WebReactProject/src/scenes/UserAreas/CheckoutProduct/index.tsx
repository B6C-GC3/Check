import React from 'react';
import './index.css';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Tabs } from 'antd';

export default function index() {
  return (
    <>
      <Tabs
        className='kSPHAOXmhn'
        defaultActiveKey="1"
        items={[
          {
            label: 'Tất cả đơn hàng',
            key: '1',
            children: 'Tất cả đơn hàng',
          },
          {
            label: 'Chờ thanh toán',
            key: '2',
            children: 'Chờ thanh toán'
          },
          {
            label: 'Đang sử lý',
            key: '3',
            children: 'Đang sử lý',
          },
          {
            label: 'Đang vận chuyển',
            key: '4',
            children: 'Đang vận chuyển',
          },
          {
            label: 'Đã giao',
            key: '5',
            children: 'Đã giao',
          },
          {
            label: 'Đã hủy',
            key: '6',
            children: 'Đã hủy',
          },
        ]}
      />
    </>
  )
}
