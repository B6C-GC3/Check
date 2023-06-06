import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Descriptions, Drawer, Form, Input, Row, Select, SelectProps, Space, Statistic, Tag } from 'antd';
import Password from 'antd/lib/input/Password';
import React, { useEffect, useState } from 'react';
import { notifyError, notifySuccess } from '../../../../components/Common/notification';
import NumericInput from '../../../../components/NumericInput';
import { L } from "../../../../lib/abpUtility";
import { ToClientExceptionNotifyError, ToClientExceptionNotifyErrorCommon } from '../../../../services/dto/clientExceptionDto';
import { LanguageSystemDto } from '../dataTypes/language';
import { SupplierRegisterDto } from '../dataTypes/supplier';

import '../index.css';
import service from '../service';

declare var abp: any;
const SCREEN_KEY = "SUPPLIER_REGISTER";

const { Option } = Select;

export interface IAddComponents {
    onActive: boolean;
    onClose: () => void;
}

export default function AddComponents(props: IAddComponents) {
    const [valueNumericInput, setValueNumericInput] = useState('');
    const [loadding, setloadding] = useState<boolean>(false);
    const [language, setlanguage] = useState<LanguageSystemDto[]>([]);
    const [supplierRegisterDto, setsupplierRegisterDto] = useState<SupplierRegisterDto | undefined>();

    const [form] = Form.useForm();
    useEffect(() => {
        setloadding(true);
        getlang();
        getInfoSupplier();
    }, []);

    const getlang = async () => {
        var result = await service.getAllLaguage();
        if (result && result.error) {
            setlanguage([]);
        }
        else {
            setlanguage(result.result ?? []);
        }
    }

    const getInfoSupplier = async () => {
        var result = await service.getInfoSupplier();
        if (result && result.error) {
            setsupplierRegisterDto(undefined);
        }
        else {
            setsupplierRegisterDto(result.result);
            var resu = result.result;
            if (resu && resu.passWordShop) resu.passWordShop = "";
            form.setFieldsValue(resu);
        }
        setloadding(false);
    }

    const onFinish = async () => {
        setloadding(true);
        form.validateFields()
            .then(async (values) => {
                var result = await service.registerOrUpdateSupplierService(values as SupplierRegisterDto);

                if (result && result.error) {
                    ToClientExceptionNotifyError(result.messageError, SCREEN_KEY);
                }
                else {
                    notifySuccess(L("SUCCESS", "COMMON"), L("SUCCESS_SIGNUP", SCREEN_KEY));
                }
            })
            .catch((info) => {
                notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
            });
        setloadding(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        ToClientExceptionNotifyErrorCommon("");
    };

    const statusConvert = (status: number) => {
        switch (status) {
            case 0: return L("StatusZero", SCREEN_KEY);
            case 1: return L("StatusOne", SCREEN_KEY);
            case 2: return L("StatusTwo", SCREEN_KEY);
            case 3: return L("StatusThree", SCREEN_KEY);
            case 4: return L("StatusFour", SCREEN_KEY);
            case 5: return L("StatusFive", SCREEN_KEY);
            case 5: return L("StatuSix", SCREEN_KEY);
            default: return L("StatusZero", SCREEN_KEY);
        }
    }

    return (
        <>
            <Drawer
                title={L("REGISTER_SUPPLIER_COMMON_TITLE", SCREEN_KEY)}
                width={"80vw"}
                onClose={props.onClose}
                open={props.onActive}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button loading={loadding} onClick={props.onClose}>{L("CANCEL", "COMMON")}</Button>
                        <Button loading={loadding} onClick={onFinish} type="primary">
                            {supplierRegisterDto
                                ? L("SAVE", "COMMON") + " " + L("REGISTER", "COMMON")
                                : L("REGISTER", "COMMON")
                            }
                        </Button>
                    </Space>
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    disabled={loadding}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="nameShop"
                                label={L("NameShop", SCREEN_KEY)}
                                tooltip={L("Guide_NameShop", SCREEN_KEY)}
                                rules={[
                                    {
                                        required: true, message: L("NOT_NULL_PATTERN", "COMMON")
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ ]+$/,
                                        message: <>{L("NAME_VN_PATTERN", "COMMON")}</>
                                    }
                                ]}
                            >
                                <Input placeholder={L("Please_NameShop", SCREEN_KEY)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="numberPhone"
                                label={L("NumberPhone", SCREEN_KEY)}
                                tooltip={L("Guide_NumberPhone", SCREEN_KEY)}
                                rules={[
                                    {
                                        required: true, message: L("NOT_NULL_PATTERN", "COMMON")
                                    },
                                    {
                                        pattern: /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}/,
                                        message: <>{L("NUMBER_PHONE_PATTERN", "COMMON")}</>
                                    }
                                ]}
                            >
                                <NumericInput
                                    max={10}
                                    min={0}
                                    placeholder={L("Please_NumberPhone", SCREEN_KEY)}
                                    value={valueNumericInput}
                                    onChange={setValueNumericInput} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label={L("Email", SCREEN_KEY)}
                                tooltip={L("Guide_Email", SCREEN_KEY)}
                                rules={[
                                    {
                                        required: true,
                                        message: L("NOT_NULL_PATT ERN", "COMMON")
                                    },
                                    {
                                        pattern: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                                        message: L("EMAIL_PATTERN", "COMMON")
                                    }
                                ]}
                            >
                                <Input placeholder={L("Please_Email", SCREEN_KEY)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="linkShop"
                                label={L("LinkShop", SCREEN_KEY)}
                                tooltip={L("Guide_LinkShop", SCREEN_KEY)}
                                rules={[
                                    {
                                        required: true,
                                        message: L("NOT_NULL_PATTERN", "COMMON")
                                    },
                                    {
                                        pattern: /^(\/)([a-zA-Z0-9][a-zA-Z0-9-_?%=&:\/]*\.)*[a-zA-Z0-9]*[a-zA-Z0-9-_?%=&:\/]*[[a-zA-Z0-9]+$/,
                                        message: <>{L("URLSUB_PATTERN", "COMMON")}</>
                                    }
                                ]}
                            >
                                <Input placeholder={L("Please_LinkShop", SCREEN_KEY)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="passWordShop"
                                label={L("PassWordShop", SCREEN_KEY)}
                                tooltip={L("Guide_PassWordShop", SCREEN_KEY)}
                                rules={[
                                    {
                                        required: true,
                                        message: L("NOT_NULL_PATTERN", "COMMON")
                                    },
                                    {
                                        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                        message: <>{L("PASSWORD_PATTERN", "COMMON")}</>
                                    }
                                ]}
                            >
                                <Password placeholder={L("Please_PassWordShop", SCREEN_KEY)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="haskPassAgian"
                                label={L("HaskPassAgian", SCREEN_KEY)}
                                dependencies={['passWordShop']}
                                tooltip={L("Guide_HaskPassAgian", SCREEN_KEY)}
                                rules={[
                                    {
                                        required: true,
                                        message: L("NOT_NULL_PATTERN", "COMMON")
                                    },
                                    {
                                        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                        message: <>{L("PASSWORD_PATTERN", "COMMON")}</>
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('passWordShop') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error(L("TWO_PASSWORD_DOESNT_MATCH", SCREEN_KEY)));
                                        },
                                    })
                                ]}
                            >
                                <Password placeholder={L("Please_HaskPassAgian", SCREEN_KEY)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="adress"
                                label={L("Adress", SCREEN_KEY)}
                                tooltip={L("Guide_Adress", SCREEN_KEY)}
                                rules={[
                                    {
                                        required: true,
                                        message: L("NOT_NULL_PATTERN", "COMMON")
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ ,\/]+$/,
                                        message: <>{L("ADRESS_VN_PATTERN", "COMMON")}</>
                                    }
                                ]}
                            >
                                <Input placeholder={L("Please_Adress", SCREEN_KEY)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="url"
                                label={L("Url", SCREEN_KEY)}
                                tooltip={L("Guide_Url", SCREEN_KEY)}
                                rules={[
                                    // {
                                    //     required: true,
                                    //     message: L("NOT_NULL_PATTERN", "COMMON")
                                    // },
                                    {
                                        pattern: /^(\/|https:\/\/|http:\/\/)([a-zA-Z0-9][a-zA-Z0-9-_?%=&:\/]*\.)*[a-zA-Z0-9]*[a-zA-Z0-9-_?%=&:\/]*[[a-zA-Z0-9]+$/,
                                        message: <>{L("URLSUB_PATTERN", "COMMON")}</>
                                    }
                                ]}
                            >
                                <Input placeholder={L("Please_Url", SCREEN_KEY)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="companyVat"
                                label={L("CompanyVat", SCREEN_KEY)}
                                tooltip={L("Guide_CompanyVat", SCREEN_KEY)}
                                rules={[
                                    // {
                                    //     required: true,
                                    //     message: L("NOT_NULL_PATTERN", "COMMON")
                                    // },
                                    {
                                        pattern: /^[a-zA-z0-9]/,
                                        message: <>{L("NAME_VN", "COMMON")}</>
                                    }
                                ]}
                            >
                                <Input placeholder={L("Please_CompanyVat", SCREEN_KEY)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="defaultLanguageId"
                                label={L("DefaultLanguageId", SCREEN_KEY)}
                                tooltip={L("Guide_NumberPhone", SCREEN_KEY)}
                                rules={[
                                    {
                                        required: true,
                                        message: L("NOT_NULL_PATTERN", "COMMON")
                                    }
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder={L("Please_DefaultLanguageId", SCREEN_KEY)}
                                    defaultActiveFirstOption={false}
                                // showArrow={false} filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                // filterSort={(optionA, optionB) =>
                                //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                // }
                                >
                                    {language.map(m => (<Option key={m.id ? m.id : 0} value={m.id ? m.id : 0}>{m.displayName}</Option>))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="status"
                                label={L("Status", SCREEN_KEY)}
                                tooltip={L("Guide_Status", SCREEN_KEY)}
                            >
                                <Tag color={supplierRegisterDto?.status === 3 ? '#7ED321' : '#ff0000'}>{statusConvert(supplierRegisterDto?.status ?? 0)}</Tag>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}
