import React, { Component } from "react";

export default class Footers extends Component {
  render() {
    const demo = (e) => {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.href = "http://demo.minvoice.com.vn/";
      a.target = "_blank";
      a.click();
      document.body.removeChild(a);
    };

    const _call = (e) => {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.href = "tel:0901801816";
      a.click();
      document.body.removeChild(a);
    };
    var d = new Date();
    var n = d.getFullYear();
    return (
      <div>
        <footer id="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="fix-ul">
                  <button className="btn btn-success rounded-pill" onClick={_call}>
                    HOTLINE : 0901 80 16 18
                  </button>
                  <button className="btn btn-light rounded-pill fw-bold btn-light-fix" onClick={demo}>
                    DEMO
                  </button>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="footer-contact">
                    <span className="fix-span-footer">TRỤ SỞ</span>
                    <span>Tòa nhà Jana Garden Terrace, số 6 phố</span>
                    <span className="fix-br">Kim Đồng, P. Giáp Bát, Hà Nội</span>
                  </div>
                  <div className="footer-contact">
                    <span className="fix-span-footer">CN HỒ CHÍ MINH</span>
                    <span>Số 2 Đường Nguyễn Thế Lộc, Phường 12,</span>
                    <span className="fix-br"> Quận Tân Bình</span>
                  </div>
                  <div className="footer-contact">
                    <span className="fix-span-footer">CN HẢI PHÒNG</span>
                    <span>Số 16 Lê Đại Hành, P. Minh Khai, Q. Hồng </span>
                    <span className="fix-br"> Bàng</span>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="footer-contact">
                    <span className="fix-span-footer">CN HÀ NỘI</span>
                    <span>Số nhà 27 liền kề 14 KĐT Văn Khê, Quận</span>
                    <span className="fix-br"> Hà Đông, Hà Nội</span>
                  </div>
                  <div className="footer-contact">
                    <span className="fix-span-footer">CN ĐÀ NẴNG</span>
                    <span>Số 100, Lê Tấn Trung, P. Thọ Quang,</span>
                    <span className="fix-br"> Quận Sơn Trà</span>
                  </div>
                  <div className="footer-contact">
                    <span className="fix-span-footer">CN HẢI DƯƠNG</span>
                    <span>Khu 1, Phường Thạch Khôi, Tp.Hải Dương</span>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="footer-contact">
                    <span className="fix-span-footer">CN THANH HÓA</span>
                    <span>Số 68 Trần Bình Trọng, P.Đông Sơn </span>
                    <span className="fix-br">Thành phố Thanh Hóa </span>
                  </div>
                  <div className="footer-contact">
                    <span className="fix-span-footer">CN ĐỒNG NAI</span>
                    <span>R318, Đường D8, KP 7, P. Thống Nhất,</span>
                    <span className="fix-br"> Thành phố Biên Hoà</span>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 footer-contact">
                  <div className="footer-contact">
                    <span className="fix-span-footer">SẢN PHẨM</span>
                    <span className="fix-br">Bảo hiểm xã hội điện tử</span>
                    <span className="fix-br">Hợp đồng điện tử</span>
                    <span className="fix-br">Chữ ký số</span>
                  </div>
                  <div>
                    <span className="fix-span-footer2">Kết nối với chúng tôi</span>
                    <span className="text-center text-md-right pt-3 pt-md-0">
                      <a
                        href="https://www.facebook.com/hoadondientu.m.invoice"
                        className="facebook"
                        target="_blank"
                      >
                        <img src="./LibCustom/img/Facebook.png"></img>
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UCJd2b57TomvwJOMyXhYVQpQ"
                        className="youtube p-4"
                        target="_blank"
                      >
                        <img src="./LibCustom/img/Youtube.png"></img>
                      </a>
                    </span>
                  </div>

                </div>
              </div>
              <div className="row ">
                <p className="span-footer text-white">
                  Copyrights © {n} Phần mềm Hóa đơn điện tử <strong><span>
                    M-Invoice
                  </span></strong>. All Rights Reserved.

                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
