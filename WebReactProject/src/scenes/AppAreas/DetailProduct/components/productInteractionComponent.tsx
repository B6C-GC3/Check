//#region import
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Row } from 'antd';
import { HeartOutlined, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';

declare var abp: any;
//#endregion

interface IProductInteractionComponentProps {

}
const stateSelector = createStructuredSelector < any, any> ({

});
export default function ProductInteractionComponent(props: IProductInteractionComponentProps) {

    // const dispatch = useDispatch();

    // const {
    // } = useSelector(stateSelector);

    return (
        <>
            <Row style={{ marginTop: 10 }}>
                <hr className="BozncDhktp" />
                <Button
                    className="ReUuFHMkvq"
                    size="small"
                    icon={<HeartOutlined />}
                >
                    Like
                </Button>
                <Button
                    className="ReUuFHMkvq"
                    size="small"
                    icon={<MessageOutlined />}
                >
                    Đánh Giá
                </Button>
                <Button
                    className="ReUuFHMkvq"
                    size="small"
                    icon={<ShareAltOutlined />}
                >
                    Chia sẻ
                </Button>
                <hr className="BozncDhktp" />
            </Row>
        </>
    )
}
