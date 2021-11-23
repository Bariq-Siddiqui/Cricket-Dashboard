import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect('mongodb+srv://cricket:cricket@cluster0.emdhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const Post = mongoose.model("Post", {
    tournament: String,
    tournamentDate: String,
    teamA: String,
    teamARun: String,
    teamAOvr: String,
    teamAWkt: String,
    batsmanA: String,
    batsmanARun: String,
    batsmanABall: String,
    batsmanB: String,
    batsmanBRun: String,
    batsmanBBall: String,
    teamB: String,
    teamBRun: String,
    teamBWkt: String,
    teamBOvr: String,
    bowlerB: String,
    bowlerBW: String,
    bowlerBRun: String,
    bowlerBOver: String,
    bowlerC: String,
    bowlerCW: String,
    bowlerCRun: String,
    bowlerCOver: String,
    description: String,
    commentary: String,
    created: { type: Date, default: Date.now },
});

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true
}));

app.use('/', express.static(path.join(__dirname, 'web/build')))
app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
});

app.post('/api/v1/profile', (req, res) => {
    res.send('profile created')
})
app.put('/api/v1/profile', (req, res) => {
    res.send('profile updated')
})
app.delete('/api/v1/profile', (req, res) => {
    res.send('profile deleted')
})

app.post("/api/v1/post", (req, res) => {
    const newPost = new Post({
        tournament: req.body.tournament,
        tournamentDate: req.body.tournamentDate,
        teamA: req.body.teamA,
        teamARun: req.body.teamARun,
        teamAOvr: req.body.teamAOvr,
        teamAOvr: req.body.teamAOvr,
        teamAWkt: req.body.teamAWkt,
        batsmanA: req.body.batsmanA,
        batsmanARun: req.body.batsmanARun,
        batsmanABall: req.body.batsmanABall,
        batsmanB: req.body.batsmanB,
        batsmanBRun: req.body.batsmanBRun,
        batsmanBBall: req.body.batsmanBBall,
        teamB: req.body.teamB,
        teamBRun: req.body.teamBRun,
        teamBWkt: req.body.teamBWkt,
        teamBOvr: req.body.teamBOvr,
        bowlerB: req.body.bowlerB,
        bowlerBW: req.body.bowlerBW,
        bowlerBRun: req.body.bowlerBRun,
        bowlerBOver: req.body.bowlerBOver,
        bowlerC: req.body.bowlerC,
        bowlerCW: req.body.bowlerCW,
        bowlerCRun: req.body.bowlerCRun,
        bowlerCOver: req.body.bowlerCOver,
        description: req.body.description,
        commentary: req.body.commentary,
    });
    newPost.save().then(() => {
        console.log("Post created");

        io.emit("POSTS", {
            tournament: req.body.tournament,
            tournamentDate: req.body.tournamentDate,
            teamA: req.body.teamA,
            teamARun: req.body.teamARun,
            teamAOvr: req.body.teamAOvr,
            teamAOvr: req.body.teamAOvr,
            teamAWkt: req.body.teamAWkt,
            batsmanA: req.body.batsmanA,
            batsmanARun: req.body.batsmanARun,
            batsmanABall: req.body.batsmanABall,
            batsmanB: req.body.batsmanB,
            batsmanBRun: req.body.batsmanBRun,
            batsmanBBall: req.body.batsmanBBall,
            teamB: req.body.teamB,
            teamBRun: req.body.teamBRun,
            teamBWkt: req.body.teamBWkt,
            teamBOvr: req.body.teamBOvr,
            bowlerB: req.body.bowlerB,
            bowlerBW: req.body.bowlerBW,
            bowlerBRun: req.body.bowlerBRun,
            bowlerBOver: req.body.bowlerBOver,
            bowlerC: req.body.bowlerC,
            bowlerCW: req.body.bowlerCW,
            bowlerCRun: req.body.bowlerCRun,
            bowlerCOver: req.body.bowlerCOver,
            description: req.body.description,
            commentary: req.body.commentary,
        });

        res.send("Post created");
    });
});

app.get("/api/v1/posts", (req, res) => {

    const page = Number(req.query.page);

    console.log("page: ", page);

    Post.find({})
        .sort({ created: "desc" })
        .skip(page)
        .limit(1)
        .exec(function (err, data) {
            res.send(data);
        });
});
// app.get("/api/v1/getscore", (req, res) => {
//   cricketInfo
//     .findOne({})
//     .sort({ _id: "desc" })
//     .exec((err, data) => {
//       res.send(data);
//       // console.log(data);
//     });
// });

app.get("/**", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./web/build/index.html"))
    // res.redirect("/")
})

const server = createServer(app);

const io = new Server(server, { cors: { origin: "*", methods: "*", } });

io.on("connection", (socket) => {
    console.log("New client connected with id: ", socket.id);

    // to emit data to a certain client
    socket.emit("topic 1", "some data")

    // collecting connected users in a array
    // connectedUsers.push(socket)

    socket.on("disconnect", (message) => {
        console.log("Client disconnected with id: ", message);
    });
});
// app.get('/api/v1/posts', (req, res) => {

//     Post.find({}, (err, data) => {

//         if(err){
//             res.status(500).send("error in getting database")
//         }else{
//             res.send(data)
//         }

//     })
// })
setInterval(() => {

    // to emit data to all connected client
    // first param is topic name and second is json data
    io.emit("Test topic", { event: "ADDED_ITEM", data: "some data" });
    console.log("emiting data to all client");

}, 2000)


server.listen(PORT, function () {
    console.log("server is running on", PORT);
})