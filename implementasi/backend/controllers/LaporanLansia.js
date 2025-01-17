import LaporanLansia from "../models/LaporanLansiaModel.js";

export const getLaporanLansia = async (req, res) =>{
    try{
        const response = await LaporanLansia.findAll({
            attributes: ['uuid', 'rw','bulan_pemeriksaan', 'kategori', 'nama','jenis_kelamin', 'tekanan_darah', 'berat_badan', 'tinggi_badan', 'gula_darah_puasa', 'gula_darah_sesudah_makan', 'kolesterol', 'asam_urat', 'status_kesehatan'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getLaporanLansiaById = async (req, res) =>{
    try{
        const response = await LaporanLansia.findOne({
            attributes: ['uuid', 'rw','bulan_pemeriksaan', 'kategori', 'nama','jenis_kelamin', 'tekanan_darah', 'berat_badan', 'tinggi_badan', 'gula_darah_puasa', 'gula_darah_sesudah_makan', 'kolesterol', 'asam_urat', 'status_kesehatan'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createLaporanLansia = async (req, res) =>{
    const { rw, bulan_pemeriksaan, kategori, nama, jenis_kelamin, tekanan_darah, berat_badan, tinggi_badan, gula_darah_puasa, gula_darah_sesudah_makan, kolesterol, asam_urat, status_kesehatan} = req.body;
    try {
        await LaporanLansia.create({
            rw: rw,
            bulan_pemeriksaan: bulan_pemeriksaan,
            kategori: kategori,
            nama: nama,
            jenis_kelamin: jenis_kelamin,
            tekanan_darah: tekanan_darah,
            berat_badan: berat_badan,
            tinggi_badan: tinggi_badan,
            gula_darah_puasa: gula_darah_puasa,
            gula_darah_sesudah_makan: gula_darah_sesudah_makan,
            kolesterol: kolesterol,
            asam_urat: asam_urat,
            status_kesehatan: status_kesehatan,
        });
        res.status(201).json({msg: "Laporan Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateLaporanLansia = async (req, res) =>{
    const laporanLansia = await LaporanLansia.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!laporanLansia) return res.status(404).json({msg: "LaporanLansia tidak ditemukan"});
    const { rw, bulan_pemeriksaan, kategori, nama, jenis_kelamin, tekanan_darah, berat_badan, tinggi_badan, gula_darah_puasa, gula_darah_sesudah_makan, kolesterol, asam_urat, status_kesehatan} = req.body;
    try {
        await LaporanLansia.update({
            rw: rw,
            bulan_pemeriksaan: bulan_pemeriksaan,
            kategori: kategori,
            nama: nama,
            jenis_kelamin: jenis_kelamin,
            tekanan_darah: tekanan_darah,
            berat_badan: berat_badan,
            tinggi_badan: tinggi_badan,
            gula_darah_puasa: gula_darah_puasa,
            gula_darah_sesudah_makan: gula_darah_sesudah_makan,
            kolesterol: kolesterol,
            asam_urat: asam_urat,
            status_kesehatan: status_kesehatan,
        },{
            where:{
                id: laporanLansia.id
            }
        });
        res.status(200).json({msg: "Laporan Lansia Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteLaporanLansia = async (req, res) =>{
    const laporanLansia = await LaporanLansia.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!laporanLansia) return res.status(404).json({msg: "Laporan Lansia tidak ditemukan"});
    try {
        await LaporanLansia.destroy({
            where:{
                id: laporanLansia.id
            }
        });
        res.status(200).json({msg: "Laporan Lansia Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
