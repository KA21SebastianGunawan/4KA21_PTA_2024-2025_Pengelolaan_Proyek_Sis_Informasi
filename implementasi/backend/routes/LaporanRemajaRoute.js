import express from "express";
import {
    getLaporanRemaja,
    getLaporanRemajaById,
    createLaporanRemaja,
    updateLaporanRemaja,
    deleteLaporanRemaja
} from "../controllers/LaporanRemaja.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/laporanRemaja', verifyUser, getLaporanRemaja);
router.get('/laporanRemaja/:id', verifyUser, getLaporanRemajaById);
router.post('/laporanRemaja', verifyUser, createLaporanRemaja);
router.patch('/laporanRemaja/:id', verifyUser, updateLaporanRemaja);
router.delete('/laporanRemaja/:id', verifyUser, deleteLaporanRemaja);

export default router;