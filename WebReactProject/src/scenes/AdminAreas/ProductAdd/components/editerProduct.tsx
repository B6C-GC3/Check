import { Divider } from 'antd';
import React, { useState } from 'react';
import { Editor, EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { L } from "../../../../lib/abpUtility";
import EditorDraft from '../../../../components/EditorDraft';

const SCENES_KEY = "PRODUCT_ADD";

export default function EditerProduct() {

  return (
    <>
      <EditorDraft
        onOk={(value: string) => { console.log('value :>> ', value); }}
        title={L('Chi tiết sản phẩm', SCENES_KEY)} />
    </>
  )
}
