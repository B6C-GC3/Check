import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Row, Col, Input, Switch, InputNumber, Select, Cascader } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { L } from "../../../../lib/abpUtility";
import React, { useEffect, useState } from 'react';
import { notifySuccess, notifyError } from '../../../../components/Common/notification';
import { CssResponsive } from '../../../../utils/cssResponsive';
import services from '../services';
import ImageUploadComponent from '../../../../components/File/ImageUploadComponent';
import { ToClientExceptionNotifyError } from '../../../../services/dto/clientExceptionDto';
import { ProductAttributeUpdateDto } from '../dtos/productAttributeQuery';

const { Option } = Select;

const SCENES_KEY = "ADMIN_CATEGORY";

export interface IInsertOrUpdateProps {
    location: any;
    value: ProductAttributeUpdateDto | undefined;
    onClose: () => void;
}

interface OptionCascader {
    value: string;
    label: string;
    children?: OptionCascader[];
    isLeaf?: boolean;
    loading?: boolean;
}

const optionCascaderLists: OptionCascader[] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    },
];

export default function InsertOrUpdateComponent(props: IInsertOrUpdateProps) {
    const [form] = Form.useForm();
    const [dataBeginEdit, setdataBeginEdit] = useState<ProductAttributeUpdateDto | undefined>(undefined);
    const [isModalAdd, setisModalAdd] = useState<boolean>(false);
    const [isModalVisible, setisModalVisible] = useState<boolean>(true);
    const [loadingButton, setloadingButton] = useState<boolean>(false);
    const [urlIcon, seturlIcon] = useState<string[]>([]);
    const [dataCategoryMain, setDataCategoryMain] = useState<any[]>([]);
    const [value, setValue] = useState<string>();
    const [levelChange, setlevelChange] = useState<number>(0);
    const [valueSearch, setvalueSearch] = useState<string[] | undefined>(undefined);
    const [disableCategoryMain, setDisableCategoryMain] = useState<boolean>(true);

    // local 
    const [optionsCascader, setOptionsCascader] = useState<OptionCascader[]>(optionCascaderLists);

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
        form.validateFields().then(async (values: ProductAttributeUpdateDto) => {
            setloadingButton(true);
            const SUCCESS_RESORD = 1;
            if (isModalAdd) {
                // if (result && !result.error && result.result === SUCCESS_RESORD) {
                //     notifySuccess(L("SUCCESS", "COMMON"), L("INSERT_SUCCESS", "COMMON"));
                //     form.setFieldsValue(undefined);
                //     setisModalVisible(false);
                //     props.onClose();
                // } else {
                //     ToClientExceptionNotifyError(result.messageError, SCENES_KEY);
                // }
            }
            else {
                if (dataBeginEdit?.id) {
                    let result: any;

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

            // var dataCategoryMain = await services.getCategoryMain(levelChangeProcess, value);
            // if (dataCategoryMain.error) {
            //     notifyError("Đã ra lỗi", "Không thể tải category main");
            // }
            // else {
            //     if (currentValue === value) {
            //         const data = dataCategoryMain.result.map((item: CategoryMainDto) => ({
            //             value: item.id.toString(),
            //             text: item.name,
            //         }));
            //         callback(data);
            //     }
            // }
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
        // let result = await services.loadTenant({
        //     propertySearch: [],
        //     valuesSearch: valueSearch,
        //     propertyOrder: undefined,
        //     valueOrderBy: true,
        //     pageIndex: 1,
        //     pageSize: 10
        // });

        // if (result && !result.error) {
        //     settenantCommon(result.result?.items);
        // }
        // else {
        //     ToClientExceptionNotifyError(result.messageError, SCENES_KEY);
        // }
    }

    useEffect(() => {
        _fetchData();
    }, [valueSearch]);

    const onChangeCascader = (value: string[], selectedOptions: OptionCascader[]) => {
        console.log(value, selectedOptions);
    };

    const loadData = (selectedOptions: OptionCascader[]) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                },
            ];
            setOptionsCascader([...optionsCascader]);
        }, 1000);
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
                                label={L("types", SCENES_KEY)}
                                name="types"
                            >
                                <Cascader options={optionsCascader} loadData={() => loadData} onChange={() => onChangeCascader} changeOnSelect={true} />
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("categoryProductId", SCENES_KEY)}
                                name="categoryProductId"
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
                                    {/* {tenantCommon
                                        ? tenantCommon.map((m) => (<Option key={m.id} value={m.id}>{m.name}</Option>))
                                        : <></>
                                    } */}
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
