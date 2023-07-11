import { Button, Modal, Radio, Tabs, TabsProps } from 'antd';
import React, { useState } from 'react';
import '../index.css';
import PaymentMethodsComponents from './paymentMethodsComponents';
import CheckoutOrderComponents from './checkoutOrderComponents';
import PaymentEndComponents from './paymentEndComponents';

const defaultProps = {
    open: true,
    className: ''
};

type IPaymentsComponents = {
    open?: boolean;
    className?: string;
    oncancel: () => void,
} & typeof defaultProps;

PaymentsComponents.defaultProps = defaultProps;

export default function PaymentsComponents(props: IPaymentsComponents) {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(props.open);
    const [loading, setLoading] = useState<boolean>(false);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Kiểm tra đơn hàng`,
            children: <CheckoutOrderComponents />,
        },
        {
            key: '2',
            label: `Thông tin vận chuyển`,
            children: `Content of Tab Pane 3`,
        },
        {
            key: '3',
            label: `Phương thức thanh toán`,
            children: <PaymentMethodsComponents />,
        }
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        props.oncancel();
    };

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <>
            <Modal
                className={'whhmOBaEjd ' + props.className}
                title="Thanh Toán Hóa đơn"
                open={isModalOpen}
                footer={null}
                closable={false}
                onCancel={handleCancel}
            >
                <Tabs className='bZvbEfJdxs nocopy' size='small' defaultActiveKey="1" items={items} onChange={onChange} />
            </Modal>
        </>
    )
}
