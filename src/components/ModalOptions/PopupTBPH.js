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

export default function PopupTBPH({ open, data, onHide }) {
  const classes = useStyles();
  const [maxWidth, setMaxWidth] = React.useState("xl");
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        open={open}
        onClose={onHide}
        aria-labelledby="max-width-dialog-title"
        
      >
        <DialogTitle id="max-width-dialog-title">
          Thông báo phát hành
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
                  <TableCell align="center">Ngày thông báo</TableCell>
                  <TableCell align="center">Số thông báo</TableCell>
                  <TableCell align="center">Ngày bắt đầu SD</TableCell>
                  <TableCell align="center">Mẫu số</TableCell>
                  <TableCell align="center">Ký hiệu</TableCell>
                  <TableCell align="center">Số lượng</TableCell>
                  <TableCell align="center">Từ số</TableCell>
                  <TableCell align="center">Đến số</TableCell>
                  <TableCell align="center">Tại đơn vị</TableCell>
                  <TableCell align="center">Mst đơn vị</TableCell>
                  {/* <TableCell align="center">Số đặt in</TableCell>
                  <TableCell align="center">Ngày đặt in</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {data && data.data.length > 0 && data.data.map((row,index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.no}</TableCell>
                    <TableCell align="center">{Moment(row.dataUsing).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="center">{row.formNo}</TableCell>
                    <TableCell align="center">{row.symbol}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.from}</TableCell>
                    <TableCell align="center">{row.to}</TableCell>
                    <TableCell align="center">{row.providerName}</TableCell>
                    <TableCell align="center">{row.providerTax}</TableCell>
                    {/* <TableCell align="center">{Moment(row.dateConvert).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="center">{Moment(row.dataUsingConvert).format('DD/MM/YYYY')}</TableCell> */}
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
