import React, { Component } from "react";

export default class ContentBody extends Component {
  render() {
    return (
      <div>
        <section id="pricing" className="pricing">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div
                className="col-lg-4 col-md-4"
                data-aos="zoom-im"
                data-aos-delay={100}
              >
                <div className="box">
                  <img src="./LibCustom/img/Flower3.png" alt="" />
                  <h3>TƯ VẤN - HỖ TRỢ</h3>
                  <ul>
                    <li>Hỗ trợ thông báo phát hành hóa đơn</li>
                    <li>Tư vấn nghiệp vụ hóa đơn trong quá trình sử dụng</li>
                    <li>Giải quyết vướng mắc của khách hàng trong vòng 02 giờ</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 mt-4 mt-md-0">
                <div className="box">
                  <img src="./LibCustom/img/Compass.png" alt="" />
                  <h3>TIẾT KIỆM - HIỆU QUẢ</h3>
                  <ul>
                    <li>Hệ thống chat trực tiếp với kỹ thuật</li>
                    <li>Chi phí hợp lý nhiều tính năng vượt trội</li>
                    <li>Hỗ trợ tra cứu hóa đơn theo Website của doanh nghiệp</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 mt-4 mt-md-0">
                <div className="box">
                  <img src="./LibCustom/img/Cart2.png" alt="" />
                  <h3>AN TOÀN - BẢO MẬT</h3>
                  <ul>
                    <li>Áp dụng Quy trình ISO 27001:2013</li>
                    <li>Áp dụng mã hóa bảo mật thông tin hóa đơn</li>
                    <li>Hệ thống Server Backup Realtime, Chống tấn công DDOS</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
    );
  }
}
