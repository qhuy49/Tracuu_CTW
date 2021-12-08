import React from "react";
import axiosInstance from "../../helper/axio";
import LoadingOverlay from 'react-loading-overlay';

export default function InvoiceOptions({ InvoiceDatas }) {
  const url = "Search/SearchInvoice";
  //để dđây chờ url in cđ
  const url_InvoiceCusPDF = "Search/PrintInvoiceCusPDF";
  
  const [isLoad, setisLoad] = React.useState(false); // Trạng thái mở Modal

  const loadPdf = (data) => {
    InvoiceDatas.inchuyendoi = "1";
    setisLoad(true);
    axiosInstance
      .post(InvoiceDatas.InvoiceCus ? url_InvoiceCusPDF : url, InvoiceDatas, {
        responseType: "arraybuffer",
      })
      .then((res) => {
        setisLoad(false);
        const file = new Blob([res.data], {
          type: "application/pdf",
        });
        const fileURL = URL.createObjectURL(file);
        const pdfWindow = window.open();
        pdfWindow.location.href = fileURL;
      })
      .catch((err) => {
        setisLoad(false);
        console.log(err);
      });
  };
  const directLink = (e) => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = "http://tracuuhoadon.gdt.gov.vn/tc1hd.html";
    a.target = "_blank";
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="line-fix">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        className="bi bi-printer"
        viewBox="0 0 16 16"
      >
        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" fill="#4B65EB"/>
      </svg>
      <a onClick={loadPdf} className="fix-border-bottom fix-top">&nbsp;&nbsp;In Chuyển đổi</a>
      <br />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        className="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"fill="#BB6BD9" />
      </svg>
      <a onClick={directLink} className="fix-border-bottom fix-top">&nbsp;&nbsp;Tra cứu kê khai thuế</a>
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
    </div>
  );
}
