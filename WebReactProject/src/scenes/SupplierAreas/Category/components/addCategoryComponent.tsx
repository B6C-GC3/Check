import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Row, Col, Input, Switch } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { L } from "../../../../lib/abpUtility";
import React, { useEffect, useState } from 'react';
import { notifySuccess, notifyError } from '../../../../components/Common/notification';
import { CssResponsive } from '../../../../utils/cssResponsive';
import services from '../services';
import { CategoryInOrUpDto } from '../dataTypes/categoryDtos';
import { ToClientExceptionNotifyError } from '../../../../services/dto/clientExceptionDto';

const LocationKey = "ROLE_INTERNAL";

export interface IAddCategoryProps {
    location: any;
    value: CategoryInOrUpDto | undefined;
    onClose: () => void;
}

export default function AddCategoryComponent(props: IAddCategoryProps) {
    const [form] = Form.useForm();
    const [dataBeginEdit, setdataBeginEdit] = useState<CategoryInOrUpDto | undefined>(undefined);
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
        form.validateFields().then(async (values: CategoryInOrUpDto) => {
            setloadingButton(true);
            if (isModalAdd) {
                let result: any;
                // let result = await services.InsertRoleBasic({
                //     id: 0,
                //     displayName: values.displayName,
                //     isDefault: values.isDefault,
                //     isDeleted: values.isDeleted,
                //     isStatic: values.isStatic,
                //     description: values.description
                // });

                if (result && !result.error && result.result === 1) {
                    notifySuccess(L("SUCCESS", LocationKey),
                        L("INSERT_SUCCESS", LocationKey));
                } else {
                    ToClientExceptionNotifyError(result.messageError, LocationKey);
                }
            }
            else {
                if (dataBeginEdit?.id) {
                    let result: any;
                    // let result = await services.UpdateRoleBasic({
                    //     id: dataBeginEdit.id,
                    //     displayName: values.displayName,
                    //     isDefault: values.isDefault,
                    //     isDeleted: values.isDeleted,
                    //     isStatic: values.isStatic,
                    //     description: values.description
                    // });

                    if (result && !result.error && result.result === 1) {
                        notifySuccess(L("SUCCESS", LocationKey), L("UPDATE_SUCCESS", LocationKey));
                    } else {
                        ToClientExceptionNotifyError(result.messageError, LocationKey);
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
            .then((values: CategoryInOrUpDto) => {
                if (true
                    //values !== undefined &&
                    // (values.displayName !== dataBeginEdit?.displayName
                    //     || values.description !== dataBeginEdit?.description
                    //     || values.isDefault !== dataBeginEdit?.isDefault
                    //     || values.isDeleted !== dataBeginEdit?.isDeleted
                    //     || values.isStatic !== dataBeginEdit?.isStatic
                    //)

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
                    || values.name !== dataBeginEdit?.name
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
                                label={L("displayName", LocationKey)}
                                name="displayName"
                                rules={[
                                    { required: true, message: <>{L("NOT_NULL", "COMMON")}</> },
                                    {
                                        pattern: /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s_,.\-]+$/,
                                        message: <>{L("NAME_VN", "COMMON")}</>
                                    },
                                    {
                                        max: 64,
                                        message: <>{L("nameMaxLength64", LocationKey)}</>
                                    }
                                ]}
                            >
                                <Input disabled={loadingButton} />
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("isDefault", LocationKey)}
                                name="isDefault"
                                valuePropName="checked"
                                initialValue={false}
                                rules={[
                                    { required: true, message: <>{L("NOT_NULL", "COMMON")}</> },
                                ]}
                            >
                                <Switch disabled={loadingButton} defaultChecked={false} />
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("isDeleted", LocationKey)}
                                name="isDeleted"
                                valuePropName="checked"
                                initialValue={false}
                                rules={[
                                    { required: true, message: <>{L("NOT_NULL", "COMMON")}</> },
                                ]}
                            >
                                <Switch disabled={loadingButton} defaultChecked={false} />
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("isStatic", LocationKey)}
                                name="isStatic"
                                valuePropName="checked"
                                initialValue={false}
                                rules={[
                                    { required: true, message: <>{L("NOT_NULL", "COMMON")}</> },
                                ]}
                            >
                                <Switch disabled={loadingButton} defaultChecked />
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("description", LocationKey)}
                                name="description"
                                rules={[
                                    { required: true, message: <>{L("NOT_NULL", "COMMON")}</> },
                                    {
                                        pattern: /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s_,.\-]+$/,
                                        message: <>{L("NAME_VN", "COMMON")}</>
                                    },
                                ]}
                            >
                                <TextArea disabled={loadingButton} rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
