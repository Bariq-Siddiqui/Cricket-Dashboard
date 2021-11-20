import axios from 'axios';
import Grid from '@mui/material/Grid';
import io from 'socket.io-client';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import { useState, useEffect, useRef } from "react";
import { red,blue,purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
const dev = 'http://localhost:5000';
const baseURL = window.location.hostname.split(':')[0] === 'localhost' ? dev : ""
function Admin() {
    const [posts, setPosts] = useState([]);
    // const [score, setScore] = useState({
    //     tournament:""
    // });
    useEffect(() => {
        axios.get(`${baseURL}/api/v1/posts?page=0`)
            .then((res) => {
                console.log("res +++: ", res.data);
                setPosts(res.data)
                // setScore(res.data.tournament)

            })
    }, [])
    useEffect(() => {
        const socket = io(); // to connect with locally running Socker.io server

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
    const formik = useFormik({
        initialValues:{
            tournament: "",
            tournamentDate: "",
            teamA: "",
            teamARun: "",
            teamAOvr: "",
            teamAWkt: "",
            batsmanA: "",            
            batsmanARun: "",
            batsmanABall: "",
            batsmanB: "",
            batsmanBRun: "",
            batsmanBBall: "",
            teamB: "",
            teamBRun: "",
            teamBWkt: "",
            teamBOvr: "",
            bowlerB: "",
            bowlerBW: "",
            bowlerBRun: "",
            bowlerBOver: "",
            bowlerC: "",
            bowlerCW: "",
            bowlerCRun: "",
            bowlerCOver: "",
            description: "",
            commentary: ""
        },
        onSubmit: onSubmitFunction
    })
    function onSubmitFunction(values){
            axios.post(`${baseURL}/api/v1/post`, {
                tournament: values.tournament,
                tournamentDate: values.tournamentDate,
                teamA: values.teamA,
                teamARun: values.teamARun,
                teamAOvr: values.teamAOvr,
                teamAWkt: values.teamAWkt,
                batsmanA: values.batsmanA,
                batsmanARun: values.batsmanARun,
                batsmanABall: values.batsmanABall,
                batsmanB: values.batsmanB,
                batsmanBRun: values.batsmanBRun,
                batsmanBBall: values.batsmanBBall,
                teamB: values.teamB,
                teamBRun: values.teamBRun,
                teamBWkt: values.teamBWkt,
                teamBOvr: values.teamBOvr,
                bowlerB: values.bowlerB,
                bowlerBW: values.bowlerBW,
                bowlerBRun: values.bowlerBRun,
                bowlerBOver: values.bowlerBOver,
                bowlerC: values.bowlerC,
                bowlerCW: values.bowlerCW,
                bowlerCRun: values.bowlerCRun,
                bowlerCOver: values.bowlerCOver,
                description: values.description,
                commentary: values.commentary
            })
                .then((res) => {
                    console.log("res: ", res.data);
                    alert("post created");

            })
    }
    return (
        <>
            <Grid container spacing={2} alignItems="center" textAlign='center' padding='2%' justifyContent="center">
                <Grid item xs={11} sm={10} md={9} lg={8}>
                    <h1 style={{color: "purple"}}> Admin Panel </h1>
                    <form onSubmit={formik.handleSubmit}>
                        
                        
                        
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Tournament Name"
                            variant="standard"
                            type = "TextField"
                            name="tournament"
                            value={formik.values.tournament}
                            onChange={formik.handleChange}

                            error={formik.touched.tournament && Boolean(formik.errors.tournament)}
                            helperText={formik.touched.tournament && formik.errors.tournament}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            // label="Tournament Date"
                            variant="standard"
                            type = "date"
                            name="tournamentDate"
                            value={formik.values.tournamentDate}
                            onChange={formik.handleChange}

                            error={formik.touched.tournamentDate && Boolean(formik.errors.tournamentDate)}
                            helperText={formik.touched.tournamentDate && formik.errors.tournamentDate}
                        />
                        <h1>
                            Team One
                        </h1>
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Team A"
                            variant="standard"
                            type = "TextField"
                            name="teamA"
                            value={formik.values.teamA}
                            onChange={formik.handleChange}

                            error={formik.touched.teamA && Boolean(formik.errors.teamA)}
                            helperText={formik.touched.teamA && formik.errors.teamA}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Team A Runs"
                            variant="standard"
                            type = "TextField"
                            name="teamARun"
                            value={formik.values.teamARun}
                            onChange={formik.handleChange}

                            error={formik.touched.teamARun && Boolean(formik.errors.teamARun)}
                            helperText={formik.touched.teamARun && formik.errors.teamARun}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Team A Wicket"
                            variant="standard"
                            type = "TextField"
                            name="teamAWkt"
                            value={formik.values.teamAWkt}
                            onChange={formik.handleChange}

                            error={formik.touched.teamAWkt && Boolean(formik.errors.teamAWkt)}
                            helperText={formik.touched.teamAWkt && formik.errors.teamAWkt}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Team A Over"
                            variant="standard"
                            type = "TextField"
                            name="teamAOvr"
                            value={formik.values.teamAOvr}
                            onChange={formik.handleChange}

                            error={formik.touched.teamAOvr && Boolean(formik.errors.teamAOvr)}
                            helperText={formik.touched.teamAOvr && formik.errors.teamAOvr}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Batsman A"
                            variant="standard"
                            type = "TextField"
                            name="batsmanA"
                            value={formik.values.batsmanA}
                            onChange={formik.handleChange}

                            error={formik.touched.batsmanA && Boolean(formik.errors.batsmanA)}
                            helperText={formik.touched.batsmanA && formik.errors.batsmanA}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Batsman A Run"
                            variant="standard"
                            type = "TextField"
                            name="batsmanARun"
                            value={formik.values.batsmanARun}
                            onChange={formik.handleChange}

                            error={formik.touched.batsmanARun && Boolean(formik.errors.batsmanARun)}
                            helperText={formik.touched.batsmanARun && formik.errors.batsmanARun}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Batsman A Ball"
                            variant="standard"
                            type = "TextField"
                            name="batsmanABall"
                            value={formik.values.batsmanABall}
                            onChange={formik.handleChange}

                            error={formik.touched.batsmanABall && Boolean(formik.errors.batsmanABall)}
                            helperText={formik.touched.batsmanABall && formik.errors.batsmanABall}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id=""
                            label="Batsman B"
                            variant="standard"
                            type = "TextField"
                            name="batsmanB"
                            value={formik.values.batsmanB}
                            onChange={formik.handleChange}

                            error={formik.touched.batsmanB && Boolean(formik.errors.batsmanB)}
                            helperText={formik.touched.batsmanB && formik.errors.batsmanB}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Batsman B Run"
                            variant="standard"
                            type = "TextField"
                            name="batsmanBRun"
                            value={formik.values.batsmanBRun}
                            onChange={formik.handleChange}

                            error={formik.touched.batsmanBRun && Boolean(formik.errors.batsmanBRun)}
                            helperText={formik.touched.batsmanBRun && formik.errors.batsmanBRun}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Batsman B Ball"
                            variant="standard"
                            type = "TextField"
                            name="batsmanBBall"
                            value={formik.values.batsmanBBall}
                            onChange={formik.handleChange}

                            error={formik.touched.batsmanBBall && Boolean(formik.errors.batsmanBBall)}
                            helperText={formik.touched.batsmanBBall && formik.errors.batsmanBBall}
                        />
                        <h1>
                            Team Two
                        </h1>
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Team B"
                            variant="standard"
                            type = "TextField"
                            name="teamB"
                            value={formik.values.teamB}
                            onChange={formik.handleChange}

                            error={formik.touched.teamB && Boolean(formik.errors.teamB)}
                            helperText={formik.touched.teamB && formik.errors.teamB}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Team B Runs"
                            variant="standard"
                            type = "TextField"
                            name="teamBRun"
                            value={formik.values.teamBRun}
                            onChange={formik.handleChange}

                            error={formik.touched.teamBRun && Boolean(formik.errors.teamBRun)}
                            helperText={formik.touched.teamBRun && formik.errors.teamBRun}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Team B Wicket"
                            variant="standard"
                            type = "TextField"
                            name="teamBWkt"
                            value={formik.values.teamBWkt}
                            onChange={formik.handleChange}

                            error={formik.touched.teamBWkt && Boolean(formik.errors.teamBWkt)}
                            helperText={formik.touched.teamBWkt && formik.errors.teamBWkt}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Team B Over"
                            variant="standard"
                            type = "TextField"
                            name="teamBOvr"
                            value={formik.values.teamBOvr}
                            onChange={formik.handleChange}

                            error={formik.touched.teamBOvr && Boolean(formik.errors.teamBOvr)}
                            helperText={formik.touched.teamBOvr && formik.errors.teamBOvr}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler B"
                            variant="standard"
                            type = "TextField"
                            name="bowlerB"
                            value={formik.values.bowlerB}
                            onChange={formik.handleChange}

                            error={formik.touched.bowlerB && Boolean(formik.errors.bowlerB)}
                            helperText={formik.touched.bowlerB && formik.errors.bowlerB}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler B Wicket"
                            variant="standard"
                            type = "TextField"
                            name="bowlerBW"
                            value={formik.values.bowlerBW}
                            onChange={formik.handleChange}

                            error={formik.touched.bowlerBW && Boolean(formik.errors.bowlerBW)}
                            helperText={formik.touched.bowlerBW && formik.errors.bowlerBW}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler B Run"
                            variant="standard"
                            type = "TextField"
                            name="bowlerBRun"
                            value={formik.values.bowlerBRun}
                            onChange={formik.handleChange}

                            error={formik.touched.bowlerBRun && Boolean(formik.errors.bowlerBRun)}
                            helperText={formik.touched.bowlerBRun && formik.errors.bowlerBRun}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler B Over"
                            variant="standard"
                            type = "TextField"
                            name="bowlerBOver"
                            value={formik.values.bowlerBOver}
                            onChange={formik.handleChange}

                            error={formik.touched.bowlerBOver && Boolean(formik.errors.bowlerBOver)}
                            helperText={formik.touched.bowlerBOver && formik.errors.bowlerBOver}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler C"
                            variant="standard"
                            type = "TextField"
                            name="bowlerC"
                            value={formik.values.bowlerC}
                            onChange={formik.handleChange}

                            error={formik.touched.bowlerC && Boolean(formik.errors.bowlerC)}
                            helperText={formik.touched.bowlerC && formik.errors.bowlerC}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler C Wicket"
                            variant="standard"
                            type = "TextField"
                            name="bowlerCW"
                            value={formik.values.bowlerCW}
                            onChange={formik.handleChange}

                            error={formik.touched.bowlerCW && Boolean(formik.errors.bowlerCW)}
                            helperText={formik.touched.bowlerCW && formik.errors.bowlerCW}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler C Run"
                            variant="standard"
                            type = "TextField"
                            name="bowlerCRun"
                            value={formik.values.bowlerCRun}
                            onChange={formik.handleChange}

                            error={formik.touched.bowlerCRun && Boolean(formik.errors.bowlerCRun)}
                            helperText={formik.touched.bowlerCRun && formik.errors.bowlerCRun}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler C Over"
                            variant="standard"
                            type = "TextField"
                            name="bowlerCOver"
                            value={formik.values.bowlerCOver}
                            onChange={formik.handleChange}

                            error={formik.touched.bowlerCOver && Boolean(formik.errors.bowlerCOver)}
                            helperText={formik.touched.bowlerCOver && formik.errors.bowlerCOver}
                        />
                        <br /><br /><br />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Match Description"
                            variant="standard"
                            type = "TextField"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}

                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Commentary"
                            variant="standard"
                            type = "TextField"
                            name="commentary"
                            value={formik.values.commentary}
                            onChange={formik.handleChange}

                            error={formik.touched.commentary && Boolean(formik.errors.commentary)}
                            helperText={formik.touched.commentary && formik.errors.commentary}
                        />





                        <br /><br />
                        <Button  variant="contained" color="secondary" type="submit">Post</Button>
                    </form>
                {posts[0]?.tournament} <br />
                {posts[0]?.tournamentDate} <br /> 
                {posts[0]?.teamA} <br /> 
                {posts[0]?.teamARun} <br /> 
                {posts[0]?.teamAOvr} <br /> 
                {posts[0]?.teamAWkt} <br /> 
                {posts[0]?.batsmanA} <br /> 
                {posts[0]?.batsmanARun} <br /> 
                {posts[0]?.batsmanABall} <br /> 
                {posts[0]?.batsmanB} <br /> 
                {posts[0]?.batsmanBRun} <br /> 
                {posts[0]?.batsmanBBall} <br /> 
                {posts[0]?.teamB} <br /> 
                {posts[0]?.teamBRun} <br /> 
                {posts[0]?.teamBWkt} <br /> 
                {posts[0]?.teamBOvr} <br /> 
                {posts[0]?.bowlerB} <br /> 
                {posts[0]?.bowlerBW} <br /> 
                {posts[0]?.bowlerBRun} <br /> 
                {posts[0]?.bowlerBOver} <br /> 
                {posts[0]?.bowlerC} <br /> 
                {posts[0]?.bowlerCW} <br /> 
                {posts[0]?.bowlerCRun} <br /> 
                {posts[0]?.bowlerCOver} <br /> 
                {posts[0]?.description} <br /> 
                {posts[0]?.commentary} <br /> 
                </Grid>
                
                {/* {posts.map((eachUser, i) => {
                    return (
                        <Grid key={i}>
                            {eachUser.postText}
    
                        </Grid>   
                    )
                })} */}
            </Grid>
        </>
    );
}

export default Admin;