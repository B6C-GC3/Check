//#region import
import React, { useEffect, useState } from "react";
import { GiftOutlined } from "@ant-design/icons";
import { MainFeatureCheck } from "../dtos/mainFeatureCheckDto";
import { Skeleton } from "antd";
import { ProductReadForCartDto } from "../dtos/cartBasicProductDto";

declare var abp: any;
//#endregion

interface IBasicInfoProductComponentProps {
  infobyFuture: ProductReadForCartDto | undefined;
}

export default function BasicInfoProductComponent(
  props: IBasicInfoProductComponentProps
) {
  //  const dispatch = useDispatch();
  const [mainFeatureCheck, setMainFeatureCheck] = useState<ProductReadForCartDto>();

  useEffect(() => {
    setMainFeatureCheck(props.infobyFuture);
  }, [props.infobyFuture])

  return (
    <>
      <Skeleton className="gkchWemBrr" loading={false} active paragraph={{ rows: 4 }}>
        <div className="AEQBszOavW">
          <div className="dcp-khung">
            <span className="dcp-khung-before"></span>
            <span className="dcp-loi">
              <span className="dcp-base">
                <span>-{10}%</span>
              </span>
            </span>
          </div>
          <div className="oibhFVaXiQ">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(mainFeatureCheck === undefined ? 0 : mainFeatureCheck.price)}
            <div>
              <span>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(mainFeatureCheck === undefined ? 0 : mainFeatureCheck.price)}
              </span>
              <span>{3000}</span>
            </div>
          </div>
          <div className="BwzPWPYcLd">
            <GiftOutlined className="OGxbvhkgxM" /> Mưa quà tặng: {"Một bộ nồi inox."}
          </div>
          <div className="BwzPWPYcLd">
            <GiftOutlined className="OGxbvhkgxM" /> FreeShip: {"Freeship 100%."}
          </div>
          <div className="BwzPWPYcLd">
            <GiftOutlined className="OGxbvhkgxM" /> Giảm giá: {"99%."}
          </div>
        </div>
      </Skeleton>
    </>
  );
}
