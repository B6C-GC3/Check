import { Modal, Form, Input, Select, Row, Col, Checkbox, Switch } from 'antd';
import form from 'antd/lib/form';
import { L } from "../../../../../lib/abpUtility";
import React, { Key, useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { CssResponsive } from '../../../../../utils/cssResponsive';
import './insertOrUpdate.css'
import services from '../services';
import { notifyError, notifySuccess } from '../../../../../components/Common/notification';
import { ToClientExceptionNotifyError } from '../../../../../services/dto/clientExceptionDto';
import { PermissionInternalTreeDto, RoleInternalReadDto } from '../dtos/roleInternalReadDto';
import TextArea from 'antd/lib/input/TextArea';
import Tree, { DataNode, TreeProps } from 'antd/lib/tree';
import { TenantBasicDto } from '../../TenantAdministrator/dtos/tenantDto';

const { Option } = Select;

declare var abp: any;

const LocationKey = "ROLE_INTERNAL";

export interface IPermissionInternalProps {
    location: any;
    value: TenantBasicDto | undefined;
    onClose: () => void;
}
const treeDataTest: DataNode[] = [
    {
        title: 'Quyền truy cập trang web',
        key: '0-0',
        children: [
            {
                title: 'Người dùng',
                key: '0-0-0',
                children: [
                    {
                        title: 'Xem',
                        key: '0-0-0-0',
                    },
                    {
                        title: 'Tạo mới',
                        key: '0-0-0-1',
                    },
                ],
            },
            {
                title: 'Vai trò',
                key: '0-0-1',
                children: [{
                    title: 'Activation',
                    key: '0-0-1-0',
                },],
            },
            {
                title: 'Phân hệ',
                key: '0-0-2',
                children: [{
                    title: 'Activation',
                    key: '0-0-2-0',
                },],
            },
        ],
    },
    {
        title: 'API',
        key: '1-0',
        children: [
            {
                title: 'User',
                key: '1-0-0',
                children: [
                    {
                        title: 'View',
                        key: '1-0-0-0',
                    },
                    {
                        title: 'Create',
                        key: '1-0-0-1',
                    },
                ],
            },
            {
                title: 'Role',
                key: '1-0-1',
                children: [{
                    title: 'Activation',
                    key: '1-0-1-0',
                },],
            },
            {
                title: 'Tenant',
                key: '1-0-2',
                children: [{
                    title: 'Activation',
                    key: '1-0-2-0',
                },],
            },
        ]
    },
];
export default function PermissionInternal(props: IPermissionInternalProps) {

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

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
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
                    onCheck={onCheck}
                    treeData={treeData}
                />
            </Modal>
        </>
    )
}

function MapDataNode(input: PermissionInternalTreeDto[], keyIndexOf: string): DataNode[] {
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