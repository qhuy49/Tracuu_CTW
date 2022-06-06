import React, { Component } from "react";
import { addUser } from "../../action/Dispatch";
import { ContentBody } from "../../action/Dispatch";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";
import axiosInstance from "../../helper/axio";
// import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingOverlay from 'react-loading-overlay';

//
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSync } from "@fortawesome/free-solid-svg-icons";

const SearchMutipleInvoice = (props) => {
  const url = "Account/Login";

  const [state, setState] = useState({
    mst: "1701675884",
    username: "",
    password: "",
    token: "",
  });
  const [isLoading, setLoading] = useState(false); //state loading
  const { addToast } = useToasts();
  const { register, handleSubmit, errors } = useForm({ defaultValues: {} });
  const get_ref = useRef();

  const handleChange = (e) => {

    const { name, value } = e.target;
    var newvalue = value;
    if (name == 'mst') { newvalue = value.replace(/ /g, ''); }
    setState({ ...state, [name]: newvalue });
  };
  useEffect(() => {

    //props.userClick('mutiple');

  }, []);

  if (props.user.isLoggedIn == true) {
    props.ContentBody(false);
    props.history.push("/lookup_invoice");
  }

  const onSubmit = (data) => {
     data.mst = "1701675884";
    // data.mst = "0106026495888";
    setLoading(true);
    if (state.mst.length == 0 || state.mst == null) {
      addToast("Vui lòng nhập mã số thuế bên bán!", { appearance: "error" });
      setLoading(false);
    } else {
      if (state.username.length == 0 || state.username == null) {
        addToast("Vui lòng nhập tên tài khoản!", { appearance: "error" });
        setLoading(false);
      } else {
        if (state.password.length == 0 || state.password == null) {
          addToast("Vui lòng nhập mật khẩu!", { appearance: "error" });
          setLoading(false);
        } else {


          axiosInstance
            .post(url, data)
            .then((res) => {
              if (res.data.token == undefined) {
                addToast(
                  JSON.parse(JSON.stringify(res.data).toLocaleLowerCase())
                    .error,
                  { appearance: "error" }
                );
                setLoading(false);
              } else {
                setLoading(false);
                addToast("Đăng nhập thành công!", { appearance: "success" });

                const state_new = { ...state };
                state_new.token = res.data.token;
                state_new.password = "";
                state_new.ma_dt = res.data.user.ma_dt;
                localStorage.setItem("user", JSON.stringify(state_new));
                props.userClick('mutiple');
                props.addUser(JSON.stringify(state_new));
                props.ContentBody(false);

                props.history.push("/lookup_invoice");
              }
            })
            .catch((err) => {
              addToast(err.message, { appearance: "error" });
              setLoading(false);
            });
        }
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className="form-input ">
          <span>Mã số thuế bên bán:</span>
          <input
            autoFocus
            className="form-control fix-form-input"
            placeholder="Mã số thuế bên bán"
            name="mst"
            type="text"
            ref={register}
            value={state.mst}
            onChange={(e) => handleChange(e)}
          />
        </div> */}
        <div className="form-input">
          <span>Tài khoản:</span>
          <input
            className="form-control fix-form-input"
            name="username"
            type="text"
            placeholder="Tài khoản"
            value={state.username}
            onChange={(e) => handleChange(e)}
            ref={register}
          />
        </div>
        <div className="form-input">
          <span>Mật khẩu:</span>
          <input

            className="form-control fix-form-input"
            name="password"
            type="password"
            placeholder="Mật khẩu"
            value={state.password}
            onChange={(e) => handleChange(e)}
            ref={register}
          />
        </div>
        <div className="text-center">
          {/* {isLoading ? (
            <button style={{ opacity: "0.8" }} type="submit" className=" btn btn-primary mt-4 signup align-items-center justify-content-center">
              <CircularProgress size={19} color="inherit" />
            </button>

          ) : ( */}
            <button type="submit" className=" btn btn-primary mt-4 signup align-items-center justify-content-center">
              Đăng Nhập
            </button>
          {/* )} */}

        </div>
       
      </form>
      <LoadingOverlay
          active={isLoading}
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

};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { addUser, ContentBody })(withRouter(SearchMutipleInvoice));