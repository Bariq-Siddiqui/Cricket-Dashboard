import axios from 'axios';
import Grid from '@mui/material/Grid';
import io from 'socket.io-client';
import {useFormik} from 'formik';
import TextField from '@mui/material/TextField';
import { useState, useEffect, useRef } from "react";
import { red,blue,purple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
const dev = 'http://localhost:5000';
const baseURL = window.location.hostname.split(':')[0] === 'localhost' ? dev : ""
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import { useTheme } from '@mui/material/styles';
function Admin() {
const [posts, setPosts] = useState({
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
});
const playerTeam={
    Pakistan:[
        "Sharjeel Khan",
        "Baber Azam",
        "Rizwan Khan",
        "Fakhar Zaman",
        "Haider Ali",
        "Khushdil Shah",
        "Mohammad Nawaz",
        "Shadab Khan",
        "Hassan Ali",
        "Mohammad Waseem",
        "Shaheen Afridi"
    ],
    Australia:[
        "Aaron Finch",
        "David Warner",
        "Steve Smith",
        "Glenn Maxwell",
        "Marcus Stoinis",
        "Matthew Wade",
        "Ashton Agar",
        "Pat Cummins",
        "Mitchell Starc",
        "Adam Zampa",
        "Josh Hazlewood"
    ],
    England:[
        "Jason ROy",
        "Jos Buttler",
        "Dawid Malan",
        "Jonny Bairstow",
        "Eion Morgan",
        "Liam Livingstone",
        "Moeen Ali",
        "Chris Woakes",
        "Chris Jordan",
        "Adil Rashid",
        "Tymal Mills"
    ],
    "New Zealand":[
        "Martin Guptill",
        "Daryl Mitchell",
        "Devon Conway",
        "Kane Williamson",
        "Glenn Phillips",
        "Tim Seifert",
        "Mitchell Santner",
        "Adam Milne",
        "Ish Sodhi",
        "Trent Boult",
        "Tim Southee"
    ],
    India:[
        "KL Rahul",
        "Rohit Sharma",
        "Rishabh Pant",
        "Hardik Pandya",
        "Virat Kohli",
        "Surya Kumar",
        "Ravindra Jadeja",
        "Ravichandran Ashwin",
        "Shardul Thakur",
        "Mohammad Shami",
        "Jasprit Bumrah"
    ],
    "South Africa":[
        "Quinton De Cock",
        "Aiden Markaram",
        "Reeza Hendricks",
        "David Miller",
        "Temba Bavuma",
        "Bjorn Forttuin",
        "Rassie van der Dussen",
        "Tabraiz Shamsi",
        "Anrich Nortje",
        "Lungi Ngidi",
        "Kagiso Rabada"
    ],
    Afghanistan:[
        "Hazratullah Zazai",
        "Mohammad Shahzad",
        "Gulbadin Naib",
        "Najibullah Zadran",
        "Rahmanullah Gurbaz",
        "Mohammad Nabi",
        "Asghar Afghan",
        "Karim Janat",
        "Rashid Khan",
        "Mujeeb Ur Rahman",
        "Naveen ul Haq"
    ],
    Bangladesh:[
        "Mohammad Naim",
        "Liton Das",
        "Najmul Hossain Shanto",
        "Mushfiqur Rahim",
        "Shakib Al Hasan",
        "Mohmudullah",
        "Soumya Sarkar",
        "Afif Hossain",
        "Taskin Ahmed",
        "Nasum Ahmed",
        "Shoriful Islam"
    ],
    "Sri Lanka":[
        "Pathum Nissanka",
        "Kusal Perera",
        "Avishka Fernando",
        "Dhananjaya de Silva",
        "Dinesh Chandimal",
        "Dasun Shanaka",
        "Wanindu Hasaranga",
        "Charith Asalanka",
        "Chamika Karunaratne",
        "Maheesh Theekshana",
        "Binura Fernando"
    ],
    "West Indies":[
        "Chris Gayle",
        "Evin Lewis",
        "Lendl Simmons",
        "Andre Fletcher",
        "Shimron Hetmyer",
        "Nicholas Pooran",
        "Kieron Pollard",
        "Andre Russell",
        "Dwayne Bravo",
        "Jason Holder",
        "Ravi Rampaul"
    ]
}

const [score, setScore] = useState({
        tournament: "",
        tournamentDate: "",
        teamA: "",
        teamARun: 0,
        teamAOvr: 0,
        teamAWkt: 0,
        batsmanA: "",            
        batsmanARun: 0,
        batsmanABall: 0,
        batsmanB: 0,
        batsmanBRun: 0,
        batsmanBBall: 0,
        teamB: "",
        teamBRun: 0,
        teamBWkt: 0,
        teamBOvr: 0,
        bowlerB: "",
        bowlerBW: 0,
        bowlerBRun: 0,
        bowlerBOver: 0,
        bowlerC: "",
        bowlerCW: 0,
        bowlerCRun: 0,
        bowlerCOver: 0,
        description: "",
        commentary: ""
});

    // useEffect(() => {
    //     axios.get(`${baseURL}/api/v1/posts?page=0`)
    //         .then((res) => {
    //             setScore(res.data)
    //             // console.log("MY data of posts",score)

    //         })
    // }, [])
    useEffect(() => {
        axios.get(`${baseURL}/api/v1/posts?page=0`)
            .then((res) => {
                console.log("res +++: ", res.data);
                setScore(res.data[0])
                console.log("abc",res.data[0])
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
            setScore(data)        
        });

        return () => {
            socket.close();
        };
    }, []);
    // const formik = useFormik({
    //     initialValues:{
    //         tournament: "",
    //         tournamentDate: "",
    //         teamA: "",
    //         teamARun: "",
    //         teamAOvr: "",
    //         teamAWkt: "",
    //         batsmanA: "",            
    //         batsmanARun: "",
    //         batsmanABall: "",
    //         batsmanB: "",
    //         batsmanBRun: "",
    //         batsmanBBall: "",
    //         teamB: "",
    //         teamBRun: "",
    //         teamBWkt: "",
    //         teamBOvr: "",
    //         bowlerB: "",
    //         bowlerBW: "",
    //         bowlerBRun: "",
    //         bowlerBOver: "",
    //         bowlerC: "",
    //         bowlerCW: "",
    //         bowlerCRun: "",
    //         bowlerCOver: "",
    //         description: "",
    //         commentary: ""
    //     },
    //     onSubmit: onSubmitFunction
    // })
    // function onSubmitFunction(values){
    //         axios.post(`${baseURL}/api/v1/post`, {
    //             tournament: values.tournament,
    //             tournamentDate: values.tournamentDate,
    //             teamA: values.teamA,
    //             teamARun: values.teamARun,
    //             teamAOvr: values.teamAOvr,
    //             teamAWkt: values.teamAWkt,
    //             batsmanA: values.batsmanA,
    //             batsmanARun: values.batsmanARun,
    //             batsmanABall: values.batsmanABall,
    //             batsmanB: values.batsmanB,
    //             batsmanBRun: values.batsmanBRun,
    //             batsmanBBall: values.batsmanBBall,
    //             teamB: values.teamB,
    //             teamBRun: values.teamBRun,
    //             teamBWkt: values.teamBWkt,
    //             teamBOvr: values.teamBOvr,
    //             bowlerB: values.bowlerB,
    //             bowlerBW: values.bowlerBW,
    //             bowlerBRun: values.bowlerBRun,
    //             bowlerBOver: values.bowlerBOver,
    //             bowlerC: values.bowlerC,
    //             bowlerCW: values.bowlerCW,
    //             bowlerCRun: values.bowlerCRun,
    //             bowlerCOver: values.bowlerCOver,
    //             description: values.description,
    //             commentary: values.commentary
    //         })
    //             .then((res) => {
    //                 console.log("res: ", res.data);
    //                 alert("post created");

    //         })
    // }
    const submit = (a) => {
        a.preventDefault()
        axios.post(`${baseURL}/api/v1/post`,{
            tournament: score.tournament,
            tournamentDate: score.tournamentDate,
            teamA: score.teamA,
            teamARun: score.teamARun,
            teamAOvr: score.teamAOvr,
            teamAWkt: score.teamAWkt,
            batsmanA: score.batsmanA,            
            batsmanARun: score.batsmanARun,
            batsmanABall: score.batsmanABall,
            batsmanB: score.batsmanB,
            batsmanBRun: score.batsmanBRun,
            batsmanBBall: score.batsmanBBall,
            teamB: score.teamB,
            teamBRun: score.teamBRun,
            teamBWkt: score.teamBWkt,
            teamBOvr: score.teamBOvr,
            bowlerB: score.bowlerB,
            bowlerBW: score.bowlerBW,
            bowlerBRun: score.bowlerBRun,
            bowlerBOver: score.bowlerBOver,
            bowlerC: score.bowlerC,
            bowlerCW: score.bowlerCW,
            bowlerCRun: score. bowlerCRun,
            bowlerCOver: score.bowlerCOver,
            description: score.description,
            commentary: score.commentary
    })
            .then((res) => {
                console.log("res: ", res.data);
                    alert("post created");

            })
    }
    return (
        <>
            <Grid container spacing={2} alignItems="center" textAlign='center' padding='2%' justifyContent="center">
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <h1 style={{color: "purple"}}> Admin Panel </h1>
                    {/* <form onSubmit={formik.handleSubmit}> */} 
                    <form onSubmit={submit} autoComplete="off" component="Box">
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <TextField
                                                // width="50%"
                                                color="secondary"
                                                id="outlined-basic"
                                                label="Tournament Name"
                                                variant="standard"
                                                type = "TextField"
                                                name="tournament"

                                                value={score?.tournament}
                                                onChange={(e) => {
                                                    setScore((prev) => {
                                                    return { ...prev, tournament: e.target.value }
                                                    })
                                                }}
                                                // value={formik.values.tournament}
                                                // onChange={formik.handleChange}

                                                // error={formik.touched.tournament && Boolean(formik.errors.tournament)}
                                                // helperText={formik.touched.tournament && formik.errors.tournament}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <TextField
                                                // 
                                                color="secondary"
                                                id="outlined-basic"
                                                label="Tournament Date"
                                                variant="standard"
                                                type = "date"
                                                name="tournamentDate"
                                                value={score.tournamentDate}
                                                onChange={(e) => {
                                                setScore((prev) => {
                                                    return { ...prev, tournamentDate: e.target.value }
                                                })
                                                }}
                                                // value={formik.values.tournamentDate}
                                                // onChange={formik.handleChange}
                                                // error={formik.touched.tournamentDate && Boolean(formik.errors.tournamentDate)}
                                                // helperText={formik.touched.tournamentDate && formik.errors.tournamentDate}
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">
                                            <strong>Batting Team</strong>
                                        </TableCell>
                                        <TableCell align="center">
                                            <strong>Bowling Team</strong>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell align="center">
                                            
                                            
                                            
                                            
                                            
                                            
                                            <label style={{display: 'block'}}>
                                                <strong>Team Batting</strong>
                                            </label>
                                            <select
                                                name="teamA"
                                                value={score.teamA}
                                                onChange={(e) => {
                                                    setScore((prev) => {
                                                    return { ...prev, teamA: e.target.value }
                                                    })
                                                }}
                                                style={{}}
                                            >
                                                <option value="" label="Select a Team" />
                                                <option value="Pakistan" label="Pakistan" />
                                                <option value="Australia" label="Australia" />
                                                <option value="England" label="England" />
                                                <option value="New Zealand" label="New Zealand" />
                                                <option value="India" label="India" />
                                                <option value="South Africa" label="South Africa" />
                                                <option value="Afghanistan" label="Afghanistan" />
                                                <option value="Bangladesh" label="Bangladesh" />
                                                <option value="Sri Lanka" label="Sri Lanka" />
                                                <option value="West Indies" label="West Indies" />
                                            </select>

                                        {/* <TextField
                                        color="secondary"
                            id="outlined-basic"
                            label="Team A"
                            variant="standard"
                            type = "TextField"
                            name="teamA"

                            value={score.teamA}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, teamA: e.target.value }
                                })
                            }}
                            // value={formik.values.teamA}
                            // onChange={formik.handleChange}

                            // error={formik.touched.teamA && Boolean(formik.errors.teamA)}
                            // helperText={formik.touched.teamA && formik.errors.teamA}
                        /> */}
                                        </TableCell>
                                        <TableCell align="center">
                                        <label style={{display: 'block'}}>
                                                <strong>Team</strong>
                                            </label>
                                            <select
                                                name="teamB"
                                                value={score.teamB}
                                                onChange={(e) => {
                                                    setScore((prev) => {
                                                    return { ...prev, teamB: e.target.value }
                                                    })
                                                }}
                                                style={{}}
                                            >
                                                <option value="" label="Select a Team" />
                                                <option value="Pakistan" label="Pakistan" />
                                                <option value="Australia" label="Australia" />
                                                <option value="England" label="England" />
                                                <option value="New Zealand" label="New Zealand" />
                                                <option value="India" label="India" />
                                                <option value="South Africa" label="South Africa" />
                                                <option value="Afghanistan" label="Afghanistan" />
                                                <option value="Bangladesh" label="Bangladesh" />
                                                <option value="Sri Lanka" label="Sri Lanka" />
                                                <option value="West Indies" label="West Indies" />
                                            </select>

                                        {/* <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Team B"
                            variant="standard"
                            type = "TextField"
                            name="teamB"
                            value={score.teamB}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, teamB: e.target.value }
                                })
                            }}

                            // value={formik.values.teamB}
                            // onChange={formik.handleChange}

                            // error={formik.touched.teamB && Boolean(formik.errors.teamB)}
                            // helperText={formik.touched.teamB && formik.errors.teamB}
                        /> */}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Team A Runs"
                            variant="standard"
                            type = "number"
                            name="teamARun"

                            value={score.teamARun}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, teamARun: e.target.value }
                                })
                            }}
                            // value={formik.values.teamARun}
                            // onChange={formik.handleChange}

                            // error={formik.touched.teamARun && Boolean(formik.errors.teamARun)}
                            // helperText={formik.touched.teamARun && formik.errors.teamARun}
                        />&nbsp;&nbsp;&nbsp;<TextField
                            
                        color="secondary"
                        id="outlined-basic"
                        label="Team A Wicket"
                        variant="standard"
                        type = "number"
                        name="teamAWkt"
                        value={score.teamAWkt}
                        onChange={(e) => {
                            setScore((prev) => {
                            return { ...prev, teamAWkt: e.target.value }
                            })
                        }}

                        // value={formik.values.teamAWkt}
                        // onChange={formik.handleChange}

                        // error={formik.touched.teamAWkt && Boolean(formik.errors.teamAWkt)}
                        // helperText={formik.touched.teamAWkt && formik.errors.teamAWkt}
                    />     &nbsp;&nbsp;&nbsp;
                       <TextField
                            
                    color="secondary"
                    id="outlined-basic"
                    label="Team A Over"
                    variant="standard"
                    type = "number"
                    name="teamAOvr"

                    value={score.teamAOvr}
                    onChange={(e) => {
                        setScore((prev) => {
                        return { ...prev, teamAOvr: e.target.value }
                        })
                    }}
                    // value={formik.values.teamAOvr}
                    // onChange={formik.handleChange}

                    // error={formik.touched.teamAOvr && Boolean(formik.errors.teamAOvr)}
                    // helperText={formik.touched.teamAOvr && formik.errors.teamAOvr}
                />
                                        </TableCell>
                                        <TableCell>

                                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Team B Runs"
                            variant="standard"
                            type = "number"
                            name="teamBRun"
                            value={score.teamBRun}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, teamBRun: e.target.value }
                                })
                            }}

                            // value={formik.values.teamBRun}
                            // onChange={formik.handleChange}

                            // error={formik.touched.teamBRun && Boolean(formik.errors.teamBRun)}
                            // helperText={formik.touched.teamBRun && formik.errors.teamBRun}
                        />&nbsp;&nbsp;&nbsp;
                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Team B Wicket"
                            variant="standard"
                            type = "number"
                            name="teamBWkt"
                            value={score.teamBWkt}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, teamBWkt: e.target.value }
                                })
                            }}

                            // value={formik.values.teamBWkt}
                            // onChange={formik.handleChange}

                            // error={formik.touched.teamBWkt && Boolean(formik.errors.teamBWkt)}
                            // helperText={formik.touched.teamBWkt && formik.errors.teamBWkt}
                        />&nbsp;&nbsp;&nbsp;
                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Team B Over"
                            variant="standard"
                            type = "number"
                            name="teamBOvr"

                            value={score.teamBOvr}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, teamBOvr: e.target.value }
                                })
                            }}

                            // value={formik.values.teamBOvr}
                            // onChange={formik.handleChange}

                            // error={formik.touched.teamBOvr && Boolean(formik.errors.teamBOvr)}
                            // helperText={formik.touched.teamBOvr && formik.errors.teamBOvr}
                        />
                        
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell>
                                        <label style={{display: 'block'}}>
                                                <strong>Batsman A</strong>
                                            </label>
                                            <select
                                                name="batsmanA"
                                                value={score.batsmanA}
                                                onChange={(e) => {
                                                    setScore((prev) => {
                                                    return { ...prev, batsmanA: e.target.value }
                                                    })
                                                }}
                                                style={{}}
                                            >
                                                {playerTeam[score.teamA]?.map((player,i)=>(
                                                <option key={i} value={player} label={player} />
                                                ))}
                                            </select>
                                        {/* <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Batsman A"
                            variant="standard"
                            type = "TextField"
                            name="batsmanA"
                            value={score.batsmanA}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, batsmanA: e.target.value }
                                })
                            }}

                            // value={formik.values.batsmanA}
                            // onChange={formik.handleChange}

                            // error={formik.touched.batsmanA && Boolean(formik.errors.batsmanA)}
                            // helperText={formik.touched.batsmanA && formik.errors.batsmanA}
                        /> */}
                        &nbsp;&nbsp;&nbsp;
                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Batsman A Run"
                            variant="standard"
                            type = "number"
                            name="batsmanARun"

                            value={score.batsmanARun}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, batsmanARun: e.target.value }
                                })
                            }}
                            // value={formik.values.batsmanARun}
                            // onChange={formik.handleChange}

                            // error={formik.touched.batsmanARun && Boolean(formik.errors.batsmanARun)}
                            // helperText={formik.touched.batsmanARun && formik.errors.batsmanARun}
                        />&nbsp;&nbsp;&nbsp;
                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Batsman A Ball"
                            variant="standard"
                            type = "number"
                            name="batsmanABall"
                            value={score.batsmanABall}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, batsmanABall: e.target.value }
                                })
                            }}

                            // value={formik.values.batsmanABall}
                            // onChange={formik.handleChange}

                            // error={formik.touched.batsmanABall && Boolean(formik.errors.batsmanABall)}
                            // helperText={formik.touched.batsmanABall && formik.errors.batsmanABall}
                        />
                                        </TableCell>
                                        <TableCell>
                                        <label style={{display: 'block'}}>
                                                <strong>Bowler A</strong>
                                            </label>
                                            <select
                                                name="bowlerB"
                                                value={score.bowlerB}
                                                onChange={(e) => {
                                                    setScore((prev) => {
                                                    return { ...prev, bowlerB: e.target.value }
                                                    })
                                                }}
                                                style={{}}
                                            >
                                                {playerTeam[score.teamB]?.map((player,i)=>(
                                                <option key={i} value={player} label={player} />
                                                ))}
                                            </select>
                                        {/* <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler B"
                            variant="standard"
                            type = "TextField"
                            name="bowlerB"
                            value={score.bowlerB}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, bowlerB: e.target.value }
                                })
                            }}

                            // value={formik.values.bowlerB}
                            // onChange={formik.handleChange}

                            // error={formik.touched.bowlerB && Boolean(formik.errors.bowlerB)}
                            // helperText={formik.touched.bowlerB && formik.errors.bowlerB}
                        /> */}
                        &nbsp;&nbsp;&nbsp;
                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler B Wicket"
                            variant="standard"
                            type = "number"
                            name="bowlerBW"

                            value={score.bowlerBW}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, bowlerBW: e.target.value }
                                })
                            }}
                            // value={formik.values.bowlerBW}
                            // onChange={formik.handleChange}

                            // error={formik.touched.bowlerBW && Boolean(formik.errors.bowlerBW)}
                            // helperText={formik.touched.bowlerBW && formik.errors.bowlerBW}
                        />&nbsp;&nbsp;&nbsp;
                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler B Run"
                            variant="standard"
                            type = "number"
                            name="bowlerBRun"
                            value={score.bowlerBRun}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, bowlerBRun: e.target.value }
                                })
                            }}

                            // value={formik.values.bowlerBRun}
                            // onChange={formik.handleChange}

                            // error={formik.touched.bowlerBRun && Boolean(formik.errors.bowlerBRun)}
                            // helperText={formik.touched.bowlerBRun && formik.errors.bowlerBRun}
                        />&nbsp;&nbsp;&nbsp;
                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler B Over"
                            variant="standard"
                            type = "number"
                            name="bowlerBOver"

                            value={score.bowlerBOver}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, bowlerBOver: e.target.value }
                                })
                            }}
                            // value={formik.values.bowlerBOver}
                            // onChange={formik.handleChange}

                            // error={formik.touched.bowlerBOver && Boolean(formik.errors.bowlerBOver)}
                            // helperText={formik.touched.bowlerBOver && formik.errors.bowlerBOver}
                        />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            <label style={{display: 'block'}}>
                                                <strong>Batsman B</strong>
                                            </label>
                                            <select
                                                name="batsmanB"
                                                value={score.batsmanB}
                                                onChange={(e) => {
                                                    setScore((prev) => {
                                                    return { ...prev, batsmanB: e.target.value }
                                                    })
                                                }}
                                                style={{}}
                                            >
                                                {playerTeam[score.teamA]?.map((player,i)=>(
                                                <option key={i} value={player} label={player} />
                                                ))}
                                            </select>

                                        {/* <TextField
                            
                            color="secondary"
                            id=""
                            label="Batsman B"
                            variant="standard"
                            type = "TextField"
                            name="batsmanB"
                            value={score.batsmanB}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, batsmanB: e.target.value }
                                })
                            }}

                            // value={formik.values.batsmanB}
                            // onChange={formik.handleChange}

                            // error={formik.touched.batsmanB && Boolean(formik.errors.batsmanB)}
                            // helperText={formik.touched.batsmanB && formik.errors.batsmanB}
                        /> */}
                        &nbsp;&nbsp;&nbsp;
                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Batsman B Run"
                            variant="standard"
                            type = "number"
                            name="batsmanBRun"
                            value={score.batsmanBRun}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, batsmanBRun: e.target.value }
                                })
                            }}

                            // value={formik.values.batsmanBRun}
                            // onChange={formik.handleChange}

                            // error={formik.touched.batsmanBRun && Boolean(formik.errors.batsmanBRun)}
                            // helperText={formik.touched.batsmanBRun && formik.errors.batsmanBRun}
                        />&nbsp;&nbsp;&nbsp;
                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Batsman B Ball"
                            variant="standard"
                            type = "number"
                            name="batsmanBBall"

                            value={score.batsmanBBall}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, batsmanBBall: e.target.value }
                                })
                            }}

                            // value={formik.values.batsmanBBall}
                            // onChange={formik.handleChange}

                            // error={formik.touched.batsmanBBall && Boolean(formik.errors.batsmanBBall)}
                            // helperText={formik.touched.batsmanBBall && formik.errors.batsmanBBall}
                        />
                                        </TableCell>
                                        <TableCell>
                                            <label style={{display: 'block'}}>
                                                <strong>Bowler C</strong>
                                            </label>
                                            <select
                                                name="bowlerC"
                                                value={score.bowlerC}
                                                onChange={(e) => {
                                                    setScore((prev) => {
                                                    return { ...prev, bowlerC: e.target.value }
                                                    })
                                                }}
                                                style={{}}
                                            >
                                                {playerTeam[score.teamB]?.map((player,i)=>(
                                                <option key={i} value={player} label={player} />
                                                ))}
                                            </select>

{/* 
                                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler C"
                            variant="standard"
                            type = "TextField"
                            name="bowlerC"

                            value={score.bowlerC}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, bowlerC: e.target.value }
                                })
                            }}
                            // value={formik.values.bowlerC}
                            // onChange={formik.handleChange}

                            // error={formik.touched.bowlerC && Boolean(formik.errors.bowlerC)}
                            // helperText={formik.touched.bowlerC && formik.errors.bowlerC}
                        /> */}
                        &nbsp;&nbsp;&nbsp;
                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler C Wicket"
                            variant="standard"
                            type = "number"
                            name="bowlerCW"
                            value={score.bowlerCW}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, bowlerCW: e.target.value }
                                })
                            }}
                            // value={formik.values.bowlerCW}
                            // onChange={formik.handleChange}

                            // error={formik.touched.bowlerCW && Boolean(formik.errors.bowlerCW)}
                            // helperText={formik.touched.bowlerCW && formik.errors.bowlerCW}
                        />&nbsp;&nbsp;&nbsp;
                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler C Run"
                            variant="standard"
                            type = "number"
                            name="bowlerCRun"
                            value={score.bowlerCRun}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, bowlerCRun: e.target.value }
                                })
                            }}
                            // value={formik.values.bowlerCRun}
                            // onChange={formik.handleChange}

                            // error={formik.touched.bowlerCRun && Boolean(formik.errors.bowlerCRun)}
                            // helperText={formik.touched.bowlerCRun && formik.errors.bowlerCRun}
                        />&nbsp;&nbsp;&nbsp;
                        <TextField
                            
                            color="secondary"
                            id="outlined-basic"
                            label="Bowler C Over"
                            variant="standard"
                            type = "number"
                            name="bowlerCOver"
                            value={score.bowlerCOver}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, bowlerCOver: e.target.value }
                                })
                            }}
                            // value={formik.values.bowlerCOver}
                            // onChange={formik.handleChange}

                            // error={formik.touched.bowlerCOver && Boolean(formik.errors.bowlerCOver)}
                            // helperText={formik.touched.bowlerCOver && formik.errors.bowlerCOver}
                        />
                                        </TableCell>
                                    </TableRow>

                                    
                                    <TableRow>
                                        <TableCell colSpan="2" align="center">
                                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Match Description"
                            variant="standard"
                            type = "TextField"
                            name="description"
                            value={score.description}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, description: e.target.value }
                                })
                            }}
                            // value={formik.values.description}
                            // onChange={formik.handleChange}

                            // error={formik.touched.description && Boolean(formik.errors.description)}
                            // helperText={formik.touched.description && formik.errors.description}
                        />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan="2" align="center">
                                        <TextField
                            fullWidth
                            color="secondary"
                            id="outlined-basic"
                            label="Commentary"
                            variant="standard"
                            type = "TextField"
                            name="commentary"
                      
                            value={score.commentary}
                            onChange={(e) => {
                                setScore((prev) => {
                                return { ...prev, commentary: e.target.value }
                                })
                            }}
                            // value={formik.values.commentary}
                            // onChange={formik.handleChange}

                            // error={formik.touched.commentary && Boolean(formik.errors.commentary)}
                            // helperText={formik.touched.commentary && formik.errors.commentary}
                        />

                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan="2" align="center">
                                            <Button  variant="contained" color="secondary" onClick={submit}>Post</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
<br />
                    {/* </form> */}
                    </form>
                </Grid>
            </Grid>
        </>
    );
}

export default Admin;