import express from "express";
import {
    getLaporanBalita,
    getLaporanBalitaById,
    createLaporanBalita,
    updateLaporanBalita,
    deleteLaporanBalita
} from "../controllers/LaporanBalita.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/laporanBalita', verifyUser, getLaporanBalita);
router.get('/laporanBalita/:id', verifyUser, getLaporanBalitaById);
router.post('/laporanBalita', verifyUser, createLaporanBalita);
router.patch('/laporanBalita/:id', verifyUser, updateLaporanBalita);
router.delete('/laporanBalita/:id', verifyUser, deleteLaporanBalita);

export default router;