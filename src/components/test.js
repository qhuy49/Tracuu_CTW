import React, { Component } from "react";
import { Link } from "react-router-dom";


export default function  Test() {
    var baseUrl = "";
    if (document.location.port === "3000") {
        baseUrl = "http://localhost:3000";
      } else {
        baseUrl = process.env.PUBLIC_URL;
      }
      var Vacom = baseUrl + "/LibCustom/img/3.jpg";
      var SSE = baseUrl + "/LibCustom/img/7.jpg";
      var TruongAn = baseUrl + "/LibCustom/img/1.jpg";
      var BaTs = baseUrl + "/LibCustom/img/2.jpg";
      var Sivip = baseUrl + "/LibCustom/img/4.jpg";
      var ThienLong = baseUrl + "/LibCustom/img/5.jpg";
      var VNYI = baseUrl + "/LibCustom/img/6.jpg";
      var Melia = baseUrl + "/LibCustom/img/8.jpg";
      var Moka = baseUrl + "/LibCustom/img/9.jpg";
      var Ipos = baseUrl + "/LibCustom/img/10.jpg";
      var Dtech = baseUrl + "/LibCustom/img/11.jpg";
      var oneC = baseUrl + "/LibCustom/img/12.jpg";
    

    return (
      <div>
        <section id="testimonials" className="testimonials">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
            </div>
            <div
              className="testimonials-slider swiper-container"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <img
                      src= {Vacom}
                      className="testimonial-img"
                      alt
                    />
                    <h3>Phần mềm kế toán Vacom</h3>
                    <a to="https://vacom.com.vn/gioi-thieu"></a>
                  </div>
                </div>
                {/* End testimonial item */}
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Export tempor illum tamen malis malis eram quae irure esse
                      labore quem cillum quid cillum eram malis quorum velit
                      fore eram velit sunt aliqua noster fugiat irure amet legam
                      anim culpa.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <img
                      src="assets/img/testimonials/testimonials-2.jpg"
                      className="testimonial-img"
                      alt
                    />
                    <h3>Sara Wilsson</h3>
                    <h4>Designer</h4>
                  </div>
                </div>
                {/* End testimonial item */}
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Enim nisi quem export duis labore cillum quae magna enim
                      sint quorum nulla quem veniam duis minim tempor labore
                      quem eram duis noster aute amet eram fore quis sint minim.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <img
                      src="assets/img/testimonials/testimonials-3.jpg"
                      className="testimonial-img"
                      alt
                    />
                    <h3>Jena Karlis</h3>
                    <h4>Store Owner</h4>
                  </div>
                </div>
                {/* End testimonial item */}
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Fugiat enim eram quae cillum dolore dolor amet nulla culpa
                      multos export minim fugiat minim velit minim dolor enim
                      duis veniam ipsum anim magna sunt elit fore quem dolore
                      labore illum veniam.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <img
                      src="assets/img/testimonials/testimonials-4.jpg"
                      className="testimonial-img"
                      alt
                    />
                    <h3>Matt Brandon</h3>
                    <h4>Freelancer</h4>
                  </div>
                </div>
                {/* End testimonial item */}
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Quis quorum aliqua sint quem legam fore sunt eram irure
                      aliqua veniam tempor noster veniam enim culpa labore duis
                      sunt culpa nulla illum cillum fugiat legam esse veniam
                      culpa fore nisi cillum quid.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <img
                      src="assets/img/testimonials/testimonials-5.jpg"
                      className="testimonial-img"
                      alt
                    />
                    <h3>John Larson</h3>
                    <h4>Entrepreneur</h4>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </section>
      </div>
    );
  }

