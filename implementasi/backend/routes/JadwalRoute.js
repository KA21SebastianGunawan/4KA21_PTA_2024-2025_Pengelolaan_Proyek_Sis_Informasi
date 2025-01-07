import express from "express";
import {
    getJadwal,
    getJadwalById,
    createJadwal,
    updateJadwal,
    deleteJadwal
} from "../controllers/Jadwal.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/jadwal', verifyUser, getJadwal);
router.get('/jadwal/bykategori', verifyUser , getJadwalById);
router.post('/jadwal', verifyUser, createJadwal);
router.patch('/jadwal/:id', verifyUser, updateJadwal);
router.delete('/jadwal/:id', verifyUser, deleteJadwal);

export default router;