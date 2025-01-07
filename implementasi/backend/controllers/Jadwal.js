import JadwalPelayanan from "../models/JadwalModel.js";
import Users from "../models/UsersModel.js";
import {Op} from "sequelize";

export const getJadwal = async (req, res) => {
    try {
        const { kategori } = req.query; // Ambil parameter kategori dari query
        let whereClause = {};

        // Jika kategori diberikan, tambahkan ke whereClause
        if (kategori) {
            whereClause.kategori = kategori;
        }

        let response;
        if (req.role === "admin") {
            response = await JadwalPelayanan.findAll({
                attributes: ['uuid', 'rw', 'kategori', 'jadwal'],
                where: whereClause, // Filter berdasarkan kategori
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            whereClause.userId = req.userId; // Tambahkan userId untuk non-admin
            response = await JadwalPelayanan.findAll({
                attributes: ['uuid', 'rw', 'kategori', 'jadwal'],
                where: whereClause, // Filter berdasarkan kategori dan userId
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getJadwalById = async (req, res) => {
    try {
        const { kategori, rw } = req.query;
        // Lakukan query ke database berdasarkan kategori dan rw
        const jadwal = await JadwalPelayanan.findAll({
            where: { kategori, rw }
        });
        res.status(200).json(jadwal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createJadwal = async (req, res) =>{
    const {rw, kategori, jadwal} = req.body;
    try {
        await JadwalPelayanan.create({
            rw: rw,
            kategori: kategori,
            jadwal: jadwal,
            userId: req.userId
        });
        res.status(201).json({msg: "Jadwal Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}

export const updateJadwal = async (req, res) =>{
    try {
        const Jadwal = await JadwalPelayanan.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!Jadwal) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {rw, kategori, jadwal} = req.body;
        if(req.role === "admin"){
            await JadwalPelayanan.update({rw, kategori, jadwal}, {
                where:{
                    id: Jadwal.id
                }
            });
        }else{
            if(req.userId != Jadwal.userId) return res.status(403).json({msg: "Akses terlarang"});
            await JadwalPelayanan.update({rw, kategori, jadwal}, {
                where:{
                    [Op.and]:[{id: Jadwal.id}, {userId: req.userId}]
                },
            });
        }
        res.status(200).json({msg: "Jadwal updated successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteJadwal = async (req, res) =>{
    try {
        const Jadwal = await JadwalPelayanan.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!Jadwal) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {rw, kategori, jadwal} = req.body;
        if(req.role === "admin"){
            await JadwalPelayanan.destroy( {
                where:{
                    id: Jadwal.id
                }
            });
        }else{
            if(req.userId != Jadwal.userId) return res.status(403).json({msg: "Akses terlarang"});
            await JadwalPelayanan.destroy({
                where:{
                    [Op.and]:[{id: Jadwal.id}, {userId: req.userId}]
                },
            });
        }
        res.status(200).json({msg: "Jadwal deleted successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
