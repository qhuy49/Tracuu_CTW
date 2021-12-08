import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Moment  from 'moment';


const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  table: {
    minWidth: 650,
  },
}));

export default function PopupKH({ openKH, dataKH, onHide }) {
  const classes = useStyles();
  const [maxWidth, setMaxWidth] = React.useState("xl");
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        open={openKH}
        onClose={onHide}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Thông tin khách hàng
        </DialogTitle>
        <br />
        <DialogContent>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size="small"
              aria-label="a dense table"
            >
              <TableHead className="font-weight-bold" style={{backgroundColor : "#ebc610"}}>
                <TableRow >
                  <TableCell align="center">Tên C.ty</TableCell>
                  <TableCell align="center">Địa chỉ</TableCell>
                  <TableCell align="center">Mã số thuế</TableCell>
                  <TableCell align="center">Cơ quan thuế Q.lý</TableCell>
                  <TableCell align="center">Cơ quan thuế cấp tỉnh</TableCell>
                  <TableCell align="center">Ngày thành lập</TableCell>
                  <TableCell align="center">Người đại diện</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataKH && dataKH.length > 0 && dataKH.map((row,index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.ten_cty}</TableCell>
                    <TableCell align="center">{row.dia_chi}</TableCell>
                    <TableCell align="center">{row.ma_so_thue}</TableCell>
                    <TableCell align="center">{row.cqthue_ql}</TableCell>
                    <TableCell align="center">{row.cqthuecap_tinh}</TableCell>
                    <TableCell align="center">{Moment(row.ngay_thanh_lap).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="center">{row.nguoi_dai_dien}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onHide();
            }}
            color="primary"
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
