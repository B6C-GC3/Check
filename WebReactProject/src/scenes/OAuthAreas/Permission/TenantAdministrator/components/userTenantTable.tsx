import { Button, Col, Input, Modal, Row, Select, Table, Tag, Tooltip } from 'antd';
import { L } from "../../../../../lib/abpUtility";
import React, { Key, useEffect, useState } from 'react';
import { ApiOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, FilterOutlined, PlusOutlined, RedoOutlined, RetweetOutlined, SearchOutlined, SortAscendingOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import './insertOrUpdate.css'
import services from '../services';
import moment from "moment";
import { notifyError, notifySuccess } from '../../../../../components/Common/notification';
import { ToClientExceptionNotifyError } from '../../../../../services/dto/clientExceptionDto';
import { TenantBasicDto } from '../dtos/tenantDto';
import { ColumnsType } from 'antd/es/table';
import InsertOrUpdateUserTenant from './userTenantInsertOrUpdate';
import { UserTenantReviewDto } from '../dtos/userTenantDto';
import { result } from 'lodash';
import utils from '../../../../../utils/utils';

const { Option } = Select;

declare var abp: any;

const LocationKey = "CONST_TENANT";

export interface IUserTenantTableProps {
    location: any;
    value: TenantBasicDto | undefined;
    onClose: () => void;
}

export default function UserTenantTable(props: IUserTenantTableProps) {

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
    const [dataUserTenant, setdataUserTenant] = useState<UserTenantReviewDto[]>([]);

    const [isModalVisible, setisModalVisible] = useState<boolean>(true);
    const [loadingButton, setloadingButton] = useState<boolean>(false);

    const [onShowAddOrUpdateUser, setonShowAddOrUpdateUser] = useState<boolean>(false);

    const fetdataSearch = async () => {
        setloadingTable(true);
        var result = await services.UserTenantGetAll({
            propertySearch: propertySearch,
            valuesSearch: valueSearch,
            propertyOrder: propertyOrder,
            valueOrderBy: valueOrderBy,
            pageIndex: pageIndex,
            pageSize: pageSize
        });

        if (result && !result.error) {
            setdataUserTenant(result.result.items);
            setpageIndex(result.result.pageIndex);
            setpageSize(result.result.pageSize);
            settotalCount(result.result.totalCount);
        }
        else {

        }
        setloadingTable(false);
    }

    useEffect(() => {
        if (props.value) {
            setvalueSearch([props.value.id.toString(), '']);
        }
        else
            props.onClose();
    }, []);

    useEffect(() => {
        fetdataSearch();
    }, [propertySearch, valueSearch, pageIndex, pageSize]);

    useEffect(() => {
        if (!isModalVisible) {
            props.onClose();
        }
    }, [isModalVisible]);

    const onFill = (value: any) => {
    };

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


    const columns: ColumnsType<UserTenantReviewDto> = [
        {
            title: L("userName", LocationKey),
            width: 100,
            dataIndex: 'userName',
            key: 'userName',
            fixed: 'left',
        },
        {
            title: L('emailAddress', LocationKey),
            dataIndex: 'emailAddress',
            key: 'emailAddress',
        },
        {
            title: L('nameUser', LocationKey),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: L('surname', LocationKey),
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: L('phone', LocationKey),
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: L("isLockoutEnabled", LocationKey),
            dataIndex: "isLockoutEnabled",
            key: "isLockoutEnabled",
            render: (text: boolean) =>
                text === true ? (
                    <Tag color={utils._randomColor(text)}>True</Tag>
                ) : (
                    <Tag color={utils._randomColor(text)}>False</Tag>
                ),
        },
        {
            title: L("isPhoneNumberConfirmed", LocationKey),
            dataIndex: "isPhoneNumberConfirmed",
            key: "isPhoneNumberConfirmed",
            render: (text: boolean) =>
                text === true ? (
                    <Tag color={utils._randomColor(text)}>True</Tag>
                ) : (
                    <Tag color={utils._randomColor(text)}>False</Tag>
                ),
        },
        {
            title: L("isTwoFactorEnabled", LocationKey),
            dataIndex: "isTwoFactorEnabled",
            key: "isTwoFactorEnabled",
            render: (text: boolean) =>
                text === true ? (
                    <Tag color={utils._randomColor(text)}>True</Tag>
                ) : (
                    <Tag color={utils._randomColor(text)}>False</Tag>
                ),
        },
        {
            title: L("isEmailConfirmed", LocationKey),
            dataIndex: "isEmailConfirmed",
            key: "isEmailConfirmed",
            render: (text: boolean) =>
                text === true ? (
                    <Tag color={utils._randomColor(text)}>True</Tag>
                ) : (
                    <Tag color={utils._randomColor(text)}>False</Tag>
                ),
        },
        {
            title: L("isActive", LocationKey),
            dataIndex: "isActive",
            key: "isActive",
            render: (text: boolean) =>
                text === true ? (
                    <Tag color={utils._randomColor(text)}>True</Tag>
                ) : (
                    <Tag color={utils._randomColor(text)}>False</Tag>
                ),
        },
        {
            title: L("accessFailedCount", LocationKey),
            dataIndex: "accessFailedCount",
            key: "accessFailedCount",
            render: (text: boolean) =>
                <Tag color="#b3d4ff">{text}</Tag>
        },
        {
            title: L("creationTime", LocationKey),
            dataIndex: "creationTime",
            key: 'creationTime',
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss"),
        },
        {
            title: L("creatorUserName", LocationKey),
            dataIndex: 'creatorUserName',
            key: 'creatorUserName',
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
            title: L("lastModifierUserName", LocationKey),
            dataIndex: 'lastModifierUserName',
            key: 'lastModifierUserName',
            render: (text: string) =>
                text !== null && (text.toUpperCase() !== "ADMIN" || text.toUpperCase() !== "SYSTEM") ? (
                    <Tag color="#b3d4ff">{text}</Tag>
                ) : (
                    <Tag color="#2db7f5">{"SYSTEM"}</Tag>
                ),
        },
        {
            title: L("lockoutEndDateUtc", LocationKey),
            dataIndex: "lockoutEndDateUtc",
            key: 'lockoutEndDateUtc',
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss"),
        },
        {
            title: L("ACTION", "COMMON"),
            key: "X",
            width: 150,
            render: (text: TenantBasicDto) => (
                <div style={{ textAlign: "center" }}>
                    <Tooltip title={L("EDIT", "COMMON")}>
                        <Button
                            type="link"
                            disabled={text.isDeleted}
                            icon={<EditOutlined />}
                            onClick={() => { onFill(text); }}
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
                    <Tooltip title={L("ROLE", "COMMON")}>
                        <Button
                            type="link"
                            disabled={text.isDeleted}
                            icon={<ApiOutlined />}
                            onClick={() => { onFill(text); }}
                        ></Button>
                    </Tooltip>
                </div>
            ),
        },
    ];
    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: UserTenantReviewDto[]
        ) => {
            setdataSelectFromTable(selectedRowKeys);
        },
        getCheckboxProps: (record: UserTenantReviewDto) => ({
            name: record.name
        }),
    };
    const _searchDataOnClick = (page: number, pageSize: number) => {
        setpageSize(pageSize);
        setpageIndex(page);
    };

    return (
        <>
            <Modal
                title={<>{L("TITLE_USER_TENANT", LocationKey)}</>}
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
                                        onFill(undefined); setonShowAddOrUpdateUser(true);
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
                        <Table columns={columns}
                            className="MKQwWLyiyn"
                            dataSource={dataUserTenant}
                            rowSelection={{
                                type: "checkbox",
                                ...rowSelection,
                            }}
                            rowKey={(record: UserTenantReviewDto) => record.id}
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
                            scroll={{ scrollToFirstRowOnChange: true, y: 400, x: 2600 }} />
                    </Col>
                </Row>
            </Modal>
            {onShowAddOrUpdateUser ? <InsertOrUpdateUserTenant
                location={props.location}
                value={props.value}
                onClose={() => { setonShowAddOrUpdateUser(false); }} /> : <></>}
        </>
    )
}