// chỉ trả ra trạng thái file
// lỗi return false

import { useState } from "react";
//1048576
const chunkSize = 1048576 * 10;//its 3MB, increase the number measure in mb
const maxTask = 10; // số lượng Task cùng lúc gửi

// thành công : url file
export default async function ProcessImage(file: any) {
    const [counter, setCounter] = useState(1);
    const [fileToBeUpload, setFileToBeUpload] = useState([]);
    const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0);
    const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize);
    const [progress, setProgress] = useState(0);
    const [fileGuid, setFileGuid] = useState("");
    const [fileSize, setFileSize] = useState(0);
    const [chunkCount, setChunkCount] = useState(0);
    const [extenFile, setExtenFile] = useState<string>("");
    const [fileList, setfileList] = useState<string[]>([]);
    // tách file
    var countFile = file.target.files.length;
    const _file = file.target.files[0];
    setFileSize(_file.size);
    const _totalCount = _file.size % chunkSize == 0
        ? _file.size / chunkSize
        : Math.floor(_file.size / chunkSize) + 1;
    setChunkCount(_totalCount);
    //setFileToBeUpload(_file);
    let name = _file.name;
    const lastDot = name.lastIndexOf('.');
    const ext = name.substring(lastDot + 1);
    setExtenFile("." + ext);
    ProcessImage(file.target.files[0]);
}

function uploadCompleted() {

}

function fileUpload() {

}

function resetChunkProperties() {

}

function stopChunkProcesss() {

}