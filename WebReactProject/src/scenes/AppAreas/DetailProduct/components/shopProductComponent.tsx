//#region import
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { HistoryOutlined, ShopOutlined, MessageOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col, Button, Skeleton } from 'antd';

declare var abp: any;
//#endregion

interface IShopProductComponentProps {

}
const stateSelector = createStructuredSelector<any, any>({

});
export default function ShopProductComponent(props: IShopProductComponentProps) {

  // const dispatch = useDispatch();

  // const {
  // } = useSelector(stateSelector);

  return (
    <>
      <Skeleton className="gkchWemBrr" loading={false} active paragraph={{ rows: 2 }}>
        <Row className="qFCWRAtWva">
          <Col span={6}>
            <div style={{ position: "relative" }}>
              <img
                className="cUNLNWbjKS"
                src={
                  abp.serviceAlbumImage +
                  "/product/wekee-wekee-065117d465185d35584804fb16f5ded6-011709-23092021--012154-23092021-S340x340.jpg"
                }
                alt=""
              />
              <HistoryOutlined className="QtHTvWzBal" />
            </div>
          </Col>
          <Col span={18}>
            <a className="XhuOxcXgNZ" href="#">Bé mèo vàng</a>
            <div style={{ display: "flex", width: "100%" }}>
              <Button className="PhtnSETPFW" size="small" icon={<ShopOutlined />}
              >Shop
              </Button>
              <Button className="PhtnSETPFW" size="small" icon={<MessageOutlined />}
              >
                Chat
              </Button>
              <Button className="PhtnSETPFW" size="small" icon={<PlusOutlined />}
              >
                Follow
              </Button>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <img className="AhhxWVRcUP" />
              <img className="AhhxWVRcUP" />
              <img className="AhhxWVRcUP" />
              <img className="AhhxWVRcUP" />
              <img className="AhhxWVRcUP" />
              <img className="AhhxWVRcUP" />
              <img className="AhhxWVRcUP" />
            </div>
          </Col>
          <Col span={24}></Col>
        </Row>
      </Skeleton>
    </>
  )
}
