import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars(props) {
    return (
        <div >
            {props.open ? <Snackbar
                open={props.open}
                autoHideDuration={3000}
                onClose={props.handleClose}
            >
                <Alert onClose={props.handleClose} severity={props.type}>
                    {props.message}
                </Alert>
            </Snackbar> : null}
        </div>
    );
}
