import React from 'react';
import { L } from "../../../../lib/abpUtility";
import { Col, Divider, Form, Input, Row } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import EditorDraft from '../../../../components/EditorDraft';

const SCENES_KEY = "PRODUCT_ADD";

export default function SeoAndTagProduct() {
    return (
        <>
            <Divider orientation="left">{L("SEO_PRODUCT", SCENES_KEY)}</Divider>
            <Form
                name="basic"
                autoComplete="off"
                layout="vertical"
            >
                <Row gutter={[5, 5]}>
                    <Col span={8}>
                        <Form.Item
                            label={L("META_TITLE", "COMMON")}
                            name="MetaTitle"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: L('META_TITLE_TUTORIAL', 'COMMON'), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input maxLength={60} minLength={10} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("META_DESCRIPTION", "COMMON")}
                            name="MetaDescription"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: L('META_DESCRIPTION_TUTORIAL', 'COMMON'), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("META_KEYWORDS", "COMMON")}
                            name="MetaKeywords"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: L('META_KEYWORDS_TUTORIAL', 'COMMON'), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("META_ROBOTS", "COMMON")}
                            name="MetaRobots"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: L('META_ROBOTS_TUTORIAL', 'COMMON'), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("META_REVISIT_AFTER", "COMMON")}
                            name="MetaRevisit_After"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: L('META_REVISIT_AFTER_TUTORIAL', 'COMMON'), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("META_CONTENT_LANGUAGE", "COMMON")}
                            name="MetaContent_Language"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: L('META_CONTENT_LANGUAGE_TUTORIAL', 'COMMON'), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("META_CONTENT_TYPE", "COMMON")}
                            name="MetaContent_Type"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: L('META_CONTENT_TYPE_TUTORIAL', 'COMMON'), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("META_PROPERTY", "COMMON")}
                            name="MetaProperty"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            tooltip={{ title: L('META_PROPERTY_TUTORIAL', 'COMMON'), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <EditorDraft
                onOk={(value: string) => { console.log('value :>> ', value); }}
                title={L("META_DESCRIPTION", "COMMON")}
                tooltip={L('META_CONTENT_TYPE_TUTORIAL', 'COMMON')} />
            <Divider orientation="left">{L("SEARCH_PRODUCT", SCENES_KEY)}</Divider>
        </>
    )
}
