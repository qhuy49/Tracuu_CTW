import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import GroupOptions from "./ModalOptions/GroupOptions";
import { DialogContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export default function ExportModal({ hide, open, byteData, infoModal }) {
  const classes = useStyles();
  const [scroll, setScroll] = React.useState("paper");
  const file = new Blob([byteData], {
    type: "application/pdf",
  });
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const fileURL = URL.createObjectURL(file);
  return (
    <div className="container-fluid ">
      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        open={open}
        onClose={hide}
        scroll={"paper"}
        className=" fix-dialog "
      >
        <AppBar className={classes.appBar}>
          <Toolbar style={{ paddingRight: "20px," }}>
            {" "}
            <IconButton
              edge="start"
              color="inherit"
              onClick={hide}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            &nbsp;&nbsp;Hóa đơn điện tử M-Invoice
          </Toolbar>
        </AppBar>
        <DialogContent dividers={scroll === "paper"} className="overflow-auto">
          <List className="row h-100">
            <div className="col-2 col-sm-12 col-xs-12 col-md-3">
              <div className="align-items-center justify-content-between">
                <span className="fix-center-text line-fix">THÔNG TIN HÓA ĐƠN</span>
              </div>
              <div>
                <GroupOptions data={infoModal} />
              </div>
            </div>
            <div className="col-10 col-sm-12 col-xs-12 col-md-9 ">
              <iframe
                style={{ width: "100%", height: "95%" }}
                src={fileURL}
              ></iframe>
            </div>
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
