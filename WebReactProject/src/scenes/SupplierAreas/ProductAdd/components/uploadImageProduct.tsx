import { PlusOutlined } from '@ant-design/icons';
import { Alert, Modal, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import { L } from "../../../../lib/abpUtility";
import ImageUploadComponent from '../../../../components/File/ImageUploadComponent';

const SCENES_KEY = "PRODUCT_ADD";
const MAX_IMAGE_PRODUCT = 25;
const MAX_VIDEO_PRODUCT = 1;
const MAX_SIZE_IMAGE = 1; // size MB
const MAX_SIZE_VIDEO = 30; // size MB
const KEY_LOCAL_STORAGE_IMG = 'Vbjde';

export interface IUploadImageProduct {
    ImageHistory: string[];
    onOk(value: string[]): void;
}

export default function UploadImageProduct(props: IUploadImageProduct) {

    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange = (e: string[]) => {
        localStorage.setItem(KEY_LOCAL_STORAGE_IMG, JSON.stringify(e));
        props.onOk(e);
    }

    return (
        <>
            <Alert className='GwWbFfyEWm' message={L("TUTORIAL_SELECT_IMAGE", SCENES_KEY)} type="success" />
            <ImageUploadComponent
                maxCount={MAX_IMAGE_PRODUCT}
                mimeType='image/png, image/jpeg'
                maxSizeFile={2}
                fileType="Image"
                multiFile={true}
                fileListInit={props.ImageHistory}
                onSuss={(e: any) => handleChange(e)}
                processedSameTime={3} />
            <Alert className='GwWbFfyEWm' message={L("UPLOAD_A_VIDEO", SCENES_KEY)} type="success" />
        </>
    )
}
