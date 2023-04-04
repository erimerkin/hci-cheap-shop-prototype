import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function OrderConfirmationDialog({ isOpen, title, children, cancelAction, buttonAction, buttonLabel }) {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);

    React.useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])


    return (
        <React.Fragment>
            <Dialog
                fullWidth={fullWidth}
                maxWidth="lg"
                open={open}
                onClose={cancelAction}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelAction}>Cancel</Button>
                    <Button onClick={buttonAction}>{buttonLabel}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}