import React, { Component } from 'react';
import { useEffect, useState, useRef } from "react";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form";
import { Redirect, Link, Route } from 'react-router-dom';
import { Logout } from '../action/Dispatch';
import { ContentBody } from '../action/Dispatch';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import LoadingOverlay from 'react-loading-overlay';

import axiosInstance from "../helper/axio";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog, faSignOutAlt, faOutdent, faExchangeAlt, faKey } from '@fortawesome/free-solid-svg-icons'
//  import Imag from './LibCustom/img/1.jpg'

const AppMenu_UserInfo = (props) => {

    const url = "Account/ChangePass";

    const [state, setState] = useState({ modal: false, oldpass: "", newpass: "", confirmpass: "" });
    const [toggle, setToggle] = useState({ open: false });
    const { addToast } = useToasts();
    const { register, handleSubmit, errors } = useForm({ defaultValues: {} });

    const [isLoad, setisLoad] = React.useState(false); // Trạng thái mở Modal

    const get_ref = useRef(null);


    const handleLogout = () => {
        setToggle({ open: false });
        localStorage.removeItem("user");
        props.Logout();
        props.ContentBody(true);

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });


    }

    useEffect(() => {
        document.addEventListener('mousedown', handleBodyClick, true);

        return () => {
            document.removeEventListener('mousedown', handleBodyClick, true);
        }
    }, []);

    const handleBodyClick = (event) => {
        if (get_ref.current && !get_ref.current.contains(event.target)) {
            setToggle({ open: false });
        }
    }

    const handleToggle = () => {
        setToggle({ open: !toggle.open });
    }

    const handleChangePassword = () => {
        setState({ ...state, modal: true });

    }

    const submitChangePassword = (data) => {


        if (props.user.isLoggedIn == true) {
            const axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${props.user.user?.token}`
                }
            };

            if ((state.newpass == '' || state.confirmpass == '')) {
                addToast('Mật khẩu mới hoặc mật khẩu xác nhận không được để trống!', { appearance: "error" });
            }
            else {
                if (state.newpass !== state.confirmpass) {
                    addToast('Mật khẩu mới và mật khẩu xác nhận không khớp nhau!', { appearance: "error" });
                }
                else {


                    //gọi api change pass
                    // const data = { sobaomat: params.row.sobaomat, masothue: StateLookup.masothue, type: "PDF" };
                    setisLoad(true);
                    axiosInstance
                        .post(url, data, axiosConfig)
                        .then((res) => {
                            // setByteData(res.data);
                            // setOpenModal(true);
                            if (res.data.ok == undefined) {
                                setisLoad(false);
                                addToast(JSON.parse(JSON.stringify(res.data).toLocaleLowerCase()).error, { appearance: "error" })
                            }
                            else {
                                setisLoad(false);
                                addToast('Đổi mật khẩu thành công!', { appearance: "success" });
                                handleLogout();

                                setState({ ...state, modal: false });
                                //gọi sang redux


                                //về trang chủ đn lại sau khi đổi mk
                                props.history.push({ pathname: '/', state: 'mutiple' });
                            }

                        })
                        .catch((err) => {
                            if (err.response.status == 401) {
                                setisLoad(false);
                                setToggle({ open: false });
                                setState({ ...state, modal: false });

                                localStorage.removeItem("user");
                                props.Logout();
                                addToast("Phiên đăng nhập hết hạn vui lòng đăng nhập lại!", { appearance: "error" });
                                props.history.push({ pathname: '/', state: "mutiple" });

                            }
                            else {
                                setisLoad(false);
                                addToast(err.message, { appearance: "error" });
                            }
                            setisLoad(false);
                        });



                }
            }
            // }
        }


    }

    const handleCancel = () => {
        setState({ ...state, modal: false });

    }

    const state_user = props.user;

    return (

        state_user.user ? (<div className="dropdown fix_mobil" ref={get_ref}>


            {
                state_user.user ? (
                    <div className="topbar-item" id="profile_user" data-toggle="dropdown" data-offset="0px,0px">


                        {/* <div className="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto">
                            <span className="opacity-70 font-weight-bold font-size-base d-none d-md-inline mr-1">{state_user.user ? "Hi," : ""}</span>
                            <span className="opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4">{state_user.user?.username}</span>


                            {/* <span className="symbol symbol-35">
                                <span className="symbol-label text-white font-size-h5 font-weight-bold bg-white-o-30">{state_user.user?.username.charAt(0).toUpperCase()}</span>
                            </span> 
                        </div> */}
                        <button onClick={handleToggle} style={{ backgroundImage: "url(/LibCustom/img/favicon.ico)", backgroundPosition: 'center', backgroundSize: 'cover' }} className={"btn_user btn btn-icon btn-hover-transparent-white p-0 ml-30 " + (toggle.open ? "button_click" : "")} id="kt_header_mobile_topbar_toggle">

                            {/* <span className="svg-icon svg-icon-xl">
                                <FontAwesomeIcon icon={faUserCog} size="lg" />
                            </span> */}
                        </button>

                    </div>) : ""}
            {
                state_user.user ? (
                    <div className={"dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg p-0 " + (toggle.open ? "show" : "")}>
                        <div className="row d-flex align-items-center p-8 rounded-top">
                            <div className="mx-auto col-12" style={{ textAlign: 'center', padding: '10px 0' }}>
                                <span style={{ color: '#2c76ff', cursor: 'pointer' }} className="opacity-70 font-weight-bold font-size-base mr-1">{state_user.user ? "Hi," + state_user.user.username : ""}</span>

                            </div>

                            <div className="mx-auto col-12">
                                <hr style={{ margin: "unset" }} />
                                <button className="btn btn-bg-info btn_profile" onClick={handleChangePassword}><FontAwesomeIcon icon={faKey} style={{ color: "#0d6efd" }} size="1x" /> Đổi mật khẩu</button>
                                <hr style={{ margin: "unset" }} />
                                <Link to={{ pathname: "/", state: "mutiple" }} className="btn btn-bg-danger btn_profile" onClick={handleLogout}> <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "red" }} size="1x" /> Đăng xuất</Link>
                            </div>
                        </div>
                        {/* <div className="separator separator-solid" /> */}
                    </div>

                ) : ""

            }


            {state.modal ? (
                <div className="modal fade fadeIn" id="edit" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
                    <div className="modal-dialog config_form" role="document">
                        <div className="modal-content">
                            <div className="modal-header fix-modal">
                                {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button> */}
                                <h4 className="modal-title" id="myModalLabel">Thay đổi mật khẩu</h4>
                            </div>
                            {/*/.modal-header*/}
                            <div className="modal-body">
                                <form id="updateForm" onSubmit={handleSubmit(submitChangePassword)} >
                                    <div className="form-group" id="currentPass-group">
                                        <label htmlFor="current_pass">Mật khẩu hiện tại :</label>
                                        <input className="form-control" onChange={handleChange} ref={register} defaultValue={state.oldpass} type="password" name="oldpass" id="current_pass" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="new_pass">Mật khẩu mới :</label>
                                        <input className="form-control" onChange={handleChange} ref={register} defaultValue={state.newpass} type="password" name="newpass" id="new_pass" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirm_pass">Xác nhận mật khẩu :</label>
                                        <input className="form-control" onChange={handleChange} ref={register} defaultValue={state.confirmpass} type="password" name="confirmpass" id="confirm_pass" />
                                    </div>
                                    <div className="modal-footer">
                                        {/* <input type="submit" name="submit" class="btn btn-block btn-warning" value="Save changes" /> */}
                                        <input type="submit" name="submit" className="btn btn-success" id="submitForm" value="Xác nhận" />
                                        <button type="button" onClick={handleCancel} className="btn btn-default" data-dismiss="modal">Thoát</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>



            ) : ""
            }
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
        ) : <></>

    );

}
const mapStateToProps = (state) => ({
    user: state.user,

});

export default connect(mapStateToProps, { Logout, ContentBody })(withRouter(AppMenu_UserInfo));