// import * as React from 'react';
import axios from 'axios';
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

            })
    }, [])
    useEffect(() => {
        const socket = io("http://localhost:5000"); // to connect with locally running Socker.io server

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
            <Grid container spacing={2} alignItems="center" textAlign='center' padding='2%' justifyContent="center">
                <Grid item xs={11} sm={10} md={9} lg={8}>
                    <h1>Welcome Cricket Dashboard</h1>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan="2">{posts[0]?.tournament}</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right" colSpan="2">Date:{posts[0]?.tournamentDate}</TableCell>
                                </TableRow>
                                <TableRow>
                                {/* <img src="https://cdn3.vectorstock.com/i/thumb-large/29/97/isolated-cricket-bat-and-ball-vector-25562997.jpg" alt="Logo" width="40%"/> */}
                                    <TableCell>{posts[0]?.teamA}</TableCell>
                                    <TableCell align="left">{posts[0]?.teamARun}/{posts[0]?.teamAWkt} <br />({posts[0]?.teamAOvr})</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">{posts[0]?.teamB}</TableCell>
                                    <TableCell align="center">{posts[0]?.teamBRun}/{posts[0]?.teamBWkt} <br />({posts[0]?.teamBOvr})</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell>Team A Batting</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">Team B Bowling</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >{posts[0]?.batsmanA}</TableCell>
                                    <TableCell align="left">{posts[0]?.batsmanARun}({posts[0]?.batsmanABall})*</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">{posts[0]?.bowlerB}</TableCell>
                                    <TableCell align="right">{posts[0]?.bowlerBW}/{posts[0]?.bowlerBRun}({posts[0]?.bowlerBOver})</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >{posts[0]?.batsmanB}</TableCell>
                                    <TableCell align="left">{posts[0]?.batsmanBRun}({posts[0]?.batsmanBBall})*</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">{posts[0]?.bowlerC}</TableCell>
                                    <TableCell align="right">{posts[0]?.bowlerCW}/{posts[0]?.bowlerCRun}({posts[0]?.bowlerCOver})</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" colSpan="5">Description:{posts[0]?.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" colSpan="5">Comentary:{posts[0]?.commentary} {posts[0]?.teamBRun}</TableCell>
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

