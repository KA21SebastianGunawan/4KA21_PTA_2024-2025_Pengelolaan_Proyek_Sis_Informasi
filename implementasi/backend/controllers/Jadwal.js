import JadwalPelayanan from "../models/JadwalModel.js";
import Users from "../models/UsersModel.js";
import {Op} from "sequelize";

export const getJadwal = async (req, res) => {
    try {

        let response;
        if (req.role === "admin") {
            response = await JadwalPelayanan.findAll({
                attributes: ['uuid', 'rw', 'kategori', 'jadwal'],
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]
            });
        } else {
            response = await JadwalPelayanan.findAll({
                attributes: ['uuid', 'rw', 'kategori', 'jadwal'],
                where:{
                    userId: req.userId
                },
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

export const getJadwalPublic = async (req, res) => {
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
                // include: [{
                //     model: Users,
                //     attributes: ['name', 'email']
                // }]
            });
        } else {
            response = await JadwalPelayanan.findAll({
                attributes: ['uuid', 'rw', 'kategori', 'jadwal'],
                where: whereClause, // Filter berdasarkan kategori dan userId
                // include: [{
                //     model: Users,
                //     attributes: ['name', 'email']
                // }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const getJadwalById = async (req, res) =>{
    try {
        const jadwal = await JadwalPelayanan.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!jadwal) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await JadwalPelayanan.findOne({
                attributes: ['uuid', 'rw', 'kategori', 'jadwal'],
                    where:{
                        id: jadwal.id
                    },
                include: [{
                    model: Users,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await JadwalPelayanan.findOne({
                attributes: ['uuid', 'rw', 'kategori', 'jadwal'],
                where:{
                    [Op.and]:[{id: jadwal.id}, {userId: req.userId}]
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

export const getJadwalByKategori = async (req, res) => {
    try {
      const { kategori, rw } = req.query; // Ambil parameter query kategori dan rw
  
      // Validasi parameter query
      if (!kategori || !rw) {
        return res.status(400).json({ msg: "Parameter kategori dan RW diperlukan" });
      }
  
      // Cari jadwal berdasarkan kategori dan RW
      const jadwal = await JadwalPelayanan.findAll({
        where: {
          kategori: kategori,
          rw: rw,
        },
        attributes: ['uuid', 'rw', 'kategori', 'jadwal'], // Hanya ambil kolom yang diperlukan

      });
  
      // Jika tidak ada data yang ditemukan
      if (!jadwal || jadwal.length === 0) {
        return res.status(404).json({ msg: "Data tidak ditemukan" });
      }
  
      // Kirim data jadwal sebagai respons
      res.status(200).json(jadwal);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };


export const createJadwal = async (req, res) => {
    const { rw, kategori, jadwal } = req.body;

    try {
        await JadwalPelayanan.create({
            rw: rw,
            kategori: kategori,
            jadwal: jadwal,
            userId: req.userId
        });
        res.status(201).json({ msg: "Jadwal Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
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
