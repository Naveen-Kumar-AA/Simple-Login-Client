import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";

const Home = () => {
    const navigate = useNavigate();
    const [result,setResult] = useState("");
    const handleGetReq = async () => {
        try {
            const res = await axios.get('http://localhost:3001/', {
                headers : {
                    'Authorization' :  `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            setResult(res.data);
            console.log(res);
        } catch(err) {
            console.log(err);
        }
    }

    const handleLogout = async ()=>{
        try {
            const res = await axios.post('http://localhost:3001/logout', `
                <xml>
                    <username>${sessionStorage.getItem('username')}</username>
                </xml>`, {
                headers: {
                'Content-Type': 'application/xml',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });


            if(res.data.message === 'Session deleted.'){
                navigate('/');
                console.log("Logout successful.");
            }
            else{
                console.log('some error occured while logging out, please try again.');
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        // <div>
        //     <Button variant="contained" onClick={handleGetReq}>Sample Get Req</Button> 
        //     <Paper elevation={3}>
        //         <Typography variant="body1">{result}</Typography>
        //     </Paper>
        //     <Button variant="contained" onClick={handleLogout}>Logout</Button> 
        // </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
  <Button variant="contained" onClick={handleGetReq} style={{margin: '10px'}}>Attempt Request</Button> 
  <Paper elevation={3} style={{margin: '10px', padding: '10px', width: '60%'}}>
    <Typography variant="body1" style={{textAlign: 'center'}}>{result}</Typography>
  </Paper>
  <Typography variant="caption" style={{margin: '10px', textAlign: 'center', color: 'grey'}}>You can send request only if you are logged in. Give it a try!</Typography>
  <Button variant="contained" onClick={handleLogout} style={{margin: '10px'}}>Logout</Button> 
</div>


    );
}


export default Home;