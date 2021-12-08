import React from "react";


export default function InvoiceInfomation(data) {
  const InfomationData = data.InvoiceData;
  return InfomationData ? (
    <div>
      <table className="table table-sm">
        <tbody>
          <tr>
            <td>Mẫu số</td>
            <td align="right">{InfomationData.mau_hd}</td>
          </tr>
          <tr>
            <td>Ký hiệu</td>
            <td align="right">{InfomationData.inv_invoiceSeries}</td>
          </tr>
          <tr>
            <td>Ngày hóa đơn</td>
            <td align="right">{InfomationData.inv_invoiceIssuedDate}</td>
          </tr>
          <tr>
            <td>Số hóa đơn</td>
            <td align="right">{InfomationData.inv_invoiceNumber}</td>
          </tr>
          <tr>
            <td>Tổng tiền</td>
            <td align="right">{parseFloat(InfomationData.sum_tien).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : (
    <></>
  );
}
