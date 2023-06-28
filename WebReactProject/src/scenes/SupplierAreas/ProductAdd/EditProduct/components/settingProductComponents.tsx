import React, { useState } from 'react';
import '../index.css';
import services from '../services';
import { AndroidOutlined, AppleOutlined, ForwardOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Tabs, TabsProps } from 'antd';
import { L } from "../../../../../lib/abpUtility";
import { } from '../../../../../components/Common/notification';

export default function SettingProductComponents() {

  const [form] = Form.useForm();


  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[20, 10]}>
          <Col span={12}>
            <Form.Item
              label="SKU"
              name="SKU"
              tooltip="đơn vị phân loại hàng hóa tồn kho"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="MPN"
              name="MPN"
              tooltip="Mã số linh kiện của nhà sản xuất"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Gtin"
              name="Gtin"
              tooltip="Mã số sản phẩm thương mại toàn cầu"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="AllowCustomerReviews"
              name="AllowCustomerReviews"
              tooltip="Cho phép người dùng đánh giá"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="LimitedToStores"
              name="LimitedToStores"
              tooltip="Giới hạn sắp hết hàng"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="AutomaticallyAddRequiredProducts"
              name="AutomaticallyAddRequiredProducts"
              tooltip="Tự động ghép thêm các sản phẩm quà tặng cần thiết"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="HasUserAgreement"
              name="HasUserAgreement"
              tooltip="Trả góp"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="IsShipEnabled"
              name="IsShipEnabled"
              tooltip="đăng ký vận chuyển"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="IsFreeShipping"
              name="IsFreeShipping"
              tooltip="Miễn phí vận chuyển"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="ProductAvailabilityRangeId"
              name="ProductAvailabilityRangeId"
              tooltip="Phạm vi khả dụng"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="DisplayStockQuantity"
              name="DisplayStockQuantity"
              tooltip="hiển thị số lượng trong kho"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="MinStockQuantity"
              name="MinStockQuantity"
              tooltip="Số lượng trong kho tối thiểu"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="NotifyAdminForQuantityBelow"
              name="NotifyAdminForQuantityBelow"
              tooltip="Thông báo khi số lượng kho chạm ngưỡng"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="NotReturnable"
              name="NotReturnable"
              tooltip="Hoàn trả đơn hàng"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="ViewReceived"
              name="ViewReceived"
              tooltip="Cho phép xem hàng"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="DisableBuyButton"
              name="DisableBuyButton"
              tooltip="Tắt nút mua"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Button type="primary">Primary Button</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}
