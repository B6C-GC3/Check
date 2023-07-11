import { Button } from 'antd';
import React from 'react';
import '../index.css';

type IPaymentEndComponents = {

} & typeof defaultProps;

const defaultProps = {

}

PaymentEndComponents.defaultProps = defaultProps;

export default function PaymentEndComponents(props: IPaymentEndComponents) {
    return (
        <>
            <div className='zBQybpQusE'>
                <Button type="primary">Thanh Toán</Button>
            </div>
        </>
    )
}
