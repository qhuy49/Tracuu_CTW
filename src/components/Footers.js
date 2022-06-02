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
                  {/* <button className="btn btn-success rounded-pill" onClick={_call}>
                    HOTLINE : 0901 80 16 18
                  </button>
                  <button className="btn btn-light rounded-pill fw-bold btn-light-fix" onClick={demo}>
                    DEMO
                  </button> */}
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer-contact">
                    <span className="fix-span-footer">TRỤ SỞ</span>
                    <span>Trung tâm Nước sạch và VSMT Nông thôn</span>
                    <span className="fix-br">516 Ngô Quyền, P. Vĩnh Lạc, Tp. Rạch Giá, Kiên Giang</span>
                    <span className="fix-br">Mã số thuế: 1701675884</span>
                  </div>
                  {/* <div className="footer-contact">
                    <span className="fix-span-footer">Điện thoại</span>
                    <span>(0297) 3811564, 3813420</span>
                    <span className="fix-br"> </span>
                  </div>
                  <div className="footer-contact">
                    <span className="fix-span-footer">CN HẢI PHÒNG</span>
                    <span>Fax: (0297) 3810769 </span>
                    <span className="fix-br"> Bàng</span>
                  </div> */}
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer-contact">
                    <span className="fix-span-footer">Thông tin liên hệ</span>
                    <span>Điện thoại:(0297) 3811564, 3813420</span>
                    <span className="fix-br">Email: ttnsvsmtnt.snn@kiengiang.gov.vn</span>
                    <span className="fix-br">Fax: (0297) 3810769</span>
                    {/* <span className="fix-br"> Hà Đông, Hà Nội</span> */}
                  </div>
                  {/* <div className="footer-contact">
                    <span className="fix-span-footer">CN ĐÀ NẴNG</span>
                    <span>Số 100, Lê Tấn Trung, P. Thọ Quang,</span>
                    <span className="fix-br"> Quận Sơn Trà</span>
                  </div>
                  <div className="footer-contact">
                    <span className="fix-span-footer">CN HẢI DƯƠNG</span>
                    <span>Khu 1, Phường Thạch Khôi, Tp.Hải Dương</span>
                  </div> */}
                </div>
                {/* <div className="col-lg-3 col-md-6">
                  <div className="footer-contact">
                    <span className="fix-span-footer">Thông tin Cty</span>
                    <span>Tên Cty: TRUNG TÂM NƯỚC SẠCH VÀ VỆ SINH MÔI TRƯỜNG NÔNG THÔN</span>
                    <span className="fix-br">Mã số thuế: 1701675884</span>
                    
                  </div>
                  <div className="footer-contact">
                    <span className="fix-span-footer">CN ĐỒNG NAI</span>
                    <span>R318, Đường D8, KP 7, P. Thống Nhất,</span>
                    <span className="fix-br"> Thành phố Biên Hoà</span>
                  </div>
                </div> */}
                <div className="col-lg-4 col-md-7 footer-contact">
                  <div className="footer-contact">
                    <span className="fix-span-footer">Thông tin chuyển khoản</span>
                    <span >Số tài khoản: 77002110100097</span> 
                    <span className="fix-br">Ngân hàng: Nông Nghiệp và Phát Triển Nông Thôn Kiên Giang</span>
                    {/* <span className="fix-br">Hợp đồng điện tử</span>
                    <span className="fix-br">Chữ ký số</span> */}
                  </div>
                  {/* <div>
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
                  </div> */}

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
