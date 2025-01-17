import express from "express";
import {
    getUploadLaporanAdmin,
    getLaporanAdmin,
    getLaporanAdminById,
    createLaporanAdmin,
    updateLaporanAdmin,
    deleteLaporanAdmin
} from "../controllers/LaporanAdmin.js";
import { verifyUser} from "../middleware/AuthUser.js";
import { laporanUpload } from "../multerConfig.js";

const router = express.Router();

router.get('/laporanAdmin',verifyUser,  getLaporanAdmin);
router.get('uploads/laporanAdmin',verifyUser,  getUploadLaporanAdmin);
router.get('/laporanAdmin/:id', verifyUser, getLaporanAdminById);
router.post('/laporanAdmin', verifyUser, laporanUpload.single('dokumen_laporan'), createLaporanAdmin);
router.patch('/laporanAdmin/:id', verifyUser, laporanUpload.single('dokumen_laporan'), updateLaporanAdmin);
router.delete('/laporanAdmin/:id', verifyUser, deleteLaporanAdmin);

export default router;