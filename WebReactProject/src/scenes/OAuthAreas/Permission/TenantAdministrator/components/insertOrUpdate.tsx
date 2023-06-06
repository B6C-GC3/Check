import { Modal, Form, Input, Select, Row, Col, Checkbox, Switch } from 'antd';
import form from 'antd/lib/form';
import { L } from "../../../../../lib/abpUtility";
import React, { useEffect, useState } from 'react';
import { TenantBasicDto, TenantInsertDto } from '../dtos/tenantDto';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { CssResponsive } from '../../../../../utils/cssResponsive';
import './insertOrUpdate.css'
import services from '../services';
import { notifyError, notifySuccess } from '../../../../../components/Common/notification';
import { ToClientExceptionNotifyError } from '../../../../../services/dto/clientExceptionDto';

const { Option } = Select;

declare var abp: any;

const LocationKey = "CONST_TENANT";

export interface IInsertOrUpdate {
    location: any;
    value: TenantBasicDto | undefined;
    onClose: () => void;
}

export default function InsertOrUpdate(props: IInsertOrUpdate) {
    const [form] = Form.useForm();
    const [dataBeginEdit, setdataBeginEdit] = useState<TenantBasicDto | undefined>(undefined);
    const [isModalAdd, setisModalAdd] = useState<boolean>(false);
    const [isModalVisible, setisModalVisible] = useState<boolean>(true);
    const [loadingButton, setloadingButton] = useState<boolean>(false);
    useEffect(() => {
        if (!isModalVisible) {
            props.onClose();
        }
    }, [isModalVisible]);

    useEffect(() => {
        setdataBeginEdit(props.value);
        if (props.value === undefined) {
            setisModalAdd(true);
            form.resetFields();
        } else {
            setisModalAdd(false);
            form.setFieldsValue(props.value);
        }
    }, []);

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
        form.validateFields().then(async (values: TenantBasicDto) => {
            setloadingButton(true);
            if (isModalAdd) {
                let result = await services.InsertTenant({
                    name: values.name,
                    isDeleted: values.isDeleted,
                    isActive: values.isActive
                });

                if (result && !result.error && result.result === 1) {
                    notifySuccess(L("SUCCESS", "COMMON"), L("INSERT_SUCCESS", "COMMON"));
                } else {
                    ToClientExceptionNotifyError(result.messageError, "COMMON");
                }
            }
            else {
                if (dataBeginEdit?.id) {
                    let result = await services.UpdateTenant({
                        id: dataBeginEdit?.id,
                        name: values.name,
                        isDeleted: values.isDeleted,
                        isActive: values.isActive
                    });

                    if (result && !result.error && result.result === 1) {
                        notifySuccess(L("SUCCESS", "COMMON"), L("UPDATE_SUCCESS", "COMMON"));
                    } else {
                        ToClientExceptionNotifyError(result.messageError, "COMMON");
                    }
                }
                else {
                    notifyError(L("ERROR", "COMMON"), L("UNKNOWN", "COMMON"));
                }
            }
            setloadingButton(false);
        });
    };

    const _onCancelModalAddOrEdit = () => {
        form.validateFields()
            .then((values: TenantBasicDto) => {
                if (
                    values.name !== dataBeginEdit?.name
                ) {
                    _notificationEdit();
                } else {
                    form.setFieldsValue(undefined);
                    setisModalVisible(false);
                }
            })
            .catch((values) => {
                if (
                    values.values.name !== undefined
                ) {
                    _notificationEdit();
                } else {
                    form.setFieldsValue(undefined);
                    setisModalVisible(false);
                }
            });
    };

    return (
        <>
            <Modal
                title={<>{isModalAdd ? L("ADD", "COMMON") : L("EDIT", "COMMON")}</>}
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
                <Form {...CssResponsive.formItemLayoutInRow} form={form}>
                    <Row>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("name", LocationKey)}
                                name="name"
                                rules={[
                                    { required: true, message: <>{L("NOT_NULL", "COMMON")}</> },
                                    {
                                        pattern: /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s_,.\-]+$/,
                                        message: <>{L("NOT_SPECIAL_CHARACTERS", "COMMON")}</>
                                    },
                                    {
                                        max: 64,
                                        message: <>{L("nameMaxLength", LocationKey)}</>
                                    }
                                ]}
                            >
                                <Input disabled={loadingButton} />
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("isDeleted", LocationKey)}
                                name="isDeleted"
                                valuePropName="checked"
                                initialValue={false}
                                rules={[
                                    {
                                        required: true,
                                        message: <>{L("NOT_NULL", "COMMON")}</>,
                                    },
                                ]}
                            >
                                <Switch disabled={loadingButton} defaultChecked={false} />
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("isActive", LocationKey)}
                                name="isActive"
                                valuePropName="checked"
                                initialValue={false}
                                rules={[
                                    {
                                        required: true,
                                        message: <>{L("NOT_NULL", "COMMON")}</>,
                                    },
                                ]}
                            >
                                <Switch disabled={loadingButton} defaultChecked />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
