import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import * as React from 'react';
import { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { L } from "../../lib/abpUtility";
import { ValueSearch } from './dto/valueSearch';
import './style.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const key = 'search';

interface IOptions {
    display: number,
    field: string,
    typeFld: 'BOOLEAN' | 'STRING' | 'NUMBER' | 'DATE' | 'SELECT' |
    'Boolean' | 'String' | 'Number' | 'Date' | 'Select'
    format?: string,
    displayName: string,
    defaultValues?: any
}

export interface ISearchProps {
    key: string
    show?: boolean;
    onChange?: (value: any, order: { column: string, type: boolean }) => void;
    title: string;
    urlSearch?: string;
    options?: IOptions[];
}

export default function Search(props: ISearchProps) {

    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const options: IOptions[] = [
        { display: 1, field: "Number", displayName: "Số", typeFld: 'NUMBER', format: undefined },
        { display: 2, field: "String", displayName: "Chữ", typeFld: 'STRING', format: undefined },
        { display: 3, field: "Date", displayName: "Ngày Tháng", typeFld: 'DATE', format: undefined },
        { display: 4, field: "Select", displayName: "Lựa chọn", typeFld: 'SELECT', format: undefined },
        { display: 5, field: "Select2", displayName: "Lựa chọn2", typeFld: 'SELECT', format: undefined },
        { display: 6, field: "Boolean", displayName: "Đơn vị", typeFld: 'BOOLEAN', format: undefined }
    ];

    //#region State
    const [selectSearch, setselectSearch] = useState<string[]>([]);
    //#endregion

    const handleChange = (value: string[]) => {
        setselectSearch(value);
    };

    const onOk = () => {
        form
            .validateFields()
            .then(values => {
                props.onChange?.(values, { column: "", type: true });
            })
            .catch(info => {
                props.onChange?.(undefined, { column: "", type: true });
            });
    };

    const onCancel = () => {
        props.onChange?.(undefined, { column: "", type: true });
    };

    const [data, setData] = useState<ValueSearch[]>([]);

    let timeout: ReturnType<typeof setTimeout> | null;
    let currentValue: string;

    const handleSearchSelect = (newValue: string) => {
        if (newValue) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            currentValue = newValue;

            const CallData = async () => {
                setData(await fetchUserList(props.key, currentValue));
            }

            timeout = setTimeout(CallData, 500);

        } else {
            setData([]);
        }
    };

    const handleChangeSelect = () => {
        setData([]);
    }

    const optionsFill = data.map(d => <Option key={d.value} value={d.value}>{d.value}</Option>);

    return (
        <Modal
            title={<>{props.title}</>}
            visible={props.show}
            className="veMvsdVKEj"
            okText={<>{L("OK", "COMMON")}</>}
            cancelText={<>{L("CANCEL", "COMMON")}</>}
            maskClosable={false}
            onOk={onOk}
            onCancel={onCancel}
        >
            <>
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <Select
                            mode="multiple"
                            placeholder="SELECT_COLUMN_SEARCH"
                            showArrow
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        >
                            {options.map((item: IOptions) =>
                                <Option key={item.field} value={item.field}>
                                    {item.displayName}
                                </Option>
                            )}
                        </Select>
                    </Col>
                    <Col span={24}>
                        <Form
                            autoComplete="off"
                            {...layout}
                            className="NbhATbJYHI"
                            key={"FormSearch"}
                            form={form}
                        >
                            <span key={"TitleForm"}>Enter search value</span>
                            {selectSearch.map((key: string) => {
                                let dataMap = options.find(x => x.field === key);
                                if (dataMap?.typeFld.toUpperCase() === "SELECT".toUpperCase()) {
                                    return (
                                        <Form.Item key={key} label={key} name={dataMap?.display}>
                                            <Select
                                                showSearch
                                                defaultActiveFirstOption={false}
                                                showArrow={false}
                                                filterOption={false}
                                                placeholder={L("CANCEL", "COMMON")}
                                                onSearch={handleSearchSelect}
                                                onChange={handleChangeSelect}
                                                notFoundContent={null}
                                            >
                                                {optionsFill}
                                            </Select>
                                        </Form.Item>);
                                }
                                else if (dataMap?.typeFld.toUpperCase() === "Boolean".toUpperCase()) {
                                    return (<Form.Item key={key} label={key} name={dataMap?.display}>
                                        <Select
                                            showSearch
                                            placeholder={L("FILL", "COMMON")}
                                            optionFilterProp="children"
                                            key={key}
                                            style={{ width: "100%" }}
                                        >
                                            <Option value={1}>TRUE</Option>
                                            <Option value={0}>FALSE</Option>
                                        </Select>
                                    </Form.Item>);
                                }
                                else if (dataMap?.typeFld.toUpperCase() === "Number".toUpperCase()) {
                                    return (<Form.Item key={key} label={key} name={dataMap?.display}>
                                        <InputNumber
                                            placeholder={L("KEYWORD", "COMMON")}
                                            style={{ width: "100%" }}
                                            formatter={(value) =>
                                                `${value} `.trim().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                            }
                                        />
                                    </Form.Item>);
                                }
                                else if (dataMap?.typeFld.toUpperCase() === "Date".toUpperCase()) {
                                    return (
                                        <Form.Item key={key} label={key} name={dataMap?.display}>
                                            <RangePicker
                                                format="YYYY/MM/DD"
                                                style={{ width: '100%' }}
                                            />
                                        </Form.Item>
                                    );
                                }
                                else {
                                    return (
                                        <Form.Item key={key} label={key} name={dataMap?.display}>
                                            <Input />
                                        </Form.Item>
                                    );
                                }
                            })}
                        </Form>
                    </Col>
                </Row>
            </>
        </Modal>
    )
};



async function fetchUserList(key: string, value: string): Promise<ValueSearch[]> {
    return fetch('https://randomuser.me/api/?results=5')
        .then(response => response.json())
        .then(body =>
            body.results.map(
                (user: { name: { first: string; last: string }; login: { username: string } }) => ({
                    key: `${user.name.first}`,
                    value: user.login.username,
                }),
            ),
        );
}