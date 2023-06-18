import React from 'react';
import './index.css';
import { CheckOutlined, DeleteOutlined, InfoCircleOutlined, PlayCircleOutlined, RightOutlined, ShopOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function index() {

  const IqyDuqtwxYStyle = {
    "--width": "50%"
  } as React.CSSProperties

  return (
    <>
      <div className='kmUempsOuS'>Giỏ hàng</div>
      <div className='sGOeqILFXU'>
        <div className='IqyDuqtwxY' style={IqyDuqtwxYStyle}>
          <div className='QKjZGsLkvu'>
            <div>Ship</div>
            <CheckOutlined />
            <div>Mua</div>
          </div>
          <div className='QKjZGsLkvu'>
            <div>Freeship giao tiết kiệm</div>
            <CheckOutlined />
            <div>30k</div>
          </div>
          <div className='QKjZGsLkvu'>
            <div>Freeship giao hỏa tốc</div>
            <CheckOutlined />
            <div>50k</div>
          </div>
          <div className='QKjZGsLkvu kWAPEMOmRo'>
            <div>Freeship giao hỏa tốc</div>
            <CheckOutlined />
            <div>100k</div>
          </div>
          <div className='QKjZGsLkvu kWAPEMOmRo'>
            <div>Freeship giao hỏa tốc</div>
            <CheckOutlined />
            <div>200k</div>
          </div>
        </div>
      </div>
      <div className='sGOeqILFXU vYZYmEAXtA'>
        <div><Checkbox /> Tất cả (1 Sản Phẩm)</div>
        <div>Đơn giá</div>
        <div>Số lượng</div>
        <div>Thành tiền</div>
        <div><DeleteOutlined /></div>
      </div>
      <div className='sGOeqILFXU'>
        <div>
          <Checkbox style={{ margin: "0 5px" }} />
          <ShopOutlined />
          <a href=""> Name Shop </a>
          <RightOutlined />
        </div>
        <div className='vYZYmEAXtA'>
          <div className='bNRkzawKAp'>
            <Checkbox />
            <LazyLoadImage
              alt={""}
              effect="opacity"
              onError={(event: any) => {
                event.target.src = "/default-image.jpg"
                event.onerror = null
              }}
              src={"https://localhost:44311//Zzartjvost/98c7aeb1-33c9-4167-a6ef-03bcc51fdd73s80x80.jpg"}
            />
            <div className='jQVGYzUiQD'>
              <a>Apple iPad Air (5th Gen) Wi-Fi 2022 - 64GB Tím Apple iPad Air (5th Gen) Wi-Fi 2022 - 64GB Tím Apple iPad Air (5th Gen) Wi-Fi 2022 - 64GB Tím</a>
              <div><span>FAST </span> Giao tiết kiệm</div>
              <span>+ 71,45 ASA ≈ 15k ₫</span>
            </div>
          </div>
          <div className='eKxWvjEWli'>14.290.000 ₫ <del>18.990.000 ₫</del></div>
          <div>
            <div className='oNhCHMjtrd'>
              <span>+</span>
              <input type="text" defaultValue={0} />
              <span>-</span>
            </div>
            <span>Chỉ còn 1 sản phẩm</span>
          </div>
          <div><span>14.290.000 ₫</span></div>
          <div><DeleteOutlined /></div>
        </div>

        <div className='vYZYmEAXtA'>
          <div className='bNRkzawKAp'>
            <Checkbox />
            <LazyLoadImage
              alt={""}
              effect="opacity"
              onError={(event: any) => {
                event.target.src = "/default-image.jpg"
                event.onerror = null
              }}
              src={"https://localhost:44311//Zzartjvost/98c7aeb1-33c9-4167-a6ef-03bcc51fdd73s80x80.jpg"}
            />
            <div className='jQVGYzUiQD'>
              <a>Apple iPad Air (5th Gen) Wi-Fi 2022 - 64GB Tím Apple iPad Air (5th Gen) Wi-Fi 2022 - 64GB Tím Apple iPad Air (5th Gen) Wi-Fi 2022 - 64GB Tím</a>
              <div><span>FAST </span> Giao tiết kiệm</div>
              <span>+ 71,45 ASA ≈ 15k ₫</span>
            </div>
          </div>
          <div className='eKxWvjEWli'>14.290.000 ₫ <del>18.990.000 ₫</del></div>
          <div>
            <div className='oNhCHMjtrd'>
              <span>+</span>
              <input type="text" defaultValue={0} />
              <span>-</span>
            </div>
            <span>Chỉ còn 1 sản phẩm</span>
          </div>
          <div><span>14.290.000 ₫</span></div>
          <div><DeleteOutlined /></div>
        </div>
      </div>
      <div className='sGOeqILFXU'>
        <div>
          <Checkbox style={{ margin: "0 5px" }} />
          <ShopOutlined />
          <a href=""> Name Shop </a>
          <RightOutlined />
        </div>
        <div className='vYZYmEAXtA'>
          <div className='bNRkzawKAp'>
            <Checkbox />
            <LazyLoadImage
              alt={""}
              effect="opacity"
              onError={(event: any) => {
                event.target.src = "/default-image.jpg"
                event.onerror = null
              }}
              src={"https://localhost:44311//Zzartjvost/98c7aeb1-33c9-4167-a6ef-03bcc51fdd73s80x80.jpg"}
            />
            <div className='jQVGYzUiQD'>
              <a>Apple iPad Air (5th Gen) Wi-Fi 2022 - 64GB Tím Apple iPad Air (5th Gen) Wi-Fi 2022 - 64GB Tím Apple iPad Air (5th Gen) Wi-Fi 2022 - 64GB Tím</a>
              <div><span>FAST </span> Giao tiết kiệm</div>
              <span>+ 71,45 ASA ≈ 15k ₫</span>
            </div>
          </div>
          <div className='eKxWvjEWli'>14.290.000 ₫ <del>18.990.000 ₫</del></div>
          <div>
            <div className='oNhCHMjtrd'>
              <span>+</span>
              <input type="text" defaultValue={0} />
              <span>-</span>
            </div>
            <span>Chỉ còn 1 sản phẩm</span>
          </div>
          <div><span>14.290.000 ₫</span></div>
          <div><DeleteOutlined /></div>
        </div>
      </div>
      <div className='sGOeqILFXU'>
        Vui lòng kiểm tra thông tin trước khi bấm nút mua
      </div>
      <div className='fKKnQfbZou'>
        <div>
          <div className='gkFtjxftkf'>
            <h3>Giao tới</h3>
            <a>Thay đổi</a>
          </div>
          <div className='sIuqDSxnyB'>Trần Hải Nam <span>0392516308</span></div>
          <div className='oibnRClmeo'>
            <span>Nhà</span>
            80/122 đường xuân phuong tu hoàng nhổn, Phường Xuân Phương, Quận Nam Từ Liêm, Hà Nội
          </div>
        </div>
        <div className='smNCnJEoYC'>
          <div className='uqzdXsTIve'>
            <div>Mã khuyến mãi</div>
            <div>Có thể chọn 2 <InfoCircleOutlined /></div>
          </div>
          <div className='oaRMpbJZLJ'></div>
          <div className='dVSUKhzPoy'>Chọn hoặc nhập khuyến mãi khác</div>
        </div>
        <div className='cEayyupiBL'>
          <div>
            <div>Tạm tính </div>
            <span>14.906.000đ</span>
          </div>
          <div>
            <div>Tổng tiền </div>
            <div className='qjnbryXvlQ'>
              <span>14.906.000 ₫</span>
              <span>(Đã bao gồm VAT nếu có)</span>
            </div>
          </div>
        </div>
        <div className='whAdEJptdL'>
          <button className="mrbeHclguS" role="button">
            <span className="cIhJlDppPN">Mua hàng</span>
            <span>Có 3 sản phẩm</span>
          </button>
        </div>
      </div>
    </>
  )
}