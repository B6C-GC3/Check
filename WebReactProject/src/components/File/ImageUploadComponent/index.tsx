import { CloseOutlined, CloudUploadOutlined, DeleteOutlined, SendOutlined, UploadOutlined, WarningOutlined } from '@ant-design/icons'
import { Button, Image, Progress, Upload, UploadFile, UploadProps, message } from 'antd'
import { RcFile } from 'antd/es/upload/interface';
import { type } from 'os';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { notifyError, notifyWarning } from '../../Common/notification';
import { mimeImage } from './dataTypes/typeMime';
import './index.css';
import services from './services';
import { v4 as uuidv4 } from "uuid";
import ProcessImage from './components/processImage';
import BasicComponent from './components/basicComponent';
import { FileDto, ProcessFileDto } from './dataTypes/fileDto';
import { keyBy, map, random } from 'lodash';
import Item from 'antd/es/list/Item';

declare var abp: any;

interface IImageUploadComponent {
  maxCount: number;
  fileType?: "Image" | "Pdf" | "Text" | "Video";
  mimeType?: "image/png, image/jpeg";

  /** [vi] maximum upload size in MB */
  maxSizeFile: number;
  multiFile?: true | false;
  fileListInit: string[];
  processedSameTime?: number;
  onSuss: (e: string[]) => void;
}

export default function ImageUploadComponent(props: IImageUploadComponent) {
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const textInput = useRef<HTMLInputElement>(null);
  const [fileAwait, setfileAwait] = useState<FileDto[]>([]);
  const [fileSuccessful, setFileSuccessful] = useState<string[]>(props.fileListInit);
  const [fileSuccessfulHistory, setFileSuccessfulHistory] = useState<string[]>(props.fileListInit);
  const [renderUI, setrenderUI] = useState<JSX.Element[]>([]);
  const [countFile, setcountFile] = useState<number>(0);

  // lấy dữ liệu, map dữ liệu, chạy Same đầu
  const getFileContext = (e: any) => {
    let files = e.target.files;
    if (files.length > 0 && files.length < props.maxCount) {
      let fileLocal: FileDto[] = [];
      setcountFile(files.length);
      for (var i = 0; i < files.length; i++) {
        var isMaxSize = files[i].size / 1024 / 1024 < props.maxSizeFile; // convert byte to MB
        fileLocal.push({ file: files[i], process: false, status: isMaxSize } as FileDto);
      }

      if (fileLocal.length !== 0) {
        let isError = fileLocal.some(f => f.status === false);
        if (isError) {
          setShowProgress(false);
          notifyError('Hãy xóa và tải file mới lên!', 'COMMON');
        }
        else {
          setShowProgress(true);
          _loadDataToUpload(fileLocal);
          setFileSuccessful([]);
        }
      };
    }
  }

  // sử lý process file 
  const _loadDataToUpload = (fileLocal: FileDto[]) => {
    let fileTemp = fileLocal;
    if (renderUI.length === 0) { // khởi tạo
      setfileAwait(fileTemp);
      setrenderUI(Array.from(Array(props.processedSameTime).keys()).map((item, index) => {
        var fi = fileTemp[0];
        fileTemp.shift();
        return <BasicComponent
          key={index}
          fileListInit={fi?.file}
          display={fi?.file !== undefined}
          delayProcess={fi?.process}
          onSuss={(e: string) => _onSussBasicComponets(e, item)} />
      }));
      setfileAwait(fileTemp);
    }
    else if (fileLocal.length !== 0) {
      setrenderUI((list: JSX.Element[]) => {
        var stop: boolean = false;
        return list.map(item => {
          if (item.props.display === false && stop === false) {
            stop = true;
            var fi = fileTemp[0];
            fileTemp.shift();
            setfileAwait(fileTemp);
            return <BasicComponent
              key={item.key}
              fileListInit={fi.file}
              display={true}
              delayProcess={true}
              onSuss={(e: string) => _onSussBasicComponets(e, item.key)} />

          } else {
            return item;
          }
        })
      });
    }
  };

  // nhận file đã upload thành công, kết thúc 1 vong lặp
  const _onSussBasicComponets = (e: string, numberRomove: React.Key | null) => {
    setTimeout(() => {
      if (e) {
        setFileSuccessful(filesuss => [...filesuss, e]);
        setFileSuccessfulHistory(filesuss => [...filesuss, e]);
        setrenderUI((list) => list.map(item => {
          return item.key === numberRomove?.toString() && item.key !== null ?
            <BasicComponent
              key={item.key}
              fileListInit={undefined}
              display={false}
              delayProcess={true}
              onSuss={(e: string) => _onSussBasicComponets(e, item.key)} />
            : item
        }));
      }
    }, 100);
  };

  // chờ số file chưa sử lý có sự thay đổi
  useEffect(() => {
    if (fileSuccessful.length !== 0) _loadDataToUpload(fileAwait);
    if (countFile === fileSuccessful.length) {
      setShowProgress(false);
      setfileAwait([]);
    };
  }, [fileSuccessful]);

  useEffect(() => {
    props.onSuss(fileSuccessfulHistory);
  }, [fileSuccessfulHistory])

  // Xóa file upload lỗi
  const _removeSelectedFileError = (files: FileDto) => {
    setfileAwait(fileAwait.filter(f => f !== files));
  };

  // xóa file trên máy chủ
  const _onRemoveServer = async (fileRemove: string) => {
    var data = await services.removeFileBasic(fileRemove);
    if (data.result) {
      setFileSuccessful(fileSuccessful.filter(f => f !== fileRemove));
      setFileSuccessfulHistory(fileSuccessfulHistory.filter(f => f !== fileRemove));
    }
    else {
      notifyError("Đã sảy ra lỗi", "Đã sảy ra lỗi");
    }
  }

  return (
    <>
      <div className='DweGwhCScF'>
        <label htmlFor="file-upload" className={showProgress ? "UoPngNvDqx  custom-file-upload" : " custom-file-upload"}>
          <CloudUploadOutlined /> Upload File
        </label>
        <CloseOutlined className={showProgress ? 'sUWlEgTxMv iHzkkZufHE' : 'sUWlEgTxMv'} onClick={() => setShowProgress(false)} />
        <input accept={props.mimeType} multiple={props.multiFile} ref={textInput} disabled={showProgress} id="file-upload" type="file" onChange={getFileContext} />
      </div>

      <div className='DavqlhXPMg'>
        {fileSuccessfulHistory.map(m => <div className='KBEHGBJJqD ohyyNmMxVu' key={m}>
          <img src={abp.appServiceUrl + m} alt={m} />
          <DeleteOutlined onClick={() => _onRemoveServer(m)} />
        </div>)}

        {renderUI}

        {fileAwait.map(f => f.status
          ?
          <div className='KBEHGBJJqD DynurKCHCm' key={f.file}>
            <SendOutlined />
            <DeleteOutlined onClick={() => _removeSelectedFileError(f)} />
          </div>
          :
          <div className='KBEHGBJJqD RCaSHuTrWc' key={f.file}>
            <img src={abp.appServiceUrl + ''} alt="" />
            <WarningOutlined />
            <DeleteOutlined onClick={() => _removeSelectedFileError(f)} />
          </div>
        )}
      </div>
    </>
  )
}

