import { SearchOutlined, PlusOutlined, RedoOutlined, DeleteOutlined, RetweetOutlined, FilterOutlined, SortAscendingOutlined, MenuOutlined } from '@ant-design/icons';
import { Row, Col, Input, Button, Select, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { L } from "../../../lib/abpUtility";
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { ColumnsType } from 'antd/lib/table';
import { arrayMoveImmutable } from 'array-move';
import './style.css';
import UriManage from '../../../utils/uriManage';
import { SupplierInfoDto } from './dataTypes/supplierInfoDto';
import service from './service';
import { notifyError } from '../../../components/Common/notification';

const { Option } = Select;

const SCENES_KEY = "SUPPLIER_INFO";

export interface ISupplierInfoProps {
    location: any;
}

export default function SupplierInfo(props: ISupplierInfoProps) {
    // Default 
    const [pageSize, setpageSize] = useState<number>(20);
    const [pageIndex, setpageIndex] = useState<number>(1);
    const [totalCount, settotalCount] = useState<number>(0);
    const [propertySearch, setpropertySearch] = useState<string[] | undefined>(undefined);
    const [valueSearch, setvalueSearch] = useState<string[] | undefined>(undefined);
    const [propertyOrder, setpropertyOrder] = useState<string | undefined>();
    const [valueOrderBy, setvalueOrderBy] = useState<boolean | undefined>(undefined);
    const [loadingAll, setloadingAll] = useState<boolean>(false);
    const [loadingTable, setloadingTable] = useState<boolean>(false);
    const [dataSelectFromTable, setdataSelectFromTable] = useState<React.Key[]>([]);

    // Local
    const [dataSource, setDataSource] = useState<SupplierInfoDto[]>([]);

    //constructor
    useEffect(() => {
        getDataInit();
    }, []);

    const getDataInit = async () => {
        setloadingAll(true);
        var result = await service.getPagelist({
            pageIndex: 0,
            pageSize: 20
        });

        if (result && result.error) {
            notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
        }
        else {
            setDataSource(result.result.items);
        }
        setloadingAll(false);
    }

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
        setvalueSearch([]);
        settotalCount(0);
        setloadingTable(false);
        setpageIndex(1);
        setpageSize(20);
    };

    const statusConvert = (status: number) => {
        switch (status) {
            case 0: return L("StatusZero", "SUPPLIER_REGISTER");
            case 1: return L("StatusOne", "SUPPLIER_REGISTER");
            case 2: return L("StatusTwo", "SUPPLIER_REGISTER");
            case 3: return L("StatusThree", "SUPPLIER_REGISTER");
            case 4: return L("StatusFour", "SUPPLIER_REGISTER");
            case 5: return L("StatusFive", "SUPPLIER_REGISTER");
            case 6: return L("StatuSix", "SUPPLIER_REGISTER");
            default: return L("StatusZero", "SUPPLIER_REGISTER");
        }
    }

    const columns: ColumnsType<SupplierInfoDto> = [
        {
            title: L("NameShop", SCENES_KEY),
            dataIndex: "nameShop",
            key: "nameShop",
            className: "drag-visible",
            render: (text: string) => {
                return <>{text}</>;
            },
        },
        {
            title: L("NumberPhone", SCENES_KEY),
            dataIndex: "numberPhone",
            key: "numberPhone",
            className: "drag-visible",
            render: (text: string) => {
                return <>{text}</>;
            },
        },
        {
            title: L("Email", SCENES_KEY),
            dataIndex: "email",
            key: "email",
            className: "drag-visible",
            render: (text: string) => {
                return <>{text}</>;
            },
        },
        {
            title: L("LinkShop", SCENES_KEY),
            dataIndex: "linkShop",
            key: "linkShop",
            className: "drag-visible",
            render: (text: string) => {
                return <a href={text}>{text}</a>;
            },
        },
        {
            title: L("Adress", SCENES_KEY),
            dataIndex: "adress",
            key: "adress",
            className: "drag-visible",
            render: (text: string) => {
                return <>{text.length > 20 ? text.slice(0, 20) + "..." : text}</>;
            },
        },
        {
            title: L("Url", SCENES_KEY),
            dataIndex: "url",
            key: "url",
            className: "drag-visible",
            render: (text: string) => {
                return <a href={text}>{text}</a>;
            },
        },
        {
            title: L("DefaultLanguageName", SCENES_KEY),
            dataIndex: "defaultLanguageName",
            key: "defaultLanguageName",
            className: "drag-visible",
            render: (text: string) => {
                return <>{text}</>;
            },
        },
        {
            title: L("Status", SCENES_KEY),
            dataIndex: "status",
            key: "status",
            className: "drag-visible",
            render: (text: number) => {
                return <Tag color={text === 3 ? '#7ED321' : '#ff0000'}>{statusConvert(text)}</Tag>;
            },
        }
    ];

    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: SupplierInfoDto[]
        ) => {
            setdataSelectFromTable(selectedRowKeys);
        }
    };

    return (
        <>
            <Row gutter={[10, 10]}>
                <Col span={24}>
                    <Row gutter={[10, 10]} className="ZrJziiKjUH">
                        <Col span={12} className="JUVFCIUZTy">
                            <Input
                                className="kkLwRiTajL"
                                allowClear
                                onChange={(text: any) => _onchangeInput(text)}
                                placeholder={L("SEARCH_INPUT", "COMMON")}
                                prefix={<SearchOutlined />} />
                        </Col>
                        <Col span={12} className="JUVFCIUZTy" style={{ justifyContent: "flex-end" }}>
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => {
                                    onFill(undefined);
                                }}
                            >{<PlusOutlined />} {L("ADD", "COMMON")}</Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[10, 10]} className="ZrJziiKjUH">
                        <Col span={12} className="JUVFCIUZTy">
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => _restartData()}
                            >
                                {<RedoOutlined />}{L("REFRESH", "COMMON")}
                            </Button>
                            <Button
                                loading={loadingAll}
                                type="text"
                            >
                                {<DeleteOutlined />}{L("DELETE", "COMMON")}
                            </Button>
                            <Button
                                loading={loadingAll}
                                type="text"
                            >{<RetweetOutlined />} {L("CHANGE", "COMMON")}</Button>
                            <Select
                                placeholder={L("REPORT_FILE", "COMMON")}
                                bordered={false}
                            >
                                <Option value={0}>{L("SELECT", "COMMON")}</Option>
                                <Option value={1}>{L("EXCEL", "COMMON")}</Option>
                                <Option value={2}>{L("PDF", "COMMON")}</Option>
                                <Option value={3}>{L("ALL", "COMMON")}</Option>
                            </Select>
                        </Col>
                        <Col span={12} className="JUVFCIUZTy" style={{ justifyContent: "flex-end" }}>
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => _restartData()}
                            >
                                {<FilterOutlined />}{L("REFRESH", "COMMON")}
                            </Button>
                            <Button
                                loading={loadingAll}
                                type="text"
                            >
                                {<SortAscendingOutlined />}{L("DELETE", "COMMON")}
                            </Button>
                            <Select
                                placeholder={L("REPORT_FILE", "COMMON")}
                                bordered={false}
                            >
                                <Option value={0}>{L("SELECT", "COMMON")}</Option>
                                <Option value={1}>{L("EXCEL", "COMMON")}</Option>
                                <Option value={2}>{L("PDF", "COMMON")}</Option>
                                <Option value={3}>{L("ALL", "COMMON")}</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col style={{ margin: "10px 0", width: "100%" }}>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        rowKey="index"
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        loading={loadingTable || loadingAll}
                        style={{ width: "100%" }}
                        size="small"
                        pagination={{
                            pageSize: pageSize,
                            total: totalCount,
                            defaultCurrent: 1,
                            onChange: (page: number, pageSize: number | undefined) =>
                                _searchDataOnClick(page, pageSize ?? 20),
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "20", "50", "100"],
                        }}
                    />
                </Col>
            </Row>
        </>
    )
}