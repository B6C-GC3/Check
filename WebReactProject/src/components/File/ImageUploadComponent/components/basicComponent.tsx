import { CloseOutlined, CloudUploadOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Progress, Upload, UploadFile, UploadProps } from 'antd'
import { RcFile } from 'antd/es/upload/interface';
import { type } from 'os';
import React, { useEffect, useRef, useState } from 'react';
import { notifyError, notifyWarning } from '../../../Common/notification';
import { mimeImage } from '../dataTypes/typeMime';
import '../index.css';
import services from '../services';
import { v4 as uuidv4 } from "uuid";
import { random } from 'lodash';

declare var abp: any;
//1048576
const chunkSize = 1048576 * 10;//its 3MB, increase the number measure in mb

export interface IBasicComponent {
  fileListInit: any;
  display: boolean;
  delayProcess: true | false;
  onSuss: (e: string) => void;
}

export default function BasicComponent(props: IBasicComponent) {
  // State
  const [showProgress, setShowProgress] = useState(false);
  const [counter, setCounter] = useState(1);
  const [fileToBeUpload, setFileToBeUpload] = useState([]);
  const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0);
  const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize);
  const [progress, setProgress] = useState(0);
  const [fileGuid, setFileGuid] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);
  const [extenFile, setextenFile] = useState<string>("");
  const textInput = useRef<HTMLInputElement>(null);

  useEffect(() => {

  }, [props.fileListInit]);

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

  const uploadCompleted = async () => {
    const response = await services.uploadomplated("/api/services/app/FileUpload/UploadComplete", fileGuid + extenFile);
    if (!response.error) {
      setProgress(100);
      setShowProgress(false);
      props.onSuss(response.result.url);
    }
  }

  const fileUpload = () => {
    setCounter(counter + 1);
    if (counter <= chunkCount) {
      var chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
      uploadChunk(chunk)
    }
  }

  useEffect(() => {
    if (fileSize > 0) {
      fileUpload();
    }
  }, [fileToBeUpload, progress]);

  const resetChunkProperties = () => {
    setShowProgress(true);
    setProgress(0);
    setCounter(1);
    setBeginingOfTheChunk(0);
    setEndOfTheChunk(chunkSize);
  }

  useEffect(() => {
    if (props.fileListInit) {
      setShowProgress(true);
      setProgress(0);
      setCounter(1);
      setBeginingOfTheChunk(0);
      setEndOfTheChunk(chunkSize);
      if (!showProgress) {
        const _file = props.fileListInit;
        setFileSize(_file.size);
        const _totalCount = _file.size % chunkSize == 0 ? _file.size / chunkSize : Math.floor(_file.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file
        setChunkCount(_totalCount);
        setFileToBeUpload(_file);
        const _fileID = uuidv4();
        setFileGuid(_fileID);
        let name = _file.name;
        const lastDot = name.lastIndexOf('.');
        const ext = name.substring(lastDot + 1);
        setextenFile("." + ext);
      }
    }
  }, [props.fileListInit]);


  const stopChunkProcesss = () => {
    setFileSize(0);
    setShowProgress(false);
    setProgress(0);
    setCounter(1);
    setBeginingOfTheChunk(0);
    setEndOfTheChunk(chunkSize);
    textInput.current!.value = "";
  };

  return (
    <>
      <div className='KBEHGBJJqD' key={props.fileListInit} style={{ display: props.display ? "block" : "none" }}>
        <Progress
          type="circle"
          style={{ display: showProgress ? "flex" : "none" }}
          percent={(Math.round(progress * 100) / 100)}
        />
      </div>
    </>
  )
}
