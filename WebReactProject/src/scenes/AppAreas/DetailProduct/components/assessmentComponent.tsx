import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import {
  Button, Divider, message, Modal, Progress, Rate, Select, Typography,
} from "antd";
import {
  CameraOutlined, CaretDownOutlined, CloseCircleOutlined, DislikeOutlined, DropboxOutlined, EllipsisOutlined, FireOutlined, HeartOutlined, LikeOutlined, MessageOutlined, NotificationOutlined, PushpinOutlined, SmileOutlined, StarFilled,
} from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Dragger from "antd/lib/upload/Dragger";
import services from "../services";
import { AssessmentProductComment, AssessmentProductStat } from "../dtos/assessmentProduct";
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

const desc = [
  "Rất không hài lòng",
  "Không hài lòng",
  "Ổn",
  "Tuyệt vời",
  "Rất tuyệt vời",
];

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
  const [selectImage, setselectImage] = useState("");

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

  const dateConvert = (date: string) => {
    var a = new Date(Date.now() - new Date(date).getDate()).getDay();
  }
  useEffect(() => { }, []);
  // like and dislike
  const likeReviewEvaluate = (levelEvaluates: number, idEvaluates: number) => {
    if (!!abp.auth.getToken()) {
    } else {
      message.warning("Bạn cần đăng nhập để like bình luận này!");
    }
  };

  const disLikeReviewEvaluate = (
    levelEvaluates: number,
    idEvaluates: number
  ) => {
    if (!!abp.auth.getToken()) {
    } else {

      message.warning("Bạn cần đăng nhập để phản đối bình luận này!");
    }
  };

  const textRef = useRef<any>();

  const onChangeHandler = function (e: SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    textRef.current.style.height = "30px";
    textRef.current.style.height = `${target.scrollHeight}px`;
  };

  const [assessmentRepcommentInput, setassessmentRepcommentInput] = useState("");

  const sendRepCommentlv1 = (id: number) => { };

  const sendRepCommentlv2 = (id: number) => { };

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
          <div className="cKqErgPkfl">
            <LazyLoadImage
              alt={"Lựa chọn image"}
              effect="blur"
              onClick={() => setIsModalVisible(true)}
              src={!selectImage ? "" : abp.serviceAlbumImage + selectImage}
            />
          </div>
          <div className="CDBhRpMxwl">
            <Slider {...settings3}>
              <img
                className={
                  "LmqLbjIyYc" +
                  " " +
                  (selectImage === "element.image80x80" ? "bFpTBTrDfH" : "")
                }
                src={abp.serviceAlbumImage + "element.image80x80"}
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
                    <span>
                      {"element"} <PushpinOutlined />
                    </span>
                  </p>
                  <div className="GWmMQEuuPK">{item.commnet}</div>
                  {/* <div className="gRDMnIHgdU">
                <div
                  className="cKqErgPkfl"
                  onClick={() => setIsModalVisible(true)}
                >
                  <LazyLoadImage
                    alt={"ádsda"}
                    effect="blur"
                    src={abp.serviceAlbumImage + "itemImage.image80x80"}
                  />
                </div>
                <div
                  className="cKqErgPkfl"
                  onClick={() => setIsModalVisible(true)}
                >
                  <LazyLoadImage
                    alt={"ádsda"}
                    effect="blur"
                    className="cKqErgPkfl"
                    src={abp.serviceAlbumImage + "itemImage.image80x80"}
                  />
                  <span className="VNDntFciDM">Hiển thị thêm 111 ảnh khác</span>
                </div>
              </div> */}
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
                    {" "}
                    {/*dLGiHcVLYs*/}
                    <Button
                      type="link"
                      className={true ? "aUlQvWccLA dLGiHcVLYs" : "aUlQvWccLA"}
                      icon={<LikeOutlined />}
                    >
                      {" "}
                      Hữu ích ({item.useful})
                    </Button>
                    <Button
                      type="link"
                      className={true ? "aUlQvWccLA dLGiHcVLYs" : "aUlQvWccLA"}
                      icon={<DislikeOutlined />}
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
                  {/* <div className="YLmZhraSLJ">
                <div style={{ position: "relative", display: 'flex' }}>
                  <textarea
                    ref={textRef}
                    value={assessmentRepcommentInput}
                    onChange={(e: any) => {
                      onChangeHandler(e);
                      setassessmentRepcommentInput(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      (e.key === "Enter" && e.preventDefault()) ??
                        sendRepCommentlv1(1);
                    }}
                    className="eNzvzXxgia wFAgOaHIBZ"
                    name=""
                    id=""
                    placeholder="Viết Bình luận ..."
                  />
                </div>
                <div className="RPjVXBNSbL">
                  <div className="cKqErgPkfl">
                    <CloseCircleOutlined />
                    <LazyLoadImage
                      alt={"ádsda"}
                      effect="blur"
                      onClick={() => setIsModalVisible(true)}
                      src={abp.serviceAlbumImage}
                    />
                  </div>
                  <div className="cKqErgPkfl">
                    <LazyLoadImage
                      alt={"ádsda"}
                      effect="blur"
                      className="cKqErgPkfl"
                      src={abp.serviceAlbumImage + 1}
                    />
                    <span className="VNDntFciDM">
                      Hiển thị thêm {imageevaluates.length - 6} ảnh khác
                    </span>
                  </div>
                </div>
              </div>
              <div className="nNVxrpOumL">
                <div className="nNVxrpOumL">
                  <div className="JwMWGpetPE">
                    <div className="GGKviWLHJH">
                      <div className="ZCcIcopBuX"></div>
                      <img
                        className="EuEinMInHi"
                        src={abp.serviceAlbumImage + "repcomment.avatarAccount"}
                        alt=""
                      />
                    </div>
                    <div className="FwoJYIRsKF">
                      <div className="vytbSMnWZY">
                        <div className="EFShuNSjPz">{1}</div>
                        <div className="bRVbtcpFyr">{1}</div>
                        <div className="RqaOLkKjHG">
                          <HeartOutlined /> {1}
                          <FireOutlined /> {1}
                          <MessageOutlined /> {1}
                          <NotificationOutlined /> {1}
                        </div>
                      </div>
                      <ul className="nxLBfYxLOR">
                        <li
                          className={true ? "iQrPsVgAsr" : ""}
                          onClick={() => likeReviewEvaluate(1, 1)}
                        >
                          Thích
                        </li>
                        <li
                          className={true ? "iQrPsVgAsr" : ""}
                          onClick={() => disLikeReviewEvaluate(1, 1)}
                        >
                          Không thích{" "}
                        </li>
                        <li>Phản hồi</li>
                        <li>fvxncvn</li>
                      </ul>
                    </div>
                    <EllipsisOutlined />
                  </div>
                  <div className="ByKVhDewtl uIDCSlWITT">
                    <div className="GGKviWLHJH">
                      <div className="bHexDsHAAu"></div>
                      <img
                        className="EuEinMInHi"
                        src={abp.serviceAlbumImage + "replycomment.avatarAccoun"}
                        alt=""
                      />
                    </div>
                    <div className="FwoJYIRsKF">
                      <div className="vytbSMnWZY">
                        <div className="EFShuNSjPz">gh</div>
                        <div className="bRVbtcpFyr">sfa</div>
                      </div>
                      <ul className="nxLBfYxLOR">
                        <li>Phản hồi</li>
                        <li></li>
                      </ul>
                    </div>
                    <EllipsisOutlined />
                  </div>
                  <div className="ByKVhDewtl uIDCSlWITT">
                    <div className="GGKviWLHJH">
                      <div className="bHexDsHAAu"></div>
                      <img
                        className="EuEinMInHi"
                        src={
                          abp.serviceAlbumImage +
                          "/product/wekee-wekee-065117d465185d35584804fb16f5ded6-011709-23092021--012154-23092021-S340x340.jpg"
                        }
                        alt=""
                      />
                    </div>
                    <div className="FwoJYIRsKF">
                      <textarea
                        ref={textRef}
                        value={assessmentRepcommentInput}
                        onChange={(e: any) => {
                          onChangeHandler(e);
                          setassessmentRepcommentInput(e.target.value);
                        }}
                        onKeyPress={(e) => {
                          (e.key === "Enter" && e.preventDefault()) ??
                            sendRepCommentlv2(2);
                        }}
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
              </div> */}
                  <Divider className="VTsdGRPspc" orientation="left">
                    <a>Xem thêm 10 bình luận</a>
                  </Divider>
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
