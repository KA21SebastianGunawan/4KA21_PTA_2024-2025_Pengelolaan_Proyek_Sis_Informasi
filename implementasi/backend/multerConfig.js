import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to store files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext); 
    }
});

const storageDokumentasi = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/dokumentasi/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext); 
    }
});

const storageLaporanAdmin = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/laporanAdmin/'); 
    },
    filename: function (req, file, cb) {
        const filename = file.originalname;
        cb(null, filename); 
    }
});

export const laporanUpload = multer({ storage: storageLaporanAdmin });
export const dokumentasiUpload = multer({ storage: storageDokumentasi });
export const upload = multer({ storage: storage });
