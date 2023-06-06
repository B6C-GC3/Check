import { HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import Loading from '../../../../components/Loading';
import { L } from "../../../../lib/abpUtility";
import '../style.css'

export interface IConfirmTokenProps {
    location: any;
}

export default function ConfirmTokenComponent(props: IConfirmTokenProps) {

    const [confirm, setconfirm] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(function () {
            setconfirm(false);
        }, 5000)
    }, [])

    return (
        <Row className='QGschfHCeo'>
            {confirm ?
                <Col className='SuUyCozPiH'>
                    Đang Xác nhận token. Quý khách vui lòng chờ trong giây lát.....!
                </Col>
                : <Col className='fKOCwuthbs'>
                    <Row className='isLgLAhAVt '>Xác nhận thành công!</Row>
                    <Row className='YmihSJEABx' gutter={[10, 10]}>
                        <Col>
                            <Button type="primary" htmlType="submit" icon={<HomeOutlined />}>
                                {L("Trang chủ", "COMMON")}
                            </Button>
                        </Col>
                        <Col>
                            <Button type="primary" htmlType="submit" icon={<LoginOutlined />}>
                                {L("Đăng xuất", "COMMON")}
                            </Button>
                        </Col>
                    </Row>
                </Col>}

            {confirm ? <Loading /> : <></>}
        </Row>
    )
}
