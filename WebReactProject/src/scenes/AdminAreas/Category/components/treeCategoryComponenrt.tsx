import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Row, Col, Input, Switch, InputNumber, Select, Tree, Steps } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { L } from "../../../../lib/abpUtility";
import React, { useEffect, useState } from 'react';
import { notifySuccess, notifyError } from '../../../../components/Common/notification';
import { CssResponsive } from '../../../../utils/cssResponsive';
import services from '../services';
import { AdminCategoryCreateDto, CategoryMainDto, TenantCommonDto, TenantCommonIdDto } from '../dataTypes/categoryDtos';
import ImageUploadComponent from '../../../../components/File/ImageUploadComponent';
import { ToClientExceptionNotifyError } from '../../../../services/dto/clientExceptionDto';
import { DataNodeCustomer } from '../dataTypes/commonDto';

const { Option } = Select;

const SCENES_KEY = "ADMIN_CATEGORY";

export interface ITreeCategoryProps {
    onClose: () => void;
}
const initTreeData: DataNodeCustomer[] = [
    { title: 'Expand to load', key: '0' },
    { title: 'Expand to load', key: '1' },
    { title: 'Tree Node', key: '2', isLeaf: true },
];

// It's just a simple demo. You can use tree map to optimize update perf.
const updateTreeData = (list: DataNodeCustomer[], key: React.Key, children: DataNodeCustomer[]): DataNodeCustomer[] =>
    list.map(node => {
        if (node.key === key) {
            return {
                ...node,
                children,
            };
        }
        if (node.children) {
            return {
                ...node,
                children: updateTreeData(node.children, key, children),
            };
        }
        return node;
    });

export default function TreeCategoryComponenrt(props: ITreeCategoryProps) {
    const [form] = Form.useForm();
    const [isModalAdd, setisModalAdd] = useState<boolean>(false);
    const [isModalVisible, setisModalVisible] = useState<boolean>(true);
    const [loadingButton, setloadingButton] = useState<boolean>(false);

    useEffect(() => {
        if (!isModalVisible) {
            props.onClose();
        }
    }, [isModalVisible]);

    const _notificationEdit = () => {
        Modal.confirm({
            title: <>{L("WANNING_PROCESSS_DELETE", "COMMON")}</>,
            icon: <ExclamationCircleOutlined />,
            content: <>{L("CONTENT_CANCEL_EDIT", "COMMON")}</>,
            okText: <>{L("OK", "COMMON")}</>,
            cancelText: <>{L("CANCEL", "COMMON")}</>,
            onOk: () => {
                form.setFieldsValue(undefined);
                setisModalVisible(false);
                props.onClose();
            },
            onCancel: () => {
                setisModalVisible(true);
            },
        });
    };

    const _onOkModalAddOrEdit = () => {

    };

    const _onCancelModalAddOrEdit = () => {
        setisModalVisible(false);
        props.onClose();
    };

    const [treeData, setTreeData] = useState(initTreeData);

    const onLoadData = ({ key, children }: any) =>
        new Promise<void>(resolve => {
            if (children) {
                resolve();
                return;
            }
            setTimeout(() => {
                setTreeData(origin =>
                    updateTreeData(origin, key, [
                        { title: 'Child Node', key: `${key}-0` },
                        { title: 'Child Node', key: `${key}-1` },
                    ]),
                );

                resolve();
            }, 1000);
        });
    return (
        <>
            <Modal
                title={<>{L("TREEVIEW", SCENES_KEY)}</>}
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
                <div className='ViiPPNaHVY'>
                    <span>Cấp độ</span>
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                </div>
                <Tree
                    draggable
                    blockNode
                    showLine
                    loadData={onLoadData}
                    treeData={treeData}
                    className='TkLOtWxjbQ' />
            </Modal>
        </>
    )
}
