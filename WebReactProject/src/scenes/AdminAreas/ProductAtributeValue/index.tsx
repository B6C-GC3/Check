import { SearchOutlined, PlusOutlined, RedoOutlined, DeleteOutlined, RetweetOutlined, FilterOutlined, SortAscendingOutlined, MenuOutlined, ApartmentOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Row, Col, Input, Button, Select, Table, Tooltip, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { L } from "../../../lib/abpUtility";
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { ColumnsType } from 'antd/lib/table';
import { arrayMoveImmutable } from 'array-move';
import './style.css';
import '../admin_table.css';
import UriManage from '../../../utils/uriManage';
import ExportFileComponent from '../../../components/File/ExportFileComponent';
import { ProductAttributeValueDto } from './dtos/productAttributeValueDto';
import InsertOrUpdateComponent from './components/insertOrUpdateComponent';
import { ProductAttributeUpdateDto } from './dtos/productAttributeValueQuery';
import services from './services';
import { notifyError } from '../../../components/Common/notification';

const { Option } = Select;

const SCENES_KEY = "PRODUCT_ATTRIBUTE_VALUE";

export interface IProductAttributeValueProps {
    location: any;
}

export default function ProductAttributeValue(props: IProductAttributeValueProps) {

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
    const [dataSource, setDataSource] = useState<ProductAttributeValueDto[]>();
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
            console.log('result.result.items :>> ', result.result.items);
            setloadingAll(false);
        }
    }

    useEffect(() => {
        _loadData();
    }, [valueSearch, pageIndex, pageSize]);

    const _searchDataOnClick = (page: number, pageSize: number) => {
        setpageSize(pageSize);
        setpageIndex(page);
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
        //setvalueSearch([valueSearch[0], valueSearch[1]]);
        settotalCount(0);
        setloadingTable(false);
        setpageIndex(1);
        setpageSize(20);
    };

    const columns: ColumnsType<ProductAttributeValueDto> = [
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
                return (<>{text}</>);
            }
        },
        {
            title: L("isActive", SCENES_KEY),
            dataIndex: 'isActive',
            render: (text: boolean) => {
                return text ? <Tag color="#52c41a">{L("ISACTIVE_TRUE",SCENES_KEY)}</Tag> : <Tag color="#FF0004">{L("ISACTIVE_FALSE",SCENES_KEY)}</Tag>;
            }
        },
        {
            title: L("isDeleted", SCENES_KEY),
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            render: (text: boolean) => {
                return text ? <Tag color="#FF0004">{L("ISDELETED_TRUE",SCENES_KEY)}</Tag> : <Tag color="#52c41a">{L("ISDELETED_FALSE",SCENES_KEY)}</Tag>;
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
            render: (text: ProductAttributeValueDto) => (
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
            selectedRows: ProductAttributeValueDto[]
        ) => {
            setdataSelectFromTable(selectedRowKeys);
        },
        getCheckboxProps: (record: ProductAttributeValueDto) => ({
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

    return (
        <>
            <Row gutter={[10, 10]}>
                <Col span={24}>
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
                <Col span={24}>
                    <Row gutter={[5, 5]} className="ZrJziiKjUH">
                        <Col span={12} className="JUVFCIUZTy">
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => _restartData()}
                            >
                                {<RedoOutlined />}
                                {L("REFRESH", "COMMON")}
                            </Button>
                            <Button loading={loadingAll} type="text">
                                {<DeleteOutlined />}
                                {L("DELETE", "COMMON")}
                            </Button>
                            <Button loading={loadingAll} type="text">
                                {<RetweetOutlined />} {L("CHANGE", "COMMON")}
                            </Button>
                            <ExportFileComponent
                                location={undefined}
                                urlServer="https://docs.oracle.com/cd/E11882_01/server.112/e40540.pdf"
                                paramUri={undefined} type={[]}                            />
                        </Col>
                        <Col
                            span={12}
                            className="JUVFCIUZTy"
                            style={{ justifyContent: "flex-end" }}
                        >
                            <Button loading={loadingAll} type="text">
                                {<ApartmentOutlined />}
                                {L("TREEVIEW", SCENES_KEY)}
                            </Button>
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => _restartData()}
                            >
                                {<FilterOutlined />}
                                {L("Lọc cấp cao", "COMMON")}
                            </Button>
                            <Button loading={loadingAll} type="text">
                                {<SortAscendingOutlined />}
                                {L("Cấp độ hiển thị", "COMMON")}
                            </Button>
                            <Select defaultValue={0} bordered={false} onChange={(value: number) => { var s = valueSearch[1]; setvalueSearch([value.toString(), s]) }}>
                                <Option value={0}>{L("ATTRIBUTE", SCENES_KEY)}</Option>
                                <Option value={1}>{L("UNIT", SCENES_KEY)}</Option>
                                <Option value={2}>{L("SPECIFICATIONS", SCENES_KEY)}</Option>
                                <Option value={3}>{L("TRADEMARK", SCENES_KEY)}</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col className='xutqvxhEdP'>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        rowKey="id"
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        loading={loadingTable || loadingAll}
                        style={{ width: "100%" }}
                        size="small"
                        scroll={{ y: '60vh' }}
                        pagination={{
                            pageSize: pageSize,
                            total: totalCount,
                            defaultCurrent: 1,
                            showSizeChanger: true,
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