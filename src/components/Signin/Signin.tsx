import React, {useState} from "react";
import { FirebaseApp } from "firebase/app";
import { useSigninCheck } from "reactfire";
import { useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import{
    Container,
    Button,
    Typography,
    Snackbar,
    Alert as MUIAlert,
    AlertTitle,
    AlertProps,
    CircularProgress
} from '@mui/material'
import { useNavigate } from "react-router-dom";
import { Input } from "../sharedComponents";

const signinStyles = {
    googleButton: {
        backgroundColor: 'rgb(66,133,244)',
        margin: '2em',
        padding: '0',
        color: 'white',
        width: '240px',
        border: 'none',
        textAlign:'center',
        boxShadow: 'rgb(0 0 0 /25%) 0px 2px 4px 0px',
        fontSize: '16px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px',
        fontFamily: 'Roboto, arial, sans-serif',
        cursor: 'pointer'
    },
    googleLogo:{
        width: '48px',
        height: '48px',
        display: 'block',
    },
    typographyStyle: {
        fontFamily: 'Roboto, arial, sans-serif',
        textAlign: 'center',
        fontSize: '2em'
    },
    snackBar: {
        color: 'white',
        backgroundColor: '#4caf50'
    }
}

export const Alert = (props:AlertProps) => {
    return <MUIAlert elevation={6} variant='filled' />
}

interface ButtonProps{
    open?: boolean;
    onClick: () => void
}

export const GoogleButton=(props: ButtonProps) =>{
    const navigate=useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [signInWithGoogle, user, loading, error ] = useSignInWithGoogle(auth);

    onAuthStateChanged(auth, (user)=>{
        if (user){
            console.log(user.email)
        }
    })

    const signIn = async () =>{
        await signInWithGoogle();
        navigate('/dashboard')
    }

    const signUsOut = async () =>{
        await signOut(auth)
        navigate('/')
    }

    if(loading){
        return <CircularProgress />
    }
    if (auth.currentUser){
        return <Button variant='contained' color='secondary' onClick={(signUsOut)}>Sign Out</Button>
    } else {
        return <Button sx={signinStyles.googleButton} onClick={signIn}>Sign In With Gooogle</Button>
    }
}

export const Signin =() =>{
    const[open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSnackOpen = () =>{
        setOpen(true)
        setTimeout(()=> navigate('/dashboard'),3000)
    }

    return(
        <Container maxWidth='sm' sx={{marginTop: '2em'}}>
            <Typography sx={signinStyles.typographyStyle}>
                Pleas Sign In
            </Typography>
            <GoogleButton onClick={handleSnackOpen}/>
            <Snackbar message='success' open={open} autoHideDuration={3000}>
                    <Alert severity='success'>
                        <AlertTitle> Successful Sign In --- Redirect in 3 Secconds</AlertTitle>
                    </Alert>
            </Snackbar>
        </Container>
    )
}