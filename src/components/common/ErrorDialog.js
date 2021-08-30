import React, {useEffect, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export default function ErrorDialog({isError}) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(isError)
    }, [isError])

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Ошибка при выполнении запроса"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Выполните запрос еще раз
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Ок
                </Button>
            </DialogActions>
        </Dialog>
    );
}
