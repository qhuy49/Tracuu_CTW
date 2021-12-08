import React, { useEffect, Component } from "react";
import { useParams, useLocation } from "react-router-dom";
//import SearchByFile from "./SearchByFile";
import { SearchByFiles } from "./SearchByFiles";

import SearchMutipleInvoice from "./SearchMutipleInvoice";
import { SearchOneInvoice } from "./SearchOneInvoice";

export default function SearchInvoiceBody(props) {
  const params = useParams();
  const jpram = useLocation().search;
  const jh = new URLSearchParams(jpram);
  var ms = jh.get("mst");
  var mS = jh.get("MST");
  var sbm = jh.get("sobaomat");
  var mst = "";

  if (ms == null) {
    mst = mS;
  } else {
    mst = ms;
  }

  return (
    <div className="justify-content-center fix-display">
      {/* {props.Click == "sigle" ? (
        <SearchOneInvoice _mst={mst} _sbm={sbm} />
      ) : (
        <SearchMutipleInvoice userClick={props.userClick} />
      )} */}
      {props.Click == "sigle" ? (<SearchOneInvoice _mst={mst} _sbm={sbm} />) : (
        props.Click == "mutiple" ? (<SearchMutipleInvoice userClick={props.userClick} />) :
          (<SearchByFiles />))}
    </div>
  );
}
