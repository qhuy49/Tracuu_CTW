import React, { useEffect, Component } from 'react';
import ContentBody from "./ContentBody";
// import { Logout } from '../action/Dispatch';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

const FixContentBody = (props) => {
   

    const show = props.show.show;

    return (
        <>
           { show ? <ContentBody /> : ""}
        </>
    );

}
const mapStateToProps = (state) => ({
    show: state.user,

});

export default connect(mapStateToProps, null)(withRouter(FixContentBody));