import { ApiOutlined, AppstoreOutlined, BarChartOutlined, CheckOutlined, CloseOutlined, FireOutlined, GiftOutlined, InfoCircleOutlined, MinusOutlined, PlusOutlined, RedoOutlined, ScissorOutlined, SettingOutlined, SortAscendingOutlined } from '@ant-design/icons'
import { Form, Row, Col, Input, Checkbox, Divider, DatePicker, Select, Space, Button, Tabs, Modal, Switch, Tooltip } from 'antd'
import React, { useState } from 'react';
import { L } from "../../../../lib/abpUtility";
import type { TabsProps } from 'antd';
import '../style.css';
import CardProductComponent from '../../../../components/CardProductComponent';

const SCENES_KEY = "PRODUCT_ADD";
const { RangePicker } = DatePicker;
const { Option } = Select;

type PromotionsProps = {

}

export default function PromotionsComponents({ }: PromotionsProps) {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [loadding, setLoadding] = useState<boolean>(false);

    const onChange = (checked: boolean) => {
        setLoadding(checked);
    };

    return (
        <>
            <div className='TFHYlZZpkr'>
                <Checkbox defaultChecked={false}>{L('Sử dụng % giảm giá', SCENES_KEY)}</Checkbox>
                <Checkbox defaultChecked={false}>{L('Sử dụng mã giảm giá', SCENES_KEY)}</Checkbox>
                <Checkbox defaultChecked={false}>{L('Sử dụng sản phẩm đi kèm', SCENES_KEY)}</Checkbox>
                <Checkbox defaultChecked={false}>{L('Freeship', SCENES_KEY)}</Checkbox>
                <Checkbox defaultChecked={false}>{L('Khác', SCENES_KEY)}</Checkbox>
            </div>
            <Divider />
            <div className='TFHYlZZpkr'>
                <Tooltip title='dasdasdas'>
                    <Button icon={<GiftOutlined />} onClick={() => setOpenModal(true)}></Button>
                </Tooltip>
                <Tooltip title={L('', SCENES_KEY)}>
                    <Button icon={<SettingOutlined />} onClick={() => setOpenModal(true)}></Button>
                </Tooltip>
                <Tooltip title={L('', SCENES_KEY)}>
                    <Button icon={<ApiOutlined />} onClick={() => setOpenModal(true)}></Button>
                </Tooltip>
                <Tooltip title={L('', SCENES_KEY)}>
                    <Button icon={<CheckOutlined />} onClick={() => setOpenModal(true)}></Button>
                </Tooltip>
                <Tooltip title={L('', SCENES_KEY)}>
                    <Button icon={<CloseOutlined />} onClick={() => setOpenModal(true)}></Button>
                </Tooltip>
                <Tooltip title={L('', SCENES_KEY)}>
                    <Button icon={<ScissorOutlined />} onClick={() => setOpenModal(true)}></Button>
                </Tooltip>
                <Tooltip title={L('', SCENES_KEY)}>
                    <Button icon={<RedoOutlined />} onClick={() => setOpenModal(true)}></Button>
                </Tooltip>
                <Tooltip title={L('', SCENES_KEY)}>
                    <Button icon={<SortAscendingOutlined />} onClick={() => setOpenModal(true)}></Button>
                </Tooltip>
                <Tooltip title={L('', SCENES_KEY)}>
                    <Button icon={<BarChartOutlined />} onClick={() => setOpenModal(true)}></Button>
                </Tooltip>
                <Tooltip title={L('', SCENES_KEY)}>
                    <Button icon={<FireOutlined />} onClick={() => setOpenModal(true)}></Button>
                </Tooltip>
            </div>
            <Divider />
            <Switch defaultChecked onChange={onChange} />
            <div className='eEHkFSvSqm'>
                <CardProductComponent loadding={loadding} />
                <CardProductComponent loadding={loadding} />
                <CardProductComponent loadding={loadding} />
                <CardProductComponent loadding={loadding} />
                <CardProductComponent loadding={loadding} />
                <CardProductComponent loadding={loadding} />
                <CardProductComponent loadding={loadding} />
                <CardProductComponent loadding={loadding} />
            </div>
            <ModalPromotionsComponents
                icon={<GiftOutlined />}
                open={openModal}
                onCancel={() => setOpenModal(false)}
                onOk={function (): void {
                    throw new Error('Function not implemented.');
                }} />
        </>
    )
}

type ModalPromotionsProps = {
    open: boolean;
    icon: React.ReactNode;
    onCancel: () => void;
    onOk: () => void;
}

export function ModalPromotionsComponents({
    open = true,
    icon,
    onOk,
    onCancel
}: ModalPromotionsProps) {
    const [form] = Form.useForm();
    const [formOneSelected, setFormOneSelected] = useState<boolean>(false);

    const handleChange = (value: string[]) => {
    };
    const _onOK = () => {

    }

    const itemsTabOne: TabsProps['items'] = [
        {
            key: '1',
            label: `Cài đặt chung`,
            children: <>
                <Row gutter={[5, 5]} style={{ marginBottom: '10px' }}>
                    <Col span={1}>
                        <Button icon={<PlusOutlined />}></Button>
                    </Col>
                    <Col span={8}>
                        Thời gian thi hành
                    </Col>
                    <Col span={15}>
                        Lựa chọn sản phẩm gán
                    </Col>
                </Row>
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Row gutter={[5, 5]}>
                        <Col span={1}>
                            <Form.Item
                                name="url"
                            >
                                <Button icon={<MinusOutlined />}></Button>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="url"
                            >
                                <RangePicker showTime />
                            </Form.Item>
                        </Col>
                        <Col span={15}>
                            <Form.Item
                                name="url2"
                            >
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="select one country"
                                    onChange={handleChange}
                                    defaultValue={['china', 'china2']}
                                    optionLabelProp="label"
                                    popupClassName='BowuLnSaks'

                                >
                                    <Option value="china" label="China">
                                        <Space className='fqfiayuvRK'>
                                            <span role="img" aria-label="China">
                                                Apple iPhone 14 Pro Apple iPhone 14 Pro Apple iPhone 14 Pro Apple iPhone 14 Pro
                                            </span>
                                            <img src="https://salt.tikicdn.com/cache/750x750/ts/product/0f/08/21/8995e74fd95c47c4ab9ef244a5559176.png.webp" alt="#" />
                                            <span>10,000,000,000đ</span>
                                        </Space>
                                    </Option>
                                    <Option value="china2" label="China2">
                                        <Space className='fqfiayuvRK'>
                                            <span role="img" aria-label="China2">
                                                Apple iPhone 14 Pro Apple iPhone 14 Pro Apple iPhone 14 Pro Apple iPhone 14 Pro
                                            </span>
                                            <img src="https://salt.tikicdn.com/cache/750x750/ts/product/0f/08/21/8995e74fd95c47c4ab9ef244a5559176.png.webp" alt="#" />
                                            <span>10,000,000,000đ</span>
                                        </Space>
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </>,
        },
        {
            key: '2',
            label: `Cài đặt riêng`,
            children: `Content of Tab Pane 2`,
        },
    ];

    return (
        <Modal
            open={open}
            title={<span className='LOBMdQYGDq'><span className='TgDKcrbwYh'>{icon}</span>{L('SELECT_OPTION_PROMOTIONS', SCENES_KEY)}</span>}
            okText={L("OK", "COMMON")}
            className='lgvNbwrkVm qtIwCqavrN'
            cancelText={L("CANCEL", "COMMON")}
            maskClosable={false}
            closable={false}
            onOk={() => _onOK()}
            onCancel={() => onCancel()}
        >
            <Tabs className='kmUFIlpTwE' defaultActiveKey="1" items={itemsTabOne} />
        </Modal>
    );
}