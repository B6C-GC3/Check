import { Row, Col, Image, Select, TreeSelect, Table, Divider, Button, Tooltip, Space, Pagination, Tag, Form, Input, InputRef, FormInstance, Modal, Checkbox } from 'antd'
import Title from 'antd/es/typography/Title';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { L } from "../../../../lib/abpUtility";
import '../style.css';
import { EditOutlined, UnlockOutlined, LockOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import services from '../services';
import { notifyError, notifySuccess } from '../../../../components/Common/notification';
import { SelectedModel } from '../../../../services/common/selectedModel';
import { PagedResultDto } from '../../../../services/dto/pagedResultDto';
import { AsyncLocalStorage } from 'async_hooks';
import { DataTypeProductAdd, EditableCellProps, EditableRowProps, ProductQueryDto, Values } from '../dtos/productAddDto';
import NumericInput from '../../../../components/NumericInput';
import { resolve } from 'path';
import LoadingProcess from '../../../../components/LoadingProcess';

const SCENES_KEY = "PRODUCT_ADD";
declare var abp: any;

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export interface IFutureProductComponents {
    infoBasic: ProductQueryDto;
    imageCommon: string[];
    dataSourceInit: DataTypeProductAdd[];
    category: number[];
    onOk: (value: DataTypeProductAdd[]) => void;
}

const KEY_LOCAL_STORAGE_FUTURE = 'koOXr';
export default function FutureProductComponents(props: IFutureProductComponents) {
    const [dataSource, setDataSource] = useState<DataTypeProductAdd[]>(props.dataSourceInit ?? []);
    const [loadingAll, setLoadingAll] = useState<boolean>(false);

    const [attribute, setattribute] = useState<SelectedModel[]>();
    const [attributeValue, setattributeValue] = useState<SelectedModel[]>();
    const [attributeSelectedOne, setattributeSelectedOne] = useState<number | undefined>(undefined);
    const [totalPageOne, settotalPageOne] = useState<number>(0);
    const [pageIndexOne, setpageIndexOne] = useState<number>(0);
    const [attributeValueSelectedOne, setattributeValueSelectedOne] = useState<number[]>([]);

    const [attributeTwo, setattributeTwo] = useState<SelectedModel[]>();
    const [attributeValueTwo, setattributeValueTwo] = useState<SelectedModel[]>();
    const [attributeSelectedTwo, setattributeSelectedTwo] = useState<number | undefined>(undefined);
    const [totalPageTwo, settotalPageTwo] = useState<number>(0);
    const [pageIndexTwo, setpageIndexTwo] = useState<number>(0);
    const [attributeValueSelectedTwo, setattributeValueSelectedTwo] = useState<number[]>([]);

    const [attributeThree, setattributeThree] = useState<SelectedModel[]>();
    const [attributeValueThree, setattributeValueThree] = useState<SelectedModel[]>();
    const [attributeSelectedThree, setattributeSelectedThree] = useState<number | undefined>(undefined);
    const [totalPageThree, settotalPageThree] = useState<number>(0);
    const [pageIndexThree, setpageIndexThree] = useState<number>(0);
    const [attributeValueSelectedThree, setattributeValueSelectedThree] = useState<number[]>([]);

    const [priceCommon, setPriceCommon] = useState<string>('');
    const [quantityCommon, setQuantityCommon] = useState<string>('');

    useEffect(() => {
        if (attributeValue?.length !== 0 && attributeValueTwo?.length !== 0 && attributeValueThree?.length !== 0) {
            setLoadingAll(true);
            const run = async () => {
                await _loadInitAttribute();
                if (props.dataSourceInit !== undefined && props.dataSourceInit.length !== 0) {
                    let _one: number[] = [];
                    let _two: number[] = [];
                    let _three: number[] = [];

                    let _valueOne: number[] = [];
                    let _valueTwo: number[] = [];
                    let _valueThree: number[] = [];

                    props.dataSourceInit.forEach(item => {
                        if (item.idKeyAttributeOne !== undefined) _one.push(item.idKeyAttributeOne);
                        if (item.idKeyAttributeTwo !== undefined) _two.push(item.idKeyAttributeTwo);
                        if (item.idKeyAttributeThree !== undefined) _three.push(item.idKeyAttributeThree);

                        if (item.keyAttributeOne !== undefined) _valueOne.push(item.keyAttributeOne);
                        if (item.keyAttributeTwo !== undefined) _valueTwo.push(item.keyAttributeTwo);
                        if (item.keyAttributeThree !== undefined) _valueThree.push(item.keyAttributeThree);
                    });

                    await Promise.resolve().then(() => {
                        onChangeAttribute(([...new Set(_one)].filter(s => s !== 0))[0], 1);
                        _handleChangeValueAttribute([...new Set(_valueOne)].filter(s => s !== 0), 1);
                    });

                    await Promise.resolve().then(() => {
                        onChangeAttribute(([...new Set(_two)].filter(s => s !== 0))[0], 2);
                        _handleChangeValueAttribute([...new Set(_valueTwo)].filter(s => s !== 0), 2);
                    });

                    await Promise.resolve().then(() => {
                        onChangeAttribute(([...new Set(_three)].filter(s => s !== 0))[0], 3);
                        _handleChangeValueAttribute([...new Set(_valueThree)].filter(s => s !== 0), 3);
                    });

                }
                await Promise.resolve().then(() => {
                    setTimeout(() => {
                        setLoadingAll(false);
                    }, 1000);
                });
            }
            run();
        }
    }, [attributeValue, attributeValueTwo, attributeValueThree])


    const _loadInitAttribute = async () => {
        var result = await services.getAttribute(props.category);
        if (result.error || !result.result) {
            notifyError("Lỗi", SCENES_KEY);
        }
        else {
            setattribute(result.result);
        }
    }

    const onChangeAttribute = async (value: number, attributeNumber: number) => {
        if (value === undefined || value === 0) return;
        switch (attributeNumber) {
            case 1:
                setattributeSelectedOne(value);
                setattributeValueSelectedOne([]);
                if (value == attributeSelectedTwo) {
                    setattributeSelectedTwo(undefined);
                    setattributeValueSelectedTwo([]);
                }

                if (value == attributeSelectedThree) {
                    setattributeSelectedThree(undefined);
                    setattributeValueSelectedThree([]);
                }
                break;
            case 2:
                setattributeSelectedTwo(value);
                setattributeValueSelectedTwo([]);
                if (value == attributeSelectedThree) {
                    setattributeSelectedThree(undefined);
                    setattributeValueSelectedThree([]);
                }
                break;
            case 3:
                setattributeSelectedThree(value);
                setattributeValueSelectedThree([]);
                break;
            default:
                notifyError("Lỗi sử lý", SCENES_KEY);
        }
    };

    const _onClearnValueSelected = (value: number, attributeNumber: number) => {
        switch (attributeNumber) {
            case 1:
                setattributeTwo([]);
                const two = attribute?.filter(f => f.id !== value);
                setattributeTwo(two);
                break;
            case 2:
                setattributeTwo([]);
                const two2 = attribute?.filter(f => f.id !== attributeSelectedOne);
                setattributeTwo(two2);
                const three = two2?.filter(f => f.id !== value);
                setattributeThree(three);
                break;
            case 3:
                break;
            default:
                notifyError("Lỗi sử lý", SCENES_KEY);
        }
    };

    useEffect(() => {
        const run = async () => {
            await Promise.resolve().then(async () => {
                if (attributeSelectedOne) {
                    setattributeValue([]);
                    _onClearnValueSelected(attributeSelectedOne, 1);
                    let valueServer = (await _onloadValueAttribute(attributeSelectedOne.toString(), "", 1, 20));
                    setattributeValue(valueServer.items);
                }

                if (attributeSelectedTwo) {
                    _onClearnValueSelected(attributeSelectedTwo, 2);
                    let valueServer = (await _onloadValueAttribute(attributeSelectedTwo.toString(), "", 1, 20));
                    setattributeValueTwo(valueServer.items);
                }

                if (attributeSelectedThree) {
                    _onClearnValueSelected(attributeSelectedThree, 3);
                    let valueServer = (await _onloadValueAttribute(attributeSelectedThree.toString(), "", 1, 20));
                    setattributeValueThree(valueServer.items);
                }
            });
        };

        run();
    }, [attributeSelectedOne, attributeSelectedTwo, attributeSelectedThree]);

    const _onloadValueAttribute = async (id: string, keySearch: string, pageIndex: number, pageSize: number)
        : Promise<PagedResultDto<SelectedModel>> => {
        var result = await services.loadValueByIdAttribute({
            valuesSearch: [id, keySearch],
            pageIndex: 1,
            pageSize: 20
        });
        if (result.error || !result.result) {
            notifyError("Lỗi", SCENES_KEY);
            return { pageIndex: 0, pageSize: 0, indexFrom: 0, totalCount: 0, totalPages: 0, items: [] }
        }
        else {
            return {
                pageIndex: result.result.pageIndex,
                pageSize: result.result.pageSize,
                indexFrom: result.result.indexFrom,
                totalCount: result.result.totalCount,
                totalPages: result.result.totalPages,
                items: result.result.items
            }
        }
    }

    const _handleChangeValueAttribute = (value: number[], numberAttribute: number) => {
        if (value.length <= 5) {
            switch (numberAttribute) {
                case 1:
                    setattributeValueSelectedOne(value);
                    break;
                case 2:
                    setattributeValueSelectedTwo(value);
                    break;
                case 3:
                    setattributeValueSelectedThree(value);
                    break;
                default:
                    break;
            }
        }
        else {
            notifyError("Số lượng lựa chọn không vượt quá 5, vui lòng xóa bớt thuộc tính 1", SCENES_KEY);
        }
    };

    const handleSave = (row: DataTypeProductAdd) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
            width: '50px',
            align: 'center',
            fixed: 'left'
        },
        {
            title: <><span style={{ width: '100%', display: 'block', textAlign: 'center' }}>Tên</span></>,
            dataIndex: 'name',
            key: 'name',
            width: '200px',
            editable: true
        },
        {
            title: <><span style={{ width: '100%', display: 'block' }}>Thuộc tính:</span>{L(attribute?.find(f => f.id === attributeSelectedOne)?.value ?? "", SCENES_KEY)}</>,
            dataIndex: 'attribute1',
            key: 'attribute1',
            align: 'center',
            render: (text: string) => (<Tag color='#4baf6c'>{text}</Tag>)
        },
        {
            title: <><span style={{ width: '100%', display: 'block' }}>Thuộc tính:</span>{L(attribute?.find(f => f.id === attributeSelectedTwo)?.value ?? "", SCENES_KEY)}</>,
            dataIndex: 'attribute2',
            key: 'attribute2',
            align: 'center',
            render: (text: string) => (<Tag color='#4baf6c'>{text}</Tag>)
        },
        {
            title: <><span style={{ width: '100%', display: 'block' }}>Thuộc tính:</span>{L(attribute?.find(f => f.id === attributeSelectedThree)?.value ?? "", SCENES_KEY)}</>,
            dataIndex: 'attribute3',
            key: 'attribute3',
            align: 'center',
            render: (text: string) => (<Tag color='#4baf6c'>{text}</Tag>)
        },
        {
            title:
                <>
                    <span style={{ width: '100%', display: 'block' }}>Giá</span>
                    <NumericInput
                        max={10}
                        min={0}
                        onChange={(value) => _onChangePublicPrice(value)}
                        value={priceCommon}
                        placeholder={''} />
                </>,
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            width: '150px',
            editable: true,
        },
        {
            title:
                <>
                    <span style={{ width: '100%', display: 'block' }}>Số lượng</span>
                    <NumericInput
                        max={10}
                        min={0}
                        onChange={(value) => _onChangePublicQuantity(value)}
                        value={quantityCommon}
                        placeholder={''} />
                </>,
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            width: '100px',
            editable: true,
        },
        {
            title:
                <>
                    <span style={{ width: '100%', display: 'block' }}>Thứ tự hiển thị</span>
                </>,
            dataIndex: 'displayOrder',
            key: 'displayOrder',
            align: 'center',
            width: '100px',
            render: (text: string, record: any) => {
                return (<Select
                    placeholder="Select a person"
                    style={{ width: '100%' }}
                    optionFilterProp="children"
                    value={text}
                    onChange={(value: string) => _changeNumberOrder(value, text)}
                    options={Array.from(Array(dataSource.length).keys()).map((item) => {
                        return { value: (item + 1), label: (item + 1) };
                    })}
                />);
            }
        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'avatar',
            key: 'avatar',
            align: 'center',
            render: (text: string, record: any) =>
            (<Image
                width={100}
                onClick={() => selectImage(text, Number(record.key))}
                src={abp.appServiceUrl + text}
                preview={{ visible: false }}
            />)
        },
        {
            title: L("ACTION", "COMMON"),
            dataIndex: "x",
            key: "x",
            width: 120,
            align: 'center',
            fixed: 'right',
            render: (text: any, record: any) => (
                <>
                    <Tooltip title={L("DELETE", "COMMON")}>
                        <Button
                            type="link"
                            onClick={() => _removeItemSource(record.key)}
                            icon={<DeleteOutlined />}
                        ></Button>
                    </Tooltip>
                </>
            ),
        },
    ];

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataTypeProductAdd) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave
            }),
        };
    });

    const _processArray = (arr1: DataTypeProductAdd[], arr2: number[], numberOrder: number): DataTypeProductAdd[] => {
        let rslArr: DataTypeProductAdd[] = [];
        if (arr1.length === 0) {
            rslArr = arr2.map((item, ixdex): DataTypeProductAdd => {
                return {
                    id: arr1[ixdex]?.id,
                    key: ixdex.toString(),
                    name: '',
                    attribute1: "",
                    attribute2: "",
                    attribute3: "",
                    displayOrder: ixdex,
                    price: '0',
                    quantity: 0,
                    avatar: '',
                    isActive: true,
                    keyAttributeOne: numberOrder === 1 ? Number(item) : 0,
                    keyAttributeTwo: numberOrder === 2 ? Number(item) : 0,
                    keyAttributeThree: numberOrder === 3 ? Number(item) : 0,
                    idKeyAttributeOne: attributeSelectedOne,
                    idKeyAttributeTwo: attributeSelectedTwo,
                    idKeyAttributeThree: attributeSelectedThree
                }
            });
        }
        else {
            if (arr2.length === 0) {
                return arr1;
            }
            else {
                arr1.forEach(io => {
                    for (let index = 0; index < arr2.length; index++) {
                        let a = Object.assign({}, io);
                        if (numberOrder === 1) a.keyAttributeOne = Number(arr2[index]);
                        if (numberOrder === 2) a.keyAttributeTwo = Number(arr2[index]);
                        if (numberOrder === 3) a.keyAttributeThree = Number(arr2[index]);
                        rslArr.push(a);
                    };
                });
            }
        }
        return rslArr;
    }

    //============= sử lý mảng source cho table theo sự thay đổi của attribute value ===========//
    useEffect(() => {
        // create billet with attributeSelected of each feature product and return a container billet
        let containerBillets: DataTypeProductAdd[] = (dataSource.length === 0 ? props.dataSourceInit : dataSource);
        let processLv1 = _processArray([], attributeValueSelectedOne, 1);
        var processLv2 = _processArray(processLv1, attributeValueSelectedTwo, 2);
        containerBillets = _processArray(processLv2, attributeValueSelectedThree, 3);
        setDataSource(processContainerBillet(containerBillets))
    }, [attributeValueSelectedOne, attributeValueSelectedTwo, attributeValueSelectedThree, attributeValue, attributeValueTwo, attributeValueThree]);

    //========== PROCESS MERGE DATA TO BILLET
    // why process in render table? : because => when attribute value seleced change. I render not check. so that render new all data.
    // but not have data old. this func sync dât old and data new 
    const processContainerBillet = (billet: DataTypeProductAdd[]) => {
        var dataNew = billet.map((m, i) => {

            m.key = (i + 1).toString();
            m.displayOrder = (i + 1);
            m.attribute1 = attributeValue?.find(f => f.id === m.keyAttributeOne)?.value;
            m.attribute2 = attributeValueTwo?.find(f => f.id === m.keyAttributeTwo)?.value;
            m.attribute3 = attributeValueThree?.find(f => f.id === m.keyAttributeThree)?.value;
            m.idKeyAttributeOne = attributeSelectedOne;
            m.idKeyAttributeTwo = attributeSelectedTwo;
            m.idKeyAttributeThree = attributeSelectedThree;

            var oldDataExists = props.dataSourceInit.find(s => s.keyAttributeOne === m.keyAttributeOne
                && s.keyAttributeTwo === m.keyAttributeTwo
                && s.keyAttributeThree === m.keyAttributeThree);
            if (oldDataExists) {
                console.log('true')
                m.avatar = oldDataExists.avatar;
                m.id = oldDataExists.id;
                m.name = oldDataExists.name;
                m.price = oldDataExists.price;
                m.quantity = oldDataExists.quantity;
            }
            else{
                console.log('false')
                m.name = props.infoBasic.name;
            }
            return m;
        });
        return dataNew;
    }

    const _onChangePublicPrice = (value: string) => {
        setPriceCommon(value);
    }

    const _onChangePublicQuantity = (value: string) => {
        setQuantityCommon(value);
    }

    //============= sử lý mảng source cho table theo sự thay đổi của giá chung và số lượng chung ===========//
    useEffect(() => {
        let dataSourceTemp = dataSource;
        let isUpdateOrCreatePriceAndQuantity = Boolean(
            (props.dataSourceInit !== undefined && props.dataSourceInit.length !== 0)
            && (priceCommon !== '' || quantityCommon != ''));
        if (isUpdateOrCreatePriceAndQuantity) {
            const timeOutId = setTimeout(() => {
                setDataSource([]);
                var a = dataSourceTemp.map((m, i) => {
                    m.price = priceCommon;
                    m.quantity = Number(quantityCommon);
                    return m;
                });
                setDataSource(a);
            }, 1000);
            return () => clearTimeout(timeOutId);
        }
    }, [priceCommon, quantityCommon]);

    const selectImage = (text: string, id: number) => {
        return Modal.info({
            title: L('SELECT_IMAGE_FOR_YOU', SCENES_KEY),
            className: 'lgvNbwrkVm',
            content: (
                <>
                    <ul className='IZVwDavfYt'>
                        {props.imageCommon.map((image: string, index: number) =>
                            <li className='EwblpaILoe'>
                                <input defaultChecked={image === text} type="radio" onChange={() => _processOkImageChange(image, id)} name='EwblpaILoe' id={"EwblpaILoe" + index} />
                                <label htmlFor={"EwblpaILoe" + index}>
                                    <img src={abp.appServiceUrl + image} alt={image} />
                                </label>
                            </li>)
                        }
                    </ul>
                </>
            )
        });
    }

    const _processOkImageChange = (image: string, id: number) => {
        const source = dataSource.map(m => {
            if (m.key === id.toString()) {
                m.avatar = image;
                return m;
            }
            else {
                return m;
            }
        });
        setDataSource(source);
    }

    const _removeItemSource = (id: string) => {
        setDataSource(dataSource.filter(f => f.key !== id));
    }

    const _changeNumberOrder = (newValue: string, oldValue: string) => {
        setDataSource(dataSource.map(m => {
            if (m.displayOrder === Number(newValue)) {
                m.displayOrder = Number(oldValue)
            }
            else if (m.displayOrder == Number(oldValue)) {
                m.displayOrder = Number(newValue)
            };
            return m;
        }));
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            // let tempDataSource = dataSource.length === 0 ? props.dataSourceInit : dataSource;
            // let rslArr = tempDataSource.map((item): DataTypeProductAdd => {
            //     return item;
            // });
            // props.onOk(rslArr);
            // localStorage.setItem(KEY_LOCAL_STORAGE_FUTURE, JSON.stringify(rslArr));
            props.onOk(dataSource);
        }, 1000);
        return () => clearTimeout(timeOutId);
    }, [dataSource]);

    // Add Attribute Attribute Product and Value
    const [open, setOpen] = useState<boolean>(false);
    const [typeAttributeId, setTypeAttributeId] = useState<number>(0);

    const _openModalAddAttribute = (idAttribute: number | undefined) => {
        if (idAttribute === undefined) return;
        setTypeAttributeId(idAttribute);
        setOpen(true);
    }

    const _openSuccessAddAttributeProduct = async () => {
        if (attributeSelectedOne === typeAttributeId && attributeSelectedOne) {
            _onClearnValueSelected(attributeSelectedOne, 1);
            let valueServer = (await _onloadValueAttribute(attributeSelectedOne.toString(), "", 1, 20));
            setattributeValue(valueServer.items);
        }
        else if (attributeSelectedTwo === typeAttributeId && attributeSelectedTwo) {
            _onClearnValueSelected(attributeSelectedTwo, 2);
            let valueServer = (await _onloadValueAttribute(attributeSelectedTwo.toString(), "", 1, 20));
            setattributeValueTwo(valueServer.items);
        }
        else if (attributeSelectedThree === typeAttributeId && attributeSelectedThree) {
            _onClearnValueSelected(attributeSelectedThree, 3);
            let valueServer = (await _onloadValueAttribute(attributeSelectedThree.toString(), "", 1, 20));
            setattributeValueThree(valueServer.items);
        }

        setOpen(false);
    }

    return (
        <>
            <LoadingProcess className='zVaDEJphbu' open={loadingAll} />
            <Row gutter={[5, 5]}>
                <Col span={8}>
                    <Row gutter={[5, 5]}>
                        <Col span={24} className="xFBNdWfdEL">{L("ATTRIBUTE_1", SCENES_KEY)}</Col>
                        <Col span={24}>
                            <Select
                                showSearch
                                fieldNames={{ label: 'value', value: 'id' }}
                                placeholder={L("select one country", SCENES_KEY)}
                                optionFilterProp="children"
                                onChange={(value: any) => onChangeAttribute(value, 1)}
                                style={{ width: "100%" }}
                                value={attributeSelectedOne}
                                filterOption={(input, option) =>
                                    (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '8px 0' }} />
                                        <div style={{ textAlign: "center", padding: '0 8px 4px' }}>
                                            <Pagination simple defaultCurrent={2} total={50} />
                                        </div>
                                    </>
                                )}
                                options={attribute} />
                        </Col>
                        <Col span={24} className="xFBNdWfdEL">{L("ATTRIBUTE_VALUE_1", SCENES_KEY)}</Col>
                        <Col span={24} className="eDLLPDyUUY">
                            <Select
                                mode="multiple"
                                fieldNames={{ label: 'value', value: 'id' }}
                                style={{ width: '100%' }}
                                placeholder={L("select one country", SCENES_KEY)}
                                maxTagCount={3}
                                maxTagTextLength={7}
                                onChange={(values: number[]) => _handleChangeValueAttribute(values, 1)}
                                options={attributeValue}
                                value={attributeValueSelectedOne}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Space style={{ padding: '0 8px 4px' }}>
                                            <Button type="text"
                                                icon={<PlusOutlined />}
                                                onClick={() => _openModalAddAttribute(attributeSelectedOne)} />

                                            <div style={{ textAlign: "center", padding: '0 8px 4px' }}>
                                                <Pagination simple defaultCurrent={2} total={50} />
                                            </div>
                                        </Space>
                                    </>
                                )}
                            ></Select>
                        </Col>
                    </Row>
                </Col>
                {attributeSelectedOne !== undefined
                    ? <Col span={8}>
                        <Row gutter={[5, 5]}>
                            <Col span={24} className="xFBNdWfdEL">{L("ATTRIBUTE_2", SCENES_KEY)}</Col>
                            <Col span={24}>
                                <Select
                                    showSearch
                                    fieldNames={{ label: 'value', value: 'id' }}
                                    placeholder={L("select one country", SCENES_KEY)}
                                    optionFilterProp="children"
                                    onChange={(value: number) => onChangeAttribute(value, 2)}
                                    style={{ width: "100%" }}
                                    filterOption={(input, option) =>
                                        (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    value={attributeSelectedTwo}
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <div style={{ textAlign: "center", padding: '0 8px 4px' }}>
                                                <Pagination simple defaultCurrent={2} total={50} />
                                            </div>
                                        </>
                                    )}
                                    options={attributeTwo} />
                            </Col>
                            <Col span={24} className="xFBNdWfdEL">{L("ATTRIBUTE_VALUE_2", SCENES_KEY)}</Col>
                            <Col span={24} className="eDLLPDyUUY">
                                <Select
                                    mode="multiple"
                                    fieldNames={{ label: 'value', value: 'id' }}
                                    style={{ width: '100%' }}
                                    placeholder={L("select one country", SCENES_KEY)}
                                    onChange={(values: number[]) => _handleChangeValueAttribute(values, 2)}
                                    options={attributeValueTwo}
                                    value={attributeValueSelectedTwo}
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Button type="text"
                                                    icon={<PlusOutlined />}
                                                    onClick={() => _openModalAddAttribute(attributeSelectedTwo)} />
                                                <div style={{ textAlign: "center", padding: '0 8px 4px' }}>
                                                    <Pagination simple defaultCurrent={2} total={50} />
                                                </div>
                                            </Space>
                                        </>
                                    )}
                                ></Select>
                            </Col>
                        </Row>
                    </Col>
                    : <></>
                }
                {attributeSelectedOne !== undefined && attributeSelectedTwo !== undefined
                    ? <Col span={8}>
                        <Row gutter={[5, 5]}>
                            <Col span={24} className="xFBNdWfdEL">{L("ATTRIBUTE_3", SCENES_KEY)}</Col>
                            <Col span={24}>
                                <Select
                                    showSearch
                                    fieldNames={{ label: 'value', value: 'id' }}
                                    placeholder={L("select one country", SCENES_KEY)}
                                    optionFilterProp="children"
                                    onChange={(value: number) => onChangeAttribute(value, 3)}
                                    style={{ width: "100%" }}
                                    filterOption={(input, option) =>
                                        (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    value={attributeSelectedThree}
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <div style={{ textAlign: "center", padding: '0 8px 4px' }}>
                                                <Pagination simple defaultCurrent={2} total={50} />
                                            </div>
                                        </>
                                    )}
                                    options={attributeThree} />
                            </Col>
                            <Col span={24} className="xFBNdWfdEL">{L("ATTRIBUTE_VALUE_3", SCENES_KEY)}</Col>
                            <Col span={24} className="eDLLPDyUUY">
                                <Select
                                    mode="multiple"
                                    fieldNames={{ label: 'value', value: 'id' }}
                                    style={{ width: '100%' }}
                                    placeholder={L("select one country", SCENES_KEY)}
                                    options={attributeValueThree}
                                    onChange={(values: number[]) => _handleChangeValueAttribute(values, 3)}
                                    value={attributeValueSelectedThree}
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Button type="text"
                                                    icon={<PlusOutlined />}
                                                    onClick={() => _openModalAddAttribute(attributeSelectedThree)} />
                                                <div style={{ textAlign: "center", padding: '0 8px 4px' }}>
                                                    <Pagination simple defaultCurrent={2} total={50} />
                                                </div>
                                            </Space>
                                        </>
                                    )}
                                ></Select>
                            </Col>
                        </Row>
                    </Col>
                    : <></>
                }
            </Row>
            <Divider orientation="left">{L("EDIT_DETAIL_FUTURE_PRODUCT", SCENES_KEY)}</Divider>
            <Row>
                <Col span={24}>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        className='JBTgnyksJY'
                        scroll={{ y: 500, x: 1200 }}
                        size='small'
                        dataSource={dataSource}
                        loading={loadingAll}
                        columns={columns as ColumnTypes}
                        pagination={false}
                        summary={() => (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0}>Total: {dataSource.length}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={2}>{attributeValueSelectedOne.length + " " + L("Thuộc tính", SCENES_KEY)}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={3}>{attributeValueSelectedTwo.length + " " + L("Thuộc tính", SCENES_KEY)}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={4}>{attributeValueSelectedThree.length + " " + L("Thuộc tính", SCENES_KEY)}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={5}>{L("Trung bình giá", SCENES_KEY) + ": " + 0}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={6}>{L("Tổng số lượng", SCENES_KEY) + ": " + 0}</Table.Summary.Cell>
                                    <Table.Summary.Cell index={6}></Table.Summary.Cell>
                                    <Table.Summary.Cell index={6}>{L("Tổng ảnh sử dụng", SCENES_KEY) + ": " + 0 + "/" + props.imageCommon.length}</Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        )}
                    />
                </Col>
            </Row>

            {open ? <AddAttributeSupplierComponent
                typeAttribute={typeAttributeId}
                open={open}
                onCreate={(value) => _openSuccessAddAttributeProduct()}
                onCancel={() => {
                    setOpen(false);
                }} /> : <></>}
        </>
    )
}




export interface IAddAttributeSupplierProps {
    typeAttribute: number;
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const KEY_CATEGORY_CATEGORY = "AGbFJ";
const AddAttributeSupplierComponent: React.FC<IAddAttributeSupplierProps> = ({
    typeAttribute,
    open,
    onCreate,
    onCancel
}) => {
    const [form] = Form.useForm();
    const [loadcreate, setloadcreate] = useState<boolean>(false);

    const _onOK = () => {
        setloadcreate(true);
        form.validateFields()
            .then(async (values) => {
                form.resetFields();
                var result = await services.createAttributeProductBySupplier({
                    value: values.value,
                    idAttribute: typeAttribute
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
            title={L("AddTypeAttribute", SCENES_KEY)}
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


const EditableContext = React.createContext<FormInstance<any> | null>(null);

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            L('Save failed', SCENES_KEY);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: L("NOT_NULL", 'COMMON'),
                    },
                ]}
            >
                <Input
                    ref={inputRef}
                    onPressEnter={save}
                    onBlur={save}
                />
            </Form.Item>
        ) : (
            <div className="ant-input editable-cell-value-wrap" onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};


const components = {
    body: {
        row: EditableRow,
        cell: EditableCell,
    },
};