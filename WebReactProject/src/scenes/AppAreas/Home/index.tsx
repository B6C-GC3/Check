//#region  import
import { Avatar, Button, Card, Col, Rate, Row, Tag } from "antd";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createStructuredSelector } from "reselect";
import { useInjectReducer, useInjectSaga } from "../../../redux/reduxInjectors";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import './home.css';
import {
    CaretRightOutlined,
    HeartTwoTone,
    SearchOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import CardProductComponent from "../../../components/CardProductComponent";
const { Meta } = Card;

const { Text } = Typography;

//#endregion
export interface IHomeProps {
    location: any;
}
const key = "home";
declare var abp: any;

export default function Home(props: IHomeProps) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };
    const settings1 = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 3,
    };
    const settings2 = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 3,
    };
    const settings3 = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 3,
    };
    const settings4 = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 3,
    };
    return (
        <>
            <Helmet>
                <title>Wekee.vn</title>
            </Helmet>
            <Row
                gutter={[10, 10]}
                className="home-carousell-main"
                style={{ alignItems: "center" }}
            >
                <Col span={16}>
                    <Slider {...settings}>
                        <a className="home-carousell-a">
                            <img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/21e4573959ecb121d8d0d4237ad56be4.png.jpg"
                                }
                            />
                        </a>
                        <a className="home-carousell-a">
                            <img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/2a5dea5bf70fec21cbc4d6fd58a16c31.png.jpg"
                                }
                            />
                        </a>
                        <a className="home-carousell-a">
                            <img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/5c0b195194c5314c1f4e1e630b1a0dc4.png.jpg"
                                }
                            />
                        </a>
                        <a className="home-carousell-a">
                            <img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/9ed820421df28e1c0c62669a04b15d8e.png.jpg"
                                }
                            />
                        </a>
                        <a className="home-carousell-a">
                            <img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/aa71a52f6b73215b171bbc982b2c5eed.png.jpg"
                                }
                            />
                        </a>
                        <a className="home-carousell-a">
                            <img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/adb8db3489db2353b5f0b1da38f15d8a.png.jpg"
                                }
                            />
                        </a>
                    </Slider>
                </Col>
                <Col span={8}>
                    <img
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "5px"
                        }}
                        src={
                            abp.serviceAlbumImage +
                            "XKLkzNRUjq/1190374003600181001e0d9b3c806d2c.png.webp"
                        }
                    />
                </Col>
            </Row>
            <Row style={{ margin: "20px 0" }}>
                <Card
                    title={<div className="qUZhIVlCoK">Giảm Giá Hôm Nay</div>}
                    extra={
                        <Button size="small" type="link" block>
                            <Tag color="red">06</Tag> : &nbsp;
                            <Tag color="red">40</Tag> : &nbsp;
                            <Tag color="red">30</Tag>
                            <CaretRightOutlined />
                        </Button>
                    }
                    size="small"
                    style={{ width: "100%" }}
                >
                    <Slider {...settings3}>
                        <CardProductComponent image={"album/product/product-1.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-2.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-3.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-4.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-5.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-6.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-7.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-8.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-9.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-10.jpg.webp"} />
                    </Slider>
                </Card>
            </Row>
            <div className="iOIPUXbSRO">

            </div>
            <Row style={{ margin: "20px 0" }}>
                <Card
                    title={<div className="qUZhIVlCoK">Thương Hiệu Chính Hãng</div>}
                    size="small"
                    className="ehOgkhPvda"
                    style={{ width: "100%" }}
                >
                    <Slider {...settings1}>
                        <div className="iAhfImHFVN">
                            <a href=""> <img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/42d3f978559c2c152d0263e405b06efe.jpg.webp"
                                }
                            /></a>
                        </div>
                        <div className="iAhfImHFVN">
                            <a href=""><img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/6524e1285c9a6f7efb477dbd4bb8ff8a.png.webp"
                                }
                            /></a>
                        </div>
                        <div className="iAhfImHFVN">
                            <a href=""><img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/d72f6c257aae35c6ca76509e03a7c719.png.jpg"
                                }
                            /></a>
                        </div>
                        <div className="iAhfImHFVN">
                            <a href=""> <img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/93603f0af66c8589be66de7b203efe43.jpg.webp"
                                }
                            /></a>
                        </div>
                    </Slider>
                </Card>
            </Row>
            <Row style={{ margin: "20px 0" }}>
                <div className="ghQDyJXvQQ">
                    <div>
                        <a href="">
                            <img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/83b9f856560d2705e1dfe34a2111a68c.png.webp"
                                }
                            />
                        </a>
                    </div>
                    <div>
                        <a href="">
                            <img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/29d33ff5b363f390645db018d8720a43.png.webp"
                                }
                            />
                        </a>
                    </div>
                    <div>
                        <a href="">
                            <img
                                src={
                                    abp.serviceAlbumImage +
                                    "XKLkzNRUjq/035bc2c7bfd3efde5d421843ef581dc0.png.webp"
                                }
                            />
                        </a>
                    </div>
                </div>
            </Row>
            <Row style={{ margin: "20px 0" }}>
                <Card
                    title={<div className="qUZhIVlCoK">Danh mục nổi bật</div>}
                    extra={
                        <Button size="small" type="link" block>
                            <CaretRightOutlined />
                        </Button>
                    }
                    size="small"
                    style={{ width: "100%" }}
                >
                    <Row gutter={[6, 6]}>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar src="./logo192.png" className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                        <Col className="category-highlights" span={2}>
                            <a>
                                <Avatar className="RpTBThjgGp" size={64} />
                                <p>Áo khoác nữ</p>
                            </a>
                        </Col>
                    </Row>
                </Card>
            </Row>
            <Row style={{ margin: "20px 0" }}>
                <Card
                    title={<div className="qUZhIVlCoK"><SearchOutlined /> Tìm kiếm nổi bật.</div>}
                    className="nQucmfOSNR"
                    extra={
                        <Button size="small" type="link" block>
                            <SyncOutlined spin /> Làm Mới
                        </Button>
                    }
                    size="small"
                    style={{ width: "100%" }}
                >
                    <Row gutter={[16, 6]}>
                        <Col span={6} className="CAMkEsZeBr">
                            <Card
                                hoverable
                                className="PAdYmyGEtI"
                                cover={
                                    <div className="search-highlights">
                                        <a>
                                            <img
                                                alt="example"
                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                            />
                                        </a>
                                        <a>
                                            <img
                                                alt="example"
                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                            />
                                        </a>
                                        <a>
                                            <img
                                                alt="example"
                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                            />
                                        </a>
                                    </div>
                                }
                            >
                                <a href="#">
                                    <Meta
                                        style={{ padding: "5px 10px" }}
                                        title="Sách Kinh Tế"
                                        description="66 Sản Phẩm"
                                    />
                                </a>
                            </Card>
                        </Col>
                        <Col span={6} className="CAMkEsZeBr">
                            <Card
                                hoverable
                                className="PAdYmyGEtI"
                                cover={
                                    <div className="search-highlights">
                                        <a>
                                            <img
                                                alt="example"
                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                            />
                                        </a>
                                        <a>
                                            <img
                                                alt="example"
                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                            />
                                        </a>
                                        <a>
                                            <img
                                                alt="example"
                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                            />
                                        </a>
                                    </div>
                                }
                            >
                                <a href="#">
                                    <Meta
                                        style={{ padding: "5px 10px" }}
                                        title="Sách Kinh Tế"
                                        description="66 Sản Phẩm"
                                    />
                                </a>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Row>
            <Row className="sXQJOsEJXk" gutter={[6, 6]}>
                <Col span={24} className='hnNHbXvKFY'>Gợi ý hôm nay!</Col>
                <div>
                    <CardProductComponent image={"album/product/product-1.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-2.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-3.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-4.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-5.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-6.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-7.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-8.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-9.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-10.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-1.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-2.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-3.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-4.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-5.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-6.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-7.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-8.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-9.jpg.webp"} />
                    <CardProductComponent image={"album/product/product-10.jpg.webp"} />

                </div>
            </Row>
        </>
    );
}
