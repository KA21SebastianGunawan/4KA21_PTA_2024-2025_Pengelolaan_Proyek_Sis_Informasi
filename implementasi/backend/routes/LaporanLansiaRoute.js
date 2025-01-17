import express from "express";
import {
    getLaporanLansia,
    getLaporanLansiaById,
    createLaporanLansia,
    updateLaporanLansia,
    deleteLaporanLansia
} from "../controllers/LaporanLansia.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/laporanLansia', verifyUser, getLaporanLansia);
router.get('/laporanLansia/:id', verifyUser, getLaporanLansiaById);
router.post('/laporanLansia', verifyUser, createLaporanLansia);
router.patch('/laporanLansia/:id', verifyUser, updateLaporanLansia);
router.delete('/laporanLansia/:id', verifyUser, deleteLaporanLansia);

export default router;