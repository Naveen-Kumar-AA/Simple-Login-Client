import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Signup = () => {

    const navigate = useNavigate();

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errorMsg, setErrMsg] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:3001/signup',{
                username,
                password,
            })
            if(response.status === 200) {
                sessionStorage.setItem('username',username);
                sessionStorage.setItem('token',response.data.token);
                sessionStorage.setItem('sessionId',response.data.sessionId);
                navigate('/home');
              }
              else {
                setErrMsg("Failed to signup, please try again.")
              }
        } catch(err) {
            console.log(err);
            setErrMsg("An error occured, please try again.")
        }
    }

    const handleLogin = () => {
        navigate('/');
    }

    return (
        // <div>
        //     <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>setUsername(e.target.value)}/>
        //     <br></br>
        //     <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>setPassword(e.target.value)}/>
        //     <br></br>
        //     <Button variant="contained" onClick={handleSignup}>SignUp</Button>
        //     <br></br>
        //     <Button variant="contained" onClick={handleLogin}>Login</Button>
        // </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <div style={{margin: '10px', border: '1px solid grey', borderRadius: '10px', padding: '20px'}}>
                <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e)=>setUsername(e.target.value)} style={{margin: '10px'}} />
                <br />
                <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e)=>setPassword(e.target.value)} style={{margin: '10px'}} />
                <br />
                <Button variant="contained" onClick={handleSignup} style={{margin: '10px'}}>SignUp</Button>
                <br />
                <Button variant="contained" onClick={handleLogin} style={{margin: '10px'}}>Login</Button>
                {errorMsg !== '' && (
                <div style={{margin: '10px', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '10px'}}>
                    <Typography variant="caption" style={{color: '#721c24'}}>
                    {errorMsg}
                    </Typography>
                </div>
                )}
            </div>
        </div>

    );
}


export default Signup;