import express from "express";
import {
    getJadwal,
    getJadwalById,
    getJadwalByKategori,
    createJadwal,
    updateJadwal,
    deleteJadwal,
    getJadwalPublic
} from "../controllers/Jadwal.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/jadwal',verifyUser, getJadwal);
router.get('/jadwal/:id', verifyUser , getJadwalById);
router.get('/jadwalPublic', getJadwalPublic);
router.get('/bykategori' , getJadwalByKategori);
router.post('/jadwal', verifyUser, createJadwal);
router.patch('/jadwal/:id', verifyUser, updateJadwal);
router.delete('/jadwal/:id', verifyUser, deleteJadwal);

export default router;