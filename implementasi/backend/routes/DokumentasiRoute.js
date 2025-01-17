import express from "express";
import {
    getDokumentasi,
    getDokumentasiPublic,
    getDokumentasiById,
    createDokumentasi,
    updateDokumentasi,
    deleteDokumentasi
} from "../controllers/Dokumentasi.js";
import { verifyUser} from "../middleware/AuthUser.js";
import { dokumentasiUpload } from "../multerConfig.js";

const router = express.Router();

router.get('/dokumentasi',verifyUser,  getDokumentasi);
router.get('/dokumentasiPublic',  getDokumentasiPublic);
router.get('/dokumentasi/:id', verifyUser, getDokumentasiById);
router.post('/dokumentasi', verifyUser, dokumentasiUpload.single('image'), createDokumentasi);
router.patch('/dokumentasi/:id', verifyUser, dokumentasiUpload.single('image'), updateDokumentasi);
router.delete('/dokumentasi/:id', verifyUser, deleteDokumentasi);

export default router;