//#region  import
import * as React from "react";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Row, Skeleton } from "antd";
import { Helmet } from "react-helmet";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import './detail.css'
import { CategoryBreadcrumbDtos } from "./dtos/categoryBreadcrumbDtos";
import CardProductComponent from "../../../components/CardProductComponent";
import ImageZoomComponent from "./components/imageZoomComponent";
import ShopProductComponent from "./components/shopProductComponent";
import ProductInteractionComponent from "./components/productInteractionComponent";
import YouAssessmentComponent from "./components/youAssessmentComponent";
import AssessmentComponent from "./components/assessmentComponent";
import ChartsTopProductComponent from "./components/chartsTopProductComponent";
import BasicInfoProductComponent from "./components/basicInfoProductComponent";
import FeatureProductComponent from "./components/featureProductComponent";
import AddressShipProduct from "./components/addressShipProduct";
import AddToCartComponent from "./components/addToCartComponent";
import { SpecificationAttributeDto } from "./dtos/specificationAttributeDto";
import SimilarProductsCompponents from "./components/similarProductsCompponents";
import ProductDescriptionComponents from "./components/productDescriptionComponents";
import services from "./services";
import { notifyError } from "../../../components/Common/notification";
import { FeatureProductAttribute, FeatureProductReadDto } from "./dtos/featureProductContainerDto";
import { DetailInfoBasicProductDto, ProductReadForCartDto, ProductSpecificationsAttributeDto } from "./dtos/cartBasicProductDto";

//#endregion
export interface IDetailProductProps {
    location: any;
    i: any;
}

declare var abp: any;
const SCENES_KEY = "DETAIL_PRODUCT";

export default function DetailProduct(props: IDetailProductProps) {

    const [featureProductAttribute, setFeatureProductAttribute] = useState<FeatureProductAttribute>();
    const [featureProductReadDto, setFeatureProductReadDto] = useState<FeatureProductReadDto>();
    const [priceByFeatureProductRead, setPriceByFeatureProductRead] = useState<ProductReadForCartDto>();
    const [descriptionPost, setDescriptionPost] = useState<string>("");
    const [speccification, setSpeccification] = useState<ProductSpecificationsAttributeDto[]>([]);
    const [groupSpeccification, setGroupSpeccification] = useState<string[]>([]);
    const [dataProduct, setDataProduct] = useState<DetailInfoBasicProductDto>();
    const ID_PRODUCT = 7;
    //props.location.pathname.substring(props.location.pathname.lastIndexOf("/adsid=") + 7);

    useEffect(() => {
        _loadBeginInfoProduct(52);
    }, []);

    const _loadBeginInfoProduct = async (idsp: number) => {
        var rsl = await services.getBasicProductCartService(52);
        if (rsl.error === false && rsl.result !== undefined) {
            let data = rsl.result;
            setDataProduct(data);
            setFeatureProductAttribute({
                attributeIdOneName: data.attributeIdOneName,
                attributeIdTwoName: data.attributeIdTwoName,
                attributeIdThreeName: data.attributeIdThreeName
            });
            setDescriptionPost(data.fullDescription);
            setSpeccification(data.speccificationAttribute);
            setGroupSpeccification(data.speccificationAttribute.filter((a, i) => data.speccificationAttribute.findIndex((s) => a.group === s.group) === i).map(s => s.group));

        }
        else {
            notifyError("Dữ liệu Lỗi", rsl.messageError);
        };
    }

    const _onChangeFeature = ((data: FeatureProductReadDto) => {
        setFeatureProductReadDto(data);
        setPriceByFeatureProductRead({
            id: data?.id,
            price: data?.price,
            quantity: data?.quantityTotal,
            displayOrder: data?.displayOrder,
            mainProduct: data?.mainProduct,
            idImg: data?.pictureId,
            iMGS80x80: data?.pictureName,
            name: data?.name
        });
    });

    return (
        <>
            {
                <Breadcrumb
                    className="mZxhgGVPMX"
                    items={[
                        {
                            href: '',
                            title: <HomeOutlined />,
                        },
                        {
                            href: '',
                            title: (
                                <>
                                    <UserOutlined />
                                    <span>Application List</span>
                                </>
                            ),
                        },
                        {
                            title: 'Application',
                        },
                    ]}
                />
            }
            <Row>
                <Col span={7} className="lIiNahOSjz">
                    <ImageZoomComponent id={ID_PRODUCT} />
                    <ProductInteractionComponent />
                    <ShopProductComponent />
                </Col>
                <Col style={{ width: "calc(100% - 340px)", paddingLeft: "10px" }}>
                    <ChartsTopProductComponent id={ID_PRODUCT} name={priceByFeatureProductRead?.name} />
                    <Row>
                        <Col className="otSUEGfNRF">
                            <BasicInfoProductComponent infobyFuture={priceByFeatureProductRead} />
                            <FeatureProductComponent
                                id={ID_PRODUCT}
                                attribute={featureProductAttribute}
                                onChange={_onChangeFeature}
                            />
                            <AddressShipProduct />
                            <AddToCartComponent
                                orderMax={dataProduct?.orderMaximumQuantity ?? 0}
                                orderMin={dataProduct?.orderMinimumQuantity ?? 0}
                                productReadForCartDto={priceByFeatureProductRead} />
                        </Col>
                        <Col className="otSUEGfNRF">
                            <Skeleton className="gkchWemBrr" loading={false} active paragraph={{ rows: 7 }}>
                                {
                                    <>
                                        <p>{"Thông tin kèm theo"}</p>
                                        <li className="QMUySBCWUx">
                                            <span>{"Đơn vị"}</span>
                                            {dataProduct?.unitProductValue}
                                        </li>
                                        <li className="QMUySBCWUx">
                                            <span>{"Thương hiệu"}</span>
                                            {dataProduct?.trademarkValue}
                                        </li>
                                        <li className="QMUySBCWUx" >
                                            <span>{"Trạng thái"}</span>
                                        </li>
                                        <li className="QMUySBCWUx">
                                            <span>{"Hàng dễ vỡ"}</span>
                                            {dataProduct?.fragile}
                                        </li>
                                    </>
                                }
                                {
                                    groupSpeccification.map(item => {
                                        return (<>
                                            <p>{item}</p>
                                            <ul className="UPkAKNmJzp">
                                                {speccification.map(s => {
                                                    if (s.group === item)
                                                        return (<li className="QMUySBCWUx" key={s.value}>
                                                            <span>{s.attributeValue}</span>
                                                            {s.value}
                                                        </li>)
                                                })}
                                            </ul>
                                        </>)
                                    })
                                }
                            </Skeleton>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row gutter={[10, 10]}>
                <Col span={19}>
                    <ProductDescriptionComponents description={descriptionPost} />
                    <SimilarProductsCompponents />
                    <AssessmentComponent id={ID_PRODUCT} />
                </Col>
                <Col span={5}>
                    <div className="OJkXBiXyst">
                        <CardProductComponent image={"album/product/product-1.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-2.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-3.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-4.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-5.jpg.webp"} />
                    </div>
                </Col>
            </Row>
        </>
    );
}
