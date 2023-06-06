//#region import
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import moment from "moment";
import ReactImageMagnify from "react-image-magnify";
import "react-lazy-load-image-component/src/effects/blur.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ImageForProductDto } from "../dtos/imageForProductDto";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "antd";
import services from "../services";
import { notifyError } from "../../../../components/Common/notification";

declare var abp: any;
//#endregion

interface IImageZoomComponentProps {
  id: number;
}

export default function ImageZoomComponent(props: IImageZoomComponentProps) {

  const [imageForProduct, setimageForProduct] = useState<ImageForProductDto[]>([]);
  const [mainFeatureCheck, setmainFeatureCheck] = useState<ImageForProductDto[]>([]);

  const settings3 = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  const [imageS80x80, setImageS80x80] = useState<ImageForProductDto[]>([]);
  const [imageS1360xS1360, setImageS1360xS1360] = useState<ImageForProductDto[]>([]);
  const [imageS340x340, setImageS340x340] = useState<ImageForProductDto[]>([]);
  const [zoomImage, setzoomImage] = useState({
    smallImage: { alt: "", isFluidWidth: true, src: "" },
    largeImage: { src: "", width: 900, height: 900 },
  });
  const [selectImage, setselectImage] = useState<string>("");

  // looad image
  const _onloadImage = async (iasp: number) => {
    var rsl = await services.getImageProductService(52);
    if (rsl.error === false && rsl.result !== undefined) {
      var data = rsl.result;
      data.forEach(s => {
        if (s.size == "s80x80") {
          setImageS80x80(s.image);
          setselectImage(s.image[0]?.virtualPath);
        }
        if (s.size == "s340x340") setImageS340x340(s.image);
        if (s.size == "s80x80") setImageS80x80(s.image);

      });
    }
    else {
      notifyError("Dữ liệu Lỗi", rsl.messageError);
    };
  }

  useEffect(() => {
    _onloadImage(52);
  }, []);

  useEffect(() => {
    var dataZoomImage = zoomImage;
    var itemS340x340 = imageS340x340.filter(f => f.virtualPath == selectImage.replace("s80x80", "s340x340"));
    var itemS1360xS1360 = imageS1360xS1360.filter(f => f.virtualPath == selectImage.replace("s80x80", "s1360xS1360"));
    setzoomImage({
      smallImage: {
        alt: itemS340x340[0]?.altAttribute,
        isFluidWidth: true,
        src: abp.appServiceUrl + itemS340x340[0]?.virtualPath
      },
      largeImage: {
        src: abp.appServiceUrl + itemS340x340[0]?.virtualPath,
        width: 1360,
        height: 1360
      }
    }
    );
  }, [selectImage]);

  const _selectImageShow = (imageRoot: string) => {
    setselectImage(imageRoot);
  };

  return (
    <>
      <div className="diTRzvSLbS">
        <ReactImageMagnify style={{ zIndex: 10 }} {...zoomImage}
        />
      </div>
      <div className="CDBhRpMxwl">
        <Skeleton className="gkchWemBrr" loading={false} active paragraph={{ rows: 5 }}>
          <Slider {...settings3}>
            {imageS80x80.map((item) => {
              return (
                <LazyLoadImage
                  className={"LmqLbjIyYc " + (item.virtualPath == selectImage ? "bFpTBTrDfH" : "")}
                  onClick={() => _selectImageShow(item.virtualPath)}
                  alt={item.altAttribute}
                  effect="opacity"
                  onError={(event: any) => {
                    event.target.src = "/default-image.jpg"
                    event.onerror = null
                  }}
                  src={abp.appServiceUrl + item.virtualPath}
                />
              );
            })}
          </Slider>
        </Skeleton>
      </div>
    </>
  );
}
