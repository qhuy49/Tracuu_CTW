import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../helper/axio";
import { useToasts } from "react-toast-notifications";
import ExportModal from "../ExportModal";
// import CircularProgress from "@material-ui/core/CircularProgress";
import LoadingOverlay from 'react-loading-overlay';
import { TextEncoder, TextDecoder, EncodingIndexes, getEncoding } from 'text-decoding';

export const SearchOneInvoice = ({ _mst, _sbm }) => {
  const url = "Search/SearchInvoice";
  const { register, handleSubmit } = useForm({
    defaultValues: { masothue: _mst, sobaomat: _sbm },
  });
  const [openModal, setOpenModal] = React.useState(false); // Trạng thái mở Modal
  const { addToast } = useToasts(); // trạng thái hiển thị cảnh báo
  const [byteData, setByteData] = React.useState(undefined); // Dữ liệu truyền sang modal
  const [infoModal, setinfoModal] = React.useState(undefined); // Dữ liệu truyền sang modal

  const [isLoad, setisLoad] = React.useState(false); // Trạng thái mở Modal

  function toggle() {
    setOpenModal(!openModal);
  }
  const onSubmit = (data) => {
     var a = "1701675884";
    // var a = "0106026495888";
    var b = a.replace(/\s+/g, '');
    var json = {
      "masothue": b,
      "sobaomat": data.sobaomat,
      "type": "pdf"
    }
    if (b.length < 10 || b === null) {
      addToast("Vui lòng nhập hoặc kiểm tra lại mã số thuế bên bán!", {
        appearance: "error",
      });
    } else {
      if (data.sobaomat.length < 3 || data.sobaomat === null) {
        addToast("Vui lòng nhập số bảo mật!", { appearance: "error" });
      } else {
        setinfoModal(json);
        setisLoad(true);
        axiosInstance
          .post(url, json, { responseType: "arraybuffer" })
          .then((res) => {
            var check = res.headers["content-type"];
            if (check == "application/pdf") {
              setByteData(res.data);
              setisLoad(false);
              setOpenModal(true);
            } else {
              setisLoad(false);
              setOpenModal(false);
              const decoded = new TextDecoder('utf-8').decode(res.data);
              if(decoded != null){
                 addToast(decoded, { appearance: "error" });
              }
              else{
                addToast("Không tìm thấy hóa đơn! Vui lòng kiểm tra lại thông tin!", { appearance: "error" });
              }
             
            }
          })
          .catch((err) => {
            setisLoad(false);
            setOpenModal(false);
            if (err.response) {
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
            }
            addToast(err.message, { appearance: "error" });
          });
      }
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="form-input">
            <span>Mã số thuế bên bán:</span>
            <input
              type="text"
              name="masothue"
              className="form-control fix-form-input"
              placeholder="Mã số thuế bên bán:"
              ref={register}
            />
          </div> */}
          <div className="form-input">
            <span>Số bảo mật:</span>
            <input
              type="text"
              name="sobaomat"
              className="form-control fix-form-input"
              placeholder="Số bảo mật"
              ref={register}
            />
          </div>
          <div className="text-center">
            <button
              className=" btn btn-primary mt-4 signup align-items-center justify-content-center"
              type="submit"
            >
              Tra cứu
            </button>
          </div>
        </form>
      </div>
      <ExportModal
        open={openModal}
        hide={toggle}
        byteData={byteData}
        infoModal={infoModal}
      />
      {/* {isLoad && (
        <div className="text-center">
          <CircularProgress />
        </div>
      )} */}
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
  );
};
