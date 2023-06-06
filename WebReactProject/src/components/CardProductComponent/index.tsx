import React, { useState } from "react";
import { Card, Checkbox, Rate, Skeleton, Typography } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Helmet } from "react-helmet";
import './style.css';

const { Meta } = Card;
const { Text } = Typography;
declare var abp: any;

type ICardProduct = {
  image?: string;
  loadding?: boolean;
  url?: string;
}

export default function CardProductComponent({
  image = '',
  loadding = false,
  url = ''
}: ICardProduct) {
  return (
    <>
      <Skeleton className="qwMzakzeMs" loading={loadding} active avatar>
        <div className="hsurnjftyd">
          {/* <div className="dcp-khung">
            <span className="dcp-khung-before"></span>
            <span className="dcp-loi">
              <span className="dcp-base">
                <span>20%</span>
              </span>
            </span>
          </div> */}
          <a
            className="MgCJXPSMyz"
            href={url}
          >
            <div className="KJNpivAQCF">Uy Tín</div>
            <div className="KJNpivAQCF">Uy Tín</div>
            {/* uuKOdZJfZY */}
            <div className="KJNpivAQCF ">Uy Tín</div>
            <LazyLoadImage
              alt={""}
              effect="opacity"
              //src={abp.serviceAlbumImage + image}
              onError={(event: any) => {
                event.target.src = "/default-image.jpg"
                event.onerror = null
              }}
              src='https://salt.tikicdn.com/cache/280x280/ts/product/f5/52/80/675e31a670afc560e7b0e46c0b65fb4f.png.webp'
            />
          </a>
          <div className="ZDyVztAfXt">
            <div className="ayVIoBempd">
              <span className="title-product">
                Khởi Nghiệp Kinh Doanh Online - Bán Hàng Hiệu Quả Trên Facebook -
                Bán Hàng Hiệu Quả Trên Facebook - Bán Hàng Hiệu Quả Trên Facebook
              </span>
            </div>
            <div className="description-product">
              <p className="description-product-money">
                <Text strong type="danger">
                  10.000.000 ₫
                </Text>
                &nbsp;-&nbsp; <Text delete>11.000.000 ₫</Text>
              </p>
              <p className="description-product-promotion">
                <span>Mưa quà tặng</span>
                <span>Freeship+</span>
                <span>Giảm 15%</span>
              </p>
              <p className="description-product-evaluate">
                <a>
                  <HeartTwoTone twoToneColor="#eb2f96" />
                </a>
                <Rate disabled allowHalf defaultValue={2.5} />
                (300)&nbsp;|&nbsp;<span>Đã bán : 100000</span>
              </p>
            </div>
            <div className="kZHlRWzkIc">dasasdasasd</div>
          </div>
        </div>
      </Skeleton>
    </>

  );
}
