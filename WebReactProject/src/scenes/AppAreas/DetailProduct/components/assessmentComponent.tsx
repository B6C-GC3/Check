import React, { SyntheticEvent, cloneElement, useEffect, useRef, useState } from "react";
import {
  Button, Divider, message, Modal, Progress, Rate, Select, Typography,
} from "antd";
import {
  CameraOutlined, CaretDownOutlined, CloseCircleOutlined, CloseOutlined, DislikeOutlined, DropboxOutlined, EllipsisOutlined, FireOutlined, HeartOutlined, LikeOutlined, MessageOutlined, NotificationOutlined, PushpinOutlined, SendOutlined, SmileOutlined, StarFilled,
} from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Dragger from "antd/lib/upload/Dragger";
import services from "../services";
import { AssessmentProductComment, AssessmentProductImage, AssessmentProductStat, TypeLikeComment } from "../dtos/assessmentProduct";
import { notifyError } from "../../../../components/Common/notification";
import moment from "moment";
const { Text } = Typography;
const { Option } = Select;
declare var abp: any;

interface IAssessmentComponent {
  id: number;
}

const settings3 = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 3,
  pauseOnHover: true,
};

const options = [
  { value: 1, label: 'Đóng gói sản phẩm rất đẹp và chắc chắn' },
  { value: 2, label: 'Chất lượng sản phẩm tuyệt vời' },
  { value: 3, label: 'Rất đáng tiền' },
  { value: 4, label: 'Shop phục vụ rất tốt' }
];
const ID_SP = 52;

export default function AssessmentComponent(props: IAssessmentComponent) {

  const _getStar = async () => {
    var rsl = await services.getStarProduct(props.id);
    if (rsl && rsl.error === false && rsl.result !== undefined) {
      setStarProduct(rsl.result);
    }
    else {
      notifyError("STAR", "LỖI");
    }
  }

  useEffect(() => {
    _getStar();
    _onLoadComment();
  }, []);

  const [starProduct, setStarProduct] = useState<AssessmentProductStat>({
    starOne: 0,
    starTwo: 0,
    starThree: 0,
    starForur: 0,
    starFive: 0,
    starTotal: 0
  });
  // 
  const sumStar = (starProduct.starOne * 1
    + starProduct.starTwo * 2
    + starProduct.starThree * 3
    + starProduct.starForur * 4
    + starProduct.starFive * 5);

  //modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageevaluates, setimageevaluates] = useState<string[]>([]);
  const [selectImage, setselectImage] = useState("/Zzartjvost/dbce5933-1ccc-4418-ac06-bff82185005es340x340.jpg");

  // review
  const [provisoOnselect, setprovisoOnselect] = useState<number[]>([]);

  const onSelectProviso = (input: number) => {
    if (provisoOnselect.some((element) => element === input)) {
      var dataprovisoOnselect = provisoOnselect.filter(function (item: number) {
        return item !== input;
      });
      setprovisoOnselect(dataprovisoOnselect);
    } else {
      provisoOnselect.push(input);
      setprovisoOnselect(provisoOnselect);
    }
  };

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState(0);
  const [dataCommnet, setDataCommnet] = useState<AssessmentProductComment[]>([]);
  // Commnet
  const _onLoadComment = async () => {
    var rsl = await services.getAssessmentProductCommnet({
      propertySearch: [],
      valuesSearch: ["52"],
      propertyOrder: "",
      valueOrderBy: false,
      pageIndex: 0,
      pageSize: 20
    });

    if (rsl && rsl.error === false && rsl.result !== undefined) {
      setPageIndex(rsl.result.pageIndex);
      setPageSize(rsl.result.pageSize);
      setDataCommnet(rsl.result.items);
    }
    else {
      notifyError("STAR", "LỖI");
    }
  }

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
    setIsModalVisible(true);
    setselectImage(image340x340);
  }

  // like and dislike
  const likeReviewEvaluate = async (levelEvaluates: number, typeLikeComment: TypeLikeComment, idEvaluates: number, isStatus: boolean) => {
    if (!!abp.auth.getToken()) {

      var rsl = await services.ChangeLikeOrDislikeAssessment({
        idsp: ID_SP,
        idAssessment: idEvaluates,
        level: levelEvaluates,
        status: isStatus,
        typeLike: typeLikeComment
      });

      if (rsl && rsl.error === false && rsl.result !== undefined) {
        if (rsl.result === 1) {
          // change view 
          let dataCommnetTemp = dataCommnet.map(m => {
            if (m.id === idEvaluates) {
              if (isStatus) {
                if (typeLikeComment === TypeLikeComment.IsLike) {
                  m.myUseful = isStatus;
                  m.useful = m.useful + 1;
                  if (m.myMeaningless) {
                    m.myMeaningless = false;
                    m.meaningless = m.meaningless - 1;
                  }
                }
                else {
                  m.myMeaningless = isStatus;
                  m.meaningless = m.meaningless + 1;
                  if (m.myUseful) {
                    m.myUseful = false;
                    m.useful = m.useful - 1;
                  }
                }
              }
              else {
                if (typeLikeComment === TypeLikeComment.IsLike) {
                  m.myUseful = isStatus;
                  m.useful = m.useful - 1;
                }
                else {
                  m.myMeaningless = isStatus;
                  m.meaningless = m.meaningless - 1;
                }
              }
            }

            return m;
          });

          setDataCommnet(dataCommnetTemp);
          return isStatus;
        }
      }
      else {
        notifyError("STAR", "LỖI");
      }
    } else {
      message.warning("Bạn cần đăng nhập để like bình luận này!");
    }
  };

  return (
    <div className="OJkXBiXyst">
      <p className="SwswGUqGyh">Đánh giá Sản Phẩm</p>
      <div style={{ display: "flex" }}>
        <div className="VVrWvYaWfC">
          <div className="oDJettRwyU">
            <span className="OCPtBwOIOD">
              {
                Number.isNaN((sumStar / starProduct.starTotal)) ? 0 : (sumStar / starProduct.starTotal).toFixed(2)
              }
            </span>
            <div className="cmNTtEtbtK">
              <Rate
                className="GzDAOKKKVj"
                allowHalf
                value={Math.round((Number.isNaN((sumStar / starProduct.starTotal)) ? 0 : (sumStar / starProduct.starTotal)) * 100) / 100}
                disabled
                defaultValue={3}
              />
              <span className="UCrJvRxSQd">{starProduct.starTotal} nhận xét</span>
            </div>
          </div>
          <div className="IoOXkVMAAl">
            <div className="YgpLxSKxnS">
              <Rate className="EcgcSmPrVd" disabled defaultValue={5} />
              <Progress
                className="FacGcvSojo"
                size="small"
                percent={(starProduct.starFive / starProduct.starTotal) * 100}
                showInfo={false}
              />
              <Text className="BAySdinqWS">{starProduct.starFive}</Text>
            </div>
            <div className="YgpLxSKxnS">
              <Rate className="EcgcSmPrVd" disabled defaultValue={4} />
              <Progress
                className="FacGcvSojo"
                size="small"
                percent={(starProduct.starForur / starProduct.starTotal) * 100}
                showInfo={false}
              />
              <Text className="BAySdinqWS">{starProduct.starForur}</Text>
            </div>
            <div className="YgpLxSKxnS">
              <Rate className="EcgcSmPrVd" disabled defaultValue={3} />
              <Progress
                className="FacGcvSojo"
                size="small"
                percent={(starProduct.starThree / starProduct.starTotal) * 100}
                showInfo={false}
              />
              <Text className="BAySdinqWS">{starProduct.starThree}</Text>
            </div>
            <div className="YgpLxSKxnS">
              <Rate className="EcgcSmPrVd" disabled defaultValue={2} />
              <Progress
                className="FacGcvSojo"
                size="small"
                percent={(starProduct.starTwo / starProduct.starTotal) * 100}
                showInfo={false}
              />
              <Text className="BAySdinqWS">{starProduct.starTwo}</Text>
            </div>
            <div className="YgpLxSKxnS">
              <Rate className="EcgcSmPrVd" disabled defaultValue={1} />
              <Progress
                className="FacGcvSojo"
                size="small"
                percent={(starProduct.starOne / starProduct.starTotal) * 100}
                showInfo={false}
              />
              <Text className="BAySdinqWS">{starProduct.starOne}</Text>
            </div>
          </div>
        </div>
        <div className="SCeJkHPGQW">
          <div className="eHCQBsdJND">
            <div className="cKqErgPkfl" onClick={() => setIsModalVisible(true)}>
              <LazyLoadImage
                alt={"ádsda"}
                effect="blur"
                src={abp.serviceAlbumImage + "item.image80x80"}
              />
            </div>
            <div className="cKqErgPkfl" onClick={() => setIsModalVisible(true)}>
              <LazyLoadImage
                alt={"ádsda"}
                effect="blur"
                className="cKqErgPkfl"
                src={abp.serviceAlbumImage + "item.image80x80"}
              />
              <span className="VNDntFciDM">Hiển thị thêm {555} ảnh khác</span>
            </div>
          </div>
          <div className="mgALtMnzRY">
            <a
              className={
                provisoOnselect.some((element) => element === 5)
                  ? "JzCIqJTYYL  QWgTuTyObU"
                  : "JzCIqJTYYL "
              }
              onClick={() => onSelectProviso(5)}
            >
              5 <StarFilled className="tLyWEpJTkm" />
            </a>
            <a
              className={
                provisoOnselect.some((element) => element === 4)
                  ? "JzCIqJTYYL  QWgTuTyObU"
                  : "JzCIqJTYYL "
              }
              onClick={() => onSelectProviso(4)}
            >
              4 <StarFilled className="tLyWEpJTkm" />
            </a>
            <a
              className={
                provisoOnselect.some((element) => element === 3)
                  ? "JzCIqJTYYL  QWgTuTyObU"
                  : "JzCIqJTYYL "
              }
              onClick={() => onSelectProviso(3)}
            >
              3 <StarFilled className="tLyWEpJTkm" />
            </a>
            <a
              className={
                provisoOnselect.some((element) => element === 2)
                  ? "JzCIqJTYYL  QWgTuTyObU"
                  : "JzCIqJTYYL "
              }
              onClick={() => onSelectProviso(2)}
            >
              2 <StarFilled className="tLyWEpJTkm" />
            </a>
            <a
              className={
                provisoOnselect.some((element) => element === 1)
                  ? "JzCIqJTYYL  QWgTuTyObU"
                  : "JzCIqJTYYL "
              }
              onClick={() => onSelectProviso(1)}
            >
              1 <StarFilled className="tLyWEpJTkm" />
            </a>
            <a className="JzCIqJTYYL">Mới nhất</a>
            <a className="JzCIqJTYYL">Hình Ảnh</a>
            <a className="JzCIqJTYYL">Mua Hàng</a>
          </div>
        </div>

        <Modal
          title="Ảnh từ khách hàng"
          footer={null}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          bodyStyle={{ textAlign: "center" }}
        >
          <div className="NOetRWlgXg">
            <LazyLoadImage
              alt={"Lựa chọn image"}
              effect="blur"
              onClick={() => setIsModalVisible(true)}
              src={!selectImage ? "" : abp.serviceAlbumImage + selectImage}
            />
          </div>
          <div className="PZKHFqYPLI">
            <Slider {...settings3}>
              <img
                className={
                  "LmqLbjIyYc" +
                  " " +
                  (selectImage === "element.image80x80" ? "bFpTBTrDfH" : "")
                }
                src={abp.serviceAlbumImage + "/Zzartjvost/dbce5933-1ccc-4418-ac06-bff82185005es80x80.jpg"}
                alt={""}
              />
            </Slider>
          </div>
        </Modal>
      </div>

      {dataCommnet === undefined || dataCommnet.length === 0
        ? <div className="QKCHfgxgrM">Sản phẩm chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm!</div>
        : <>
          {dataCommnet.map(item => {
            return (<div className="SCeJkHPGQW" >
              <div className="BDVwiLlqTH">
                <div className="LNOnCyyxQa">
                  <div className="QmalboputO">
                    <img className="UsOtLlsjsj" src={abp.serviceAlbumImage} alt="" />
                    <div className="UyXPaSOgcb">
                      <p className="afjfYlfVaY">{item.userComment.name}</p>
                      <p>Đã tham gia : {new Date(Date.now() - new Date(item.userComment.time).getDate()).getDay()} ngày</p>
                    </div>
                  </div>
                  <p className="qCuxZuQMLY">Đã viết: {item.userComment.evaluated} Đánh giá</p>
                  <p className="qCuxZuQMLY">Đã viết: {item.userComment.respected} Phản hồi</p>
                  <p className="qCuxZuQMLY">Đã nhận: {item.userComment.incorrected} Lượt cảm ơn</p>
                  <p className="qCuxZuQMLY">Đã nhận: {item.userComment.responded} Lượt vô nghĩa</p>
                </div>
                <div className="cfgjlVcRMQ">
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
                </div>
              </div>
            </div>)
          })}
          <Divider className="VTsdGRPspc" orientation="left">
            Xem thêm 10 bình luận
          </Divider>
        </>
      }
    </div>
  );
}


interface IRepAssessmentCommentComponent {
  idsp: number;
  idAssessment: number;
  statusLoading: number;
}

export function RepAssessmentCommentComponent(props: IRepAssessmentCommentComponent) {

  // Commnet
  const _onRepComment = async (e: any, idAssessment: number) => {
    if (e.key === 'Enter') {
      var rsl = await services.CommentAssessmentProduct({
        idsp: props.idsp,
        idAssessment: idAssessment,
        comment: e.target.value
      });

      if (rsl && rsl.error === false && rsl.result !== undefined) {
        e.target.value = '';
      }
      else {
        notifyError("STAR", "LỖI");
      }
    }
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          textAlign: "end",
          height: 20,
          lineHeight: 1,
        }}
      >
        <Select
          className="rzYsHrKrLz"
          defaultValue="phuHopNhat"
          suffixIcon={<CaretDownOutlined />}
          bordered={false}
        >
          <Option value="phuHopNhat">Phù Hợp Nhất</Option>
          <Option value="MoiNhat">Mới Nhất</Option>
          <Option value="TatCaBinhLuan">Tất Cả Bình Luận</Option>
        </Select>
      </div>
      <div className="YLmZhraSLJ">
        <input
          className="eNzvzXxgia wFAgOaHIBZ"
          placeholder="Viết Bình luận ..."
          onKeyDown={(e: any) => _onRepComment(e, props.idAssessment)}
        />
      </div>
      <div className="nNVxrpOumL">
        <div className="nNVxrpOumL">
          <div className="JwMWGpetPE">
            <div className="GGKviWLHJH">
              <div className="ZCcIcopBuX"></div>
              <img
                className="EuEinMInHi"
                src={"/default-image.jpg"}
                alt=""
              />
            </div>
            <div className="FwoJYIRsKF">
              <div className="vytbSMnWZY">
                <div className="EFShuNSjPz">{"Tài Khoản"}</div>
                <div className="bRVbtcpFyr">{"Commnet"}</div>
                <div className="RqaOLkKjHG">
                  <HeartOutlined /> {1}
                  <FireOutlined /> {1}
                  <MessageOutlined /> {1}
                </div>
              </div>
              <ul className="nxLBfYxLOR">
                <li className={true ? "iQrPsVgAsr" : ""} > Thích </li>
                <li className={true ? "iQrPsVgAsr" : ""}> Không thích</li>
                <li>Phản hồi</li>
                <li>9 giờ trước</li>
              </ul>
            </div>
            <EllipsisOutlined />
          </div>
          <div className="ByKVhDewtl uIDCSlWITT">
            <div className="GGKviWLHJH">
              <div className="bHexDsHAAu"></div>
              <img
                className="EuEinMInHi"
                src={"/default-image.jpg"}
                alt=""
              />
            </div>
            <div className="FwoJYIRsKF">
              <div className="vytbSMnWZY">
                <div className="EFShuNSjPz">Tài khoản</div>
                <div className="bRVbtcpFyr">
                  <span className="nBjCJOqgOK">Phản hồi bình luận: Comment</span> adadasdasdasda
                </div>
              </div>
              <ul className="nxLBfYxLOR">
                <li>Phản hồi</li>
                <li>9 giờ trước</li>
              </ul>
            </div>
            <EllipsisOutlined />
          </div>
          <div className="ByKVhDewtl uIDCSlWITT">
            <div className="GGKviWLHJH">
              <div className="bHexDsHAAu"></div>
              <img
                className="EuEinMInHi"
                src={"/default-image.jpg"}
                alt=""
              />
            </div>
            <div className="FwoJYIRsKF">
              <input
                className="eNzvzXxgia wFAgOaHIBZ"
                name=""
                id=""
                placeholder="Viết Bình luận ..."
              />
            </div>
          </div>
          <div className="ByKVhDewtl uIDCSlWITT">
            <div className="GGKviWLHJH">
              <div className="bHexDsHAAu"></div>
            </div>
            <div className="FwoJYIRsKF TsoLLSKzSx">
              Xem thêm 10 bình luận
            </div>
          </div>
        </div>
      </div>
      <Divider className="VTsdGRPspc" orientation="left">
        <a>Xem thêm 10 bình luận</a>
      </Divider>
    </>);
}