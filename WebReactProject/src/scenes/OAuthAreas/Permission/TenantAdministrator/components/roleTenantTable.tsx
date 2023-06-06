import { Button, Col, Input, Modal, Row, Select, Table, Tag, Tooltip } from 'antd';
import { L } from "../../../../../lib/abpUtility";
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, FilterOutlined, PartitionOutlined, PlusOutlined, RedoOutlined, RetweetOutlined, SearchOutlined, SettingOutlined, SortAscendingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import services from '../services';
import { notifyError, notifySuccess } from '../../../../../components/Common/notification';
import { ToClientExceptionNotifyError } from '../../../../../services/dto/clientExceptionDto';
import { TenantBasicDto } from '../dtos/tenantDto';
import { ColumnsType } from 'antd/es/table';
import PermissionTenant from './permissionTenant';

import './insertOrUpdate.css';
import utils from '../../../../../utils/utils';
import moment from "moment";
import { RoleTenantReadDto } from '../dtos/permissionTenantDto';
import InsertOrUpdateRole from './insertOrUpdateRole';
const { Option } = Select;

declare var abp: any;

const LocationKey = "CONST_TENANT";


export interface IRoleTenantTableProps {
    location: any;
    value: TenantBasicDto | undefined;
    roleId?: number;
    onClose: () => void;
}

export default function RoleTenantTable(props: IRoleTenantTableProps) {
    const [pageSize, setpageSize] = useState<number>(20);
    const [pageIndex, setpageIndex] = useState<number>(1);
    const [totalCount, settotalCount] = useState<number>(0);
    const [propertySearch, setpropertySearch] = useState<string[] | undefined>(undefined);
    const [valueSearch, setvalueSearch] = useState<string[] | undefined>(undefined);
    const [propertyOrder, setpropertyOrder] = useState<string | undefined>();
    const [valueOrderBy, setvalueOrderBy] = useState<boolean | undefined>(undefined);

    const [loadingAll, setloadingAll] = useState<boolean>(false);
    const [loadingTable, setloadingTable] = useState<boolean>(false);
    const [isModalVisible, setisModalVisible] = useState<boolean>(true);
    const [loadingButton, setloadingButton] = useState<boolean>(false);

    const [dataSelectFromTable, setdataSelectFromTable] = useState<React.Key[]>([]);
    const [onShowModalPermision, setonShowModalPermision] = useState<boolean>(false);
    const [onShowModalAddRole, setonShowModalAddRole] = useState<boolean>(false);
    const [data, setdata] = useState<RoleTenantReadDto[]>([]);
    const [dataRoleTenantReadDto, setdataRoleTenantReadDto] = useState<RoleTenantReadDto | undefined>(undefined);
    const [roleIdSelect, setroleIdSelect] = useState<number | undefined>(undefined);
    useEffect(() => {
        if (!isModalVisible) {
            props.onClose();
        }
    }, [isModalVisible]);

    useEffect(() => {
        if (props.value && props.value.id && props.value.id != 0) {
            fetdataSearch();
        }
        else {
            props.onClose();
        }
    }, [])

    const onFill = (value: any) => {
        setdataRoleTenantReadDto(value);
    };

    const fetdataSearch = async () => {
        setloadingTable(true);

        if (props.value && props.value.id != 0) {
            let result = await services.GetAllRoleByTenantId({
                propertySearch: propertySearch,
                valuesSearch: valueSearch,
                propertyOrder: propertyOrder,
                valueOrderBy: valueOrderBy,
                pageIndex: pageIndex,
                pageSize: pageSize
            }, props.value.id);

            if (result && !result.error) {
                setdata(result.result.items);
                setpageIndex(result.result.pageIndex);
                setpageSize(result.result.pageSize);
                settotalCount(result.result.totalCount);
            }
            else {

            }
        }
        setloadingTable(false);
    }

    const _reloadData = () => {
        fetdataSearch();
    }

    const _restartData = () => {
        setvalueSearch([]);
        settotalCount(0);
        setloadingTable(false);
        setpageIndex(1);
        setpageSize(20);
    };

    const columns: ColumnsType<RoleTenantReadDto> = [
        {
            title: L("displayName", LocationKey),
            dataIndex: "displayName",
            width: 200,
            fixed: 'left',
            key: 'displayName'
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
            width: 200,
            render: (text: RoleTenantReadDto) => (
                <div style={{ textAlign: "start" }}>
                    <Tooltip title={L("EDIT", "COMMON")}>
                        <Button
                            type="link"
                            disabled={text.isDeleted}
                            icon={<EditOutlined />}
                            onClick={() => { onFill(text); setonShowModalAddRole(true); }}
                        ></Button>
                    </Tooltip>
                    <Tooltip title={L("PERMISSION", "COMMON")}>
                        <Button
                            type="link"
                            disabled={text.isDeleted}
                            icon={<PartitionOutlined />}
                            onClick={() => { onFill(text); setonShowModalPermision(true); setroleIdSelect(text.id); }}
                        ></Button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: RoleTenantReadDto[]
        ) => {
            setdataSelectFromTable(selectedRowKeys);
        },
        getCheckboxProps: (record: RoleTenantReadDto) => ({
            name: record.name,
            disabled: record.isDeleted == true
        }),
    };

    const _searchDataOnClick = (page: number, pageSize: number) => {
        setpageSize(pageSize);
        setpageIndex(page);
    };

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

    const _notificationEdit = () => {
        Modal.confirm({
            title: <>{L("WANNING_PROCESSS_DELETE", "COMMON")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <>{L("CONTENT_CANCEL_EDIT", "COMMON")}</>,
            okText: <>{L("OK", "COMMON")}</>,
            cancelText: <>{L("CANCEL", "COMMON")}</>,
            onOk: () => {
                setisModalVisible(false);
                props.onClose();
            },
            onCancel: () => {
                setisModalVisible(true);
            },
        });
    };

    const _onOkModalAddOrEdit = async () => {
        setloadingButton(true);
        Modal.confirm({
            title: <>{L("WANNING_CHANGE", LocationKey)}</>,
            icon: <ExclamationCircleOutlined />,
            content: <>{L("WANNING_CHANGE_PERMISSION", LocationKey)}</>,
            okText: <>{L("OK", "COMMON")}</>,
            cancelText: <>{L("CANCEL", "COMMON")}</>,
            onOk: async () => {
                alert("asdas");
            },
            onCancel: () => {
                setisModalVisible(true);
            },
        });
        setloadingButton(false);
    };

    const _onCancelModalAddOrEdit = () => {
        setisModalVisible(false);
    };

    return (
        <>
            <Modal
                title={<>{L("TITLE_ROLE_TENANT", LocationKey)}</>}
                visible={isModalVisible}
                className="ZwXQAkpaPr veAGnGtafE"
                onOk={() => {
                    _onOkModalAddOrEdit();
                }}
                onCancel={() => {
                    _onCancelModalAddOrEdit();
                }}
                footer={false}
                maskClosable={false}
                confirmLoading={loadingButton}
            >
                <Row gutter={[6, 6]}>
                    <Col span={24}>
                        <Row gutter={[10, 10]} className="ZrJziiKjUH">
                            <Col span={12} className="JUVFCIUZTy">
                                <Input
                                    className="kkLwRiTajL"
                                    allowClear
                                    placeholder={L("SEARCH_INPUT", "COMMON")}
                                    prefix={<SearchOutlined />} />
                            </Col>
                            <Col span={12} className="JUVFCIUZTy" style={{ justifyContent: "flex-end" }}>
                                <Button
                                    loading={loadingAll}
                                    type="text"
                                    onClick={() => {
                                        onFill(undefined); setonShowModalAddRole(true);
                                    }}
                                >{<PlusOutlined />} {L("ADD", "COMMON")}
                                </Button>
                                <Button
                                    loading={loadingAll}
                                    type="text"
                                    onClick={() => {
                                        setonShowModalPermision(true); setroleIdSelect(undefined);
                                    }}
                                >{<SettingOutlined />} {L("ADD_ROLE_PERMISSION", LocationKey)}
                                </Button>
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
                                    onClick={() => _removeItemSelect()}
                                    disabled={dataSelectFromTable.length === 0}
                                >
                                    {<DeleteOutlined />}{L("DELETE", "COMMON")}
                                </Button>
                                <Button
                                    loading={loadingAll}
                                    type="text"
                                    onClick={() => _editItemSelect()}
                                    disabled={dataSelectFromTable.length === 0}
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
                                    onClick={() => _removeItemSelect()}
                                    disabled={dataSelectFromTable.length === 0}
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
                    <Col>
                        <Table
                            columns={columns}
                            className="MKQwWLyiyn"
                            dataSource={data}
                            scroll={{ scrollToFirstRowOnChange: true, y: 400, x: 1200 }}
                            rowSelection={{
                                type: "checkbox",
                                ...rowSelection,
                            }}
                            rowKey={(record: RoleTenantReadDto) => record.id}
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
                </Row>
            </Modal>

            {onShowModalPermision ? <PermissionTenant
                location={props.location}
                roleId={roleIdSelect}
                value={props.value}
                onClose={() => { setonShowModalPermision(false); _reloadData(); }} />
                : <></>}

            {onShowModalAddRole && props.value ? <InsertOrUpdateRole
                location={props.location}
                idTenant={props.value.id}
                value={dataRoleTenantReadDto}
                onClose={() => { setonShowModalAddRole(false); _reloadData(); }} />
                : <></>}
        </>
    )
}