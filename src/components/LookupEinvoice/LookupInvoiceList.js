import React, { Component } from 'react';
import { DataGrid, formatDateToLocalInputDate  } from '@material-ui/data-grid';
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import dateFormat from 'dateformat';
// import { makeStyles } from '@material-ui/core/styles';
// import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';


// import required css from library
import "react-datepicker/dist/react-datepicker.css";
import './LookupInvoice.css';

import axiosInstance from "../../helper/axio";
import { useToasts } from "react-toast-notifications";

//redux and route
import { Logout } from '../../action/Dispatch';
import { ContentBody } from '../../action/Dispatch';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
//import icon, button
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import LoadingOverlay from 'react-loading-overlay';

import ExportModal from "../ExportModal";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     // margin: theme.spacing(1),
//   },
// }));
//  const defaultTheme = createMuiTheme();
// const useStyles = makeStyles(
//   (theme) => {
//     const getBackgroundColor = (color) =>
//       getThemePaletteMode(theme.palette) === 'dark'
//         ? darken(color, 0.6)
//         : lighten(color, 0.6);

//     const getHoverBackgroundColor = (color) =>
//       getThemePaletteMode(theme.palette) === 'dark'
//         ? darken(color, 0.5)
//         : lighten(color, 0.5);

//     return {
//       root: {
//         '& .super-app-theme--Open': {
//           backgroundColor: getBackgroundColor(theme.palette.info.main),
//           '&:hover': {
//             backgroundColor: getHoverBackgroundColor(theme.palette.info.main),
//           },
//         },
//         '& .super-app-theme--Filled': {
//           backgroundColor: getBackgroundColor(theme.palette.success.main),
//           '&:hover': {
//             backgroundColor: getHoverBackgroundColor(theme.palette.success.main),
//           },
//         },
//         '& .super-app-theme--PartiallyFilled': {
//           backgroundColor: getBackgroundColor(theme.palette.warning.main),
//           '&:hover': {
//             backgroundColor: getHoverBackgroundColor(theme.palette.warning.main),
//           },
//         },
//         '& .super-app-theme--Rejected': {
//           backgroundColor: getBackgroundColor(theme.palette.error.main),
//           '&:hover': {
//             backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
//           },
//         },
//       },
//     };
//   },
//    { defaultTheme },
// );

const LookupEinvoice = (props) => {

  // const classes = useStyles();
  // const classes = useStyles();
  const url = "invoice/SearchMultiInvoice";
  const url_printInvoice = "Search/PrintInvoiceCusPDF";
  const url_downloadInvoice = "Search/ExportXmlInvoice";

  const [isLoading, setLoading] = useState(false); //state loading
  const [isLoadingButton, setLoadingButton] = useState(false); //state loading button

  const [StateLookup, setStateLookup] = useState({ tu_ngay: new Date("01/01/2021"), den_ngay: new Date(), masothue: props.user.user?.mst });
  // const [StateLookup, setStateLookup] = useState({ tu_ngay: new Date(), den_ngay: new Date(), masothue: props.user.user?.mst });
  // const [ToDate, setToDate] = useState(new Date());
  const { addToast } = useToasts(); //hiển thị cảnh báo
  const [pageSize, setPageSize] = React.useState(30); //set page size
  const [data_rows, setdata_rows] = React.useState([]); // set data from API fill in Grid

  const [openModal, setOpenModal] = React.useState(false); // Trạng thái mở Modal

  const [byteData, setByteData] = React.useState(undefined); // Dữ liệu truyền sang modal
  const [infoModal, setinfoModal] = React.useState(undefined); // Dữ liệu truyền sang modal
  const datepickerRef = React.useRef(null);
  const datepickerRef2 = React.useRef(null);
  useEffect(() => {
    props.ContentBody(false);



    //componentDidMount
    if (props.user.isLoggedIn == false) {
      setLoadingButton(false);
      addToast("Bạn chưa đăng nhập!", { appearance: "error" });
      //đưa về trang chủ
      localStorage.removeItem("user");
      props.ContentBody(true);
      props.Logout();

      props.history.push({ pathname: '/', state: "mutiple" });

    }
    else {
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${props.user.user?.token}`
        }
      };
      // var settungay = convertDate(StateLookup.tu_ngay);
      var data_Lookup = {
        tu_ngay: dateFormat(StateLookup.tu_ngay, "yyyy-mm-dd"),
        den_ngay: dateFormat(StateLookup.den_ngay, "yyyy-mm-dd"),
        masothue: StateLookup.masothue,
        ma_dt: props.user.user.ma_dt
      };

      axiosInstance
        .post(url, data_Lookup, axiosConfig)
        .then((res) => {
          if (res.data.code == '00') {
            if (res.data.data != null) {
              if (res.data.data.data.length > 0) {

                var sortedObjs = res.data.data.data.sort((a, b) => Number(b.inv_invoiceNumber) - Number(a.inv_invoiceNumber));
                for (var i = 0; i < sortedObjs.length; i++) {
                  sortedObjs[i].id = i + 1;
                }
                setdata_rows(res.data.data.data);
                setLoadingButton(false);
              }
              else {
                setLoadingButton(false);
                addToast("Không tìm thấy hóa đơn trong khoảng ngày này!", { appearance: "error" });
              }
            }
            else{
              setLoadingButton(false);
              addToast("Không tìm thấy hóa đơn trong khoảng ngày này!", { appearance: "error" });
            }
          }

          // setOpenModal(true);
        })
        .catch((err) => {
          if(err.message.includes('Network')){
            addToast(err.message, { appearance: "error" });
            setLoadingButton(false);
          }
          else{
            if (err.response.status == 401) {
              setLoadingButton(false);
              localStorage.removeItem("user");
              props.ContentBody(true);
              props.Logout();
              addToast("Phiên đăng nhập hết hạn vui lòng đăng nhập lại!", { appearance: "error" });
              props.history.push({ pathname: '/', state: "mutiple" });
  
            }
            else {
              if (JSON.stringify(err).includes('message')) {
                addToast(err.message, { appearance: "error" });
                setLoadingButton(false);
              }
              else { addToast(err.message, { appearance: "error" }); setLoadingButton(false); }
            }
          }
          


        });
    }

  

  }, []);
  // const convertDate =(date) =>{
  //  return new  Intl.DateTimeFormat("en-US", {
  //   year: 'numeric',
  //   month: '2-digit',
  //   day: '2-digit'
  //   }).format(date);
  // }
  if (props.user.isLoggedIn == false) {
    props.ContentBody(true);
    props.history.push('/');
  }

  function toggle() {
    setOpenModal(!openModal);
  }

  const ClickDownloadXML = (params) => {

    //gọi api get thông tin hđ
    setLoading(true);
    const data_json = { sobaomat: params.row.sobaomat, masothue: StateLookup.masothue, type: "PDF", inchuyendoi: "1" };

    axiosInstance
      .post(url_downloadInvoice, data_json, { responseType: "arraybuffer" })
      .then((res) => {
        const file = new Blob([res.data], {
          type: "application/zip",
        });
        const fileURL = URL.createObjectURL(file);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = fileURL;
        a.download = "Invoice_" + data_json.masothue + "_" + data_json.sobaomat +"_"+params.row.inv_invoiceNumber+ ".zip";
        a.click();
        window.URL.revokeObjectURL(fileURL);
        document.body.removeChild(a);

        setLoading(false);
      })
      .catch((err) => {
        addToast(err.message, { appearance: "error" });
        setLoading(false);
      });
    // data.InvoiceCus = true;
    // setinfoModal(data);
  }

  const ClickView = (params) => {
    //gọi api get thông tin hđ
    setLoading(true);
    const data = { sobaomat: params.row.sobaomat, masothue: StateLookup.masothue, type: "PDF" };

    axiosInstance
      .post(url_printInvoice, data, { responseType: "arraybuffer" })
      .then((res) => {
        setByteData(res.data);
        setOpenModal(true);

        setLoading(false);
      })
      .catch((err) => {
        addToast(err.message, { appearance: "error" });
        setLoading(false);
      });
    data.InvoiceCus = true;
    setinfoModal(data);
  }

  const columns = [
    { field: "id", headerName: "STT", width: 130, renderHeader: () => (<strong>{'STT'}</strong>), identity: true },
    { field: "mau_hd", headerName: "Mẫu số", headerAlign: "center", align: "left", width: 150, renderHeader: () => (<strong>{'Mẫu số'}</strong>) },
    { field: "inv_invoiceSeries", headerName: "Ký hiệu", headerAlign: "center", align: "left", width: 140, renderHeader: () => (<strong>{'Ký hiệu'}</strong>) },
    { field: "inv_invoiceNumber", headerName: "Số hóa đơn", headerAlign: "center", align: "left", type: "number", width: 160, renderHeader: () => (<strong>{'Số hóa đơn'}</strong>),
    
    renderCell: (params) => (
     <span style={{color:"#2c76ff"}}>{params.row.inv_invoiceNumber}</span>

    )
  
    },
    {
      field: "inv_invoiceIssuedDate", headerName: "Ngày hóa đơn", headerAlign: "center", align: "left", type: "date", width: 180, renderHeader: () => (<strong>{'Ngày hóa đơn'}</strong>),
      valueFormatter: (params) => {
        const valueFormatted = dateFormat(params.value, "dd/mm/yyyy");
        return valueFormatted;

      }
    },
    {
      field: "inv_TotalAmount", headerName: "Tổng tiền", type: "number", headerAlign: "center", align: "left", description: "", width: 150, renderHeader: () => (<strong>{'Tổng tiền'}</strong>)
      // sortable: false,
      // width: 160,
      // valueGetter: (params) =>
      //   `${params.getValue("firstName") || ""} ${
      //     params.getValue("lastName") || ""
      //   }`
    },
    {
      field: "action", headerName: "Action", headerAlign: "center", align: "left", width: 160, renderHeader: () => (<strong>{'Tải xuống'}</strong>),
      renderCell: (params) => (
        <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="fix_buttonXML"
          onClick={() => ClickDownloadXML(params)}

        >
          XML
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="fix_buttonPDF"
          onClick={() => ClickView(params)}

        >
          PDF
        </Button>
        </>
      )
    }
  ];




  const searchInvoiceList = () => {

    setLoadingButton(true);
    //gọi api

    if (props.user.isLoggedIn == false) {
      setLoadingButton(false);
      addToast("Bạn chưa đăng nhập!", { appearance: "error" });
      //đưa về trang chủ
      localStorage.removeItem("user");
      props.ContentBody(true);
      props.Logout();

      props.history.push({ pathname: '/', state: "mutiple" });

    }
    else {
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${props.user.user?.token}`
        }
      };
      // var settungay = convertDate(StateLookup.tu_ngay);
      var data_Lookup = {
        tu_ngay: dateFormat(StateLookup.tu_ngay, "yyyy-mm-dd"),
        den_ngay: dateFormat(StateLookup.den_ngay, "yyyy-mm-dd"),
        masothue: StateLookup.masothue,
        ma_dt: props.user.user.ma_dt
      };

      axiosInstance
        .post(url, data_Lookup, axiosConfig)
        .then((res) => {
          if (res.data.code == '00') {
            if (res.data.data != null) {
              if (res.data.data.data.length > 0) {

                var sortedObjs = res.data.data.data.sort((a, b) => Number(b.inv_invoiceNumber) - Number(a.inv_invoiceNumber));
                for (var i = 0; i < sortedObjs.length; i++) {
                  sortedObjs[i].id = i + 1;
                }
                setdata_rows(res.data.data.data);
                setLoadingButton(false);
              }
              else {
                setLoadingButton(false);
                addToast("Không tìm thấy hóa đơn trong khoảng ngày này!", { appearance: "error" });
              }
            }
            else{
              setLoadingButton(false);
              addToast("Không tìm thấy hóa đơn trong khoảng ngày này!", { appearance: "error" });
            }
          }

          // setOpenModal(true);
        })
        .catch((err) => {
          if(err.message.includes('Network')){
            addToast(err.message, { appearance: "error" });
            setLoadingButton(false);
          }
          else{
            if (err.response.status == 401) {
              setLoadingButton(false);
              localStorage.removeItem("user");
              props.ContentBody(true);
              props.Logout();
              addToast("Phiên đăng nhập hết hạn vui lòng đăng nhập lại!", { appearance: "error" });
              props.history.push({ pathname: '/', state: "mutiple" });
  
            }
            else {
              if (JSON.stringify(err).includes('message')) {
                addToast(err.message, { appearance: "error" });
                setLoadingButton(false);
              }
              else { addToast(err.message, { appearance: "error" }); setLoadingButton(false); }
            }
          }
          


        });
    }

  }

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (

    <div>
      {/* {isLoading ? <div className="modal fade fadeIn"><div className="fix_trans"> <FontAwesomeIcon className="spin_config" icon={faSync} size="3x" /></div> </div> : null} */}
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
      <div className="d-flex flex-column-fluid">
        <div className="container-invoice-list">
          <div className="card card-custom gutter-b">
            <div className="card-body p-0">
              <div className=" border-0 bgr-grid" >
                <div className="row tilte-grid">
                  {/* <div className="col-lg-1 col-md-1 col-sm-2 col-xs-2 text-right">
                    <span className="card-label font-weight-bolder text-white"> Thời gian</span>
                  </div> */}

                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 col-12 fix_tungay fix_mobe">
                    <div className="form-group">
                      {/* <label className="card-label font-weight-bolder text-white text-left" style={{ float: 'left', width: '100%' }}>Từ ngày</label> */}
                      <label onClick={e =>  e.preventDefault()} style={{ position: "relative", width: "100%" }}>
                      
                        <DatePicker
                          ref={datepickerRef}
                          placeholderText="Từ ngày"
                          selected={StateLookup.tu_ngay}
                          onChange={date => setStateLookup({ ...StateLookup, tu_ngay: date })}
                          dateFormat="dd/MM/yyyy"
                          showMonthDropdown
                          showYearDropdown
                          peekNextMonth
                          dropdownMode="select"
                          className="fix-picker"
                          shouldCloseOnSelect={true}
                        />
                      
                        <FontAwesomeIcon onClick={ ()=> datepickerRef.current.setOpen(true)} className="datepick_font" icon={faCalendarCheck} size="1x" />
                        
                      </label>
                      {/* <i className="fa fa-calendar" aria-hidden="true"></i> */}
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 col-12 fix_mobe">
                    <div className="form-group">
                      {/* <label className="card-label font-weight-bolder text-white text-left" style={{ float: 'left', width: '100%' }}>Đến ngày</label> */}
                      <label onClick={e =>  e.preventDefault()} style={{ position: "relative",width: "100%" }}>
                        <DatePicker
                          placeholderText="Đến ngày"
                          selected={StateLookup.den_ngay}
                          onChange={date => setStateLookup({ ...StateLookup, den_ngay: date })}
                          dateFormat="dd/MM/yyyy"
                          showMonthDropdown
                          showYearDropdown
                          peekNextMonth
                          dropdownMode="select"
                          className="fix-picker"
                          ref={datepickerRef2}
                        />
                        <FontAwesomeIcon onClick={ ()=> datepickerRef2.current.setOpen(true)} className="datepick_font" icon={faCalendarCheck} size="1x" />

                      </label>
                      {/* <i className="fa fa-calendar" aria-hidden="true"></i> */}
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 col-12 fix_search fix_mobe">
                    {isLoadingButton ?
                      // <Button  variant="contained" color="default" className=""><FontAwesomeIcon className="spin_config" icon={faSync} size="2x" /></Button>
                      <Button
                        style={{ opacity: 0.8 }}
                        variant="contained"
                        color="default"
                        className="button_search"
                        startIcon={<FontAwesomeIcon className="spin_config" icon={faSync} size="1x" />}
                      >
                        <strong> Tìm kiếm</strong>
                      </Button>
                      : <Button
                        onClick={() => searchInvoiceList()}
                        variant="contained"
                        color="default"
                        className="button_search"
                        startIcon={<SearchIcon />}
                      >
                        <strong> Tìm kiếm</strong>
                      </Button>
                    }
                    {/* <button name="" id="" onClick={() => searchInvoiceList()} className="btn btn-primary" role="button">Tìm kiếm</button> */}
                  </div>

                </div>
              </div>
              <div style={{ height: 400, width: '100%' }} >
                <DataGrid
                  
                  aria-label="Tra cứu"
                  pageSize={pageSize}
                  onPageSizeChange={handlePageSizeChange}
                  rowsPerPageOptions={[5, 10, 20, 30, 50, 100]}
                  rows={data_rows}
                  getRowId={(row) => row.id}
                  columns={columns}
                  ColumnMenuIcon
                  componentsProps={{
                    pagination: {
                      labelRowsPerPage: ('Số hóa đơn trên một trang'),
                      labelDisplayedRows: ({ from, to, count }) =>
                        `${from}-${to} trên ${count !== -1 ? count : ` ${to}`} hóa đơn`,
                      backIconButtonText: "Trang trước",
                      nextIconButtonText: "Trang sau"
                    }
                  }}

                  localeText={{
                    footerRowSelected: (count) =>
                      count !== 1
                        ? `${count.toLocaleString()} hóa đơn đã chọn`
                        : `${count.toLocaleString()} hóa đơn đã chọn`,
                  }}

                  // getRowClassName={(params) =>
                  //   `super-app-theme--${params.id%2 ? "chan" : "le"}`
                  // }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ExportModal
        open={openModal}
        hide={toggle}
        byteData={byteData}
        infoModal={infoModal}
      />
    </div>

  );


  // return (
  //     <div>
  //         <div className="text-center"><span style={{ fontSize: "40px", color: "#00fff3", fontWeight: "bold" }}>TRA CỨU HÀNG LOẠT HÓA ĐƠN</span></div>
  //         <div className="d-flex flex-column-fluid">
  //             <div className="container">
  //                 <div className="card card-custom gutter-b">
  //                     <div className="card-body p-0">


  //                     </div>
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
  // );

}
const mapStateToProps = (state) => ({
  user: state.user,

});

export default connect(mapStateToProps, { Logout, ContentBody })(withRouter(LookupEinvoice));


