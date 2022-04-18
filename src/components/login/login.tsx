import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loginActionCreators} from "../../actions/index";
import {RootStore} from '../../store'
import { useLocation, useNavigate } from 'react-router-dom';
import {NFT} from "../../constants/constants";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 0px 30px #0000001A',
    borderRadius: '10px',
    p: 5,
    background: 'white',
    width: '30%',
};

interface ILoginData {
    email: string,
    password: string
}

const initialState : ILoginData = {
    email: "",
    password: ""
}

export default function Login() {

    const [loginData, setLoginData] = useState(initialState)
    const dispatch = useDispatch();
    const { loginUser } = bindActionCreators(loginActionCreators, dispatch);
    const loginDatanew = useSelector((state: RootStore) => state.login);
    const navigate = useNavigate();


    if(loginDatanew && loginDatanew.user && loginDatanew.user.user && loginDatanew.user.token) {
        navigate(`/${NFT}/home-page`);
    }

    const authenticate = () => {
        loginUser(loginData.email, loginData.password)
    }

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    return (
        <>
            <Box sx={style}>
                <Box flexGrow={1} sx={{color: '#237efc'}}>
                    <Typography variant="h4" fontWeight={"bold"}>
                        Login to your account
                    </Typography>
                </Box>
                <Box flexGrow={1} sx={{marginTop: '35px'}} display={"flex"}>
                    <Typography variant="subtitle2" fontWeight={"bold"} sx={{marginRight: '15px', marginTop: '10px'}}>
                        username
                    </Typography>
                    <TextField label="username" name={"email"} onChange={handleInputChange} variant="outlined" size="small" fullWidth/>
                </Box>
                <Box flexGrow={1} sx={{marginTop: '20px'}} display={"flex"}>
                    <Typography variant="subtitle2" fontWeight={"bold"} sx={{marginRight: '15px', marginTop: '10px'}}>
                        password
                    </Typography>
                    <TextField label="password" name={"password"} onChange={handleInputChange} variant="outlined" size="small" fullWidth type="password"/>
                </Box>
                <Box display={'flex'} sx={{justifyContent: 'end', marginTop: '20px'}}>
                    <Button variant="contained" onClick={authenticate}>Login</Button>
                </Box>
            </Box>
        </>
    );
}
