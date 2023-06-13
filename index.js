import express from "express";
import FileUpload from "express-fileupload";
import session from 'express-session'
import cors from "cors";
import PekerjaRoute from "./routes/PekerjaRoute.js";
import LokerRoute from "./routes/LokerRoute.js";
import UserRoute from "./routes/UserRoute.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(express.static("public"));
app.use(PekerjaRoute);
app.use(LokerRoute);
app.use(UserRoute);

app.listen(5000, () => console.log('Server Up and Running...'));
