import React, { SyntheticEvent, useRef, useState } from 'react'
import { Button, Divider, Modal, Rate, Select, Tag } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { CloseCircleOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import { L } from "../../../../lib/abpUtility";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UploadFileButtonCompnent from '../../../../components/File/UploadFileButtonCompnent';
import services from '../services';
import { notifyError, notifySuccess } from '../../../../components/Common/notification';

declare var abp: any;
const SCENES_KEY = "PRODUCT_DETAIL";

interface IYouAssessmentComponent {
    id: number
}

const options = [
    { value: 1, label: 'Đóng gói sản phẩm rất đẹp và chắc chắn' },
    { value: 2, label: 'Chất lượng sản phẩm tuyệt vời' },
    { value: 3, label: 'Rất đáng tiền' },
    { value: 4, label: 'Shop phục vụ rất tốt' }
];

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
    const [star, setStar] = React.useState(3);
    const [commnet, setCommnet] = useState<string>('');
    const [tagRsl, setTagRsl] = useState<number[]>([]);

    const [loading, setloading] = useState<boolean>(false);

    const textRef = useRef<any>();

    const onChangeHandler = async function () {
        // check
        var rsl = await services.assessmentProductReq({
            image: imageevaluates,
            starNumber: star,
            feel: tagRsl,
            commnet: commnet,
            level: 1,
            assessmentProductId: props.id
        });

        if (rsl && rsl.error === false && rsl.result !== undefined) {
            notifySuccess("Thành công", "Commnet thành công!")
        }
        else {
            notifyError("", "");
        }
    };

    // Image
    const [imageevaluates, setimageevaluates] = useState<string[]>([]);

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
    const [removeFile, setRemoveFile] = useState<string>('');

    return (
        <>
            <div className='OJkXBiXyst'>
                <p className='SwswGUqGyh'>{L("DanhGiaCuaBan", SCENES_KEY)}</p>
                {!!abp.auth.getToken()
                    ?
                    <div className='SCeJkHPGQW'>
                        <div className='RlzwbVbmsV'>
                            <div className='eHCQBsdJND'>
                                {
                                    imageevaluates.map((item: string, index) => {
                                        if (index < 7) {
                                            return (
                                                <div className='cKqErgPkfl'>
                                                    <CloseCircleOutlined
                                                        onClick={() => { setRemoveFile(item) }} />
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
                                {star ? <span className="EWMjqeJIcu">{desc[star - 1]}</span> : ''}
                                <Rate disabled={loading} className='ZGXufPQEVl' tooltips={desc} onChange={(e) => setStar(e)} value={star} />
                            </div>
                        </div>
                        <div className='XTyAHJoPyZ'>
                            <Select
                                mode="multiple"
                                showArrow
                                tagRender={tagRender}
                                onChange={(e) => setTagRsl(e)}
                                options={options}
                                bordered={false}
                                disabled={loading}
                                placeholder="Ghim cảm nhận"
                            />
                            <div>
                                <UploadFileButtonCompnent
                                    maxCount={30}
                                    maxSizeFile={200}
                                    multiFile={true}
                                    disable={loading}
                                    onSuss={(e: string[]) => setimageevaluates(e)}
                                    removeFile={removeFile}
                                    onremoveFile={function (e: string): void {
                                        setimageevaluates(imageevaluates.filter(item2 => item2 !== e));
                                    }} />
                            </div>
                        </div>
                        <textarea
                            ref={textRef}
                            onChange={e => setCommnet(e.target.value)}
                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                            className='eNzvzXxgia' name="" id="" />
                        <Divider className="VTsdGRPspc" orientation="center">
                            <Button className='sLiVwLFPQg' onClick={onChangeHandler} loading={loading}>Đánh Giá</Button>
                        </Divider>
                    </div>
                    : <Divider className="VTsdGRPspc" orientation='center'>
                        <Button className='sLiVwLFPQg' href='/user/login'>Đăng Nhập Đánh Giá</Button>
                    </Divider>
                }
            </div >
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
        </>
    )
}
