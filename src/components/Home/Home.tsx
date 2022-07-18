import React, {useState} from 'react'
import { styled } from '@mui/system'
import { Button, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import hero_image from '../../assets/images/marvel-characters.webp'
import { getAuth } from 'firebase/auth'
import { GoogleButton } from '../Signin'
import { useNavigate } from "react-router-dom";

interface Props{
    title:string;
}

const Root = styled("div")({
    padding:0,
    margin:0
})

const NavbarContainer = styled("div")({
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
})

const Logo = styled('h1')({
    margin: '0 0 0 0.45em'
})
const LogoA = styled(Link)( {
    color: 'rgb(28,24,22)',
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none'
})
const LogoNavigation = styled('ul')( {
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'flex'
})

const NavA = styled(Link)({
    display: 'block',
    padding: '1em',
    color: 'black'
})

const Main = styled('main')( {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero_image});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute',
})

const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})

export const Home = (props:Props) =>{
    const auth = getAuth();

    const[open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSnackOpen = () =>{
        setOpen(true)
        setTimeout(()=> navigate('/dashboard'),3000)
    }

    return(
        <Root>
            <NavbarContainer>
                <Logo>
                    <LogoA to='/'>Bootleg Marvel Wiki</LogoA>
                </Logo>
                <LogoNavigation>                      
                    <li>
                        <NavA to='/dashboard'>Dashboard</NavA>
                    </li>
                    <li>
                        <GoogleButton onClick={handleSnackOpen}/>
                    </li>
                </LogoNavigation>
            </NavbarContainer>
            <Main>
                <MainText>
                    <h1>{props.title}</h1>
                    <p>All Your Favorites!</p>
                    <Button color = 'secondary' variant = 'contained'>View the Catalogue</Button>
                </MainText>
            </Main>
        </Root>
    )
}
