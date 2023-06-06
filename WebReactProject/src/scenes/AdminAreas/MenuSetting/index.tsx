//#region  import
import * as React from "react";
import { useState } from "react";
import { L } from "../../../lib/abpUtility";
import {
    Button, Card, Col, DatePicker, Form, Input, InputNumber, Modal, Row,
    Select, Switch, Table, Tag, Tooltip,
} from "antd";
import {
    DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined, RedoOutlined,
    RetweetOutlined, SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import utils from "../../../utils/utils";
import { MenuReadDto } from "./dtos/menuReadDto";
import Search from "../../../components/Search";

const { Option } = Select;
const { RangePicker } = DatePicker;

declare var abp: any;
//#endregion

const key = 'MenuSetting';

export interface IMenuSettingProps {
    location: any;
}

export default function MenuSetting(props: IMenuSettingProps) {
    //#region START
    const [loadingAll, setloadingAll] = useState<boolean>(false);
    const [loadingTable, setloadingTable] = useState<boolean>(false);
    const [menuReadDto, setMenuReadDto] = useState<MenuReadDto[]>([]);
    const [pageSize, setpageSize] = useState<number>(0);
    const [totalCount, settotalCount] = useState<number>(0);
    const [loadingButton, setloadingButton] = useState<boolean>(false);
    const [search, setsearch] = useState(false);
    //#endregion
    //#region CSS Layout Item
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
        },
    };
    //#endregion
    //#endregion
    //#region RESTART
    const _restartData = () => {

    };
    //#endregion
    //#region TABLE
    const columns = [
        {
            title: L("NAME", "CONST_TYPE_ATOMIC"),
            dataIndex: "name",
        },
        {
            title: L("IS_ACTIVE", "CONST_TYPE_ATOMIC"),
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
            title: L("TYPES_RSC_NAME", "CONST_TYPE_ATOMIC"),
            dataIndex: "typesRsc",
            render: (text: number) => (
                <Tag color={utils._randomColor(text)}>{L('MenuConst[text]', "CONST_TYPE_ATOMIC")}</Tag>
            ),
        },
        {
            title: L("DESCRIPTION", "CONST_TYPE_ATOMIC"),
            dataIndex: "description",
        },
        {
            title: L("CREATE_BY_NAME", "CONST_TYPE_ATOMIC"),
            dataIndex: "createByName",
            render: (text: string) =>
                text.toUpperCase() === "ADMIN" || text.toUpperCase() === "SYSTEM" ? (
                    <Tag color="#b3d4ff">{text}</Tag>
                ) : (
                    <Tag color="#2db7f5">{text}</Tag>
                ),
        },
        {
            title: L("CREATE_DATE_UTC", "CONST_TYPE_ATOMIC"),
            dataIndex: "updatedOnUtc",
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss"),
        },
        {
            title: L("UPDATE_DATE_UTC", "CONST_TYPE_ATOMIC"),
            dataIndex: "createdOnUtc",
            render: (text: Date) => moment(text).format("DD/MM/YYYY hh:mm:ss"),
        },
        {
            title: L("ACTION", "COMMON"),
            key: "x",
            width: 120,
            render: (text: MenuReadDto) => (
                <div style={{ textAlign: "center" }}>
                    <Tooltip title={L("EDIT", "COMMON")}>
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => {
                                onFill(text);
                            }}
                        ></Button>
                    </Tooltip>
                </div>
            ),
        },
    ];
    const [dataSelectFromTable, setdataSelectFromTable] = useState<React.Key[]>(
        []
    );
    const rowSelection = {
        onChange: (
            selectedRowKeys: React.Key[],
            selectedRows: MenuReadDto[]
        ) => {
            setdataSelectFromTable(selectedRowKeys);
        },
        getCheckboxProps: (record: MenuReadDto) => ({
            name: record.name,
        }),
    };
    //#endregion
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
    //#region INSERT OR UPDATE FORM DATA
    const [isModalVisible, setisModalVisible] = useState(false);
    const [isModalAdd, setisModalAdd] = useState(false);
    const [dataBeginEdit, setdataBeginEdit] = useState<
        MenuReadDto | undefined
    >(undefined);
    const [form] = Form.useForm();

    const onFill = (value: MenuReadDto | undefined) => {
        setdataBeginEdit(value);
        if (value === undefined) {
            setisModalAdd(true);
            form.resetFields();
            setisModalVisible(true);
        } else {
            setisModalAdd(false);
            form.setFieldsValue(value);
            setisModalVisible(true);
        }
    };

    const _onCancelModalAddOrEdit = () => {
        form
            .validateFields()
            .then((values: MenuReadDto) => {
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
                    values.values.description !== undefined ||
                    values.values.name !== undefined ||
                    values.values.typesRsc !== undefined ||
                    values.values.isActive !== undefined
                ) {
                    _notificationEdit();
                } else {
                    form.setFieldsValue(undefined);
                    setisModalVisible(false);
                }
            });
    };

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
            },
            onCancel: () => {
                setisModalVisible(true);
            },
        });
    };

    const _onOkModalAddOrEdit = () => {
        form.validateFields().then((values) => {

        });
    };
    //#endregion

    return (
        <>
            <Card
                title={L("TITLE_ALL_TABLE", "CONST_TYPE_ATOMIC")}
                size="small"
                type="inner"
            >
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <Row gutter={[10, 10]}>
                            <Col span={1}>
                                <Tooltip placement="bottom" title={L("REFRESH", "COMMON")}>
                                    <Button
                                        loading={loadingAll}
                                        block
                                        icon={<RedoOutlined />}
                                        onClick={() => _restartData()}
                                    ></Button>
                                </Tooltip>
                            </Col>
                            <Col span={1}>
                                <Tooltip placement="bottom" title={L("DELETE", "COMMON")}>
                                    <Button
                                        loading={loadingAll}
                                        onClick={() => _removeItemSelect()}
                                        disabled={dataSelectFromTable.length === 0}
                                        block
                                        icon={<DeleteOutlined />}
                                    ></Button>
                                </Tooltip>
                            </Col>
                            <Col span={1}>
                                <Tooltip placement="bottom" title={L("CHANGE", "COMMON")}>
                                    <Button
                                        loading={loadingAll}
                                        onClick={() => _editItemSelect()}
                                        disabled={dataSelectFromTable.length === 0}
                                        block
                                        icon={<RetweetOutlined />}
                                    ></Button>
                                </Tooltip>
                            </Col>
                            <Col span={3}>
                                <Tooltip placement="top" title={L("REPORT_FILE", "COMMON")}>
                                    <Select
                                        style={{ width: "100%" }}
                                        placeholder={L("REPORT_FILE", "COMMON")}
                                    >
                                        <Option value={1}>{L("EXCEL", "COMMON")}</Option>
                                        <Option value={2}>{L("PDF", "COMMON")}</Option>
                                        <Option value={3}>{L("ALL", "COMMON")}</Option>
                                    </Select>
                                </Tooltip>
                            </Col>
                            <Col span={1}>
                                <Tooltip placement="bottom" title={L("ADD", "COMMON")}>
                                    <Button
                                        loading={loadingAll}
                                        onClick={() => {
                                            onFill(undefined);
                                        }}
                                        block
                                        icon={<PlusOutlined />}
                                    ></Button>
                                </Tooltip>
                            </Col>
                            <Col span={1}>
                                <Tooltip
                                    placement="bottom"
                                    title={L("SEARCH_BUTTON", "COMMON")}
                                >
                                    <Button
                                        disabled={loadingAll}
                                        type="primary"
                                        onClick={() => setsearch(true)}
                                        icon={<SearchOutlined />}
                                    ></Button>
                                </Tooltip>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{ margin: "10px 0", width: "100%" }}>
                        <Table
                            columns={columns}
                            dataSource={menuReadDto}
                            rowSelection={{
                                type: "checkbox",
                                ...rowSelection,
                            }}
                            rowKey={(record: MenuReadDto) => record.id}
                            loading={loadingTable}
                            style={{ width: "100%" }}
                            size="small"
                            pagination={{
                                pageSize: pageSize,
                                total: totalCount,
                                defaultCurrent: 1,
                                // onChange: (page: number, pageSize?: number | undefined) =>
                                //     _searchDataOnClick(page, pageSize, false),
                                showSizeChanger: true,
                                pageSizeOptions: ["5", "10", "20", "50", "100"],
                            }}
                        />
                    </Col>
                </Row>
            </Card>

            <Modal
                title={<>{isModalAdd ? L("ADD", "COMMON") : L("EDIT", "COMMON")}</>}
                visible={isModalVisible}
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
                <Form layout="horizontal" {...formItemLayout} form={form}>
                    <Form.Item
                        label={L("ID", "CONST_TYPE_ATOMIC")}
                        name="id"
                        hidden={isModalAdd}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label={L("NAME", "CONST_TYPE_ATOMIC")}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={L("TYPES_RSC", "CONST_TYPE_ATOMIC")}
                        name="typesRsc"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Select>
                            {/* {Object.keys(confirmTypesMenu).map((key: any) => {
                                if (!isNaN(Number(key))) {
                                    return (
                                        <Option value={Number(key)}>
                                            {MenuConst[key]}
                                        </Option>
                                    );
                                }
                            })} */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={L("DESCRIPTION", "CONST_TYPE_ATOMIC")}
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label={L("IS_ACTIVE", "CONST_TYPE_ATOMIC")}
                        name="isActive"
                        valuePropName="checked"
                        rules={[
                            {
                                required: true,
                                message: <>{L("DO_NOT_LEAVE_THIS_BOX_BLANK", "COMMON")}</>,
                            },
                        ]}
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>

            <Search
                key={key}
                title="Tìm kiếm"
                show={search}
                onChange={(value) => {  }} />
        </>
    )
};