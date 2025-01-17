import LaporanAdmin from "../models/LaporanAdminModel.js";
import Users from "../models/UsersModel.js";
import {Op} from "sequelize";
import fs from 'fs';
import path from 'path';

export const getUploadLaporanAdmin = async (req, res) => {
    try {
      const filePath = path.join(__dirname, '../uploads/laporanAdmin');
      const files = await fs.readdirSync(filePath);
  
      res.json(files);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Gagal mengakses file' });
    }
  };
  

export const getLaporanAdmin = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await LaporanAdmin.findAll({
                attributes: ['uuid', 'rw', 'bulan_pemeriksaan', 'kategori', 'dokumen_laporan'],
                include: [{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await LaporanAdmin.findAll({
                attributes: ['uuid', 'rw', 'bulan_pemeriksaan', 'kategori', 'dokumen_laporan'],
                where:{
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getLaporanAdminById = async (req, res) =>{
    try {
        const laporanAdmin = await LaporanAdmin.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!laporanAdmin) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await LaporanAdmin.findOne({
                attributes: ['uuid', 'rw', 'bulan_pemeriksaan', 'kategori', 'dokumen_laporan'],
                    where:{
                        id: laporanAdmin.id
                    },
                include: [{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await LaporanAdmin.findOne({
                attributes: ['uuid', 'rw', 'bulan_pemeriksaan', 'kategori', 'dokumen_laporan'],
                where:{
                    [Op.and]:[{id: laporanAdmin.id}, {userId: req.userId}]
                },
                include: [{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createLaporanAdmin = async (req, res) =>{
    try {
        const { rw, bulan_pemeriksaan, kategori} = req.body;
        const dokumen_laporan = req.file ? req.file.filename : '';
        await LaporanAdmin.create({
            rw: rw,
            bulan_pemeriksaan: bulan_pemeriksaan,
            kategori: kategori,
            dokumen_laporan: dokumen_laporan,
            userId: req.userId
        });

        res.status(201).json({ msg: "LaporanAdmin Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateLaporanAdmin = async (req, res) => {
    try {
        const laporanAdmin = await LaporanAdmin.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!laporanAdmin) return res.status(404).json({ msg: "Data tidak ditemukan" });

        const { rw, bulan_pemeriksaan, kategori} = req.body;

        if (req.file) {
            const oldFilePath = path.join(process.cwd(), 'uploads', 'laporanAdmin', laporanAdmin.dokumen_laporan);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath); 
            }
            laporanAdmin.dokumen_laporan = req.file.filename;
        }

        // Update data laporanAdmin
        laporanAdmin.rw = rw;
        laporanAdmin.bulan_pemeriksaan = bulan_pemeriksaan;
        laporanAdmin.kategori = kategori;

        await laporanAdmin.save(); // Simpan perubahan ke database

        res.status(200).json({ msg: "Data LaporanAdmin berhasil diperbarui" });
    } catch (error) {
        console.error("Error in updateLaporanAdmin:", error);
        res.status(500).json({ msg: error.message });
    }
}

export const deleteLaporanAdmin = async (req, res) => {
    try {
        const laporanAdmin = await LaporanAdmin.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if (!laporanAdmin) {
            console.error("Data not found");
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        // Check if dokumen_laporan is defined
        if (laporanAdmin.dokumen_laporan) {
            // Hapus file gambar dari folder uploads
            const filePath = path.join(process.cwd(), 'uploads', 'laporanAdmin', laporanAdmin.dokumen_laporan);
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${laporanAdmin.dokumen_laporan}: ${err}`);
                    } else {
                        console.log(`Deleted file ${laporanAdmin.dokumen_laporan}`);
                    }
                });
            }
        }

        await LaporanAdmin.destroy({
            where: {
                uuid: req.params.id,
            }
        });

        res.status(200).json({ msg: "LaporanAdmin deleted successfully" });
    } catch (error) {
        console.error("Error in delete LaporanAdmin:", error);
        res.status(500).json({ msg: error.message });
    }
}
