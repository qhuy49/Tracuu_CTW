import React from "react";
import axiosInstance from "../../helper/axio";

export default function ExtensionDownload({ infomationInvoice }) {
  const url = "Search/ExportXmlInvoice";
  const url2 = "Search/SearchInvoice";
  const json = {
    masothue: infomationInvoice.masothue,
    sobaomat: infomationInvoice.sobaomat,
    type: "pdf",
  };
  const pdfSave = (data) => {
    axiosInstance
      .post(url2, json, { responseType: "arraybuffer" })
      .then((res) => {
        const file = new Blob([res.data], {
          type: "application/pdf",
        });
        const fileURL = URL.createObjectURL(file);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = fileURL;
        a.download = "Invoice_" + json.masothue + "_" + json.sobaomat + ".pdf";
        a.click();
        window.URL.revokeObjectURL(fileURL);
        document.body.removeChild(a);
      });
  };
  const xmlSave = (e) => {
    json.inchuyendoi = "1";
    axiosInstance
      .post(url, json, { responseType: "arraybuffer" })
      .then((res) => {
        const file = new Blob([res.data], {
          type: "application/zip",
        });
        const fileURL = URL.createObjectURL(file);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = fileURL;
        a.download = "Invoice_" + json.masothue + "_" + json.sobaomat + ".zip";
        a.click();
        window.URL.revokeObjectURL(fileURL);
        document.body.removeChild(a);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pluginSave = (e) => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = "https://plugin.minvoice.com.vn/MinvoicePlugin/setup.exe";
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="line-fix">
      <svg width="20" height="20" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.14941 0.0969238L12.6494 4.59692V13.5969C12.6494 13.9947 12.4914 14.3763 12.2101 14.6576C11.9288 14.9389 11.5472 15.0969 11.1494 15.0969H2.14941C1.75159 15.0969 1.37006 14.9389 1.08875 14.6576C0.807449 14.3763 0.649414 13.9947 0.649414 13.5969V1.59692C0.649414 1.1991 0.807449 0.817568 1.08875 0.536264C1.37006 0.254959 1.75159 0.0969238 2.14941 0.0969238H8.14941ZM11.1494 13.5969V5.34692H7.39941V1.59692H2.14941V13.5969H11.1494ZM6.64941 12.8469L3.64941 9.84692H5.52441V7.59692H7.77441V9.84692H9.64941L6.64941 12.8469Z" fill="#27AE60"/>
      </svg>
      <a onClick={pdfSave} target="_blank" title="Tải pdf" className="fix-border-bottom">
        &nbsp;&nbsp;Tải PDF
      </a>
      <br />
      <svg width="20" height="20" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.14941 0.0969238L12.6494 4.59692V13.5969C12.6494 13.9947 12.4914 14.3763 12.2101 14.6576C11.9288 14.9389 11.5472 15.0969 11.1494 15.0969H2.14941C1.75159 15.0969 1.37006 14.9389 1.08875 14.6576C0.807449 14.3763 0.649414 13.9947 0.649414 13.5969V1.59692C0.649414 1.1991 0.807449 0.817568 1.08875 0.536264C1.37006 0.254959 1.75159 0.0969238 2.14941 0.0969238H8.14941ZM11.1494 13.5969V5.34692H7.39941V1.59692H2.14941V13.5969H11.1494ZM6.64941 12.8469L3.64941 9.84692H5.52441V7.59692H7.77441V9.84692H9.64941L6.64941 12.8469Z" fill="#27AE60"/>
      </svg>
      <a onClick={xmlSave} title="Tải xml" className="fix-border-bottom">
        &nbsp;&nbsp;Tải XML
      </a>
      <br />
      <svg width="20" height="20" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.14941 0.0969238L12.6494 4.59692V13.5969C12.6494 13.9947 12.4914 14.3763 12.2101 14.6576C11.9288 14.9389 11.5472 15.0969 11.1494 15.0969H2.14941C1.75159 15.0969 1.37006 14.9389 1.08875 14.6576C0.807449 14.3763 0.649414 13.9947 0.649414 13.5969V1.59692C0.649414 1.1991 0.807449 0.817568 1.08875 0.536264C1.37006 0.254959 1.75159 0.0969238 2.14941 0.0969238H8.14941ZM11.1494 13.5969V5.34692H7.39941V1.59692H2.14941V13.5969H11.1494ZM6.64941 12.8469L3.64941 9.84692H5.52441V7.59692H7.77441V9.84692H9.64941L6.64941 12.8469Z" fill="#27AE60"/>
      </svg>
      <a onClick={pluginSave} target="_blank" title="Tải plugin" className="fix-border-bottom">
        &nbsp;&nbsp;Tải Plugin ký
      </a>
    </div>
  );
}
