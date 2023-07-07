import {
  CaretDownOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { L } from "../../../lib/abpUtility";
import { Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { TypeExportFile } from "./dataTypes/typeExport";
import services from "./services";

const { Option } = Select;
const KEY_COMPONENTS: string = "EXPORT_FILES";

export interface IExportFileProps<T> {
  location: any;
  urlServer: string;
  paramUri: T;
  review?: boolean;
  onShow?: boolean;
  border?: boolean;
  type: TypeExportFile[]
}

export default function ExportFileComponent<T>(props: IExportFileProps<T>) {
  const [selectTypeFile, setselectTypeFile] = useState<string>();
  const [isShowModal, setisShowModal] = useState<boolean>(false);
  const [nameFile, setnameFile] = useState<string>("");
  const [typeFile, settypeFile] = useState<string>("");

  //constructor
  useEffect(() => {

  }, []);

  const fetchExportData = async (param: T) => {
    var data = await services.dowloadFile<T>("", param, nameFile + typeFile);
  };

  const _onChangeFile = (value: any) => {
    console.log('value', value)
    setselectTypeFile(value);
  };

  const _onOkFile = () => {
    if (props.urlServer) {
      fetchExportData(props.paramUri);
    }
  };

  const _onCancelFile = () => { };

  useEffect(() => {
    if (selectTypeFile !== undefined) {
      setisShowModal(true);
    }
  }, [selectTypeFile]);

  return (
    <>
      <Select
        placeholder={L("REPORT_FILE", "COMMON")}
        style={{ minWidth: 123 }}
        onChange={(value: any) => _onChangeFile(value)}
        bordered={props.border}
        dropdownStyle={{ color: "black" }}
        suffixIcon={<CaretDownOutlined style={{ color: "blue" }} />}
      >
        {[...Array(props.type.length).keys()].map(
          (enumKey) => <Option value={enumKey}>{L(TypeExportFile[enumKey], "COMMON")}</Option>
        )}
      </Select>
      <Modal
        title={L("titleModal", KEY_COMPONENTS)}
        visible={isShowModal}
        okText={L("OK", "COMMON")}
        onOk={_onOkFile}
        cancelText={L("CANCEL", "COMMON")}
        onCancel={_onCancelFile}
      >
        <pre>File xuất bản : {nameFile}</pre>
        <div>{L("DoYouWantExportFile", KEY_COMPONENTS) + selectTypeFile}</div>
        <Input onChange={(value: any) => { setnameFile(value.target.value); }} />
      </Modal>
    </>
  );
}
