import React, { Component } from 'react';
import axios from 'axios';
import './style.css'
import { toast, ToastContainer } from 'react-toastify';


class SearchByFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            loaded: 0
        }

    }
    checkMimeType = (event) => {
        let files = event.target.files
        let err = []
        const types = ['application/zip', 'application/rar', 'application/7z']
        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                err[x] = files[x].type + ' Định dạng không được hỗ trợ\n';
            }
        };
        for (var z = 0; z < err.length; z++) {
            toast.error(err[z])
            event.target.value = null
        }
        return true;
    }
    maxSelectFile = (event) => {
        let files = event.target.files
        if (files.length > 1) {
            const msg = 'Vui lòng chỉ chọn 1 File'
            event.target.value = null
            toast.warn(msg)
            return false;
        }
        return true;
    }
    checkFileSize = (event) => {
        var files = event.target.files
        if (files !== null) {
            let size = 2000000
            let err = [];
            for (var x = 0; x < files.length; x++) {
                if (files[x].size > size) {
                    err[x] = files[x].type + 'File dung lượng quá lớn\n';
                }
            };
            for (var z = 0; z < err.length; z++) {
                toast.error(err[z])
                event.target.value = null
            }
            return true;
        }
        else {
            this.setState({
                selectedFile: null,
                loaded: 0
            })
        }
    }
    onChangeHandler = event => {
        var files = event.target.files
        if (this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)) {
            this.setState({
                selectedFile: files,
                loaded: 0
            })
        }
    }
    onClickHandler = () => {
        debugger;
        if (this.state.selectedFile !== null) {
            const data = new FormData()
            for (var x = 0; x < this.state.selectedFile.length; x++) {
                data.append('file', this.state.selectedFile[x])
            }
            axios.post("http://localhost:8000/upload", data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                },
            })
                .then(res => {
                    toast.success('upload success')
                })
                .catch(err => {
                    toast.error('upload fail')
                })
        } else {
            toast.error('Bạn chưa chọn File')
        }

    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <div className="form-File">

                    <div className="drop-container">
                        <input
                            className="file-input"
                            type="file"
                            multiple
                            onChange={this.onChangeHandler}
                        />


                        <div className="drop-message">
                            <div className="upload-icon"></div>
                            * Nhấp chuột hoặc kéo thả tập tin hoá đơn vào đây để tải lên <br />
                            <span className="fix-text">
                                Lưu ý: Chỉ chọn một tập tin có phần mở rộng .rar, .zip
                            </span>
                        </div>
                    </div>
                </div>
                <button type="button" className="m-3 btn btn-primary btn-block justify-content-center" onClick={this.onClickHandler}>Upload</button>
            </React.Fragment>
        );
    }
}

export default SearchByFile;