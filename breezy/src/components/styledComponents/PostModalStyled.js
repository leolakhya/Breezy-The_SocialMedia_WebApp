import styled from 'styled-components';
import {CameraAltOutlined} from "@mui/icons-material";
import {styled as muiStyled} from '@mui/system'
import Button from "@mui/material/Button";
import {Input} from "@mui/material";
import Dialog from "@mui/material/Dialog";
export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
  transition: transform 150ms ease-out;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  z-index: 999;
  transition: all 300ms ease-out;
  border-radius: 5px;
  width: 400px;
`;

export const Camera = styled(CameraAltOutlined)`
  height: 1.75rem !important;
  width: 1.5rem !important;
  color: rgb(16, 30, 47);
  cursor: pointer;
  margin-top: 10px;
  text-align: center;
`;

export const Header = styled.div`
  margin:10px;
  display: grid;
  grid-template-columns: repeat(1 minmax(0, 1fr));
  .div {
    margin-top: 10px;
    border-radius: 99999px;
    background-color: rgba(220, 98, 80, 1);
    cursor: pointer;
  }
  .div img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .container {
    width: 100%;
    img {
      width: 100%;
      object-fit: contain;
      cursor: pointer;
    }
  }
`

export const Caption = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`
export const StyledInput = muiStyled(Input)({
    fontWeight: 'bold',
    fontSize: '15px',
    flex: 1,
    padding: '10px',
    width:'100%',
    textAlign: 'center',
    ':focus' :
        {
            transition: 'all 0.3s ease-out',
        }
})



export const StyledButton = muiStyled(Button)({
    padding:'10px 0',
    margin: '30px',
    borderRadius: '20px',
    border:'none',
    backgroundColor:'rgb(55,93,130)' ,
    color:'white',
    pointer:'pointer',
    '.MuiButton-label':{
        fontSize:'15px',
        fontWeight:'bold'
    },
    ':hover':{
        transform:'scale(1.1)',
        transition:'all 0.3s ease-in-out',
        backgroundColor:'rgb(55,93,130)',
        color:'white',
        endIcon:{
            color:'white'
        }
    }

})


export const StyledPicButton = muiStyled(Button)({
    padding:'10px 0',
    margin: '30px',
    width:'30%',
    borderRadius: '20px',
    border:'none',
    backgroundColor:'rgb(55,93,130)' ,
    color:'white',
    pointer:'pointer',
    '.MuiButton-label':{
        fontSize:'15px',
        fontWeight:'bold'
    },
    ':hover':{
        transform:'scale(1.1)',
        transition:'all 0.3s ease-in-out',
        backgroundColor:'rgb(55,93,130)',
        color:'white',
        endIcon:{
            color:'white'
        }
    }

})

export const BootstrapDialog = muiStyled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));