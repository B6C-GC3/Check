import { Button, Col, Divider, Modal, Row, Tooltip, Watermark } from 'antd';
import React, { useState } from 'react';
import { ContentBlock, Editor, EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from 'draft-js-export-html';
import { L } from "../../lib/abpUtility";
import './index.css';
import { CheckOutlined, CloseOutlined, EyeOutlined, InfoCircleOutlined, QuestionOutlined, SettingOutlined, UndoOutlined } from '@ant-design/icons';

type EditorDraftProps = {
    title?: string;
    tooltip?: string;
    onOk: (value: string) => void;
};

export default function EditorDraft({
    title = L('TITLE', 'COMMON'),
    tooltip = '',
    onOk = () => { }
}: EditorDraftProps) {

    const [editorState, seteditorState] = useState<EditorState>();
    const [htmlConvert, setHtmlConvert] = useState<string>('');
    const [showAll, setShowAll] = useState<boolean>(false);

    const _changeShow = () => {
        setShowAll(!showAll);
    }

    const onEditorStateChange = (value: EditorState) => {
        setHtmlConvert(stateToHTML(value.getCurrentContent()));
        seteditorState(value);
    }

    const _previewAttribute = () => {

        return Modal.info({
            title: L('MODE_PREVIEW_ATTRIBUTE', "COMMON"),
            icon: <EyeOutlined />,
            className: 'lgvNbwrkVm BhSdkVGoRX',
            content: (
                <>
                    <div className='midGdqUcHE'>
                        <Col span={16} className='wqcDfMDSYX'>
                            <span className='PakuJgNnRB'>Bài viết sản phẩm</span>
                            {/* <div className='gdMHcseGom bvQEBBoIYA' dangerouslySetInnerHTML={{
                                __html: htmlConvert,
                            }}>
                            </div> */}
                            {/* <span className={showAll ? 'xJdqzcyDEd oEjngQbPEW' : 'xJdqzcyDEd'} >
                                <button onClick={_changeShow}>{showAll === true ? "Xem Thêm" : "Thu gọn"}</button>
                            </span> */}
                            <div className='gdMHcseGom' dangerouslySetInnerHTML={{
                                __html: htmlConvert,
                            }}>
                            </div>
                            <span className='xJdqzcyDEd oEjngQbPEW' >
                                <button onClick={_changeShow}>{"Xem Thêm"}</button>
                            </span>
                        </Col>
                        <Col span={8} className='wqcDfMDSYX'>
                            <span className='PakuJgNnRB'>Thuộc tính sản phẩm</span>
                        </Col>
                    </div>
                </>
            )
        });
    }

    const _InfoCircleAttribute = () => {

        return Modal.info({
            title: L('MODE_PREVIEW_ATTRIBUTE', "COMMON"),
            icon: <InfoCircleOutlined />,
            className: 'lgvNbwrkVm BhSdkVGoRX',
            content: (
                <>
aSFVBN
                </>
            )
        });
    }

    return (
        <>
            <Divider className='XyDchqhXkn' orientation="left">{title}</Divider>
            <div className='VpUINsxPMf'>
                <div>
                    <Tooltip title={L("Xem Trước", "COMMON")}>
                        <Button icon={<EyeOutlined />} onClick={_previewAttribute}></Button>
                    </Tooltip>
                    <Tooltip title={L("Lưu", "COMMON")}>
                        <Button icon={<CheckOutlined />} onClick={() => onOk(htmlConvert)}></Button>
                    </Tooltip>
                    <Tooltip title={L("Làm mới", "COMMON")}>
                        <Button icon={<UndoOutlined />}></Button>
                    </Tooltip>
                    <Tooltip title={L("Bỏ qua", "COMMON")}>
                        <Button icon={<CloseOutlined />}></Button>
                    </Tooltip>
                    <Tooltip title={L("Mô tả", "COMMON")}>
                        <Button icon={<InfoCircleOutlined />} onClick={() => _InfoCircleAttribute()}></Button>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title={L("Cài đặt", "COMMON")}>
                        <Button icon={<SettingOutlined />}></Button>
                    </Tooltip>
                    <Tooltip title={L("Đóng góp", "COMMON")}>
                        <Button icon={<QuestionOutlined />}></Button>
                    </Tooltip>
                </div>
            </div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />
        </>
    )
}
