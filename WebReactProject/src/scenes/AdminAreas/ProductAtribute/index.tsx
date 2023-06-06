import { SearchOutlined, PlusOutlined, RedoOutlined, DeleteOutlined, RetweetOutlined, FilterOutlined, SortAscendingOutlined, ApartmentOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Row, Col, Input, Button, Select, Table, Tooltip, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { L } from "../../../lib/abpUtility";
import { ColumnsType } from 'antd/lib/table';
import './style.css';
import '../admin_table.css';
import ExportFileComponent from '../../../components/File/ExportFileComponent';
import { ProductAttributeDto } from './dtos/productAttributeDto';
import InsertOrUpdateComponent from './components/insertOrUpdateComponent';
import { ProductAttributeUpdateDto } from './dtos/productAttributeQuery';
import services from './services';
import { notifyError } from '../../../components/Common/notification';

const { Option } = Select;

const SCENES_KEY = "PRODUCT_ATTRIBUTE";

export interface IAttributeProductProps {
    location: any;
}

export default function AttributeProduct(props: IAttributeProductProps) {

    // Default 
    const [pageSize, setpageSize] = useState<number>(20);
    const [pageIndex, setpageIndex] = useState<number>(1);
    const [totalCount, settotalCount] = useState<number>(0);
    const [propertySearch, setpropertySearch] = useState<string[] | undefined>();
    const [valueSearch, setvalueSearch] = useState<string[]>(['0', '']);
    const [propertyOrder, setpropertyOrder] = useState<string | undefined>();
    const [valueOrderBy, setvalueOrderBy] = useState<boolean | undefined>(undefined);
    const [loadingAll, setloadingAll] = useState<boolean>(false);
    const [loadingTable, setloadingTable] = useState<boolean>(false);
    const [dataSelectFromTable, setdataSelectFromTable] = useState<React.Key[]>([]);
    const [onShowModal, setonShowModal] = useState<boolean>(false);

    // Local
    const [dataSource, setDataSource] = useState<ProductAttributeDto[]>();
    const [dataBeginEdit, setdataBeginEdit] = useState<ProductAttributeUpdateDto | undefined>(undefined);

    //constructor
    useEffect(() => {
        _loadData();
    }, []);

    const _loadData = async () => {
        setloadingAll(true);
        var result = await services.loadAttibute({
            valuesSearch: valueSearch,
            pageIndex: pageIndex,
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
        _loadData();
    }, [valueSearch, pageIndex, pageSize]);

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
            setvalueSearch(text.target.value);
        }, 500);
    };

    const onFill = (value: any) => {
    };

    const _restartData = () => {
        settotalCount(0);
        setloadingTable(false);
        setpageIndex(1);
        setpageSize(20);
    };

    const columns: ColumnsType<ProductAttributeDto> = [
        {
            title: L("name", SCENES_KEY),
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => {
                return (<a>{text}</a>);
            }
        },
        {
            title: L("types", SCENES_KEY),
            dataIndex: 'types',
            key: 'types',
            render: (text: number) => {
                return (<>{_convertTypes(text)}</>);
            }
        },
        {
            title: L("categoryProductName", SCENES_KEY),
            dataIndex: 'categoryProductName',
            render: (text: string) => {
                return (<>{text}</>);
            }
        },
        {
            title: L("isActive", SCENES_KEY),
            dataIndex: 'isActive',
            render: (text: boolean) => {
                return text ? <Tag color="#52c41a">{L("ISACTIVE_TRUE", SCENES_KEY)}</Tag> : <Tag color="#FF0004">{L("ISACTIVE_FALSE", SCENES_KEY)}</Tag>;
            }
        },
        {
            title: L("isDeleted", SCENES_KEY),
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            render: (text: boolean) => {
                return text ? <Tag color="#FF0004">{L("ISDELETED_TRUE", SCENES_KEY)}</Tag> : <Tag color="#52c41a">{L("ISDELETED_FALSE", SCENES_KEY)}</Tag>;
            }
        },
        {
            title: L("lastModifierUserName", SCENES_KEY),
            dataIndex: 'lastModifierUserName',
            render: (text: string) => {
                return (<>{text}</>);
            }
        },
        {
            title: L("lastModificationTime", SCENES_KEY),
            dataIndex: 'lastModificationTime',
            render: (text: Date) => {
                return (<>{text}</>);
            }
        },
        {
            title: L("ACTION", "COMMON"),
            key: "x",
            width: 120,
            align: 'center',
            render: (text: ProductAttributeDto) => (
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
                        ></Button>
                    </Tooltip>
                </>
            ),
        },
    ];

    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: ProductAttributeDto[]
        ) => {
            setdataSelectFromTable(selectedRowKeys);
        },
        getCheckboxProps: (record: ProductAttributeDto) => ({
            name: record.name
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
                            onClick={() => _restartData()}
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
                            onClick={() => _restartData()}
                        />
                    </Tooltip>
                    <Tooltip title={L("Lọc", "COMMON")}>
                        <Button
                            loading={loadingAll}
                            icon={<FilterOutlined />}
                            onClick={() => _restartData()}
                        />
                    </Tooltip>
                    <Tooltip title={L("Lọc", "COMMON")}>
                        <Select style={{ minWidth: "180px" }} defaultValue={0} bordered={true} onChange={(value: number) => { var s = valueSearch[1]; setvalueSearch([value.toString(), s]) }}>
                            <Option value={0}>{L("ATTRIBUTE", SCENES_KEY)}</Option>
                            <Option value={1}>{L("UNIT", SCENES_KEY)}</Option>
                            <Option value={2}>{L("SPECIFICATIONS", SCENES_KEY)}</Option>
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
                        rowKey="id"
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            defaultCurrent: 1,
                            showSizeChanger: true,
                            position: ["bottomRight"],
                            pageSizeOptions: ["1", "10", "20", "50", "100"],
                        }}
                    />
                </Col>
            </Row>
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