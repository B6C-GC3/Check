import { Button, Radio } from 'antd';
import React from 'react';
import '../index.css';

type IPaymentMethodsComponents = {

} & typeof defaultProps;

const defaultProps = {

}

PaymentMethodsComponents.defaultProps = defaultProps;

export default function PaymentMethodsComponents(props: IPaymentMethodsComponents) {
    return (
        <>
            <Radio.Group name="radiogroup" className='ylFJNwPIbu'>
                <Radio value={1}><img src='/1b3b9cda5208b323eb9ec56b84c7eb87.png' /> Thanh toán tiền mặt khi nhận hàng</Radio>
                <Radio value={2} disabled><img src='/d7ac8660aae903818dd7da8e4772e145.png' /> Thanh toán bằng ví Viettel Money</Radio>
                <Radio value={3} disabled><img src='/ea880ef285856f744e3ffb5d282d4b2d.jpg' /> Thanh toán bằng ví MoMo</Radio>
                <Radio value={4} disabled><img src='/dd7ded6d3659036f15f95fe81ac76d93.png' /> Thanh toán bằng ví ZaloPay</Radio>
                <Radio value={5}><img src='/a35cb9c62b9215dbc6d334a77cda4327.png' /> Thanh toán bằng VNPAY Quét Mã QR từ ứng dụng ngân hàng</Radio>
                <Radio value={6} disabled><img src='/7fb406156d0827b736cf0fe66c90ed78.png' /> Thanh toán bằng thẻ quốc tế Visa, Master, JCB</Radio>
                <Radio value={7} disabled><img src='/aa26390d87be2ae0d5f1051ce59b3b90.png' /> Thẻ ATM nội địa/Internet Banking (Hỗ trợ Internet Banking)</Radio>
            </Radio.Group>
            <div className='zBQybpQusE'>
                <Button type="primary">Thanh Toán</Button>
            </div>
        </>
    )
}

//============================ PAYMENT SINGLE METHOD ============================//