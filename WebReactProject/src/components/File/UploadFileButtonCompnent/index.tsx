import { CloseOutlined, CloudUploadOutlined, DeleteOutlined, SendOutlined, VerticalLeftOutlined, WarningOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react';
import { notifyError } from '../../Common/notification';
import { mimeImage } from './dataTypes/typeMime';
import './index.css';
import services from './services';
import { v4 as uuidv4 } from "uuid";
import { FileDto } from './dataTypes/fileDto';

declare var abp: any;

//1048576
const chunkSize = 100 * 10;//its 3MB, increase the number measure in mb

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

  const [totalSizeFile, setTotalSizeFile] = useState<number>(0);

  //#region Sử llys upload file
  const [counter, setCounter] = useState(1);
  const [fileToBeUpload, setFileToBeUpload] = useState([]);
  const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0);
  const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize);
  const [progress, setProgress] = useState(0);
  const [fileGuid, setFileGuid] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);
  const [extenFile, setextenFile] = useState<string>("");
  const [uploadfileSuccsce, setUploadfileSuccsce] = useState<boolean>(false);

  // upload mảnh file
  const uploadChunk = async (chunk: any) => {
    try {
      const response = await services.uploadStream("/api/services/app/FileUpload/UploadChunks", chunk, fileGuid, counter);
      if (!response.error) {
        setBeginingOfTheChunk(endOfTheChunk);
        setEndOfTheChunk(endOfTheChunk + chunkSize);
        if (counter == chunkCount) {
          await uploadCompleted();
        } else {
          var percentage = (counter / chunkCount) * 100;
          setProgress(percentage);
        }
      } else {
      }
    } catch (error) {
    }
  }

  // Yêu cầu ghét file trên server
  const uploadCompleted = async () => {
    const response = await services.uploadomplated("/api/services/app/FileUpload/UploadComplete", fileGuid + extenFile);
    if (!response.error) {
      setProgress(100);
      setUploadfileSuccsce(true);
    }
  }

  const fileUpload = () => {
    setCounter(counter + 1);
    if (counter <= chunkCount) {
      var chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
      console.log('chunk', chunk);
      uploadChunk(chunk)
    }
  }

  useEffect(() => {
    if (fileSize > 0) {
      fileUpload();
    }
  }, [fileToBeUpload, progress]);

  // nhận file bắt đầu sử lý tách file
  const _onProcessFile = (file: any) => {
    if (file) {
      setProgress(0);
      setCounter(1);
      setBeginingOfTheChunk(0);
      setEndOfTheChunk(chunkSize);
      const _file = file;
      setFileSize(_file.size);
      const _totalCount = _file.size % chunkSize == 0 ? _file.size / chunkSize : Math.floor(_file.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file
      setChunkCount(_totalCount);
      setFileToBeUpload(_file);
      const _fileID = uuidv4();
      setFileGuid(_fileID);
      let name = _file.name;
      console.log('first', _file, _file.name);
      const lastDot = name.lastIndexOf('.');
      const ext = name.substring(lastDot + 1);
      setextenFile("." + ext);
      setUploadfileSuccsce(false);
    }
  }

  //#endregion
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const textInput = useRef<HTMLInputElement>(null);
  const [fileAwait, setfileAwait] = useState<FileDto[]>([]);
  const [fileSuccessful, setFileSuccessful] = useState<string[]>(props.fileListInit);
  const [fileSuccessfulHistory, setFileSuccessfulHistory] = useState<string[]>(props.fileListInit);

  // lấy dữ liệu, map dữ liệu, chạy Same đầu
  const getFileContext = (e: any) => {
    let files = e.target.files;
    if (files.length > 0 && files.length < props.maxCount) {
      let fileLocal: FileDto[] = [];
      for (var i = 0; i < files.length; i++) {
        setTotalSizeFile(totalSizeFile + files[i].size)
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
          setUploadfileSuccsce(true);
          setfileAwait(fileLocal);
          setFileSuccessful([]);
        }
      };
    }
  }

  useEffect(() => {
    if (uploadfileSuccsce) {
      var fi = fileAwait[0];
      fileAwait.shift();
      setfileAwait(fileAwait);
      _onProcessFile(fi?.file);
    }
    else {

    }
  }, [uploadfileSuccsce]);

  // nhận file đã upload thành công, kết thúc 1 vong lặp
  const _onSussBasicComponets = (e: string, numberRomove: React.Key | null) => {
    setTimeout(() => {
      if (e) {
        setFileSuccessful(filesuss => [...filesuss, e]);
        setFileSuccessfulHistory(filesuss => [...filesuss, e]);
      }
    }, 100);
  };

  useEffect(() => {
    props.onSuss(fileSuccessfulHistory);
  }, [fileSuccessfulHistory])

  return (
    <>
      <div className='DweGwhCScF'>
        <label htmlFor="file-upload" className={showProgress ? "UoPngNvDqx  custom-file-upload" : " custom-file-upload"}>
          <CloudUploadOutlined /> Upload File
        </label>
        <CloseOutlined className={showProgress ? 'sUWlEgTxMv iHzkkZufHE' : 'sUWlEgTxMv'} onClick={() => setShowProgress(false)} />
        <input accept={props.mimeType} multiple={props.multiFile} ref={textInput} disabled={showProgress} id="file-upload" type="file" onChange={getFileContext} />
      </div>
    </>
  )
}

