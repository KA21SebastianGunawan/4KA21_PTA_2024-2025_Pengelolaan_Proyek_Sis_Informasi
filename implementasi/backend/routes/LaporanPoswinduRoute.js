import express from "express";
import {
    getLaporanPoswindu,
    getLaporanPoswinduById,
    createLaporanPoswindu,
    updateLaporanPoswindu,
    deleteLaporanPoswindu
} from "../controllers/LaporanPoswindu.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/laporanPoswindu', verifyUser, getLaporanPoswindu);
router.get('/laporanPoswindu/:id', verifyUser, getLaporanPoswinduById);
router.post('/laporanPoswindu', verifyUser, createLaporanPoswindu);
router.patch('/laporanPoswindu/:id', verifyUser, updateLaporanPoswindu);
router.delete('/laporanPoswindu/:id', verifyUser, deleteLaporanPoswindu);

export default router;