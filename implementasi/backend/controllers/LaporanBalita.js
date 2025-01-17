import LaporanBalita from "../models/LaporanBalitaModel.js";

export const getLaporanBalita = async (req, res) =>{
    try{
        const response = await LaporanBalita.findAll({
            attributes: ['uuid', 'rw','bulan_pemeriksaan', 'kategori', 'nama', 'nama_orangtua', 'tanggal_lahir', 'jenis_kelamin', 'alamat', 'berat_badan', 'tinggi_badan', 'lingkar_kepala', 'suhu_tubuh', 'detak_jantung', 'status_gizi', 'status_kesehatan'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getLaporanBalitaById = async (req, res) =>{
    try{
        const response = await LaporanBalita.findOne({
            attributes: ['uuid', 'rw','bulan_pemeriksaan', 'kategori', 'nama', 'nama_orangtua', 'tanggal_lahir', 'jenis_kelamin', 'alamat', 'berat_badan', 'tinggi_badan', 'lingkar_kepala', 'suhu_tubuh', 'detak_jantung', 'status_gizi', 'status_kesehatan'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createLaporanBalita = async (req, res) =>{
    const { rw, bulan_pemeriksaan, kategori, nama, nama_orangtua, tanggal_lahir, jenis_kelamin, alamat, berat_badan, tinggi_badan, lingkar_kepala, suhu_tubuh, detak_jantung, status_gizi, status_kesehatan} = req.body;
    try {
        await LaporanBalita.create({
            rw: rw,
            bulan_pemeriksaan: bulan_pemeriksaan,
            kategori: kategori,
            nama: nama,
            nama_orangtua: nama_orangtua,
            tanggal_lahir: tanggal_lahir,
            jenis_kelamin: jenis_kelamin,
            alamat: alamat,
            berat_badan: berat_badan,
            tinggi_badan: tinggi_badan,
            lingkar_kepala: lingkar_kepala,
            suhu_tubuh: suhu_tubuh,
            detak_jantung: detak_jantung,
            status_gizi: status_gizi,
            status_kesehatan: status_kesehatan,
        });
        res.status(201).json({msg: "Laporan Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateLaporanBalita = async (req, res) =>{
    const laporanBalita = await LaporanBalita.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!laporanBalita) return res.status(404).json({msg: "LaporanBalita tidak ditemukan"});
    const { rw, bulan_pemeriksaan, kategori, nama, nama_orangtua, tanggal_lahir, jenis_kelamin, alamat, berat_badan, tinggi_badan, lingkar_kepala, suhu_tubuh, detak_jantung, status_gizi, status_kesehatan} = req.body;
    try {
        await LaporanBalita.update({
            rw: rw,
            bulan_pemeriksaan: bulan_pemeriksaan,
            kategori: kategori,
            nama: nama,
            nama_orangtua: nama_orangtua,
            tanggal_lahir: tanggal_lahir,
            jenis_kelamin: jenis_kelamin,
            alamat: alamat,
            berat_badan: berat_badan,
            tinggi_badan: tinggi_badan,
            lingkar_kepala: lingkar_kepala,
            suhu_tubuh: suhu_tubuh,
            detak_jantung: detak_jantung,
            status_gizi: status_gizi,
            status_kesehatan: status_kesehatan,
        },{
            where:{
                id: laporanBalita.id
            }
        });
        res.status(200).json({msg: "Laporan Balita Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteLaporanBalita = async (req, res) =>{
    const laporanBalita = await LaporanBalita.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!laporanBalita) return res.status(404).json({msg: "Laporan Balita tidak ditemukan"});
    try {
        await LaporanBalita.destroy({
            where:{
                id: laporanBalita.id
            }
        });
        res.status(200).json({msg: "Laporan Balita Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
