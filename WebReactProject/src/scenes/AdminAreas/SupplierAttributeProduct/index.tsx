import { SearchOutlined, PlusOutlined, RedoOutlined, DeleteOutlined, RetweetOutlined, FilterOutlined, SortAscendingOutlined, ApartmentOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Row, Col, Input, Button, Select, Table, Tooltip, Tag, Modal, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { L } from "../../../lib/abpUtility";
import { ColumnsType } from 'antd/lib/table';
import './style.css';
import '../admin_table.css';
import ExportFileComponent from '../../../components/File/ExportFileComponent';
import InsertOrUpdateComponent from './components/insertOrUpdateComponent';
import { ProductAttributeUpdateDto } from './dtos/productAttributeQuery';
import services from './services';
import { notifyError, notifySuccess } from '../../../components/Common/notification';
import { ProductAttributeValueSupplier } from './dtos/productAttributeDto';
import moment from 'moment';
import { CssResponsive } from '../../../utils/cssResponsive';


const { Option } = Select;


const SCENES_KEY = "PRODUCT_ATTRIBUTE";

export interface ISupplierAttributeProductProps {
    location: any;
}

export default function SupplierAttributeProduct(props: ISupplierAttributeProductProps) {

    const [form] = Form.useForm();

    // Default 
    const [pageSize, setpageSize] = useState<number>(20);
    const [pageIndex, setpageIndex] = useState<number>(1);
    const [totalCount, settotalCount] = useState<number>(0);
    const [propertySearch, setpropertySearch] = useState<string[] | undefined>();
    const [valueSearch, setvalueSearch] = useState<string[]>(['', '']);
    const [propertyOrder, setpropertyOrder] = useState<string | undefined>();
    const [valueOrderBy, setvalueOrderBy] = useState<boolean | undefined>(undefined);
    const [loadingAll, setloadingAll] = useState<boolean>(false);
    const [loadingTable, setloadingTable] = useState<boolean>(false);
    const [dataSelectFromTable, setdataSelectFromTable] = useState<React.Key[]>([]);
    const [onShowModal, setonShowModal] = useState<boolean>(false);

    // Local
    const [dataSource, setDataSource] = useState<ProductAttributeValueSupplier[]>();
    const [dataBeginEdit, setdataBeginEdit] = useState<ProductAttributeUpdateDto | undefined>(undefined);

    const [modal, contextHolder] = Modal.useModal();
    //constructor
    useEffect(() => {
        _loadData();
    }, []);

    const _loadData = async (re: boolean = false) => {
        setloadingAll(true);
        var result = await services.loadAttibute({
            valuesSearch: valueSearch,
            pageIndex: re ? 1 : pageIndex,
            pageSize: pageSize
        });

        if (result.error || !result.result) {
            notifyError(L("ERROR", "COMMON"), L(result.messageError, SCENES_KEY));
            setDataSource([]);
            setloadingAll(false);
        }
        else {
            setDataSource(result.result.items);
            setpageIndex(result.result.pageIndex);
            setpageSize(result.result.pageSize);
            settotalCount(result.result.totalCount);
            setloadingAll(false);
        }
    }

    useEffect(() => {
        _loadData(true);
    }, [valueSearch]);

    useEffect(() => {
        _loadData();
    }, [pageIndex, pageSize]);

    const _convertTypes = (type: number) => {
        switch (type) {
            case 0: return L("ATTRIBUTE", SCENES_KEY)
            case 1: return L("UNIT", SCENES_KEY)
            case 2: return L("SPECIFICATIONS", SCENES_KEY)
            case 3: return L("TRADEMARK", SCENES_KEY)
            default: return L("UNKNOWN", SCENES_KEY)
        }
    }

    const _onChangeTable = (pagination: any) => {
        setpageSize(pagination.pageSize);
        setpageIndex(pagination.current);
    };

    var timeout: any = 0;
    const _onchangeInput = (text: any) => {
        if (timeout) {
            clearTimeout(timeout);
        };

        timeout = setTimeout(function () {
            setvalueSearch([text.target.value, valueSearch[1]]);
        }, 500);
    };

    const onFill = (value: any) => {
    };

    const _restartData = () => {
        _loadData(true);
    };

    const columns: ColumnsType<ProductAttributeValueSupplier> = [
        {
            title: L("nameAttribute", SCENES_KEY),
            dataIndex: 'nameAttribute',
            key: 'nameAttribute',
            render: (text: string) => {
                return (<>{text}</>);
            }
        },
        {
            title: L("value", SCENES_KEY),
            dataIndex: 'value',
            key: 'value',
            render: (text: string) => {
                return (<>{text}</>);
            }
        },
        {
            title: L("productCount", SCENES_KEY),
            dataIndex: 'productCount',
            key: 'productCount',
            align: "center",
            render: (text: string) => {
                return (<a>{text}</a>);
            }
        },
        {
            title: L("typesAttribute", SCENES_KEY),
            dataIndex: 'typesAttribute',
            key: 'typesAttribute',
            render: (text: number) => {
                return (<>{_convertTypes(text)}</>);
            }
        },
        {
            title: L("categoryName", SCENES_KEY),
            dataIndex: 'categoryName',
            align: "center",
            render: (text: string) => {
                return (<>{text}</>);
            }
        },
        {
            title: L("isActive", SCENES_KEY),
            dataIndex: 'isActive',
            key: 'isActive',
            align: "center",
            render: (text: boolean) => {
                return text ? <Tag color="#52c41a">{L("ISACTIVE_TRUE", SCENES_KEY)}</Tag> : <Tag color="#FF0004">{L("ISACTIVE_FALSE", SCENES_KEY)}</Tag>;
            }
        },
        {
            title: L("isDeleted", SCENES_KEY),
            dataIndex: 'isDeleted',
            align: "center",
            key: 'isDeleted',
            render: (text: boolean) => {
                return text ? <Tag color="#FF0004">{L("ISDELETED_TRUE", SCENES_KEY)}</Tag> : <Tag color="#52c41a">{L("ISDELETED_FALSE", SCENES_KEY)}</Tag>;
            }
        },
        {
            title: L("lastModifierUserName", SCENES_KEY),
            dataIndex: 'lastModifierUserName',
            align: "center",
            render: (text: string) => {
                return (<>{text}</>);
            }
        },
        {
            title: L("lastModificationTime", SCENES_KEY),
            dataIndex: 'lastModificationTime',
            render: (text: Date) => {
                return (<>{moment(text).format('DD/MM/yyyy, h:mm:ss.s a')}</>);
            }
        },
        {
            title: L("ACTION", "COMMON"),
            key: "x",
            width: 120,
            align: 'center',
            render: (text: ProductAttributeValueSupplier) => (
                <>
                    <Tooltip title={L("EDIT", "COMMON")}>
                        <Button
                            type="link"
                            icon={<EditOutlined />}

                        ></Button>
                    </Tooltip>
                    <Tooltip title={true ? L("LOCK", "COMMON") : L("LOCK", "COMMON")}>
                        <Button
                            type="link"
                            icon={true ? <UnlockOutlined /> : <LockOutlined />}
                        ></Button>
                    </Tooltip>
                    <Tooltip title={L("DELETE", "COMMON")}>
                        <Button
                            type="link"
                            icon={<DeleteOutlined />}
                            onClick={() => _deleteValue([text.id.toString()])}
                        ></Button>
                    </Tooltip>
                </>
            ),
        },
    ];

    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: ProductAttributeValueSupplier[]
        ) => {
            setdataSelectFromTable(selectedRowKeys);
        },
        getCheckboxProps: (record: ProductAttributeValueSupplier) => ({
            name: record.value
        }),
    };

    const _onShowModalInsertOrUpdate = (value: ProductAttributeUpdateDto | undefined) => {
        setdataBeginEdit(value);
        setonShowModal(true);
    }

    const _onCloseModalAndResertData = () => {
        setonShowModal(false);
        _restartData();
    }

    // Lựa chọn nhiều bản ghi
    const [disableMultiRow, setDisableMultiRow] = useState<boolean>(true);
    useEffect(() => {
        if (dataSelectFromTable.length > 0) setDisableMultiRow(false);
        if (dataSelectFromTable.length === 0) setDisableMultiRow(true);
    }, [dataSelectFromTable]);

    const onchangeAttribute = (typeAttribute: number) => {
        let DEFAULT_VALUE = -1;
        let s = valueSearch[0];
        setpageIndex(1);
        if (typeAttribute === DEFAULT_VALUE) {
            setvalueSearch([s, '']);
            return;
        }
        setvalueSearch([s, typeAttribute.toString()]);
    }

    const _deleteValue = async (ids: any[]) => {
        console.log('ids', ids);
        var result = await services.deleteAttribute(ids);

        if (result.error || !result.result) {
            notifyError(L("ERROR", "COMMON"), L(result.messageError, SCENES_KEY));
            setDataSource([]);
            setloadingAll(false);
        }
        else {
            setdataSelectFromTable([]);
            notifySuccess(L("SUCCESS", "COMMON"), L("INSERT_SUCCESS", "COMMON") + " : " + result.result.toString());
            _loadData();
            setloadingAll(false);
        }
    }

    const confirmModalFiler = () => {
        modal.confirm({
            title: L("Lọc", "COMMON"),
            icon: <FilterOutlined />,
            content:
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    form={form}>
                    <Row gutter={[5, 5]}>
                        <Col span={24}>
                            <Form.Item
                                label={L("COLUMN_NAME", "COMMON")}
                                name="id"
                            >
                                <Select style={{ minWidth: "180px", width: '100%' }}
                                    defaultValue={-1}
                                    bordered={true}
                                >
                                    <Option value={-1}>{L("ALL", "COMMON")}</Option>
                                    <Option value={0}>{L("ATTRIBUTE", SCENES_KEY)}</Option>
                                    <Option value={1}>{L("UNIT", SCENES_KEY)}</Option>
                                    <Option value={3}>{L("TRADEMARK", SCENES_KEY)}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}> <Form.Item
                            label={L("ENTER_VALUE", "COMMON")}
                            name="value"
                        >
                            <Input />
                        </Form.Item></Col>
                        <Col span={24}> <Form.Item
                            label={L("SORT", "COMMON")}
                            name="sort"
                        >
                            <Select style={{ minWidth: "180px", width: '100%' }}
                                defaultValue={-1}
                                bordered={true}
                            >
                                <Option value={-1}>{L("CANCEL", "COMMON")}</Option>
                                <Option value={0}>{L("ASC_SORT", "COMMON")}</Option>
                                <Option value={1}>{L("DESC_SORT", "COMMON")}</Option>
                            </Select>
                        </Form.Item>
                        </Col>
                    </Row>
                </Form>,
            okText: L("OK", "COMMON"),
            cancelText: L("CANCEL", "COMMON"),
        });
    };

    // button Support Table
    const renderUIHeader = () => {
        return (<Col span={24}>
            <Row gutter={[5, 5]} className="ZrJziiKjUH">
                <Col span={12} className="JUVFCIUZTy">
                    <Tooltip title={L("REFRESH", "COMMON")}>
                        <Button
                            loading={loadingAll}
                            icon={<RedoOutlined />}
                            onClick={() => _restartData()}
                        />
                    </Tooltip>
                    <Tooltip title={L("DELETE", "COMMON")}>
                        <Button
                            loading={loadingAll}
                            disabled={disableMultiRow}
                            icon={<DeleteOutlined />}
                            onClick={() => _deleteValue(dataSelectFromTable)}
                        />
                    </Tooltip>
                    <Tooltip title={L("CHANGE", "COMMON")}>
                        <Button
                            loading={loadingAll}
                            icon={<RetweetOutlined />}
                            onClick={() => _restartData()}
                        />
                    </Tooltip>
                    <Tooltip title={L("CHANGE", "COMMON")}>
                        <ExportFileComponent
                            location={undefined}
                            urlServer="https://docs.oracle.com/cd/E11882_01/server.112/e40540.pdf"
                            paramUri={undefined}
                            border={true}
                        />
                    </Tooltip>
                </Col>
                <Col
                    span={12}
                    className="JUVFCIUZTy"
                    style={{ justifyContent: "flex-end" }}
                >
                    <Tooltip title={L("TREEVIEW", SCENES_KEY)}>
                        <Button
                            loading={loadingAll}
                            icon={<ApartmentOutlined />}
                        />
                    </Tooltip>
                    <Tooltip title={L("Lọc", "COMMON")}>
                        <Button
                            loading={loadingAll}
                            icon={<FilterOutlined />}
                            onClick={confirmModalFiler}
                        />
                    </Tooltip>
                    <Tooltip title={L("Lọc", "COMMON")}>
                        <Select style={{ minWidth: "180px" }}
                            defaultValue={-1}
                            bordered={true}
                            onChange={(value: number) => onchangeAttribute(value)}>
                            <Option value={-1}>{L("ALL", "COMMON")}</Option>
                            <Option value={0}>{L("ATTRIBUTE", SCENES_KEY)}</Option>
                            <Option value={1}>{L("UNIT", SCENES_KEY)}</Option>
                            <Option value={3}>{L("TRADEMARK", SCENES_KEY)}</Option>
                        </Select>
                    </Tooltip>
                </Col>
            </Row>
        </Col>)
    }

    return (
        <>
            <Row gutter={[10, 10]} style={{ height: "calc(100vh - 60px)" }}>
                <Col span={24} className='HjriRZNlsf'>
                    <Row gutter={[5, 10]} className="ZrJziiKjUH">
                        <Col span={12} className="JUVFCIUZTy">
                            <Input
                                className="kkLwRiTajL"
                                allowClear
                                onChange={(text: any) => _onchangeInput(text)}
                                placeholder={L("SEARCH_INPUT", "COMMON")}
                                prefix={<SearchOutlined />}
                            />
                        </Col>
                        <Col
                            span={12}
                            className="JUVFCIUZTy"
                            style={{ justifyContent: "flex-end" }}
                        >
                            <Button
                                loading={loadingAll}
                                type="text"
                                className="whIyGhlXlY"
                                onClick={() => _onShowModalInsertOrUpdate(undefined)}
                            >
                                {<PlusOutlined />} {L("ADD", "COMMON")}
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col className='xutqvxhEdP'>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                        rowKey={(record) => record.id}

                        className='YSrJveZKgb'
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        onChange={(pagination) => _onChangeTable(pagination)}
                        loading={loadingTable || loadingAll}
                        style={{ width: "100%", height: "100%" }}
                        size="small"
                        scroll={{ y: '60vh' }}
                        bordered
                        title={() => renderUIHeader()}
                        pagination={{
                            pageSize: pageSize,
                            total: totalCount,
                            current: pageIndex,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            defaultCurrent: 1,
                            showSizeChanger: true,
                            position: ["bottomRight"],
                            pageSizeOptions: ["1", "10", "20", "50", "100"],
                        }}
                    />
                </Col>
            </Row>
            {contextHolder}
            {onShowModal
                ? (<InsertOrUpdateComponent
                    location={undefined}
                    value={dataBeginEdit}
                    onClose={_onCloseModalAndResertData}
                />)
                : (<></>)
            }
        </>
    )
}