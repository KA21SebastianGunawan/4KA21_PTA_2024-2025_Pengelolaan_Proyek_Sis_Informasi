import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UsersRoute from "./routes/UsersRoute.js";
import JadwalRoute from "./routes/JadwalRoute.js";
import DokumentasiRoute from "./routes/DokumentasiRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import LaporanRemajaRoute from "./routes/LaporanRemajaRoute.js";
import LaporanBalitaRoute from "./routes/LaporanBalitaRoute.js";
import path from "path";
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import LaporanLansiaRoute from "./routes/LaporanLansiaRoute.js";
import LaporanPoswinduRoute from "./routes/LaporanPoswinduRoute.js";
import LaporanAdmin from "./routes/LaporanAdmin.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/dokumentasi', express.static(path.join(__dirname, 'dokumentasi')));
app.use('/uploads/laporanAdmin/', express.static(path.join(__dirname, 'laporanAdmin')));

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 3000
}));

app.use(express.json());
app.use(UsersRoute);
app.use(JadwalRoute);
app.use(DokumentasiRoute);
app.use(AuthRoute);
app.use(LaporanRemajaRoute);
app.use(LaporanBalitaRoute);
app.use(LaporanLansiaRoute);
app.use(LaporanPoswinduRoute);
app.use(LaporanAdmin);

app.use(bodyParser.urlencoded({ extended: true }));

// store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
})