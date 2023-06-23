import { InfoCircleOutlined } from '@ant-design/icons'
import { Col, Form, Input, Row } from 'antd'
import React from 'react'

export default function ImportWarehouse() {
    return (
        <>
            <Form
                name="basic"
                autoComplete="off"
                layout="vertical"
            >
                <Row gutter={[5, 5]}>
                    <Col span={8}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
