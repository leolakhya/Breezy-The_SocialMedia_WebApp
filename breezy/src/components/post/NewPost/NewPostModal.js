import React, {useEffect, useRef, useState} from 'react'
import { IconButton,  Tooltip} from "@mui/material";
import PropTypes from 'prop-types';
import {
    BootstrapDialog, BootstrapInput,
    Camera,
    Caption,
    Container,
    Header,
    StyledButton,
    Wrapper
} from "../../styledComponents/PostModalStyled";
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import {AddOutlined} from "@mui/icons-material";
import {createNewPost} from "../../../features/action/postAction";
import {useDispatch, useSelector} from "react-redux";
import ErrorSnackbar from "../../styledComponents/error-message/ErrorMessage";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}  />;
});

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
   <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
    {children}
    {onClose ? (
        <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
        >
            <CloseIcon />
        </IconButton>
    ) : null}
</DialogTitle>
    )}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const Modal = ({
    fetchAgain,
    setFetchAgain
               }) => {
    const [input, setInput] = useState('');
    const filePicker = useRef(null)
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [openE, setOpenE] = useState(false);
    const [openS, setOpenS] = useState(false);
    const {loading : addPostLoading, error:addPostError, message:successMessage} = useSelector((state) => state.like);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const selectedPhoto = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            reader.onload = (readerEvent) => {
                setSelected(readerEvent.target.result)
            }
        }
    }




    const submit = (e) => {
        e.preventDefault()
        dispatch(createNewPost(input, selected));
    };

    useEffect(() => {
        if (addPostError) {
            setOpenE(true)
            setError(addPostError)
        }
        if (successMessage) {
            setFetchAgain(!fetchAgain)
            handleClose()
            setOpenS(true)
            setSuccess(successMessage)
        }
    }, [addPostError,successMessage,setFetchAgain,fetchAgain]);



    return (
        <div>

                <div style={{display: "flex", justifyContent: "center"}}>
                    <Tooltip title="Add a photo">
                <IconButton  onClick={handleClickOpen}>
                    <AddOutlined/>
                </IconButton>
                    </Tooltip>
                </div>

        <BootstrapDialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            aria-labelledby="customized-dialog-title"
        >

            <Container>
                <Wrapper>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}/>
                <Header>
                    {selected ? (
                        <div className={"container"}>
                            <img
                                src={selected}
                                onClick={() => filePicker.current.click()}
                                alt={"selected"}
                            />
                        </div>
                    ) : (

                            <IconButton onClick={() => filePicker.current.click()}>
                                <Camera/>
                            </IconButton>
                        )}
                    <input type={"file"}
                           accept={".jpg,.png,.jpeg"}
                           hidden={true}
                           onChange={selectedPhoto}
                           ref={filePicker}
                    />
                </Header>
                <Caption>
                    <BootstrapInput
                        fullWidth
                        type={"text"}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={"Captions"}
                    />
                    <StyledButton
                        disabled={!selected}
                        variant={"contained"}
                        type={"submit"}
                        onClick={submit}
                    >
                        {addPostLoading ? "Submitting" : "Submit"}
                    </StyledButton>
                </Caption>
            </Wrapper>
        </Container>
        </BootstrapDialog>
            <ErrorSnackbar
                open={openE}
                openS={openS}
                error={error}
                success={success}
                setOpenE={setOpenE}
                setOpenS={setOpenS}
            />
        </div>
    )
}
export default Modal;