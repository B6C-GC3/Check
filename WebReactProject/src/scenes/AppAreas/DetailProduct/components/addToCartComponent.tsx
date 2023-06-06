import React, { useEffect, useState } from "react";
import moment from "moment";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { InputNumber, Input, Button, Typography, Skeleton } from "antd";
import { ProductReadForCartDto } from "../dtos/cartBasicProductDto";

const { Text } = Typography;
declare var abp: any;
interface IAddToCartComponentProps {
  productReadForCartDto: ProductReadForCartDto | undefined;
  orderMax: number;
  orderMin: number;
}

export default function AddToCartComponent(props: IAddToCartComponentProps) {
  const [orderQutity, setorderQutity] = useState<number>(props.orderMin);
  useEffect(() => {
    setorderQutity(props.orderMin)
  }, [props.productReadForCartDto])

  const _changeQuatityOrder = (up: boolean) => {
    let data: number = orderQutity;
    let quatity = props.productReadForCartDto === undefined ? props.orderMin : props.productReadForCartDto.quantity;
    up ? (data = data + 1) : (data = data - 1);
    data = data > quatity ? quatity : data;
    data = data < props.orderMin ? props.orderMin : data;
    setorderQutity(data);
  };

  const _onChangeDataInput = (data: any) => {
    let quatity =
      props.productReadForCartDto === undefined ? props.orderMin : props.productReadForCartDto.quantity;
    data = data > quatity ? quatity : data;
    data = data < props.orderMin ? props.orderMin : data;
    if (data === null || data === undefined) data = props.orderMin;
    setorderQutity(data);
  };
  
  return (
    <>
      <Skeleton className="gkchWemBrr" loading={false} active paragraph={{ rows: 0 }}>
        {props.productReadForCartDto === undefined ||
          props.productReadForCartDto.quantity === 0 ? (
          <>
            <div className="jIClzckmnh">Đã bán hết sản phẩm!</div>
            <hr />
          </>
        ) : (
          <div>
            <div className="cqCDvWHHAI">
              <div className="quirYXYDhV">
                <PlusOutlined
                  className="ZKcRNZsCHm"
                  onClick={() => _changeQuatityOrder(true)}
                />
                <InputNumber
                  stringMode
                  defaultValue={props.orderMin}
                  value={orderQutity}
                  onChange={(value: any) => _onChangeDataInput(value)}
                  min={props.orderMin}
                  max={
                    props.productReadForCartDto === undefined
                      ? props.orderMax
                      : props.productReadForCartDto.quantity
                  }
                  keyboard={false}
                  className="JmuKvefzfZ"
                />
                <MinusOutlined
                  className="ZKcRNZsCHm"
                  onClick={() => _changeQuatityOrder(false)}
                />
              </div>
              <div className="HdSlNhizMl">
                <Input className="yRHMrpPwQg" placeholder="Nhập mã của bạn!" />
                <Text className="mHFRipNbVI" type="success">
                  100%
                </Text>
              </div>
            </div>
            <div className="cqCDvWHHAI">
              <Button className="NtyBxGgasl" type="primary" block>
                Thêm Vào Giỏ Hàng
              </Button>
            </div>
          </div>
        )}
      </Skeleton>

    </>
  );
}
