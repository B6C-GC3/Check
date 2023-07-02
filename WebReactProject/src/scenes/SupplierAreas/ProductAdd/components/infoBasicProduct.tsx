import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, InputRef, Modal, Pagination, Radio, Row, Select, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { L } from "../../../../lib/abpUtility";

import '../style.css';
import NumericInput from '../../../../components/NumericInput';
import services from '../services';
import { notifyError, notifySuccess } from '../../../../components/Common/notification';
import { SelectedModelConvert } from '../../../../services/common/selectedModel';
import { ProductQueryDto, Values } from '../dtos/productAddDto';

const { Option } = Select;
const SCENES_KEY = "PRODUCT_ADD";
const KEY_LOCAL_STORAGE_INFO = 'OQQBr';
let index = 0;
const PAGE_SIZE = 20;

export interface IInfoBasicProduct {
    infoInit: ProductQueryDto;
    categoryProduct: number[];
    onChange: (value: ProductQueryDto) => void;
}

export default function InfoBasicProduct(props: IInfoBasicProduct) {
    const [form] = Form.useForm<ProductQueryDto>();
    const [itemsAlbum, setItemsAlbum] = useState<Values[]>([{ label: 'default', value: 'default' }]);
    const [nameAlbum, setNameAlbum] = useState<Values>();
    const inputAlbumRef = useRef<InputRef>(null);
    const [loading, setloading] = useState<boolean>(false);

    const [optionsTrademark, setOptionsTrademark] = useState<SelectedModelConvert[]>([]);
    const [pageIndexTrademark, setPageIndexTrademark] = useState<number>(1);
    const [totalPageTrademark, setTotalPageTrademark] = useState<number>(0);
    const [valueSearchTrademark, setvalueSearchTrademark] = useState<string>('');
    const [loadingTrademark, setloadingTrademark] = useState<boolean>(false);

    const [optionsUnit, setOptionsUnit] = useState<SelectedModelConvert[]>([]);
    const [pageIndexUnit, setPageIndexUnit] = useState<number>(1);
    const [totalPageUnit, setTotalPageUnit] = useState<number>(0);
    const [valueSearchUnit, setvalueSearchUnit] = useState<string>('');
    const [loadingUnit, setloadingUnit] = useState<boolean>(false);

    useEffect(() => {
        _loadTrademark();
        _loadUnit();
        //form.setFieldsValue(props.infoInit);
    }, []);

    const _loadTrademark = async () => {
        setloadingTrademark(true);
        var result = await services.loadTrademarkByCategory({
            valuesSearch: [JSON.stringify(props.categoryProduct), valueSearchTrademark],
            pageIndex: pageIndexTrademark - 1,
            pageSize: PAGE_SIZE
        });

        if (result.error || !result.result) {
            notifyError(L("ERROR", "COMMON"), L(result.messageError, SCENES_KEY));
            setloading(false);
            setloadingTrademark(false);
            return [];
        }
        else {
            setloading(false);
            var rsl: SelectedModelConvert[] = result.result.items.map(m => {
                return { label: m.value, value: m.id.toString() }
            });

            setOptionsTrademark(rsl);
            setPageIndexTrademark(result.result.pageIndex + 1);
            setTotalPageTrademark(result.result.totalPages);
            setloadingTrademark(false);
            return [];
        }
    };

    const _loadUnit = async () => {
        setloadingUnit(true);
        var result = await services.loadUnitByCategory({
            valuesSearch: [JSON.stringify(props.categoryProduct), valueSearchUnit],
            pageIndex: pageIndexUnit - 1,
            pageSize: PAGE_SIZE
        });

        if (result.error || !result.result) {
            notifyError(L("ERROR", "COMMON"), L(result.messageError, SCENES_KEY));
            setloading(false);
            setloadingUnit(false);
            return [];
        }
        else {
            setloading(false);
            var rsl: SelectedModelConvert[] = result.result.items.map(m => {
                return { label: m.value, value: m.id.toString() }
            });

            setOptionsUnit(rsl);
            setPageIndexUnit(result.result.pageIndex + 1);
            setTotalPageUnit(result.result.totalPages);
            setloadingUnit(false);
            return [];
        }
    };

    useEffect(() => {
        _loadTrademark();
    }, [valueSearchTrademark, pageIndexTrademark]);

    useEffect(() => {
        _loadUnit();
    }, [valueSearchUnit, pageIndexUnit]);

    //========== WAIT LOAD DATA
    useEffect(() => {
        if (optionsTrademark.length !== 0 && optionsUnit.length !== 0) {
            form.setFieldsValue(props.infoInit);
            form.setFieldValue('trademark', optionsTrademark.find(f => f.value === props.infoInit.trademark?.toString()));
            form.setFieldValue('unitProduct', optionsUnit.find(f => f.value === props.infoInit.unitProduct?.toString()));
            form.setFieldValue('productAlbum', { value: props.infoInit.productAlbum, label: props.infoInit.productAlbum });
        }
    }, [optionsTrademark, optionsUnit])

    const onNameAlbumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameAlbum({ label: event.target.value, value: event.target.value });
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItemsAlbum([...itemsAlbum, nameAlbum || { label: `New item ${index++}`, value: `New item ${index++}` }]);
        setNameAlbum(undefined);
        setTimeout(() => {
            inputAlbumRef.current?.focus();
        }, 0);
    };

    const onSearchTrademark = (value: string) => {
        setvalueSearchTrademark(value);
    };

    const onSearchUnit = (value: string) => {
        setvalueSearchUnit(value);
    };

    //============== CREATE ATTRIBUTE
    const [open, setOpen] = useState(false);
    const [typeAttribute, setTypeAttribute] = useState<number>(0);

    const onCreate = (typeAttributeId: number) => {
        setTypeAttribute(typeAttributeId);
        setOpen(true);
    };

    const onSuccessAddAttribute = (typeAdd: number) => {
        setloading(true);
        if (typeAdd === 1) {
            _loadUnit();
        } else if (typeAdd === 3) {
            _loadTrademark();
        }
        setOpen(false);
    }

    //========== CHANGE VALUE FORM

    var delayTimer: NodeJS.Timeout;
    const _onValueChange = (_: any, allFields: ProductQueryDto) => {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function () {
            props.onChange(allFields);
            localStorage.setItem(KEY_LOCAL_STORAGE_INFO, JSON.stringify(allFields));
        }, 1000);
    }

    return (
        <>
            <Form
                form={form}
                name="basic"
                autoComplete="off"
                layout="vertical"
                className='fxeetzbilc'
                onValuesChange={_onValueChange}
            >
                <Row gutter={[5, 5]}>
                    <Col span={8}>
                        <Form.Item
                            label={L("name", SCENES_KEY)}
                            name="name"
                            rules={[{ required: true, message: L("", SCENES_KEY) }]}
                            tooltip={{ title: L("", SCENES_KEY), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("fragile", SCENES_KEY)}
                            name="fragile"
                            rules={[{ required: true, message: L("", SCENES_KEY) }]}
                            tooltip={{ title: L("", SCENES_KEY), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Select
                                options={[{ value: true, label: L("FRAGILE_TRUE", SCENES_KEY) }, { value: false, label: L("FRAGILE_FALSE", SCENES_KEY) }]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("orderMinimumQuantity", SCENES_KEY)}
                            name="orderMinimumQuantity"
                            rules={[{ required: true, message: L("", SCENES_KEY) }]}
                            tooltip={{ title: L("", SCENES_KEY), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <NumericInput
                                max={10}
                                min={0}
                                value={form.getFieldValue('orderMinimumQuantity')}
                                placeholder={''}
                                onChange={(value: string) => {
                                    form.setFieldValue('orderMinimumQuantity', value);
                                }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("orderMaximumQuantity", SCENES_KEY)}
                            name="orderMaximumQuantity"
                            rules={[{ required: true, message: L("", SCENES_KEY) }]}
                            tooltip={{ title: L("", SCENES_KEY), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <NumericInput
                                max={10}
                                min={0}
                                value={form.getFieldValue('orderMaximumQuantity')}
                                placeholder={''}
                                onChange={(value: string) => {
                                    form.setFieldValue('orderMaximumQuantity', value);
                                }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("trademark", SCENES_KEY)}
                            name="trademark"
                            rules={[{ required: true, message: L("", SCENES_KEY) }]}
                            tooltip={
                                { title: L("", SCENES_KEY), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Select
                                showSearch
                                placeholder="Select a person"
                                onSearch={onSearchTrademark}
                                loading={loading || loadingTrademark}
                                style={{ width: "100%" }}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Space style={{ padding: '0 8px 4px' }}>
                                            <Button type="text" icon={<PlusOutlined />} onClick={() => onCreate(3)} />
                                            <div style={{ textAlign: "center", padding: '0 8px 4px' }}>
                                                <Pagination simple defaultCurrent={pageIndexTrademark} total={totalPageTrademark} />
                                            </div>
                                        </Space>
                                    </>
                                )}
                                options={optionsTrademark}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("unitProduct", SCENES_KEY)}
                            name="unitProduct"
                            rules={[{ required: true, message: L("", SCENES_KEY) }]}
                            tooltip={{ title: L("", SCENES_KEY), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Select
                                showSearch
                                placeholder="Select a person"
                                onSearch={onSearchUnit}
                                loading={loading || loadingUnit}
                                style={{ width: "100%" }}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toString().toLowerCase().includes(input.toLowerCase())
                                }
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Space style={{ padding: '0 8px 4px' }}>
                                            <Button type="text" icon={<PlusOutlined />} onClick={() => onCreate(1)} />
                                            <div style={{ textAlign: "center", padding: '0 8px 4px' }}>
                                                <Pagination simple defaultCurrent={pageIndexUnit} total={totalPageUnit} />
                                            </div>
                                        </Space>
                                    </>
                                )}
                                options={optionsUnit}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label={L("productAlbum", SCENES_KEY)}
                            name="productAlbum"
                            rules={[{ required: true, message: L("", SCENES_KEY) }]}
                            tooltip={{ title: L("", SCENES_KEY), icon: <InfoCircleOutlined className='AjSeNamxBs' /> }}
                        >
                            <Select
                                style={{ width: '100%' }}
                                placeholder="custom dropdown render"
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Space style={{ padding: '0 8px 4px' }}>
                                            <Input
                                                placeholder="Please enter item"
                                                ref={inputAlbumRef}
                                                value={nameAlbum?.value}
                                                onChange={onNameAlbumChange}
                                            />
                                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                {L("Add item", SCENES_KEY)}
                                            </Button>
                                        </Space>
                                    </>
                                )}
                                options={itemsAlbum.map((itemAlbum) => (itemAlbum))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            {open ? <AddAttributeSupplierComponent
                typeAttribute={typeAttribute}
                category={props.categoryProduct}
                open={open}
                onCreate={() => onSuccessAddAttribute(typeAttribute)}
                onCancel={() => {
                    setOpen(false);
                }} /> : <></>}
        </>
    )
}

export interface IAddAttributeSupplierProps {
    typeAttribute: number;
    category: number[];
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const KEY_CATEGORY_CATEGORY = "AGbFJ";
const AddAttributeSupplierComponent: React.FC<IAddAttributeSupplierProps> = ({
    typeAttribute,
    category,
    open,
    onCreate,
    onCancel
}) => {
    const [form] = Form.useForm();
    const [loadcreate, setloadcreate] = useState<boolean>(false);
    const [categorySelected, setCategorySelected] = useState<{ id: string, value: number }[] | undefined>([{ id: "", value: 0 }]);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [values, setValues] = useState<string>();
    useEffect(() => {
        try {
            setCategorySelected(JSON.parse(localStorage.getItem(KEY_CATEGORY_CATEGORY) || ''));
        } catch (error) {
            notifyError(L("ERROR", "COMMON"), L("ERROR_LOAD", SCENES_KEY));
        }
    }, []);

    const _onOK = () => {
        setloadcreate(true);
        form
            .validateFields()
            .then(async (values) => {
                form.resetFields();
                var result = await services.createUnitOrTrademarkCategory({
                    values: values.value,
                    categoryId: values.category,
                    typesAttribute: typeAttribute
                });
                if (result.error || !result.result) {
                    notifyError("Lỗi", SCENES_KEY);
                    setloadcreate(false);
                }
                else {
                    setloadcreate(false);
                    onCreate(values);
                    notifySuccess(L("SUCCESS", "COMMOON"), L("SUCCESS", "COMMOON"));
                }
            })
            .catch((info) => {
                setloadcreate(false);
            });
    }

    return (
        <Modal
            open={open}
            title={L("AddTypeAttribute", SCENES_KEY).concat(" " + (typeAttribute === 0 ? "Trademark" : "Unit"))}
            okText={L("OK", "COMMON")}
            cancelText={L("CANCEL", "COMMON")}
            maskClosable={false}
            confirmLoading={loadcreate}
            onCancel={onCancel}
            onOk={_onOK}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                disabled={loadcreate}
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                    label={L("Category", SCENES_KEY)}
                    name="category"
                    rules={[
                        { required: true, message: 'Please input the title of collection!' }
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a person"
                        style={{ width: "100%" }}
                        fieldNames={{ label: "value", value: "id" }}
                        options={categorySelected}
                    />
                </Form.Item>
                <Form.Item
                    label={L("Value", SCENES_KEY)}
                    name="value"
                    rules={[
                        { required: true, message: 'Please input the title of collection!' }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>);
}