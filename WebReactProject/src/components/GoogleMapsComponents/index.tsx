import React, { useState } from 'react';
import './index.css';
import { Modal } from 'antd';
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps";

const SCENES_KEY = "DETAIL_PRODUCT";

interface IGoogleMapsComponents {

}

function GoogleMapsComponents(props: IGoogleMapsComponents) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const location = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
    }

    return (
        <>
            <Modal
                title="Basic Modal"
                className='KaHwSssvFf'
                maskClosable={false}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
            </Modal>
        </>
    )
}

export default withScriptjs(withGoogleMap(GoogleMapsComponents));