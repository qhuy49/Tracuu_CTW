import React, { useEffect } from "react";
import axiosInstance from "../../helper/axio";
import ExtensionDownload from "./ExtensionDownload";
import InvoiceInfomation from "./InvoiceInfomation";
import InvoiceOptions from "./InvoiceOptions";
import SearchInfo from "./SearchInfo";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { PluginMV, PluginConn } from "./MinvoicePlugin";
import { useToasts } from "react-toast-notifications";
import LoadingOverlay from "react-loading-overlay";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > .fa": {
      margin: theme.spacing(2),
    },
  },
}));
var _plugin = PluginMV();
var _conn = PluginConn();

export default function GroupOptions(data) {
  const classes = useStyles();
  const { addToast } = useToasts(); // trạng thái hiển thị cảnh báo
  const InvoiceOptionsData = data.data;
  const url = "invoice/GetInforInvoice";
  const [infoModal, setinfoModal] = React.useState(undefined); // Thông tin hóa đơn
  const [InvoiceSeries, setInvoiceSeries] = React.useState(undefined); // Ký hiệu
  const [MauSo, setMauSo] = React.useState(undefined); // Mẫu số
  const [masoThue, setmasoThue] = React.useState(undefined); // Mã số thuế
  const [authID, setauthID] = React.useState(undefined); // AuthID
  const [crypt, setcrypt] = React.useState(undefined); // ConnectString
  const [Ecd, setEcd] = React.useState(undefined); // Read Token người bán

  const [isLoad, setisLoad] = React.useState(false); // Trạng thái mở Modal
  const jsonInfo = {
    masothue: data.data.masothue,
    sobaomat: data.data.sobaomat,
  };

  useEffect(() => {
    setisLoad(true);
    axiosInstance.post(url, jsonInfo).then((res) => {
      setinfoModal(res.data.data.data[0]);
      setInvoiceSeries(res.data.data.data[0].inv_invoiceSeries);
      setMauSo(res.data.data.data[0].mau_hd);
      setmasoThue(res.data.data.data[0].inv_buyerTaxCode);
      setauthID(res.data.data.data[0].inv_InvoiceAuth_id);
      // console.log(res.data.data.data[0].inv_InvoiceAuth_id);
      setcrypt(res.data.data.data[0].auth_id);
      setEcd(res.data.data.data[0].ecd);
      setisLoad(false);
    });
  }, []);

  const signInvoice = () => {
    var crypts = atob(crypt);
    // Người mua ký điiiiiiiiiiiiiiiiiiiiiiiiii
    if (_conn.state != 1) {
      //addToast("Không có hoặc chưa bật Plugin ký. Vui lòng kiểm tra lại", { appearance: "error" });

      toast.warn("Không có hoặc chưa bật Plugin ký. Vui lòng kiểm tra lại !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setisLoad(true);
      _plugin
        .invoke("SignatureXML", masoThue, authID, crypts)
        .done(function (res) {
          //addToast(res, { appearance: "success" });
          setisLoad(false);
          toast.success(res, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .fail(function (error) {
          setisLoad(false);
          // addToast(error, { appearance: "error" });
          toast.warn(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <div className="container fix-cusor ">
      <form className={classes.root}>
        <InvoiceInfomation InvoiceData={infoModal} />
        <div align="right">
          <button
            type="button"
            className="btn btn-primary fix-top"
            onClick={signInvoice}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
            &nbsp;&nbsp;&nbsp;Người mua ký hóa đơn&nbsp;
          </button>
        </div>
        {/* <ToastContainer/> */}

        <ExtensionDownload infomationInvoice={InvoiceOptionsData} />
        <InvoiceOptions InvoiceDatas={InvoiceOptionsData} />
        <SearchInfo
          SearchData={InvoiceOptionsData}
          mauHD={MauSo}
          kyHieu={InvoiceSeries}
          msThue={masoThue}
          ecd={Ecd}
        />
      </form>
      <LoadingOverlay
        active={isLoad}
        spinner
        styles={{
          wrapper: {
            width: "0px",
            height: "0px",
          },
        }}
      ></LoadingOverlay>
    </div>
  );
}
