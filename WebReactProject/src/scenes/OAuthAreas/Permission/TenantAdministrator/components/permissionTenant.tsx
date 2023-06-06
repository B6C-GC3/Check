import { Modal, Select } from 'antd';
import { L } from "../../../../../lib/abpUtility";
import React, { Key, useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './insertOrUpdate.css'
import services from '../services';
import { notifyError, notifySuccess } from '../../../../../components/Common/notification';
import { ToClientExceptionNotifyError } from '../../../../../services/dto/clientExceptionDto';
import Tree, { DataNode, TreeProps } from 'antd/lib/tree';
import { PermissionTenantTreeDto, TenantBasicDto } from '../dtos/tenantDto';

declare var abp: any;

const LocationKey = "CONST_TENANT";

export interface IPermissionTenantProps {
    location: any;
    value?: TenantBasicDto;
    roleId?: number;
    onClose: () => void;
}

export default function PermissionTenant(props: IPermissionTenantProps) {
    const [isModalVisible, setisModalVisible] = useState<boolean>(true);
    const [loadingButton, setloadingButton] = useState<boolean>(false);
    const [treeData, settreeData] = useState<DataNode[]>([]);
    const [defaultCheckNode, setdefaultCheckNode] = useState<Key[]>([]);
    const [permissionDefaultLoad, setPermissionDefaultLoad] = useState<Key[]>([]);

    useEffect(() => {
        if (!isModalVisible) {
            props.onClose();
        }
    }, [isModalVisible]);

    const fetdataForTree = async () => {
        if (props.roleId) {
            // load tree theo tenant
            var dataTreePermissionRole = await services.GetPermissionByIdTenantRole(props.value?.id);
            if (dataTreePermissionRole && !dataTreePermissionRole.error) {
                var datal = MapDataNode(dataTreePermissionRole.result, '');
                settreeData(datal);
            }

            // cập nhật permission theo role
            var loaddingPermissionRole = await services.LoadPermissionByIdTenantAndRole(props.value?.id, props.roleId);
            if (loaddingPermissionRole && !loaddingPermissionRole.error) {
                setdefaultCheckNode(loaddingPermissionRole.result);
                setPermissionDefaultLoad(loaddingPermissionRole.result);
            }
        }
        else {
            var dataTreePermission = await services.GetPermissionBasic();
            if (dataTreePermission && !dataTreePermission.error) {
                var datal = MapDataNode(dataTreePermission.result, '');
                settreeData(datal);
            }

            var loaddingPermission = await services.LoadPermissionByIdTenant(props.value?.id);
            if (loaddingPermission && !loaddingPermission.error) {
                setdefaultCheckNode(loaddingPermission.result);
                setPermissionDefaultLoad(loaddingPermission.result);
            }
        }
    }

    useEffect(() => {
        fetdataForTree();
    }, []);

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
                if (props.roleId) {
                    if (props.value) {
                        var result = await services.UpdatePermissionByIdTenantForRole({
                            id: props.value.id,
                            roleId: props.roleId,
                            permissins: defaultCheckNode as string[]
                        });

                        if (result && !result.error && result.result === 1) {
                            notifySuccess(L("SUCCESS", LocationKey), L("UPDATE_SUCCESS", LocationKey));
                            setisModalVisible(false);
                            props.onClose();
                        } else {
                            ToClientExceptionNotifyError(result.messageError, LocationKey);
                        }
                    }
                    else {
                        notifyError(L("ERROR", "COMMON"), L("UNKNOWN", "COMMON"));
                    }
                }
                else {
                    if (props.value) {
                        var result = await services.UpdatePermissionByIdTenant({
                            id: props.value.id,
                            permissins: defaultCheckNode as string[]
                        });

                        if (result && !result.error && result.result === 1) {
                            notifySuccess(L("SUCCESS", LocationKey), L("UPDATE_SUCCESS", LocationKey));
                            setisModalVisible(false);
                            props.onClose();
                        } else {
                            ToClientExceptionNotifyError(result.messageError, LocationKey);
                        }
                    }
                    else {
                        notifyError(L("ERROR", "COMMON"), L("UNKNOWN", "COMMON"));
                    }
                }
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

    const _onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
        setdefaultCheckNode(checkedKeys as Key[]);
    };

    return (
        <>
            <Modal
                title={<>{L("TITLE_PERMISSION", LocationKey)}</>}
                visible={isModalVisible}
                className="ZwXQAkpaPr"
                onOk={() => {
                    _onOkModalAddOrEdit();
                }}
                onCancel={() => {
                    _onCancelModalAddOrEdit();
                }}
                okText={<>{L("OK", "COMMON")}</>}
                cancelText={<>{L("CANCEL", "COMMON")}</>}
                maskClosable={false}
                confirmLoading={loadingButton}
            >
                <Tree
                    checkable
                    checkedKeys={defaultCheckNode}
                    onCheck={_onCheck}
                    treeData={treeData}
                />
            </Modal>
        </>
    )
}

function MapDataNode(input: PermissionTenantTreeDto[], keyIndexOf: string): DataNode[] {
    var dataNodes: DataNode[] = [];
    input.map(element => {
        let beginString = keyIndexOf.length == 0 ? element.key : keyIndexOf + "." + element.key;
        let dataNode: DataNode = {
            key: beginString,
            title: L(element.key, LocationKey),
            children: MapDataNode(element.children, beginString)
        }
        dataNodes.push(dataNode);
    });
    return dataNodes;
}