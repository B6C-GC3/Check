import React, { useEffect, useState } from 'react';
import './index.css';
import { CheckOutlined, DeleteOutlined, InfoCircleOutlined, PlayCircleOutlined, RightOutlined, ShopOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import services from './services';
import { notifyError, notifySuccess } from '../../../components/Common/notification';
import { ReadCartProductResDto } from './dtos/ReadCartProductResDto';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import PaymentsComponents from './components/paymentsComponents';


declare var abp: any;
const SCENES_KEY = "ORDER_PRODUCT";
const freeshipContaiber = [0, 33333333, 66666666, 99999999, 133333332];
export default function CartProduct() {
  const [freeship, setFreeship] = useState<number>(0);
  const [dataCart, setDataCart] = useState<ReadCartProductResDto[]>([]);
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [totalMoney, setTotalMoney] = useState<number>(0);

  const IqyDuqtwxYStyle = {
    "--width": freeship.toString() + "%"
  } as React.CSSProperties

  useEffect(() => {
    _getApi();
  }, []);

  const _getApi = async () => {
    var rsl = await services.readCartForUser();
    if (rsl.error === false && rsl.result !== undefined) {
      setDataCart(rsl.result);
    }
    else {
      notifyError("ERROR", "ERROR");
    }
  }

  const onChange = (e: CheckboxChangeEvent) => {
    if (checkedList.includes(e.target.value)) {
      setCheckedList(checkedList.filter(s => s !== e.target.value));
    } else {
      setCheckedList(op => [...op, e.target.value]);
    }
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const _onChangeNumberOrder = (product: ReadCartProductResDto, value: number) => {
    console.log('value', value)
    let dataCartTemp = dataCart.map(f => {
      if (f === product) {
        if (value < 0) f.numberProduct = 0;
        else {
          f.numberProduct = Number(value);
        }
      }
      return f;
    });
    setDataCart(dataCartTemp);
  }

  useEffect(() => {
    let total = 0;
    dataCart.forEach(fe => {
      if (checkedList.includes(fe.featureId)) {
        total = total + (fe.numberProduct * fe.prices);
      }
    });
    setTotalMoney(total);
    let per = 0;
    per = (total / freeshipContaiber[4]) * 100;
    if (per > 100) per = 100;
    console.log('per', per)
    setFreeship(per);
  }, [dataCart, checkedList]);

  return (
    <>
      <div className='kmUempsOuS'>Giỏ hàng</div>
      <div className='sGOeqILFXU'>
        <div className='IqyDuqtwxY' style={IqyDuqtwxYStyle}>
          <div className={totalMoney > freeshipContaiber[0] ? 'QKjZGsLkvu' : 'QKjZGsLkvu kWAPEMOmRo'}>
            <div>Ship</div>
            <CheckOutlined />
            <div>Mua</div>
          </div>
          <div className={totalMoney >= freeshipContaiber[1] ? 'QKjZGsLkvu' : 'QKjZGsLkvu kWAPEMOmRo'}>
            <div>Freeship giao tiết kiệm</div>
            <CheckOutlined />
            <div>30k</div>
          </div>
          <div className={totalMoney >= freeshipContaiber[2] ? 'QKjZGsLkvu' : 'QKjZGsLkvu kWAPEMOmRo'}>
            <div>Freeship giao hỏa tốc</div>
            <CheckOutlined />
            <div>50k</div>
          </div>
          <div className={totalMoney >= freeshipContaiber[3] ? 'QKjZGsLkvu' : 'QKjZGsLkvu kWAPEMOmRo'}>
            <div>Freeship giao hỏa tốc</div>
            <CheckOutlined />
            <div>100k</div>
          </div>
          <div className={totalMoney >= freeshipContaiber[4] ? 'QKjZGsLkvu' : 'QKjZGsLkvu kWAPEMOmRo'}>
            <div>Freeship giao hỏa tốc</div>
            <CheckOutlined />
            <div>200k</div>
          </div>
        </div>
      </div>
      <div className='sGOeqILFXU vYZYmEAXtA'>
        <div><Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} /> Tất cả (1 Sản Phẩm)</div>
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
        {dataCart.map(item => {
          return (<div className='vYZYmEAXtA'>
            <div className='bNRkzawKAp'>
              <Checkbox value={item.featureId} onChange={onChange} checked={checkedList.includes(item.featureId)} />
              <LazyLoadImage
                alt={abp.appServiceUrl + item.imageProduct}
                effect="opacity"
                onError={(event: any) => {
                  event.target.src = "/default-image.jpg"
                  event.onerror = null
                }}
                src={abp.appServiceUrl + item.imageProduct}
              />
              <div className='jQVGYzUiQD'>
                <a>{item.name}</a>
                {/* <div><span>FAST </span> Giao tiết kiệm</div>
                <span>+ 71,45 ASA ≈ 15k ₫</span> */}
              </div>
            </div>
            <div className='eKxWvjEWli'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.prices)}
              {/* <del>18.990.000 ₫</del> */}
            </div>
            <div>
              <div className='oNhCHMjtrd'>
                <span onClick={() => _onChangeNumberOrder(item, item.numberProduct + 1)}>+</span>
                <input type="text" value={item.numberProduct} onChange={(value: any) => _onChangeNumberOrder(item, value.target.value)} />
                <span onClick={() => _onChangeNumberOrder(item, item.numberProduct - 1)}>-</span>
              </div>
              <span>Chỉ còn 1 sản phẩm</span>
            </div>
            <div><span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.prices * item.numberProduct)}</span></div>
            <div><DeleteOutlined /></div>
          </div>);
        })}
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
              <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalMoney)}</span>
              <span>(Đã bao gồm VAT nếu có)</span>
            </div>
          </div>
        </div>
        <div className='whAdEJptdL'>
          <button className="mrbeHclguS" role="button">
            <span className="cIhJlDppPN">Mua hàng</span>
            <span>Có {checkedList.length} sản phẩm</span>
          </button>
        </div>
      </div>
      <PaymentsComponents />
    </>
  )
}