import React, { useEffect } from 'react'
import {
    Card, Col, InputNumber, Rate, Row, Select, Tooltip, Button
} from 'antd';
import { CaretDownOutlined, FilterOutlined, HomeOutlined, MinusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Helmet } from 'react-helmet';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import CardProductComponent from '../../../components/CardProductComponent';
import './urluMSPcKIjBe.css';
import utils from '../../../utils/utils';
const { Option } = Select;

declare var abp: any;

interface IHCategoryListProduct { }

export default function HCategoryListProduct(props: IHCategoryListProduct) {

    useEffect(() => {
        var sdaas = [
            { a: 1, b: 2 },
            { a: null, b: 3 },
            { a: 4, b: 5 },
            { a: 6, b: null }
        ];

        console.log('Test :>> ', utils.generateID());
    }, []);

    return (
        <>
            <Helmet>
                <title>Wekee.vn</title>
            </Helmet>
            <ul className='GjLseculzy'>
                <li><a href="/"><HomeOutlined /></a></li>
                <li><a className="GjLseculzyac" href=""> element</a></li>
                <li><a className="GjLseculzyac" href=""> nameCategory</a></li>
            </ul>
            <div className='HajkddKd5r'></div>
            <Row gutter={[5, 1]}>
                <Col span={24} className="nameKeySearch">
                    <Row gutter={[10, 10]}>
                        <Col span={20} className="nameKeySearch-info">
                            Có 10 trên 10000 bản ghi cho từ khóa "Điện thoại"
                        </Col>
                        <Col span={4}>
                            <Button type='link' icon={<FilterOutlined />}></Button>
                            <Button type='link' icon={<FilterOutlined />}></Button>
                            <Button type='link' icon={<FilterOutlined />}></Button>
                            <Button type='link' icon={<FilterOutlined />}></Button>
                        </Col>
                    </Row>
                </Col>
                <Col className="WIJFDVNrJR" span={4}>
                    <div className='fGMazzirm2'>
                        <p><CaretRightOutlined /> Tất cả danh mục</p>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="category" id="" /><span></span>
                                Điện thoại
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="category" id="" /><span></span>
                                Máy tính bảng
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="category" id="" /><span></span>
                                Pin Dự Phòng
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="category" id="" /><span></span>
                                Pin Gắn Trong, Cáp và Bộ Sạc
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="category" id="" /><span></span>
                                Ốp lưng, bao da, Miếng dán điện thoại
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <CaretDownOutlined />  Xem thêm
                        </div>
                    </div>

                    <div className='fGMazzirm2'><p><CaretRightOutlined /> Nơi bán</p>
                        <div className="BlwyDNJUtb">
                            <label><input type="checkbox" name="adress" id="" /><span></span>
                                Hà Nội
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type="checkbox" name="adress" id="" /><span></span>
                                Hồ Chí Minh
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type="checkbox" name="adress" id="" /><span></span>
                                Thái Bình
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <CaretDownOutlined />  Xem thêm
                        </div>
                    </div>

                    <div className='fGMazzirm2'>
                        <p><CaretRightOutlined /> Giá bán</p>
                        <div className="BlwyDNJUtb">
                            <Tooltip placement="right" title={"Ngàn đồng"} >
                                <div style={{ display: 'flex', alignItems: 'center', padding: '3px 0' }}>

                                    <MinusOutlined />
                                </div>
                            </Tooltip>
                        </div>
                    </div>

                    <div className='fGMazzirm2'>
                        <p><CaretRightOutlined /> Đánh giá</p>
                        <div className="BlwyDNJUtb">
                            <label>
                                <input type="radio" checked name="reviews" id="" /><span ></span>
                                <Rate disabled allowHalf defaultValue={5} />
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label>
                                <input type="radio" name="reviews" id="" /><span ></span>
                                <Rate disabled allowHalf defaultValue={4} /> trở lên
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="reviews" id="" /><span ></span>
                                <Rate disabled allowHalf defaultValue={3} /> trở lên
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label>
                                <input type="radio" name="reviews" id="" /><span ></span>
                                <Rate disabled allowHalf defaultValue={2} />  trở lên
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label>
                                <input type="radio" name="reviews" id="" /><span ></span>
                                <Rate disabled allowHalf defaultValue={1} />  trở lên
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label>
                                <input type="radio" name="reviews" id="" /><span ></span>
                                <Rate disabled allowHalf defaultValue={0} />  trở lên
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <CaretDownOutlined />  Xem thêm
                        </div>
                    </div>

                    <div className='fGMazzirm2'>
                        <p><CaretRightOutlined /> Thương hiệu</p>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="brand" id="" /><span></span>
                                Apple
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="brand" id="" /><span></span>
                                SamSung
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <CaretDownOutlined />  Xem thêm
                        </div>
                    </div>

                    <div className='fGMazzirm2'>
                        <p><CaretRightOutlined /> Tình trạng</p>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="status" id="" /><span style={{ border: ' 1px solid #dddddd' }}></span>
                                Sản phẩm mới
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="status" id="" /><span style={{ border: ' 1px solid #dddddd' }}></span>
                                Sản phẩm cũ
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <CaretDownOutlined />  Xem thêm
                        </div>
                    </div>

                    <div className='fGMazzirm2'>
                        <p><CaretRightOutlined />Loại hình vận chuyển</p>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="transport" id="" /><span></span>
                                Hỏa Tốc
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="transport" id="" /><span></span>
                                Nhanh
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type="radio" name="transport" id="" /><span></span>
                                Tiết Kiệm
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <CaretDownOutlined />  Xem thêm
                        </div>
                    </div>

                    <div className='fGMazzirm2'>
                        <p><CaretRightOutlined /> Dịch vụ</p>
                        <div className="BlwyDNJUtb">
                            <label><input type='checkbox' name="service" id="" /><span></span>
                                Freeship
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type='checkbox' name="service" id="" /><span></span>
                                Tích xu
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <label><input type='checkbox' name="service" id="" /><span></span>
                                Giảm giá
                            </label>
                        </div>
                        <div className="BlwyDNJUtb">
                            <CaretDownOutlined />  Xem thêm
                        </div>
                    </div>

                </Col>
                <Col span={20} >
                    <Row gutter={[6, 6]}>
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
                        <CardProductComponent image={"album/product/product-10.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-10.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-10.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-10.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-10.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-10.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-10.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-10.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-10.jpg.webp"} />
                        <CardProductComponent image={"album/product/product-10.jpg.webp"} />
                        <div className="IaMmsoXcLb">
                            <div className="body">
                                <span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                                <div className="base">
                                    <span></span>
                                    <div className="face"></div>
                                </div>
                            </div>
                            <div className="longfazers">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="hBzXKgfNqk">
                                <span style={{ "--i": 1 } as React.CSSProperties}>L</span>
                                <span style={{ "--i": 2 } as React.CSSProperties}>o</span>
                                <span style={{ "--i": 3 } as React.CSSProperties}>a</span>
                                <span style={{ "--i": 4 } as React.CSSProperties}>d</span>
                                <span style={{ "--i": 5 } as React.CSSProperties}>d</span>
                                <span style={{ "--i": 6 } as React.CSSProperties}>i</span>
                                <span style={{ "--i": 7 } as React.CSSProperties}>n</span>
                                <span style={{ "--i": 8 } as React.CSSProperties}>g</span>
                                <span style={{ "--i": 9 } as React.CSSProperties}>.</span>
                                <span style={{ "--i": 10 } as React.CSSProperties}>.</span>
                                <span style={{ "--i": 11 } as React.CSSProperties}>.</span>
                            </div>
                        </div>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
