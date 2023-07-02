import Icon, { AppstoreOutlined, DeploymentUnitOutlined, EyeOutlined, PlusOutlined, QuestionOutlined, RedoOutlined, SettingOutlined, WarningOutlined } from '@ant-design/icons';
import { Form, Row, Col, Input, Space, Select, Button, Tooltip, Modal, Checkbox, Divider, Pagination } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { L } from "../../../../lib/abpUtility";
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { InputRef } from 'antd';
import { notifyError } from '../../../../components/Common/notification';
import { SelectedModel } from '../../../../services/common/selectedModel';
import services from '../services';
import { KeyAndValue, KeyAndValueDefault } from '../../../../services/common/keyAndValue';
import utils from '../../../../utils/utils';
import Search from 'antd/es/input/Search';

const { TextArea } = Input;
const { Option } = Select;
const SCENES_KEY = "PRODUCT_ADD";
const KEY_CATEGORY_TECHNICAL = "TpXmW";

type TechnicalPropertiesProps = {
    categoty: number[];
    initData: KeyAndValue<string, KeyAndValue<number, string>[]>[];
    onOk: (value: KeyAndValue<string, KeyAndValue<number, string>[]>[]) => void;
} & typeof defaultProps;

const defaultProps = {
    initData: [] as KeyAndValue<string, KeyAndValue<number, string>[]>[]
}

TechnicalProperties.defaultProps = defaultProps;

export default function TechnicalProperties(props: TechnicalPropertiesProps) {
    const [dataAttribute, setDataAttribute] = useState<SelectedModel[]>([]);
    const [dataAttributeState, setdataAttributeState] = useState<CheckboxValueType[] | undefined>([]);
    const [groupingAttribute, setGroupingAttribute] = useState<IMappingGroupAndValue[]>([]);
    const [result, setResult] = useState<KeyAndValue<string, KeyAndValue<number, string>[]>[]>([]);
    const [defaultData, setDefaultData] = useState<KeyAndValue<number, string>[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(20);
    const [totalRecord, setTotalRecord] = useState<number>(0);
    useEffect(() => {
        _fetchData();
    }, []);

    const _fetchData = async () => {
        var result = await services.getAttributeSpecifications({
            valuesSearch: [JSON.stringify(props.categoty), ''],
            pageIndex: pageIndex - 1,
            pageSize: pageSize
        });
        if (result.error || !result.result) {
            notifyError("Lỗi", SCENES_KEY);
            return false;
        }
        else {
            setDataAttribute(result.result.items);
            _recyclingDataInit(result.result.items);
            setTotalRecord(result.result.totalCount);
            setPageIndex(result.result.pageIndex + 1);
            setPageSize(result.result.pageSize);
            return true;
        }
    }

    useEffect(() => {
        _fetchData();
    }, [pageIndex, pageSize])

    const _recyclingDataInit = (value: SelectedModel[]) => {
        const dataInit = props.initData;
        setGroupingAttribute([]);
        setdataAttributeState([]);
        setDefaultData([]);
        let allState: CheckboxValueType[] = [];
        let allValue: KeyAndValue<number, string>[] = [];
        dataInit.forEach((item, index) => {
            let uuu = (item?.value?.flatMap((item) => item.key?.toString() ?? '') ?? []) as CheckboxValueType[];
            let opsd = { key: index, group: item.key ?? '', value: uuu as string[] }
            allState = uuu.concat(allState as CheckboxValueType[]);
            allValue = allValue.concat(item.value as KeyAndValue<number, string>[]);
            setdataAttributeState(allState);
            setGroupingAttribute(op => [...op, opsd]);
            setDefaultData(allValue);
        });
    }

    const [form] = Form.useForm();
    useEffect(() => {
        let arr = defaultData.map(m => {
            return { [dataAttribute.find(s => s.id === m.key)?.value ?? '']: m.value }
        });
        var object = Object.assign({}, ...arr);
        form.setFieldsValue(object);
        _onValueChange('', form.getFieldsValue());
    }, [defaultData])

    //========== SELECT TECH FOR PRODUCT ==========
    const _selectAttribute = (dataAttributeStateProp: CheckboxValueType[] | undefined) => {
        const onChange = (checkedValues: CheckboxValueType[]) => {
            setdataAttributeState(checkedValues);
        };

        return Modal.info({
            title: L('SELECT_ATTRIBUTE', SCENES_KEY),
            icon: <DeploymentUnitOutlined />,
            className: 'lgvNbwrkVm',
            content: (
                <>
                    <Search />
                    <Checkbox.Group defaultValue={dataAttributeStateProp?.map(i => Number(i))} style={{ width: '100%' }} onChange={onChange}>
                        <Row className='gVXWWSAXjo'>
                            {dataAttribute.map(m =>
                                <Checkbox
                                    key={m.id}
                                    value={m.id}
                                >
                                    {m.value}
                                </Checkbox>)}
                        </Row>
                    </Checkbox.Group>
                    <Pagination
                        total={totalRecord}
                        className='kmCdlkDCkL'
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        defaultPageSize={pageSize}
                        defaultCurrent={pageIndex}
                        showSizeChanger
                        pageSizeOptions={[1, 20, 50, 100]}
                        onChange={(page: number, pageSize: number) => {
                            setPageIndex(page);
                            setPageSize(pageSize);
                        }}
                    />
                </>
            )
        });
    }

    const _previewAttribute = () => {
        return Modal.info({
            title: L('MODE_PREVIEW_ATTRIBUTE', SCENES_KEY),
            icon: <EyeOutlined />,
            className: 'lgvNbwrkVm',
            content: (
                <>

                </>
            )
        });
    }

    const [openModalGroup, setOpenModalGroup] = useState<boolean>(false);

    const _onReset = () => {
        setdataAttributeState(undefined);
        setGroupingAttribute([]);
    }

    var delayTimer: NodeJS.Timeout;
    const _onValueChange = (_: any, allFields: any) => {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function () {
            if (groupingAttribute === undefined || groupingAttribute.length === 0)
                __processNotGroup(allFields)
            else __processGroup(allFields);
        }, 1000);
    }

    const __processNotGroup = (allFields: object) => {
        var getAllKeys = Object.keys(allFields);
        let rsl = getAllKeys.map((m: string): KeyAndValue<number, string> => {
            return { key: dataAttribute.find(f => f.value === m)?.id, value: utils.getValueByKey(allFields, m) };
        });
        setResult([{ key: "default", value: rsl }]);
    }

    const __processGroup = (allFields: any) => {
        var rsls = groupingAttribute.map(group => {
            return {
                key: group.group,
                value: group.value?.map((item: string): KeyAndValue<number, string> => {
                    return {
                        key: Number(item),
                        value: utils.getValueByKey(allFields, dataAttribute.find(f => f.id === Number(item))?.value)
                    }
                })
            }
        });
        setResult(rsls);
    }

    useEffect(() => {
        props.onOk(result);
        localStorage.setItem(KEY_CATEGORY_TECHNICAL, JSON.stringify(result));
    }, [result]);

    return (
        <>
            <Row>
                <Col span={1}>
                    <Tooltip title={L("Lựa chọn thuộc tính", SCENES_KEY)}>
                        <Button onClick={() => _selectAttribute(dataAttributeState)} icon={<DeploymentUnitOutlined />}></Button>
                    </Tooltip>
                </Col>
                <Col span={1}>
                    <Tooltip title={L("Gom nhóm thuộc tính", SCENES_KEY)}>
                        <Button disabled={dataAttributeState === undefined || dataAttributeState?.length === 0} icon={<AppstoreOutlined />} onClick={() => setOpenModalGroup(true)}></Button>
                    </Tooltip>
                </Col>
                <Col span={1}>
                    <Tooltip title={L("Thêm mới thuộc tính", SCENES_KEY)}>
                        <Button icon={<PlusOutlined />}></Button>
                    </Tooltip>
                </Col>
                <Col span={1}>
                    <Tooltip title={L("Làm mới thuộc tính", SCENES_KEY)}>
                        <Button onClick={() => _onReset()} icon={<RedoOutlined />}></Button>
                    </Tooltip>
                </Col>
                <Col span={1}>
                    <Tooltip title={L("Xem Trước", SCENES_KEY)}>
                        <Button onClick={_previewAttribute} icon={<EyeOutlined />}></Button>
                    </Tooltip>
                </Col>
                <Col span={1}>
                    <Tooltip title={L("Cài đặt hiển thị", SCENES_KEY)}>
                        <Button icon={<SettingOutlined />}></Button>
                    </Tooltip>
                </Col>
                <Col span={1}>
                    <Tooltip title={L("Góp ý sản phẩm", SCENES_KEY)}>
                        <Button icon={<QuestionOutlined />}></Button>
                    </Tooltip>
                </Col>
            </Row>
            <Form
                form={form}
                name="dynamic_form_complex"
                layout="vertical"
                autoComplete="off"
                onValuesChange={_onValueChange}
            >
                {
                    groupingAttribute.length === 0 ?
                        <div className='yzlFQaVhSY'>
                            <Divider orientation="left">{L("default", SCENES_KEY)}</Divider>
                            <div className='FDHdLqAnIq'>
                                {
                                    dataAttributeState?.map(m =>
                                        <Form.Item name={dataAttribute.find(s => s.id === m)?.value} label={L(dataAttribute.find(s => s.id === m)?.value || '', SCENES_KEY)} rules={[{ required: true }]}>
                                            <TextArea
                                                placeholder="Controlled autosize"
                                                autoSize={{ minRows: 1, maxRows: 6 }}
                                                defaultValue={defaultData.find(s => s.key === m)?.value}
                                            />
                                        </Form.Item>)
                                }
                            </div>
                        </div>
                        : groupingAttribute.map(m =>
                            <div className='yzlFQaVhSY' key={"SHOWGROUP" + m.key}>
                                <Divider orientation="left">{L(m.group, SCENES_KEY)}</Divider>
                                <div className='FDHdLqAnIq'>
                                    {m.value?.map(v =>
                                        <Form.Item name={dataAttribute.find(s => s.id === Number(v))?.value}
                                            label={L(dataAttribute.find(s => s.id === Number(v))?.value || '', SCENES_KEY)}
                                            rules={[{ required: true }]}>
                                            <TextArea
                                                placeholder="Controlled autosize"
                                                autoSize={{ minRows: 1, maxRows: 6 }}
                                            />
                                        </Form.Item>)}
                                </div>
                            </div>
                        )
                }
            </Form>
            {
                openModalGroup ? <GroupingAttribute
                    dataAttributeCommon={dataAttribute}
                    initData={groupingAttribute}
                    dataAttribute={dataAttributeState}
                    icon={<AppstoreOutlined />}
                    open={openModalGroup}
                    onCancelModal={() => setOpenModalGroup(false)}
                    onCreate={(values: IMappingGroupAndValue[]) => {
                        setGroupingAttribute(values);
                        setOpenModalGroup(false);
                    }} />
                    : <></>
            }
        </>
    )
}

export interface IGroupingAttributeProps {
    dataAttributeCommon: SelectedModel[];
    initData: IMappingGroupAndValue[];
    dataAttribute: CheckboxValueType[] | undefined;
    icon: React.ReactNode;
    open: boolean;
    onCreate: (values: IMappingGroupAndValue[]) => void;
    onCancelModal: () => void;
}

interface IMappingGroupAndValue {
    key: number;
    group: string;
    value: string[] | undefined;
}

const GroupingAttribute: React.FC<IGroupingAttributeProps> = ({
    dataAttributeCommon,
    initData,
    dataAttribute,
    icon,
    open,
    onCreate,
    onCancelModal
}) => {
    const [items, setItems] = useState<string[]>(['default']);
    const [name, setName] = useState('');
    const inputRef = useRef<InputRef>(null);
    const [groupSelectde, setGroupSelectde] = useState<IMappingGroupAndValue[]>(initData);
    const [valueSelected, setValueSelected] = useState<string[]>([]);

    useEffect(() => {
        setItems(initData.map(s => s.group));
    }, [])

    useEffect(() => {
        if (dataAttribute === undefined) {
            setGroupSelectde([]);
            setItems(['default']);
        }
        else {
            let countValueSelcted: number = 0;
            initData.forEach(s => countValueSelcted = countValueSelcted + (s.value?.length || 0));
            if (countValueSelcted !== dataAttribute.length) {
                setGroupSelectde(groupSelectde.map(m => {
                    m.value = undefined;
                    return m;
                }));
            }
        }
    }, [dataAttribute]);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (!items.some(s => s === name) && name) {
            e.preventDefault();
            setItems([...items, name]);
            setName('');
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
        else {
            notifyError(L('ERROR', 'COMMON'), L('Tên nhóm không để trống hoặc không được trùng với các nhóm đã có', SCENES_KEY))
        }
    };

    const _onOK = () => {
        onCreate(groupSelectde);
    }

    const _onCancel = () => {
        return Modal.confirm({
            title: L("Cảnh báo hủy", SCENES_KEY),
            icon: <WarningOutlined />,
            content: L("Dữ liệu sẽ không được lưu lại, vui lòng cân nhắc", SCENES_KEY),
            okText: L("OK", "COMMON"),
            cancelText: L("CANCEL", "COMMON"),
            onOk() {
                onCancelModal();
            },
        });
    }

    useEffect(() => {
        let valueSelectedTemp = valueSelected;
        groupSelectde.forEach(m => {
            valueSelectedTemp = valueSelectedTemp.concat(m.value || [])
        });
        setValueSelected(valueSelectedTemp);
    }, [groupSelectde]);

    const _selectGroup = (group: string, value: string[], index: number) => {
        if (groupSelectde.some(m => m.key === index)) {
            setGroupSelectde(groupSelectde.map(m => {
                if (m.key === index) {
                    m.group = group;
                    m.value = value;
                }
                return m;
            }));
        }
        else {
            setGroupSelectde(op => [...op, { group: group, value: value, key: index }]);
        }
    }

    const _onClearGroup = (index: number) => {
        setGroupSelectde(groupSelectde.filter(m => m.key !== index));
    }

    const disabledListPublic = (index: number, value: string): boolean => {
        let isActive: boolean = false;
        for (let name of groupSelectde) {
            if (name.key === index) continue;
            if (name.value?.some(s => s == value)) {
                isActive = true;
                break;
            }
        }
        return isActive;
    }
    return (
        <Modal
            open={open}
            title={<span className='LOBMdQYGDq'><span className='TgDKcrbwYh'>{icon}</span>{L('SELECT_ATTRIBUTE', SCENES_KEY)}</span>}
            okText={L("OK", "COMMON")}
            className='lgvNbwrkVm qtIwCqavrN'
            cancelText={L("CANCEL", "COMMON")}
            maskClosable={false}
            closable={false}
            onOk={() => _onOK()}
            onCancel={() => _onCancel()}
        >
            {Array.from(Array(items.length).keys()).map((item, index) =>
                <Row gutter={[5, 5]} key={index}>
                    <Col span={12} className='uIVZlkTETe'>
                        <div>{L('Tạo hoặc chọn nhóm', SCENES_KEY)}</div>
                        <div>
                            <Select
                                style={{ width: '100%' }}
                                allowClear
                                placeholder={L('Chọn nhóm đã tạo', SCENES_KEY)}
                                value={groupSelectde.find(f => f.key === index)?.group}
                                defaultValue={initData.find(f => f.key === index)?.group}
                                onSelect={(value: string) => _selectGroup(value, [], index)}
                                onClear={() => _onClearGroup(index)}
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Space style={{ padding: '0 8px 4px' }}>
                                            <Input
                                                placeholder={L('Thêm mới một nhóm', SCENES_KEY)}
                                                ref={inputRef}
                                                value={name}
                                                onChange={onNameChange}
                                            />
                                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                                                {L('Thêm mới nhóm', SCENES_KEY)}
                                            </Button>
                                        </Space>
                                    </>
                                )}
                                options={items.map((item) => ({ label: item, value: item, disabled: groupSelectde.some(s => s.group === item) }))}
                            />
                        </div>
                    </Col>
                    <Col span={12} className='uIVZlkTETe'>
                        <div>{L('Gán giá trị cho nhóm đã chọn', SCENES_KEY)}</div>
                        <div>
                            <Select
                                style={{ width: '100%' }}
                                mode='multiple'
                                value={groupSelectde.find(f => f.key === index)?.value}
                                defaultValue={initData.find(f => f.key === index)?.value}
                                disabled={!groupSelectde || !groupSelectde.some(s => s.key === index)}
                                placeholder={L('Chọn thuộc tính cho nhóm', SCENES_KEY)}
                                onChange={(newValue: string[]) => _selectGroup(groupSelectde?.find(f => f.key === index)?.group || '', newValue, index)}
                                options={dataAttribute?.map((item) => ({ label: dataAttributeCommon.find((s: any) => s.id === Number(item))?.value || '', value: item, disabled: disabledListPublic(index, item.toString()) }))}
                            />
                        </div>
                    </Col>
                </Row>
            )}
        </Modal >);
}
