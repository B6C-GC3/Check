import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Row, Statistic, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { notifyError } from '../../../components/Common/notification';
import { L } from "../../../lib/abpUtility";
import AddComponents from '../Register/components/addComponents';
import { SupplierInfoDto } from './dataTypes/supplierInfoDto';

import './index.css';
import service from './service';

declare var abp: any;
const SCREEN_KEY = "SUPPLIER_INFOMATION_STORE";

export interface IInfomationStoreComponents {

}

export default function InfomationStore(props: IInfomationStoreComponents) {

    const [infoSupplier, setinfoSupplier] = useState<SupplierInfoDto>();
    const [loadding, setloadding] = useState<boolean>(false);
    const [openEditInfoSupplier, setopenEditInfoSupplier] = useState<boolean>(false);

    useEffect(() => {
        setloadding(true);
        getSingleSupplier();
    }, []);

    const getSingleSupplier = async () => {
        var result = await service.getSingleSupplier();

        if (result && result.error) {
            notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
        }
        else {
            setinfoSupplier(result.result);
        }
        setloadding(false);
    };

    const statusConvert = (status: number | undefined) => {
        switch (status) {
            case 0: return L("StatusZero", "SUPPLIER_REGISTER");
            case 1: return L("StatusOne", "SUPPLIER_REGISTER");
            case 2: return L("StatusTwo", "SUPPLIER_REGISTER");
            case 3: return L("StatusThree", "SUPPLIER_REGISTER");
            case 4: return L("StatusFour", "SUPPLIER_REGISTER");
            case 5: return L("StatusFive", "SUPPLIER_REGISTER");
            case 6: return L("StatuSix", "SUPPLIER_REGISTER");
            default: return L("StatusZero", "SUPPLIER_REGISTER");
        }
    }

    return (
        <>
            <div className='dKtREVzljA'>{L("TITLE_SUPPLIER_INFOMATION_STORE", SCREEN_KEY)}</div>
            <Card className='OTTSvDfhsa' loading={loadding}>
                <Descriptions
                    size='small'
                    title={L("BASIC", SCREEN_KEY)}
                    layout='horizontal'
                    extra={<Button type="primary" onClick={() => setopenEditInfoSupplier(true)}>{L("EDIT", "COMMON")}</Button>}
                >
                    <Descriptions.Item label={L("NameShop", SCREEN_KEY)}><Tag>{infoSupplier?.nameShop}</Tag></Descriptions.Item>
                    <Descriptions.Item label={L("NumberPhone", SCREEN_KEY)}><Tag>{infoSupplier?.numberPhone}</Tag></Descriptions.Item>
                    <Descriptions.Item label={L("Email", SCREEN_KEY)}><Tag>{infoSupplier?.email}</Tag></Descriptions.Item>
                    <Descriptions.Item label={L("Adress", SCREEN_KEY)} span={2}><Tag>{infoSupplier?.adress}</Tag></Descriptions.Item>
                    <Descriptions.Item label={L("LinkShop", SCREEN_KEY)}><Tag>{infoSupplier?.linkShop}</Tag></Descriptions.Item>
                    <Descriptions.Item label={L("Url", SCREEN_KEY)}><Tag>{infoSupplier?.url}</Tag></Descriptions.Item>
                    <Descriptions.Item label={L("CompanyVat", SCREEN_KEY)}><Tag>{ }</Tag></Descriptions.Item>
                    <Descriptions.Item label={L("SslEnabled", SCREEN_KEY)}><Tag color={infoSupplier?.status === 3 ? '#7ED321' : '#ff0000'}>{statusConvert(infoSupplier?.status)}</Tag></Descriptions.Item>
                    <Descriptions.Item label={L("DefaultLanguage", SCREEN_KEY)}><Tag>{infoSupplier?.defaultLanguageName}</Tag></Descriptions.Item>
                    <Descriptions.Item label={L("DisplayOrder", SCREEN_KEY)}><Tag>{infoSupplier?.displayOrder}</Tag></Descriptions.Item>
                </Descriptions>
            </Card>
            <br />
            <Row gutter={[8, 8]}>
                <Col span={6}>
                    <a href="/">
                        <Card className='xfNtIGwtCu' loading={loadding}>
                            <Statistic
                                title={L("Staff_Volatility", SCREEN_KEY)}
                                value={100}
                                precision={2}
                                valueStyle={{ color: true ? '#3f8600' : '#cf1322' }}
                                prefix={true ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            />
                        </Card>
                    </a>
                </Col>
                <Col span={6}>
                    <a href="/">
                        <Card className='xfNtIGwtCu' loading={loadding}>
                            <Statistic
                                title={L("Order_Volatility", SCREEN_KEY)}
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: true ? '#3f8600' : '#cf1322' }}
                                prefix={true ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                suffix="%"
                            />
                        </Card>
                    </a>
                </Col>
            </Row>
            <br />
            <Row gutter={[8, 8]}>
                <Col span={12}>
                    <Card className='OTTSvDfhsa'>
                        <Descriptions
                            size='small'
                            title={L("GIẤY TỜ", SCREEN_KEY)}
                            layout='horizontal'
                            extra={<Button type="primary">{L("EDIT", "COMMON")}</Button>}
                        >

                        </Descriptions>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card className='OTTSvDfhsa'>
                        <Descriptions
                            size='small'
                            title={L("THÔNG SỐ", SCREEN_KEY)}
                            layout='horizontal'
                            extra={<Button type="primary">{L("EDIT", "COMMON")}</Button>}
                        >

                        </Descriptions>
                    </Card>
                </Col>
            </Row>
            <AddComponents onActive={openEditInfoSupplier} onClose={() => { }} />
        </>
    )
}
