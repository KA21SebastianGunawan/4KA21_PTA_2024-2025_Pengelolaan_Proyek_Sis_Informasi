import Dokumentasi from "../models/DokumentasiModel.js";
import Users from "../models/UsersModel.js";
import {Op} from "sequelize";
import fs from 'fs';
import path from 'path';

export const getDokumentasi = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Dokumentasi.findAll({
                attributes: ['uuid', 'image', 'judul', 'keterangan'],
                include: [{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Dokumentasi.findAll({
                attributes: ['uuid', 'image', 'judul', 'keterangan'],
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

export const getDokumentasiById = async (req, res) =>{
    try {
        const dokumentasi = await Dokumentasi.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!dokumentasi) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Dokumentasi.findOne({
                attributes: ['uuid', 'image', 'judul', 'keterangan'],
                    where:{
                        id: dokumentasi.id
                    },
                include: [{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Dokumentasi.findOne({
                attributes: ['uuid', 'image', 'judul', 'keterangan'],
                where:{
                    [Op.and]:[{id: dokumentasi.id}, {userId: req.userId}]
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

export const createDokumentasi = async (req, res) =>{
    try {
        const { judul, keterangan} = req.body;
        const image = req.file ? req.file.filename : '';
        // Pastikan data JSON yang diterima valid sebelum digunakan
        await Dokumentasi.create({
            image:image,
            judul: judul,
            keterangan: keterangan
        });

        res.status(201).json({ msg: "Dokumentasi Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateDokumentasi = async (req, res) =>{
    try {
        const dokumentasi = await Dokumentasi.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!dokumentasi) return res.status(404).json({ msg: "Data tidak ditemukan" });

        const { judul, keterangan } = req.body;

        // Handle image update
        if (req.file) {
            const oldImagePath = path.join(process.cwd(), 'uploads', 'dokumentasi', dokumentasi.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); // Hapus gambar lama
            }
            dokumentasi.image = req.file.filename; // Simpan nama file baru
        }

        // Update data dokumentasi
        dokumentasi.judul = judul;
        dokumentasi.keterangan = keterangan;

        await dokumentasi.save(); // Simpan perubahan ke database

        res.status(200).json({ msg: "Data Dokumentasi berhasil diperbarui" });
    } catch (error) {
        console.error("Error in updateDokumentasi:", error);
        res.status(500).json({ msg: error.message });
    }
}

export const deleteDokumentasi = async (req, res) =>{
    try {
        const dokumentasi = await Dokumentasi.findOne({
            where: {
                uuid: req.params.id
            }
        });

        if (!dokumentasi) {
            console.error("Data not found");
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        // Hapus file gambar dari folder uploads
        const imagePath = path.join(process.cwd(), 'dokumentasi', dokumentasi.image);
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Error deleting image ${dokumentasi.image}: ${err}`);
                } else {
                    console.log(`Deleted image ${dokumentasi.image}`);
                }
            });
        }

        await Dokumentasi.destroy({
            where: {
                uuid: req.params.id,
            }
        });

        res.status(200).json({ msg: "Dokumentasi deleted successfully" });
    } catch (error) {
        console.error("Error in delete Dokumentasi:", error);
        res.status(500).json({ msg: error.message });
    }
}
