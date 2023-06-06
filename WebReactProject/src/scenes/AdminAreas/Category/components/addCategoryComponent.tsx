import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Row, Col, Input, Switch, InputNumber, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { L } from "../../../../lib/abpUtility";
import React, { useEffect, useState } from 'react';
import { notifySuccess, notifyError } from '../../../../components/Common/notification';
import { CssResponsive } from '../../../../utils/cssResponsive';
import services from '../services';
import { AdminCategoryCreateDto, CategoryMainDto, TenantCommonDto, TenantCommonIdDto } from '../dataTypes/categoryDtos';
import ImageUploadComponent from '../../../../components/File/ImageUploadComponent';
import { ToClientExceptionNotifyError } from '../../../../services/dto/clientExceptionDto';

const { Option } = Select;

const SCENES_KEY = "ADMIN_CATEGORY";

export interface IAddCategoryProps {
    location: any;
    value: AdminCategoryCreateDto | undefined;
    onClose: () => void;
}

export default function AddCategoryComponent(props: IAddCategoryProps) {
    const [form] = Form.useForm();
    const [dataBeginEdit, setdataBeginEdit] = useState<AdminCategoryCreateDto | undefined>(undefined);
    const [isModalAdd, setisModalAdd] = useState<boolean>(false);
    const [isModalVisible, setisModalVisible] = useState<boolean>(true);
    const [loadingButton, setloadingButton] = useState<boolean>(false);
    const [urlIcon, seturlIcon] = useState<string[]>([]);
    const [dataCategoryMain, setDataCategoryMain] = useState<any[]>([]);
    const [value, setValue] = useState<string>();
    const [levelChange, setlevelChange] = useState<number>(0);
    const [valueSearch, setvalueSearch] = useState<string[] | undefined>(undefined);
    const [tenantCommon, settenantCommon] = useState<TenantCommonIdDto[]>([]);
    const [disableCategoryMain, setDisableCategoryMain] = useState<boolean>(true);

    useEffect(() => {
        if (!isModalVisible) {
            props.onClose();
        }
    }, [isModalVisible]);

    useEffect(() => {
        setdataBeginEdit(props.value);
        _fetchData();
        fetchCategoryMain("", setDataCategoryMain);
        if (!props.value) {
            setisModalAdd(true);
            form.resetFields();
        } else {
            setisModalAdd(false);
            form.resetFields();
            form.setFieldsValue(props.value);
            var arr = [];
            setlevelChange(props.value.level);
            if (props.value.icon) arr.push(props.value.icon);
            seturlIcon(arr);
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
        form.validateFields().then(async (values: AdminCategoryCreateDto) => {
            setloadingButton(true);
            const SUCCESS_RESORD = 1;
            if (isModalAdd) {
                values.icon = urlIcon[0];
                let result = await services.insertCategory(values);
                if (result && !result.error && result.result === SUCCESS_RESORD) {
                    notifySuccess(L("SUCCESS", "COMMON"), L("INSERT_SUCCESS", "COMMON"));
                    form.setFieldsValue(undefined);
                    setisModalVisible(false);
                    props.onClose();
                } else {
                    ToClientExceptionNotifyError(result.messageError, SCENES_KEY);
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
                        notifySuccess(L("SUCCESS", SCENES_KEY), L("UPDATE_SUCCESS", SCENES_KEY));
                    } else {
                        ToClientExceptionNotifyError(result.messageError, SCENES_KEY);
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
        form.setFieldsValue(undefined);
        setisModalVisible(false);
        props.onClose();
    };

    // load category Main
    let timeout: ReturnType<typeof setTimeout> | null;
    let currentValue: string;

    const fetchCategoryMain = (value: string, callback: (data: { value: string; text: string }[]) => void) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        const fake = async () => {
            var levelChangeProcess = 0;
            levelChange <= 0 ? levelChangeProcess = 0 : levelChangeProcess = levelChange - 1;

            var dataCategoryMain = await services.getCategoryMain(levelChangeProcess, value);
            if (dataCategoryMain.error) {
                notifyError("Đã ra lỗi", "Không thể tải category main");
            }
            else {
                if (currentValue === value) {
                    const data = dataCategoryMain.result.map((item: CategoryMainDto) => ({
                        value: item.id.toString(),
                        text: item.name,
                    }));
                    callback(data);
                }
            }
        };
        timeout = setTimeout(fake, 300);
    };

    const optionsCategoryMain = dataCategoryMain.map(d => <Option key={d.value}>{d.text}</Option>);

    const handleSearch = (newValue: string) => {
        if (newValue) {
            fetchCategoryMain(newValue, setDataCategoryMain);
        } else {
            setDataCategoryMain([]);
        }
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const _changeValue = (value: number | null) => {
        setlevelChange(value === null ? 0 : value);
    }

    // tenantid 
    var timeoutTenantid: any = 0;
    const onSearch = (value: string) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            setvalueSearch([value]);
        }, 500);
    };

    const _fetchData = async () => {
        let result = await services.loadTenant({
            propertySearch: [],
            valuesSearch: valueSearch,
            propertyOrder: undefined,
            valueOrderBy: true,
            pageIndex: 1,
            pageSize: 10
        });

        if (result && !result.error) {
            settenantCommon(result.result?.items);
        }
        else {
            ToClientExceptionNotifyError(result.messageError, SCENES_KEY);
        }
    }

    useEffect(() => {
        _fetchData();
        fetchCategoryMain("", setDataCategoryMain);
        form.resetFields(["categoryMain"]);
        if (levelChange === props.value?.level && props.value?.level !== 0)
            form.setFieldValue("categoryMain", props.value.categoryMain);
        levelChange === 0 ? setDisableCategoryMain(true) : setDisableCategoryMain(false);
    }, [levelChange]);

    useEffect(() => {
        _fetchData();
    }, [valueSearch]);

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
                                label={L("Name", SCENES_KEY)}
                                name="name"
                                rules={[
                                    { required: true, message: <>{L("NOT_NULL", "COMMON")}</> },
                                    {
                                        pattern: /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s_,.\-]+$/,
                                        message: <>{L("NAME_VN", "COMMON")}</>
                                    },
                                    {
                                        max: 64,
                                        message: <>{L("nameMaxLength64", SCENES_KEY)}</>
                                    }
                                ]}
                            >
                                <Input disabled={loadingButton} />
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("Url", SCENES_KEY)}
                                name="url"
                                rules={[

                                    {
                                        pattern: /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ_.\-\\\/]+$/,
                                        message: <>{L("NAME_VN", "COMMON")}</>
                                    },
                                    {
                                        max: 64,
                                        message: <>{L("nameMaxLength64", SCENES_KEY)}</>
                                    }
                                ]}
                            >
                                <Input disabled={loadingButton} />
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("Icon", SCENES_KEY)}
                                name="icon"
                                rules={[
                                    {
                                        pattern: /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s_,.\-]+$/,
                                        message: <>{L("NAME_VN", "COMMON")}</>
                                    },
                                    {
                                        max: 64,
                                        message: <>{L("nameMaxLength64", SCENES_KEY)}</>
                                    }
                                ]}
                            >
                                {/* <ImageUploadComponent
                                    maxCount={1}
                                    maxSizeFile={2}
                                    mimeType='image/png, image/jpeg'
                                    fileType="Image"
                                    multiFile={false}
                                    fileListInit={urlIcon}
                                    onSuss={(e: any) => { seturlIcon(e); }} processedSameTime={0} /> */}
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("Level", SCENES_KEY)}
                                name="level"
                                rules={[
                                    { required: true, message: <>{L("NOT_NULL", "COMMON")}</> },
                                ]}
                            >
                                <InputNumber onChange={_changeValue} disabled={loadingButton} defaultValue={0} min={0} max={100} />
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("CategoryMain", SCENES_KEY)}
                                name="categoryMain"
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    value={value}
                                    showArrow={false}
                                    filterOption={false}
                                    onSearch={handleSearch}
                                    onChange={handleChange}
                                    disabled={disableCategoryMain}
                                >
                                    <Option key={""}>{"Không có"}</Option>
                                    {optionsCategoryMain}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("TenantId", SCENES_KEY)}
                                name="tenantId"
                                rules={[
                                    { required: true, message: <>{L("NOT_NULL", "COMMON")}</> },
                                ]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder={L("Tìm kiếm và lựa chọn phân hệ", "COMMON")}
                                    optionFilterProp="children"
                                    onSearch={onSearch}
                                    filterSort={(optionA, optionB) =>
                                        (optionA!.children as unknown as string)
                                            .toLowerCase()
                                            .localeCompare((optionB!.children as unknown as string).toLowerCase())
                                    }
                                >
                                    {tenantCommon
                                        ? tenantCommon.map((m) => (<Option key={m.id} value={m.id}>{m.name}</Option>))
                                        : <></>
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("IsActive", SCENES_KEY)}
                                name="isActive"
                                valuePropName="checked"
                                rules={[
                                    { required: true, message: <>{L("NOT_NULL", "COMMON")}</> },
                                ]}
                            >
                                <Switch disabled={loadingButton} defaultChecked={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
