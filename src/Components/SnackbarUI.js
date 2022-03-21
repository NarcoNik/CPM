import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Slide from "@mui/material/Slide";
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";
// import "../App.css";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default function SnackbarUI({
    data: { open, text, type },
    closeSnackbar,
}) {
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={closeSnackbar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const icon = (
        <React.Fragment>
            {type === "pending" ? (
                <CircularProgress
                    sx={{
                        height: "30px",
                        marginRight: "20px",
                    }}
                    color="success"
                    style={{
                        height: "20px",
                        width: "20px",
                    }}
                />
            ) : type === "success" ? (
                <DoneIcon
                    color="success"
                    sx={{
                        height: "30px",
                        marginRight: "20px",
                    }}
                />
            ) : (
                type === "error" && (
                    <ErrorIcon
                        sx={{
                            color: "#cd2525",
                            height: "30px",
                            marginRight: "20px",
                        }}
                    />
                )
            )}
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                className="snackbar"
                sx={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                }}
                open={open}
                autoHideDuration={6000}
                TransitionComponent={SlideTransition}
                onClose={closeSnackbar}
                message={
                    <>
                        {icon}
                        {text}
                    </>
                }
                action={action}
            />
        </div>
    );
}
