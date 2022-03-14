import React, { useRef, useState, useEffect } from 'react';
import './style.css'
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from "../../helper/axio";
import LoadingOverlay from 'react-loading-overlay';

export const SearchByFiles = () => {
    const url = 'TracuuFile/UploadInv';
    const fileInputRef = useRef();
    const [fileName, setfileName] = useState(undefined);
    const [btnClass, setbtnClass] = useState('');

    const [isLoad, setisLoad] = React.useState(false); // Trạng thái mở Modal


    const preventDefault = (e) => {
        console.log("1",e);
        e.preventDefault();
        // e.stopPropagation();
    }

    const dragOver = (e) => {
        console.log("2",e);
        e.preventDefault();
    }

    const dragEnter = (e) => {
        console.log("3",e);
        preventDefault(e);
    }

    const dragLeave = (e) => {
        console.log("4",e);
        preventDefault(e);
    }

    const fileDrop = (e) => {
        console.log("5",e);
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }
    }

    const filesSelected = (e) => {
        console.log("6",e);
        let files = e.currentTarget.files
        if (files.length > 1) {
            const msg = 'Vui lòng chỉ chọn 1 File'
            e.target.value = null
            toast.warn(msg)
            return false;
        } else {
            if (files.length > 0 && files.length < 2) {
                let typeFile = e.currentTarget.files[0].type
                const validTypes = ['application/x-zip-compressed'];
                if (validTypes.indexOf(typeFile) === -1) {
                    const msg0 = 'File không đúng định dạng'
                    toast.warn(msg0)
                    return false;
                } else {
                    let sizeFile = e.currentTarget.files[0].size
                    if (sizeFile > 2097152) {
                        const msg1 = 'File dung lượng quá lớn'
                        toast.error(msg1)
                        return false
                    } else {

                        setfileName(e.currentTarget.files[0].name);
                        handleFiles(fileInputRef.current.files);
                        return true;
                    }
                }
            }
            else {
                setfileName("");
                return true;
            }
        }


    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const handleFiles = (e) => {
        console.log("8",e);
        if (e.length > 1) {
            const msg = 'Vui lòng chỉ chọn 1 File'
            e.target.value = null
            toast.warn(msg)
            return false;
        } else {
            if (e.length > 0 && e.length < 2) {
                let typeFile = e[0].type
                const validTypes = ['application/x-zip-compressed'];
                if (validTypes.indexOf(typeFile) === -1) {
                    const msg0 = 'File không đúng định dạng'
                    toast.warn(msg0)
                    return false;
                } else {
                    let sizeFile = e[0].size
                    if (sizeFile > 2097152) {
                        const msg1 = 'File dung lượng quá lớn'
                        toast.error(msg1)
                        return false
                    } else {

                        setfileName(e[0].name);
                        return true;
                    }
                }
            }
            else {
                setfileName("");
                return true;
            }
        }
    }

    const uploadFiles = (data) => {
        console.log("9",data);
        debugger;
        let files = fileInputRef.current.files;
        if (files.length > 0) {
            let selectedFile = files[0];
            const formData = new FormData();
            formData.append("", selectedFile);
            setisLoad(true);
            axiosInstance
                .post(url, formData, { responseType: "arraybuffer" })
                .then((res) => {
                    setisLoad(false);
                    const file = new Blob([res.data], {
                        type: "application/pdf",
                    });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL)

                })
                .catch((err) => {
                    setisLoad(false);
                    toast.error(JSON.parse(new TextDecoder().decode(err.response.data)).error);
                });
        }


    }


    return (
        <React.Fragment>
            <div className="form-File">
                <ToastContainer />
                <div className="drop-container"
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                    onClick={fileInputClicked}
                >
                    <div className="drop-message">
                        <div className="upload-icon"></div>
                        * Nhấp chuột hoặc kéo thả tập tin hoá đơn vào đây để tải lên <br />
                        <span className="fix-text">
                            Lưu ý: Chỉ chọn một tập tin có phần mở rộng .zip <br />
                        </span>
                        <span className="">
                            File đã tải lên : <span className="set-color">{fileName}</span>
                        </span>

                    </div>
                    <input
                        ref={fileInputRef}
                        className="file-input"
                        type="file"
                        multiple
                        onChange={filesSelected}
                    />
                </div>

            </div>
            <div className="d-flex justify-content-center">
                <button
                    className=" btn btn-primary mt-4 signup align-items-center justify-content-center"
                    type="submit"
                    onClick={() => uploadFiles()}
                >
                    Tra cứu
                </button>
            </div>


            <LoadingOverlay
                active={isLoad}
                spinner
                styles={{
                    wrapper: {
                        width: '0px',
                        height: '0px',
                    }
                }}
            >

            </LoadingOverlay>
        </React.Fragment>
    );
}
