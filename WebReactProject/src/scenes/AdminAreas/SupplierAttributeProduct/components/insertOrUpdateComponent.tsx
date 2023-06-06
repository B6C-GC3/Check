import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Modal, Row, Col, Input, Switch, InputNumber, Select, Cascader, TreeSelectProps, TreeSelect } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { L } from "../../../../lib/abpUtility";
import React, { useEffect, useState } from 'react';
import { notifySuccess, notifyError } from '../../../../components/Common/notification';
import { CssResponsive } from '../../../../utils/cssResponsive';
import services from '../services';
import ImageUploadComponent from '../../../../components/File/ImageUploadComponent';
import { ToClientExceptionNotifyError } from '../../../../services/dto/clientExceptionDto';
import { ProductAttributeUpdateDto, SupplierCategorProductDto } from '../dtos/productAttributeQuery';
import { ProductAttributeUL } from '../dtos/atributeTypes';
import type { DefaultOptionType } from 'antd/es/select';
import { DataNode } from 'antd/es/tree';

const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

const SCENES_KEY = "SUPPLIER_PRODUCT_ATTRIBUTE";

export interface IInsertOrUpdateProps {
    location: any;
    value: ProductAttributeUpdateDto | undefined;
    onClose: () => void;
}

interface OptionCascader {
    value: string;
    label: string;
    children?: OptionCascader[];
    loading?: boolean;
}

const getEnum = (key: any): OptionCascader => {
    return {
        value: ProductAttributeUL[key].toString(),
        label: L(key, SCENES_KEY)
    }
}

const optionCascaderLists: OptionCascader[] =
    (Object.keys(ProductAttributeUL).filter((key: any) => !isNaN(Number(ProductAttributeUL[key])) && key !== "SPECIFICATIONS"))
        .map(k => getEnum(k));

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
            console.log('values', values)
            let result = await services.createAttribute({
                name: values.name,
                types: Number(values.types[0]),
                key: values.key,
                categoryProductId: values.categoryProductId,
                id: 0
            });
            if (result && !result.error) {
                notifySuccess(L("SUCCESS", "COMMON"), L("INSERT_SUCCESS", "COMMON") + " : " + result.result.toString());
                form.setFieldsValue(undefined);
                setisModalVisible(false);
                props.onClose();
            } else {
                ToClientExceptionNotifyError(result.messageError, SCENES_KEY);
            }
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
                // if (dataBeginEdit?.id) {
                //     let result: any;

                //     if (result && !result.error && result.result === 1) {
                //         notifySuccess(L("SUCCESS", SCENES_KEY), L("UPDATE_SUCCESS", SCENES_KEY));
                //     } else {
                //         ToClientExceptionNotifyError(result.messageError, SCENES_KEY);
                //     }
                // }
                // else {
                //     notifyError(L("ERROR", "COMMON"), L("UNKNOWN", "COMMON"));
                // }
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

    const [disableKey, setDisableKey] = useState<boolean>(true);

    const onChangeCascader = (value: any) => {
        Number(value) === ProductAttributeUL.ATTRIBUTE ? setDisableKey(false) : setDisableKey(true);
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


    // Tree Selected by Category Id
    const [valueCategory, setValueCategory] = useState<string>();
    const [treeData, setTreeData] = useState<DataNode[]>([]);

    const _loadCategory = async (idCategoryMain: number) => {
        var result = await services.loadCategoryBySupplier({
            valuesSearch: [idCategoryMain.toString()],
            pageIndex: 0,
            pageSize: 0
        });

        if (result.error || !result.result) {
            notifyError(L("ERROR", "COMMON"), L(result.messageError, SCENES_KEY));
            return [];
        }
        else {
            var data = _convertDataDtoToDataNode(result.result);
            if (idCategoryMain === 0) setTreeData(data);
            return data;
        }
    };

    const _convertDataDtoToDataNode = (data: SupplierCategorProductDto[]): DataNode[] => {
        return !data ? [] : data.map((m: SupplierCategorProductDto): DataNode => { return { key: m.id, title: m.name } });
    };

    const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] =>
        list.map((node) => {
            if (node.key === key) {
                return { ...node, children, };
            }
            if (node.children) {
                return { ...node, children: updateTreeData(node.children, key, children) };
            }
            return node;
        });

    useEffect(() => {
        onLoadData({ key: 0 });
    }, []);

    const onLoadData = async ({ key }: any) => {
        var data = await _loadCategory(key);
        setTreeData((origin: DataNode[]) => updateTreeData(origin, key, data));
    };

    const onChange = (newValue: string) => {
        setValueCategory(newValue);
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
                                label={L("Id", SCENES_KEY)}
                                name="id"
                            >
                                <Input disabled={loadingButton} type='number' defaultValue={0} />
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
                                <TreeSelect
                                    key="id"
                                    style={{ width: '100%' }}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="Please select"
                                    treeCheckable={true}
                                    showCheckedStrategy={SHOW_PARENT}
                                    treeLine={true}
                                    maxTagTextLength={7}
                                    maxTagCount={2}
                                    fieldNames={{ label: "title", value: "key" }}
                                    onChange={onChange}
                                    loadData={onLoadData}
                                    treeData={treeData}
                                />
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("types", SCENES_KEY)}
                                name="types"
                            >
                                <Cascader
                                    key={"label"}
                                    options={optionsCascader}
                                    loadData={() => loadData}
                                    onChange={(value: any) => onChangeCascader(value)}
                                    changeOnSelect={true} />
                            </Form.Item>
                        </Col>
                        <Col {...CssResponsive.colRowLayout}>
                            <Form.Item
                                label={L("Key", SCENES_KEY)}
                                name="key"
                                hidden={disableKey}
                                rules={[
                                    { required: !disableKey, message: <>{L("NOT_NULL", "COMMON")}</> },
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
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
