import React, { SyntheticEvent, useRef, useState } from 'react'
import { Button, Divider, message, Modal, Rate, Select, Tag, Upload } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { CloseCircleOutlined, FileImageOutlined, SmileOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { Picker } from "emoji-mart";
// import "emoji-mart/css/emoji-mart.css";
const { Dragger } = Upload;

declare var abp: any;
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

function beforeUpload(file: { type: string; size: number; }) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
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
    const [imageevaluates, setimageevaluates] = useState<string[]>([]);
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

    // input
    const [assessmentInput, setassessmentInput] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const addEmoji = (e: any) => {
        const refin = textRef.current;
        refin.focus();
        const start = assessmentInput.substring(0, refin.selectionStart);
        const end = assessmentInput.substring(refin.selectionStart);
        const text = start + e.native + end
        setassessmentInput(text);
    };
    // pinFeeling
    return (
        <>
            <div className='OJkXBiXyst'>
                <p className='SwswGUqGyh'>Đánh giá của bạn</p>
                {!!abp.auth.getToken()
                    ? <div className='SCeJkHPGQW' style={{ width: 'initial' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                                <div className='cKqErgPkfl' style={{ width: '100%', height: '100%' }}>
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
                        <div style={{ width: '100%', display: 'flex' }}>
                            <Select
                                mode="multiple"
                                showArrow
                                tagRender={tagRender}
                                style={{ width: '80%', background: 'white', borderRadius: 15 }}
                                options={options}
                                bordered={false}
                                placeholder="Ghim cảm nhận"
                            />
                            <div style={{ width: 'calc(20% - 5px)', display: 'flex', alignItems: 'center', position: 'relative', marginLeft: '5px', background: 'white', borderRadius: 15 }}>
                                <SmileOutlined className="JlgHldYWir" onClick={() => setShowEmojis(!showEmojis)} />
                                {showEmojis && (
                                    <div className="KIBtbcoNUB">
                                        {/* <Picker onSelect={(e: any) => addEmoji(e)} /> */}
                                    </div>
                                )}
                                <Dragger
                                    className="JlgHldYWir"
                                    method='POST'
                                    beforeUpload={beforeUpload}
                                    {...propsImage}
                                    style={{ width: 80, height: 80 }}
                                >
                                    <FileImageOutlined />
                                </Dragger>
                            </div>
                        </div>
                        <textarea
                            ref={textRef}
                            value={assessmentInput}
                            onChange={(e: any) => { onChangeHandler(e); setassessmentInput(e.target.value) }}
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
