// import * as React from 'react';
import axios from 'axios';
// import "./../app.css";
import io from 'socket.io-client';
import { useState, useEffect, useRef } from "react";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const dev = 'http://localhost:5000';
const baseURL = window.location.hostname.split(':')[0] === 'localhost' ? dev : "";
function User() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`${baseURL}/api/v1/posts?page=0`)
            .then((res) => {
                console.log("res +++: ", res.data);
                setPosts(res.data)
                console.log(posts)

            })
    }, [])
    useEffect(() => {
        const socket = io(""); // to connect with locally running Socker.io server

        socket.on('connect', function () {
            console.log("connected to server")
        });
        socket.on('disconnect', function (message) {
            console.log("disconnected from server: ", message);
        });
        socket.on('POSTS', function (data) {
            console.log(data);
            setPosts((prev) => [data, ...prev])        
        });

        return () => {
            socket.close();
        };
    }, []);
    return (
        <>
            <Grid container spacing={2} alignItems="center" wrap="wrap" textAlign='center' padding='2%' marginTop="4%" justifyContent="center" >
                <Grid>
                    {/* <h1 style={{color: "#2196f3"}}>Welcome Cricket Dashboard</h1> */}
                    <TableContainer component={Paper} className="bgImg">
                        <Table sx={{ minWidth: 320 }} aria-label="simple table">
                            <TableHead>
                                <TableRow bgcolor="#2196f3">
                                    <TableCell colSpan="4"  className="tableColor2">{posts[0]?.tournament}</TableCell>
                                    {/* <TableCell align="right"></TableCell> */}
                                    <TableCell align="right" colSpan="1"  className="tableColor2">Date:{posts[0]?.tournamentDate}</TableCell>
                                </TableRow>
                                
                                <TableRow>
                                    <TableCell className="tableColor" align="right">{posts[0]?.teamA}</TableCell>
                                    <TableCell className="tableColor1" align="left">{posts[0]?.teamARun}/{posts[0]?.teamAWkt} <br />({posts[0]?.teamAOvr})</TableCell>
                                    <TableCell className="tableColor" align="right"><br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>VS</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TableCell>
                                    <TableCell className="tableColor" align="right">&nbsp;&nbsp;&nbsp;&nbsp;{posts[0]?.teamB}</TableCell>
                                    <TableCell className="tableColor1" align="left">{posts[0]?.teamBRun}/{posts[0]?.teamBWkt} <br />({posts[0]?.teamBOvr})</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell className="tableColor1">Team A Batting</TableCell>
                                    <TableCell className="tableColor1" align="right"></TableCell>
                                    <TableCell className="tableColor1" align="right"></TableCell>
                                    <TableCell className="tableColor1" align="right"></TableCell>
                                    <TableCell className="tableColor1" align="right">Team B Bowling</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="tableColor1" >{posts[0]?.batsmanA} &nbsp;&nbsp;&nbsp; {posts[0]?.batsmanARun}({posts[0]?.batsmanABall})*</TableCell>
                                    <TableCell className="tableColor1" align="left"></TableCell>
                                    <TableCell className="tableColor1" align="right"></TableCell>
                                    <TableCell className="tableColor1" align="right"> </TableCell>
                                    <TableCell className="tableColor1" align="right"> {posts[0]?.bowlerB} &nbsp;&nbsp;&nbsp; {posts[0]?.bowlerBW}/{posts[0]?.bowlerBRun}({posts[0]?.bowlerBOver})</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="tableColor1" >{posts[0]?.batsmanB} &nbsp;&nbsp;&nbsp; {posts[0]?.batsmanBRun}({posts[0]?.batsmanBBall})*</TableCell>
                                    <TableCell className="tableColor1" align="left"></TableCell>
                                    <TableCell className="tableColor1" align="right"></TableCell>
                                    <TableCell className="tableColor1" align="right"></TableCell>
                                    <TableCell className="tableColor1" align="right">{posts[0]?.bowlerC} &nbsp;&nbsp;&nbsp; {posts[0]?.bowlerCW}/{posts[0]?.bowlerCRun}({posts[0]?.bowlerCOver})</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="tableColor1" align="center" colSpan="5">Description:{posts[0]?.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="tableColor1" align="center" colSpan="5">Comentary:{posts[0]?.commentary} {posts[0]?.teamBRun}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="tableColor1" align="center" colSpan="5">{posts[0]?.teamA} need to {(parseInt(posts[0]?.teamBRun)+1)-(posts[0]?.teamARun)} runs</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
}

export default User;

