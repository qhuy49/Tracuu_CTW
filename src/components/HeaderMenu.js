import React, { Component } from "react";
import AppMenu_UserInfo from "./AppMenu_UserInfo";

export default class HeaderMenu extends Component {
  render() {
    const directLink = (e) => {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.href = "https://drive.google.com/drive/folders/15kzkcSe-2tMFx6moKjlDYOHa7yUWicbP?usp=sharing";
      a.target = "_blank";
      a.click();
      document.body.removeChild(a);
    };
    return (
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="logo">
            <a href="">
              <img src="./LibCustom/img/logo2.png" alt=""></img>
            </a>
            {/* <span>Trung tâm Nước sạch và VSMT Nông thôn</span> */}
          </h1>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a className="nav-link scrollto" href="https://minvoice.vn/" target="_blank">
                  Hóa đơn điện tử
                </a>
              </li>
              <li className="dropdown">
                <a href="">
                  <span>Hỏi đáp</span> <i className="bi bi-chevron-down" />
                </a>
                <ul>
                  <li>
                    <a href="https://minvoice.vn/hoi-dap-hoa-don-dien-tu/" target="_blank">Hỏi đáp hóa đơn điện tử</a>
                  </li>
                  <li>
                    <a href="https://minvoice.vn/hoi-dap-tin-tuc-hoa-don-dien-tu/quy-dinh-ve-hoa-don-dien-tu/" target="_blank">Kiến thức hóa đơn điện tử</a>
                  </li>
                  <li>
                    <a href="https://minvoice.vn/hoi-dap-tin-tuc-hoa-don-dien-tu/van-ban-hoa-don-dien-tu/" target="_blank">Văn bản hóa đơn điện tử</a>
                  </li>
                  <li>
                    <a href="https://minvoice.vn/hoi-dap-tin-tuc-hoa-don-dien-tu/" target="_blank">Tin tức</a>
                  </li>
                </ul>
              </li>
              {/* <li className="dropdown">
                <a href="">
                  <span>Sản phẩm</span> <i className="bi bi-chevron-down" />
                </a>
                <ul>
                  <li>
                    <a href="https://minvoice.vn/hoa-don-dien-tu-cho-linh-vuc-thuong-mai-phan-phoi/"  target="_blank">Thương mại - Phân phối </a>
                  </li>
                  <li>
                    <a href="https://minvoice.vn/hoa-don-dien-tu-cho-nganh-ngan-hang/" target="_blank">Ngân hàng</a>
                  </li>
                  <li>
                    <a href="https://minvoice.vn/hoa-don-dien-tu-cho-he-thong-nha-thuoc/" target="_blank">Nhà thuốc</a>
                  </li>
                  <li>
                    <a href="https://minvoice.vn/hoa-don-dien-tu-cho-nganh-san-xuat/" target="_blank">Sản xuất</a>
                  </li>
                  <li>
                    <a href="https://minvoice.vn/hoa-don-dien-tu-cho-nganh-benh-vien/" target="_blank">Bệnh viện</a>
                  </li>
                  <li>
                    <a href="https://minvoice.vn/hoa-don-dien-tu-cho-nganh-sieu-thi/" target="_blank">Siêu thị </a>
                  </li>
                  <li>
                    <a href="https://minvoice.vn/hoa-don-dien-tu-cho-nganh-vat-lieu-xay-dung/" target="_blank">Vật liệu Xây dựng </a>
                  </li>
                  <li>
                    <a href="https://minvoice.vn/hoa-don-dien-tu-cho-nganh-noi-that-gia-dung/" target="_blank">Nội thất gia dụng</a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="nav-link scrollto" href="https://minvoice.vn/dang-ky-su-dung/" target="_blank">
                  Mua hàng
                </a>
              </li>
              <li>
                <button className="btn btn-primary fix-header-button " onClick={directLink}>
                  ĐĂNG KÝ ĐẠI LÝ
                </button>
              </li> */}
              <li>
                <button className="btn btn-primary fix-header-button " onClick={directLink}>
                Hướng dẫn tra cứu
                </button>
              </li>
              
            </ul>
            <i className="bi bi-list mobile-nav-toggle" />


          </nav>
         <AppMenu_UserInfo/>
        </div>

      </header>
    );
  }
}
