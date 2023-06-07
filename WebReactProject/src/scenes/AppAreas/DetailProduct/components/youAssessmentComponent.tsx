import React, { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Button, Divider, message, Modal, Rate, Select, Tag, Upload } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { CloseCircleOutlined, FileImageOutlined, SmileOutlined, UploadOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import { L } from "../../../../lib/abpUtility";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UploadFileButtonCompnent from '../../../../components/File/UploadFileButtonCompnent';
const { Dragger } = Upload;

declare var abp: any;
const SCENES_KEY = "PRODUCT_DETAIL";

interface IYouAssessmentComponent {
    id: number
}

const options = [{ value: 'Đóng gói sản phẩm rất đẹp và chắc chắn' }, { value: 'Chất lượng sản phẩm tuyệt vời' }, { value: 'Rất đáng tiền' }, { value: 'Shop phục vụ rất tốt' }];

function tagRender(values: { label: any; value: any; closable: any; onClose: any; }) {
    const { label, closable, onClose } = values;
    const onPreventMouseDown = (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Tag

            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginRight: 3, color: '#4e4e4e', border: "1px solid #4e4e4e", padding: '0 5px', borderRadius: "15px"
            }}
        >
            {label}
        </Tag >
    );
}


export default function YouAssessmentComponent(props: IYouAssessmentComponent) {
    const desc = ['Rất không hài lòng', 'Không hài lòng', 'Ổn', 'Tuyệt vời', 'Rất tuyệt vời'];
    const [Star, setStar] = React.useState(3)

    const [loading, setloading] = useState<boolean>(false);

    const handleChange = (value: any) => {
        setStar(value);
    };

    const textRef = useRef<any>();

    const onChangeHandler = function (e: SyntheticEvent) {
        const target = e.target as HTMLTextAreaElement;
        textRef.current.style.height = "30px";
        textRef.current.style.height = `${target.scrollHeight}px`;
    };

    // Image
    const [imageevaluates, setimageevaluates] = useState<string[]>([""]);
    const propsImage = {
        name: 'files',
        multiple: true,
        action: 'https://localhost:44324/v1/api/create/image-evaluates',
        onChange(info: any) {
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setimageevaluates([...imageevaluates, info.file.response]);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e: any) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    const settings3 = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectImage, setselectImage] = useState('');

    // pinFeeling
    return (
        <>
            <div className='OJkXBiXyst'>
                <p className='SwswGUqGyh'>{L("DanhGiaCuaBan", SCENES_KEY)}</p>
                {!!abp.auth.getToken()
                    ? <div className='SCeJkHPGQW'>
                        <div className='RlzwbVbmsV'>
                            <div className='eHCQBsdJND'>
                                {
                                    imageevaluates.map((item: string, index) => {
                                        if (index < 7) {
                                            return (
                                                <div className='cKqErgPkfl'>
                                                    <CloseCircleOutlined onClick={() => { setimageevaluates(imageevaluates.filter(item2 => item2 !== item)); }} />
                                                    <LazyLoadImage
                                                        alt={"ádsda"}
                                                        effect="blur"
                                                        onClick={() => setIsModalVisible(true)}
                                                        src={abp.serviceAlbumImage + item} />
                                                </div>
                                            );
                                        }
                                        if (index === 7) {
                                            return (
                                                <div className='cKqErgPkfl'>
                                                    <LazyLoadImage
                                                        alt={"ádsda"}
                                                        effect="blur"
                                                        className="cKqErgPkfl"
                                                        src={abp.serviceAlbumImage + item} />
                                                    <span className='VNDntFciDM'>Hiển thị thêm {imageevaluates.length - 6} ảnh khác</span>
                                                </div>
                                            );
                                        }
                                    })
                                }
                            </div>
                            <div className='IMqJSNHkYz'>
                                {Star ? <span className="EWMjqeJIcu">{desc[Star - 1]}</span> : ''}
                                <Rate className='ZGXufPQEVl' tooltips={desc} onChange={handleChange} value={Star} />
                            </div>
                            <Modal
                                title="Chi tiết ảnh"
                                footer={null}
                                visible={isModalVisible}
                                onCancel={() => setIsModalVisible(false)}
                                bodyStyle={{ textAlign: 'center' }}
                            >
                                <div className='cKqErgPkfl'>
                                    <span onClick={() => { setimageevaluates(imageevaluates.filter(item2 => item2 !== selectImage)); setselectImage('') }}>Xóa</span>
                                    <LazyLoadImage
                                        alt={"Lựa chọn image"}
                                        effect="blur"
                                        onClick={() => setIsModalVisible(true)}
                                        src={!selectImage ? '' : abp.serviceAlbumImage + selectImage} />
                                </div>
                                <div className="CDBhRpMxwl">
                                    <Slider {...settings3}>
                                        {
                                            imageevaluates.map((element: string) => {
                                                return (<img className={"LmqLbjIyYc" + " " + (selectImage === element ? "bFpTBTrDfH" : "")}
                                                    onClick={() => setselectImage(element)}
                                                    src={abp.serviceAlbumImage + element}
                                                    alt={''} />)
                                            })
                                        }
                                    </Slider>
                                </div>
                            </Modal>
                        </div>
                        <div className='XTyAHJoPyZ'>
                            <Select
                                mode="multiple"
                                showArrow
                                tagRender={tagRender}
                                options={options}
                                bordered={false}
                                placeholder="Ghim cảm nhận"
                            />
                            <div>
                                <UploadFileButtonCompnent
                                    maxCount={30}
                                    maxSizeFile={200}
                                    multiFile={true}
                                    onSuss={(e: string[]) => setimageevaluates(e)} />
                                {/* <span className='JlgHldYWir'
                                    style={{ background: "linear-gradient(#e8e8e8 " + percentUploadImage + "%, #00FFFF " + (100 - percentUploadImage) + "%)" }}>
                                    <label htmlFor="file-upload">
                                        <UploadOutlined />
                                    </label>
                                    <input id="file-upload" type="file" />
                                </span> */}
                            </div>
                        </div>
                        <textarea
                            ref={textRef}
                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                            className='eNzvzXxgia' name="" id="" />
                        <Divider className="VTsdGRPspc" orientation="center">
                            <Button className='sLiVwLFPQg' loading={loading}>Đánh Giá</Button>
                        </Divider>
                    </div>
                    : <Divider className="VTsdGRPspc" orientation='center'><Button className='sLiVwLFPQg' href='/login'>Đăng Nhập Đánh Giá</Button></Divider>
                }
            </div >
        </>
    )
}
