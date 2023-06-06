import { Button, Col, Input, message, Modal, Row, Select, Steps, Table } from 'antd';
import { L } from "../../../../../lib/abpUtility";
import React, { Key, useEffect, useState } from 'react';
import { DeleteOutlined, ExclamationCircleOutlined, FilterOutlined, PlusOutlined, RedoOutlined, RetweetOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import './insertOrUpdate.css'
import services from '../services';
import { notifyError, notifySuccess } from '../../../../../components/Common/notification';
import { ToClientExceptionNotifyError } from '../../../../../services/dto/clientExceptionDto';
import { TenantBasicDto } from '../dtos/tenantDto';
import { ColumnsType } from 'antd/es/table';
import UserRoleInTenant from './userRoleInTenant';
import UserInfoBasic from './userInfoBasic';
import { RoleTenantDictionaryDto, UserTenantDto } from '../dtos/userTenantDto';

const { Option } = Select;
const { Step } = Steps;

declare var abp: any;
const LocationKey = "CONST_TENANT";

export interface IUserTenantInsertOrUpdateProps {
    location: any;
    value: TenantBasicDto | undefined;
    onClose: () => void;
}

export default function UserTenantInsertOrUpdate(props: IUserTenantInsertOrUpdateProps) {
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

    const [dataRoleUpdate, setdataRoleUpdate] = useState<RoleTenantDictionaryDto[]>([]);
    const [userImport, setuserImport] = useState<UserTenantDto | undefined>(undefined);

    const [isModalVisible, setisModalVisible] = useState<boolean>(true);
    const [loadingButton, setloadingButton] = useState<boolean>(false);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!isModalVisible) {
            props.onClose();
        }
    }, [isModalVisible]);

    const onFill = (value: any) => {
    };

    const fetdataSearch = async () => {
        setloadingTable(true);

        setloadingTable(false);
    }

    const _insertDataFetch = async () => {
        var resultUser = await services.InsertUserTenant({
            tenantId: props.value?.id,
            roleIds: dataRoleUpdate.map(m => m.id),
            user: userImport,
        });

        if(resultUser && !resultUser.error)
        {
            message.success(L("SUCCESS", LocationKey))
        }
        else{
            ToClientExceptionNotifyError(resultUser.messageError, LocationKey);
        }
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

    const next = () => {
        setCurrent(current + 1);
        if (dataRoleUpdate.length === 0) {
            message.warning('Tài khoản chưa chọn quyền');
        }

        if (userImport?.email || userImport?.password || userImport?.phone || userImport?.userName) {
            message.warning('Tài khoản chưa nhập đầy đủ thông tin');
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'Quyền hạn',
            content: <UserRoleInTenant
                location={[props.location]}
                value={props.value}
                optionSelect={dataRoleUpdate}
                onClose={(value: any) => setdataRoleUpdate(value)
                } />,
        },
        {
            title: 'Tài khoản',
            content:
                <UserInfoBasic
                    data={userImport}
                    onOk={(value: UserTenantDto) => { setuserImport(value); }}
                />,
        },
        {
            title: 'Thủ tục',
            content: 'Last-content',
        },
    ];

    const _done = () => {
        if (dataRoleUpdate.length === 0) {
            message.warning('Tài khoản chưa chọn quyền');
        }

        _insertDataFetch();
    }

    return (
        <>
            <Modal
                title={<>{L("TITLE_ACCOUNT_TENANT", LocationKey)}</>}
                visible={isModalVisible}
                className="ZwXQAkpaPr BJZquWaQmn"
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
                <Steps current={current} style={{ margin: '0 10px', width: 'calc(100% - 20px)' }}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Quay lại
                        </Button>
                    )}

                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Bước tiếp theo
                        </Button>
                    )}

                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={_done}>
                            Khởi tạo người dùng
                        </Button>
                    )}
                </div>
            </Modal>
        </>
    )
}