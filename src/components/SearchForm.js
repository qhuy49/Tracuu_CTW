import React, { useEffect, useRef, Component } from "react";
// import SearchInvoiceBody from "./ChildSearchForm/SearchInvoiceBody";
// import SearchMutipleInvoice from "./ChildSearchForm/SearchMutipleInvoice";
// import { SearchOneInvoice } from "./ChildSearchForm/SearchOneInvoice";
import App_Router from "./AppRoute/App_Router";

export default function SearchForm(props) {
  const [typeClick, settypeClick] = React.useState("sigle"); // Trạng thái mở Modal
  const [disable, setdisable] = React.useState(false); // Trạng thái mở Modal
  // const get_ref = useRef(null);

  // const handleDisable = () => {

  //   get_ref.current ;

  // };

  const userClick = (type) => {

    if (localStorage.getItem('user') !== null) {
      setdisable(true);
    }
    else {
      setdisable(false);
    }
    settypeClick(type);

  };
  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setdisable(true);
    }
    // if (window.location.pathname == '/lookup_invoice') {
    //   debugger;
    //   settypeClick("mutiple");
    // }

  }, []);


  return (
    <div>
      <section id="hero" className="align-items-center">
        <div className="container mt-5 mb-5 fix-card">
          <div className="d-flex align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="card fix-card-search">
                <h5 className="mt-3 text-center fix-header-search1">
                  Tra cứu hóa đơn điện tử M-Invoice
                </h5>
                <div className=" d-flex justify-content-center">
                  <div className="border-btn">
                    <button
                      className={`btn  font-weight-bold fix-btn ${typeClick == "sigle" ? "fix-btn-active" : ""
                        }`}
                      onClick={() => userClick("sigle")}
                      disabled={disable}
                    >
                      Tra cứu một hóa đơn
                    </button>
                    <button
                      className={`btn  font-weight-bold fix-btn ${typeClick == "mutiple" ? "fix-btn-active" : ""
                        }`}
                      onClick={() => userClick("mutiple")}
                    >
                      Tra cứu theo tài khoản
                    </button>
                    <button
                      className={`btn  font-weight-bold fix-btn ${typeClick == "File" ? "fix-btn-active" : ""
                        }`}
                      onClick={() => userClick("File")}
                      disabled={disable}
                    >
                      Tra cứu theo File
                    </button>
                  </div>
                </div>

                <App_Router type={props.location} userClick={(type) => userClick(type)} Click={typeClick} />

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
