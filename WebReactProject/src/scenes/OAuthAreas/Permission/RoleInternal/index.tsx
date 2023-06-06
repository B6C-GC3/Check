//#region  import
import * as React from "react";
import { useEffect, useState } from "react";
import { L } from "../../../../lib/abpUtility";
import {
    Button, Col, Form, Input, Modal, Row, Select, Table, Tag, Tooltip
} from "antd";
import {
    DeleteOutlined, EditOutlined, ExclamationCircleOutlined, FilterOutlined, PartitionOutlined, PlusOutlined, RedoOutlined, RetweetOutlined, SearchOutlined, SortAscendingOutlined, UsergroupAddOutlined,
} from "@ant-design/icons";
import moment from "moment";
import utils from "../../../../utils/utils";
import './style.css'
import services from './services';
import { notifyError } from "../../../../components/Common/notification";
import InsertOrUpdate from "./components/insertOrUpdate";
import { RoleInternalReadDto } from "./dtos/roleInternalReadDto";
import PermissionInternal from "./components/permissionInternal";

const { Option } = Select;

declare var abp: any;
//#endregion

export interface IRoleInternal {
    location: any;
}

const LocationKey = "ROLE_INTERNAL";

export default function RoleInternal(props: IRoleInternal) {

    //#region START
    const [pageSize, setpageSize] = useState<number>(20);
    const [pageIndex, setpageIndex] = useState<number>(1);
    const [totalCount, settotalCount] = useState<number>(0);
    const [propertySearch, setpropertySearch] = useState<string[] | undefined>(undefined);
    const [valueSearch, setvalueSearch] = useState<string[] | undefined>(undefined);
    const [propertyOrder, setpropertyOrder] = useState<string | undefined>();
    const [valueOrderBy, setvalueOrderBy] = useState<boolean | undefined>(undefined);
    const [data, setdata] = useState<RoleInternalReadDto[]>([]);

    const [dataBeginEdit, setdataBeginEdit] = useState<RoleInternalReadDto | undefined>(undefined);
    const [onShowModal, setonShowModal] = useState<boolean>(false);
    const [onShowModalPermision, setonShowModalPermision] = useState<boolean>(true);

    const [loadingAll, setloadingAll] = useState<boolean>(false);
    const [loadingTable, setloadingTable] = useState<boolean>(false);
    const [dataSelectFromTable, setdataSelectFromTable] = useState<React.Key[]>([]);

    //#endregion
    //#region RESTART
    const fetdataSearch = async () => {
        setloadingTable(true);
        let result = await services.GetAllRoleByMyTenant({
            propertySearch: propertySearch,
            valuesSearch: valueSearch,
            propertyOrder: propertyOrder,
            valueOrderBy: valueOrderBy,
            pageIndex: pageIndex,
            pageSize: pageSize
        });

        if (result && !result.error) {
            setdata(result.result.items);
            setpageIndex(result.result.pageIndex);
            setpageSize(result.result.pageSize);
            settotalCount(result.result.totalCount);
        }
        else {

        }
        setloadingTable(false);
    }

    const _reloadData = () => {
        setdata([]);
        fetdataSearch();
    }

    const _restartData = () => {
        setdata([]);
        setvalueSearch([]);
        settotalCount(0);
        setloadingTable(false);
        setpageIndex(1);
        setpageSize(20);
    };
    //#endregion
    //#region TABLE
    const columns = [
        {
            title: L("displayName", LocationKey),
            dataIndex: "displayName",
            key: 'displayName'
        },
        {
            title: L("tenantName", LocationKey),
            dataIndex: "tenantName",
            key: 'tenantName',
            render: (text: string) =>
                text ? (
                    text
                ) : (
                    <Tag color={utils._randomColor(1)}>Null</Tag>
                ),
        },
        {
            title: L("isDefault", LocationKey),
            dataIndex: "isDefault",
            key: "isDefault",
            render: (text: boolean) =>
                text === true ? (
                    <Tag color={utils._randomColor(text)}>True</Tag>
                ) : (
                    <Tag color={utils._randomColor(text)}>False</Tag>
                ),
        },
        {
            title: L("isDeleted", LocationKey),
            dataIndex: "isDeleted",
            key: "isDeleted",
            render: (text: boolean) =>
                text === true ? (
                    <Tag color={utils._randomColor(text)}>True</Tag>
                ) : (
                    <Tag color={utils._randomColor(text)}>False</Tag>
                ),
        },
        {
            title: L("isStatic", LocationKey),
            dataIndex: "isStatic",
            key: "isStatic",
            render: (text: boolean) =>
                text === true ? (
                    <Tag color={utils._randomColor(text)}>True</Tag>
                ) : (
                    <Tag color={utils._randomColor(text)}>False</Tag>
                ),
        },
        {
            title: L("lastModifierUserName", LocationKey),
            dataIndex: "lastModifierUserName",
            key: 'lastModifierUserName',
            render: (text: string) =>
                text !== null && (text.toUpperCase() !== "ADMIN" || text.toUpperCase() !== "SYSTEM") ? (
                    <Tag color="#b3d4ff">{text}</Tag>
                ) : (
                    <Tag color="#2db7f5">{"SYSTEM"}</Tag>
                ),
        },
        {
            title: L("lastModificationTime", LocationKey),
            dataIndex: "lastModificationTime",
            key: 'lastModificationTime',
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss"),
        },
        {
            title: L("ACTION", "COMMON"),
            key: "X",
            width: 120,
            render: (text: RoleInternalReadDto) => (
                <div style={{ textAlign: "center" }}>
                    <Tooltip title={L("EDIT", "COMMON")}>
                        <Button
                            type="link"
                            disabled={text.isDeleted}
                            icon={<EditOutlined />}
                            onClick={() => { onFill(text); setonShowModal(!onShowModal); }}
                        ></Button>
                    </Tooltip>
                    <Tooltip title={L("USER", "COMMON")}>
                        <Button
                            type="link"
                            disabled={text.isDeleted}
                            icon={<UsergroupAddOutlined />}
                            onClick={() => { onFill(text); }}
                        ></Button>
                    </Tooltip>
                    <Tooltip title={L("PERMISSION", "COMMON")}>
                        <Button
                            type="link"
                            disabled={text.isDeleted}
                            icon={<PartitionOutlined />}
                            onClick={() => { onFill(text); setonShowModalPermision(true); }}
                        ></Button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: RoleInternalReadDto[]
        ) => {
            setdataSelectFromTable(selectedRowKeys);
        },
        getCheckboxProps: (record: RoleInternalReadDto) => ({
            name: record.name,
            disabled: record.isDeleted == true
        }),
    };

    //#endregion

    useEffect(() => {
        fetdataSearch();
    }, []);

    useEffect(() => {
        fetdataSearch();
    }, [pageIndex, pageSize, valueSearch]);

    //#region REMOVE
    const _removeItemSelect = () => {
        Modal.confirm({
            title: <>{L("WANNING_PROCESSS_DELETE", "COMMON")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <>{L("CONTENT_PROCESSS_DELETE", "COMMON")}</>,
            okText: <>{L("OK", "COMMON")}</>,
            cancelText: <>{L("CANCEL", "COMMON")}</>,
            onOk: () => {
                _restartData();
            },
        });
    };
    //#endregion
    //#region EDIT STATUS
    const _editItemSelect = () => {
        Modal.confirm({
            title: <>{L("WANNING_EDIT", "COMMON")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <>{L("CONTENT_EDIT", "COMMON")}</>,
            okText: <>{L("OK", "COMMON")}</>,
            cancelText: <>{L("CANCEL", "COMMON")}</>,
            onOk: () => {
                _restartData();
            },
        });
    };
    //#endregion
    //#region INSERT OR UPDATE FORM DATA

    const onFill = (value: RoleInternalReadDto | undefined) => {
        setdataBeginEdit(value);
    };

    const _searchDataOnClick = (page: number, pageSize: number) => {
        setpageSize(pageSize);
        setpageIndex(page);
    };

    var timeout: any = 0;
    const _onchangeInput = (text: any) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            setvalueSearch(text.target.value);
        }, 500);
    };

    const _selectFileExport = (value: any) => {
    }
    //#endregion
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
                                block
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
                                block
                                onClick={() => _restartData()}
                            >
                                {<RedoOutlined />}{L("REFRESH", "COMMON")}
                            </Button>
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => _removeItemSelect()}
                                disabled={dataSelectFromTable.length === 0}
                                block
                            >
                                {<DeleteOutlined />}{L("DELETE", "COMMON")}
                            </Button>
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => _editItemSelect()}
                                disabled={dataSelectFromTable.length === 0}
                                block
                            >{<RetweetOutlined />} {L("CHANGE", "COMMON")}</Button>
                            <Select
                                placeholder={L("REPORT_FILE", "COMMON")}
                                bordered={false}
                                onChange={(value: any) => _selectFileExport(value)}
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
                                block
                                onClick={() => _restartData()}
                            >
                                {<FilterOutlined />}{L("REFRESH", "COMMON")}
                            </Button>
                            <Button
                                loading={loadingAll}
                                type="text"
                                onClick={() => _removeItemSelect()}
                                disabled={dataSelectFromTable.length === 0}
                                block
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
                        columns={columns}
                        dataSource={data}
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        rowKey={(record: RoleInternalReadDto) => record.id}
                        loading={loadingTable}
                        style={{ width: "100%" }}
                        size="small"
                        pagination={{
                            pageSize: pageSize,
                            total: totalCount,
                            defaultCurrent: 1,
                            onChange: (page: number, pageSize: number | undefined) =>
                                _searchDataOnClick(page, pageSize ?? 20),
                            showSizeChanger: true,
                            pageSizeOptions: ["1", "10", "20", "50", "100"],
                        }}
                    />
                </Col>

                {onShowModal ? <InsertOrUpdate
                    location={undefined}
                    value={dataBeginEdit}
                    onClose={() => { setonShowModal(false); _reloadData(); }} />
                    : <></>}

                {/* {onShowModalPermision ? <PermissionInternal
                    location={undefined}
                    value={dataBeginEdit}
                    onClose={() => { setonShowModalPermision(false); _reloadData(); }} />
                    : <></>} */}
            </Row>
        </>
    )
};