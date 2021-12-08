import React, { Component } from "react";
import PopupKH from "./PopupKH";
import axiosInstance from "../../helper/axio";
import { useToasts } from "react-toast-notifications";
import CircularProgress from "@material-ui/core/CircularProgress";
import PopupTBPH from "./PopupTBPH";
import md5 from "md5";
import { PluginMV, PluginConn } from "./MinvoicePlugin";
import LoadingOverlay from 'react-loading-overlay';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var _plugin = PluginMV();
var _conn = PluginConn();

export default function SearchInfo(data) {
  const url = "Search/SearchTBH";
  const url2 = "Search/SearchThongTinNM";
  const [openPopup, setopenPopup] = React.useState(false); // Trạng thái mở Modal
  const [openTBPH, setopenTBPH] = React.useState(false); // Trạng thái mở Modal
  const [popupDataTBPH, setpopupDataTBPH] = React.useState(undefined); // Dữ liệu truyền sang modal TBPH
  const [popupDataKH, setpopupDataKH] = React.useState(undefined); // Dữ liệu truyền sang modal KH
  const { addToast } = useToasts();
  const [isLoading, setisLoading] = React.useState(false); // wait form
  const jsonPost = {
    
    masothue: data.SearchData.masothue,
    ky_hieu: data.kyHieu,
    mau_so: data.mauHD,
  };

  const OpenTraCuu = () => {
 
    setisLoading(true);
    axiosInstance
      .post(url, jsonPost)
      .then((res) => {
        if (res.data.code == "99") {
          setisLoading(false);
          // addToast(res.data.message, { appearance: "error" });
          toast.warn(res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        } else {
          setpopupDataTBPH(res.data.data);
          setisLoading(false);
          setopenTBPH(true);
        }
      })
      .catch((err) => {
        setisLoading(false);
        if (err.data.code == "99") {
          // addToast(err.data.message, { appearance: "error" });
          toast.warn(err.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      });
  };

  const OpenMstInfo = (e) => {
    console.log("data",data.SearchData.masothue);
    var jsonMstInfo = {};
    if (data && data.SearchData.masothue) {
      jsonMstInfo = {
        masothue: data.SearchData.masothue,
        key: md5(
          "DOANPV" + "CUONGNH1" + data.SearchData.masothue.substring(0, 2)
        ).toUpperCase(),
      };
    }
    setisLoading(true);
    axiosInstance
      .post(url2, jsonMstInfo)
      .then((res) => {
        setisLoading(false);
        setopenPopup(true);
        setpopupDataKH(res.data.data);
      })
      .catch((err) => {
        setisLoading(false);
        setopenPopup(false);
      });
  };
  const closeToggle = () => {
    setopenPopup(false);
    setopenTBPH(false);
  };

  const ReadToken = () => {
    var jsonRead = { xml: data.ecd, id: 'seller' };
    if (_conn.state != 1) {
      alert("Bạn chưa bật hoặc cài Plugin ký");
    } else {
      _plugin.invoke("execCommand", "ShowCert2", JSON.stringify(jsonRead))
        .done(function (res) {
          console.log(res);
        })
        .fail(function (error) {
          console.log(error);
        });
    }
  };

  return data ? (
    <div className="line-fix">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" fill="#BB6BD9"/>
      </svg>
      <a onClick={OpenTraCuu} className="fix-border-bottom fix-top">
        &nbsp;&nbsp;Tra cứu thông báo phát hành
      </a>
      <br />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" fill="#BB6BD9"/>
      </svg>
      <a onClick={OpenMstInfo} className="fix-border-bottom fix-top">
        &nbsp;&nbsp;Tra cứu thông tin khách hàng
      </a>
      <br/>
      <ToastContainer/>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" fill="#2C76FF"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" fill="#2C76FF"/>
      </svg>
      <a onClick={ReadToken} className="fix-border-bottom fix-top">
        &nbsp;&nbsp;Đọc CKS người bán
      </a>
      <PopupKH openKH={openPopup} dataKH={popupDataKH} onHide={closeToggle} />
      <PopupTBPH open={openTBPH} data={popupDataTBPH} onHide={closeToggle} />
      {/* {isLoading && (
        <div className="text-center">
          <CircularProgress />
        </div>
      )} */}
      <LoadingOverlay
          active={isLoading}
          spinner
          styles={{
            wrapper: {
              width: '0px',
              height: '0px',
            }
          }}
        >
       
        </LoadingOverlay>
    </div>
    
  ) : (
    <></>
  );
}
