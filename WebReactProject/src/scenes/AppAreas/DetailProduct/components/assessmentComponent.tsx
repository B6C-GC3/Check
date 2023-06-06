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
//import { Picker } from "emoji-mart";
//import "emoji-mart/css/emoji-mart.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Dragger from "antd/lib/upload/Dragger";
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

function DateTimeProcess(input: Date) {
  // Find the distance between now and the count down date
  var distance = new Date().getTime() - new Date(input).getTime();

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  if (days !== 0 && days <= 5) {
    return days + " ngày";
  }
  if (days !== 0 && days > 5) {
    return input.toString().split("T")[0];
  }
  if (hours !== 0) {
    return hours + " giờ";
  }
  if (minutes >= 5) {
    return minutes + " phút";
  } else {
    return "vừa xong";
  }
}

function beforeUpload(file: { type: string; size: number }) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default function AssessmentComponent(props: IAssessmentComponent) {
  useEffect(() => { }, []);

  const [sumStar, setsumStar] = useState(0);
  const [average, setaverage] = useState(0);

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
  // comment
  const [showCommnetButton, setshowCommnetButton] = useState(0);

  const showCommnetButtonfunc = (idEvaluates: number) => {
    if (!!abp.auth.getToken()) {
      if (showCommnetButton === idEvaluates) {
        setshowCommnetButton(0);
      } else {
        setassessmentRepcommentInput("");
        setShowEmojis(false);
        setshowCommnetButton(idEvaluates);
      }
    } else {
      message.warning("Bạn cần đăng nhập để phản hồi bình luận này!");
    }
  };

  const textRef = useRef<any>();

  const onChangeHandler = function (e: SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    textRef.current.style.height = "30px";
    textRef.current.style.height = `${target.scrollHeight}px`;
  };

  const [assessmentRepcommentInput, setassessmentRepcommentInput] =
    useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const addEmoji = (e: any) => {
    const refin = textRef.current;
    refin.focus();
    const start = assessmentRepcommentInput.substring(0, refin.selectionStart);
    const end = assessmentRepcommentInput.substring(refin.selectionStart);
    const text = start + e.native + end;
    setassessmentRepcommentInput(text);
  };

  const [imageRepevaluates, setimageRepevaluates] = useState<string[]>([]);
  const propsImage = {
    name: "files",
    multiple: true,
    action: "https://localhost:44324/v1/api/create/image-evaluates",
    onChange(info: any) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setimageRepevaluates([...imageRepevaluates, info.file.response]);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const sendRepCommentlv1 = (id: number) => { };

  const sendRepCommentlv2 = (id: number) => { };
  //  show data comment product
  const [pageCommnet, setpageCommnet] = useState(0);
  const showMoreCommnet = (id: number, level: number) => {
    //setpageCommnet(pageCommnet + 1);
  };

  return (
    <div className="OJkXBiXyst">
      <p className="SwswGUqGyh">Đánh giá Sản Phẩm</p>
      <div style={{ display: "flex" }}>
        <div className="VVrWvYaWfC">
          <div className="oDJettRwyU">
            <span className="OCPtBwOIOD">
              {parseFloat(average.toString()).toFixed(2)}
            </span>
            <div className="cmNTtEtbtK">
              <Rate
                className="GzDAOKKKVj"
                allowHalf
                value={Math.round(average * 100) / 100}
                disabled
                defaultValue={3}
              />
              <span className="UCrJvRxSQd">{sumStar} nhận xét</span>
            </div>
          </div>
          <div className="IoOXkVMAAl">
            <div className="YgpLxSKxnS">
              <Rate className="EcgcSmPrVd" disabled defaultValue={5} />
              <Progress
                className="FacGcvSojo"
                size="small"
                percent={(5 / sumStar) * 100}
                showInfo={false}
              />
              <Text className="BAySdinqWS">{5555}</Text>
            </div>
            <div className="YgpLxSKxnS">
              <Rate className="EcgcSmPrVd" disabled defaultValue={4} />
              <Progress
                className="FacGcvSojo"
                size="small"
                percent={(555 / sumStar) * 100}
                showInfo={false}
              />
              <Text className="BAySdinqWS">{555}</Text>
            </div>
            <div className="YgpLxSKxnS">
              <Rate className="EcgcSmPrVd" disabled defaultValue={3} />
              <Progress
                className="FacGcvSojo"
                size="small"
                percent={(5 / sumStar) * 100}
                showInfo={false}
              />
              <Text className="BAySdinqWS">{555}</Text>
            </div>
            <div className="YgpLxSKxnS">
              <Rate className="EcgcSmPrVd" disabled defaultValue={2} />
              <Progress
                className="FacGcvSojo"
                size="small"
                percent={(555 / sumStar) * 100}
                showInfo={false}
              />
              <Text className="BAySdinqWS">{5555}</Text>
            </div>
            <div className="YgpLxSKxnS">
              <Rate className="EcgcSmPrVd" disabled defaultValue={1} />
              <Progress
                className="FacGcvSojo"
                size="small"
                percent={(55 / sumStar) * 100}
                showInfo={false}
              />
              <Text className="BAySdinqWS">{555}</Text>
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

      <div className="SCeJkHPGQW" >
        <div className="BDVwiLlqTH">
          <div className="LNOnCyyxQa">
            <div className="QmalboputO">
              <img className="UsOtLlsjsj" src={abp.serviceAlbumImage} alt="" />
              <div className="UyXPaSOgcb">
                <p className="afjfYlfVaY">1111</p>
                <p>Đã tham gia 1111</p>
              </div>
            </div>
            <p className="qCuxZuQMLY">Đã viết: {"its"} Đánh giá</p>
            <p className="qCuxZuQMLY">Đã viết: {"itates"} Phản hồi</p>
            <p className="qCuxZuQMLY">Đã nhận: {"itites"} Lượt cảm ơn</p>
            <p className="qCuxZuQMLY">Đã nhận: {"ittions"} Lượt vô nghĩa</p>
          </div>
          <div className="cfgjlVcRMQ">
            <div className="liyeWatEpD">
              <Rate
                className="LgfLOmjQMW"
                value={2}
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
            <div className="GWmMQEuuPK">{"item.content"}</div>
            <div className="gRDMnIHgdU">
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
            </div>
            <div className="puUSLSJlzZ">
              <div className="dnBQQNdEwT">
                Màu Sắc <span>TRẮNG</span>
              </div>
              <div className="dnBQQNdEwT">
                Kích thước <span>L</span>
              </div>
              <div className="dnBQQNdEwT">dâsda</div>
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
                Hữu ích (1)
              </Button>
              <Button
                type="link"
                className={true ? "aUlQvWccLA dLGiHcVLYs" : "aUlQvWccLA"}
                icon={<DislikeOutlined />}
              >
                Vô nghĩa (1)
              </Button>
              <Button
                type="link"
                className="aUlQvWccLA"
                icon={<MessageOutlined />}
              >
                Phản hồi(11)
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
            <div className="YLmZhraSLJ">
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
                  className="eNzvzXxgia"
                  name=""
                  id=""
                  placeholder="Viết Bình luận ..."
                />

                <div className="ktwIxbdVgY">
                  <SmileOutlined
                    className="JlgHldYWir"
                    onClick={() => setShowEmojis(!showEmojis)}
                  />
                  <Dragger
                    className="JlgHldYWir"
                    method="POST"
                    beforeUpload={beforeUpload}
                    {...propsImage}
                    style={{ width: 80, height: 80 }}
                  >
                    <CameraOutlined />
                  </Dragger>
                </div>
                <div className="KIBtbcoNUB">
                  {/* <Picker onSelect={(e: any) => addEmoji(e)} /> */}
                </div>
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
                      className="eNzvzXxgia"
                      name=""
                      id=""
                      placeholder="Viết Bình luận ..."
                    />
                    <div className="ktwIxbdVgY">
                      <SmileOutlined
                        className="JlgHldYWir"
                        onClick={() => setShowEmojis(!showEmojis)}
                      />
                    </div>
                    {showEmojis && (
                      <div className="KIBtbcoNUB">
                        {/* <Picker onSelect={(e: any) => addEmoji(e)} /> */}
                      </div>
                    )}
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
          </div>
        </div>
        <Divider className="VTsdGRPspc" orientation="left">
          Xem thêm 10 bình luận
        </Divider>
      </div>
    </div>
  );
}
