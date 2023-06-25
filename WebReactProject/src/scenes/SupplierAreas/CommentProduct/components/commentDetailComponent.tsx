import { DropboxOutlined, PushpinOutlined, LikeOutlined, DislikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Button, Modal, Rate, Select, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { RepAssessmentCommentComponent } from '../../../AppAreas/DetailProduct/components/assessmentComponent';
import { TypeLikeComment } from '../../../AppAreas/DetailProduct/dtos/assessmentProduct';
import { AssessmentProductComment, AssessmentProductImage } from '../dtos/commentProduct';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../../../AppAreas/DetailProduct/detail.css'
import { notifyError } from '../../../../components/Common/notification';

const { Option } = Select;
declare var abp: any;

const ID_SP = 52;

const options = [
    { value: 1, label: 'Đóng gói sản phẩm rất đẹp và chắc chắn' },
    { value: 2, label: 'Chất lượng sản phẩm tuyệt vời' },
    { value: 3, label: 'Rất đáng tiền' },
    { value: 4, label: 'Shop phục vụ rất tốt' }
];

interface ICommentDetailComponent {
    idComment: number;
    onClose: () => void;
}

export default function CommentDetailComponent(props: ICommentDetailComponent) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [dataCommnet, setDataCommnet] = useState<AssessmentProductComment[]>([{
        id: 2,
        star: 5,
        commnet: "Đây là commnet gốc 1",
        status: false,
        feel: [
            1,
            2
        ],
        attributeProductComment: [
            {
                attributeKeyName: "COLOR",
                attributeValueName: "NAVY"
            },
            {
                attributeKeyName: "CAPACITY",
                attributeValueName: "16GB"
            },
            {
                attributeKeyName: "RAM",
                attributeValueName: "16GB"
            }
        ],
        useful: 1,
        meaningless: 0,
        feedback: 6,
        myUseful: false,
        myMeaningless: false,
        image: []
    }]);

    useEffect(() => {
        console.log('props.idComment', props.idComment);
        if (props.idComment !== 0) {
            setIsModalOpen(true);
        }
    }, [props.idComment]);

    // renderImage Commnet
    const imageHandleUI = (item: AssessmentProductImage[]) => {
        if (item.length >= 1 && item.length <= 5)
            return item.map(m => {
                return (<>
                    <div
                        className="cKqErgPkfl"
                        onClick={() => _showImageSelected(m.imageName340x340)}
                    >
                        <LazyLoadImage
                            alt={"ádsda"}
                            effect="blur"
                            src={abp.serviceAlbumImage + m.imageName80x80}
                        />
                    </div>
                </>);
            });
        else if (item.length > 5) {
            return (<>
                <div
                    className="cKqErgPkfl"
                >
                    <LazyLoadImage
                        alt={"ádsda"}
                        effect="blur"
                        src={abp.serviceAlbumImage + "itemImage.image80x80"}
                    />
                </div>
                <div
                    className="cKqErgPkfl"
                >
                    <LazyLoadImage
                        alt={"ádsda"}
                        effect="blur"
                        className="cKqErgPkfl"
                        src={abp.serviceAlbumImage + "itemImage.image80x80"}
                    />
                    <span className="VNDntFciDM">Hiển thị thêm 111 ảnh khác</span>
                </div>
            </>);
        }
        else return (<></>)
    }

    const _showImageSelected = (image340x340: string) => {
    }

    const likeReviewEvaluate = async (levelEvaluates: number, typeLikeComment: TypeLikeComment, idEvaluates: number, isStatus: boolean) => {
        if (!!abp.auth.getToken()) {

            // var rsl = await services.ChangeLikeOrDislikeAssessment({
            //     idsp: ID_SP,
            //     idAssessment: idEvaluates,
            //     level: levelEvaluates,
            //     status: isStatus,
            //     typeLike: typeLikeComment
            // });

            // if (rsl && rsl.error === false && rsl.result !== undefined) {
            //     if (rsl.result === 1) {
            //         // change view 
            //         let dataCommnetTemp = dataCommnet.map(m => {
            //             if (m.id === idEvaluates) {
            //                 if (isStatus) {
            //                     if (typeLikeComment === TypeLikeComment.IsLike) {
            //                         m.myUseful = isStatus;
            //                         m.useful = m.useful + 1;
            //                         if (m.myMeaningless) {
            //                             m.myMeaningless = false;
            //                             m.meaningless = m.meaningless - 1;
            //                         }
            //                     }
            //                     else {
            //                         m.myMeaningless = isStatus;
            //                         m.meaningless = m.meaningless + 1;
            //                         if (m.myUseful) {
            //                             m.myUseful = false;
            //                             m.useful = m.useful - 1;
            //                         }
            //                     }
            //                 }
            //                 else {
            //                     if (typeLikeComment === TypeLikeComment.IsLike) {
            //                         m.myUseful = isStatus;
            //                         m.useful = m.useful - 1;
            //                     }
            //                     else {
            //                         m.myMeaningless = isStatus;
            //                         m.meaningless = m.meaningless - 1;
            //                     }
            //                 }
            //             }

            //             return m;
            //         });

            //         setDataCommnet(dataCommnetTemp);
            //         return isStatus;
            //     }
            // }
            // else {
            //     notifyError("STAR", "LỖI");
            // }
        } else {
            message.warning("Bạn cần đăng nhập để like bình luận này!");
        }
    };

    const onCancel = () => {
        props.onClose();
        setIsModalOpen(false);
    }

    return (
        <Modal title="Basic Modal" className='bxnEzbucoS' open={isModalOpen} onCancel={onCancel} footer={null}>
            {dataCommnet.map(item => {
                return (<div key={item.id} className="cfgjlVcRMQ" style={{ width: "calc(100% - 20px)", maxWidth: "calc(100% - 20px)" }}>
                    <div className="liyeWatEpD">
                        <Rate
                            className="LgfLOmjQMW"
                            value={item.star ?? 0}
                            disabled
                            defaultValue={3}
                        />
                    </div>
                    <p className="uVOrGSOXsc">
                        <DropboxOutlined />
                        <span>Đã mua hàng</span>
                        {item.feel?.map(m => {
                            return (<span>
                                {options[m].label} <PushpinOutlined />
                            </span>)
                        })}
                    </p>
                    <div className="GWmMQEuuPK">{item.commnet}</div>
                    <div className="gRDMnIHgdU">
                        {imageHandleUI(item.image)}
                    </div>
                    <div className="puUSLSJlzZ">
                        <div className="dnBQQNdEwT">
                            {item.attributeProductComment[0].attributeKeyName} : <span>{item.attributeProductComment[0].attributeValueName} </span>
                        </div>
                        <div className="dnBQQNdEwT">
                            {item.attributeProductComment[1].attributeKeyName} : <span>{item.attributeProductComment[1].attributeValueName} </span>
                        </div>
                        <div className="dnBQQNdEwT">
                            {item.attributeProductComment[2].attributeKeyName} : <span>{item.attributeProductComment[2].attributeValueName} </span>
                        </div>
                    </div>
                    <div className="GSUNSRmwNO">
                        <Button
                            type="link"
                            className={item.myUseful ? "aUlQvWccLA dLGiHcVLYs" : "aUlQvWccLA"}
                            icon={<LikeOutlined />}
                            onClick={async () => likeReviewEvaluate(1, TypeLikeComment.IsLike, item.id, !item.myUseful)}
                        >
                            Hữu ích ({item.useful})
                        </Button>
                        <Button
                            type="link"
                            className={item.myMeaningless ? "aUlQvWccLA dLGiHcVLYs" : "aUlQvWccLA"}
                            icon={<DislikeOutlined />}
                            onClick={() => likeReviewEvaluate(1, TypeLikeComment.IsDislike, item.id, !item.myMeaningless)}
                        >
                            Vô nghĩa ({item.meaningless})
                        </Button>
                        <Button
                            type="link"
                            className="aUlQvWccLA"
                            icon={<MessageOutlined />}
                        >
                            Phản hồi({item.feedback})
                        </Button>
                    </div>
                    <RepAssessmentCommentComponent
                        idsp={ID_SP}
                        idAssessment={item.id}
                        statusLoading={0} />
                </div>)
            })}
        </Modal>
    )
}
