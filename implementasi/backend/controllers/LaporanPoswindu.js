import LaporanPoswindu from "../models/LaporanPoswinduModel.js";

export const getLaporanPoswindu = async (req, res) =>{
    try{
        const response = await LaporanPoswindu.findAll({
            attributes: ['uuid', 'rw','bulan_pemeriksaan', 'kategori', 'nama','jenis_kelamin','usia_kehamilan', 'tekanan_darah', 'berat_badan', 'tinggi_badan', 'detak_jantung_janin', 'lingkar_lengan_atas', 'hemoglobin', 'protein_urin', 'status_kehamilan'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getLaporanPoswinduById = async (req, res) =>{
    try{
        const response = await LaporanPoswindu.findOne({
            attributes: ['uuid', 'rw','bulan_pemeriksaan', 'kategori', 'nama','jenis_kelamin','usia_kehamilan', 'tekanan_darah', 'berat_badan', 'tinggi_badan', 'detak_jantung_janin', 'lingkar_lengan_atas', 'hemoglobin', 'protein_urin', 'status_kehamilan'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createLaporanPoswindu = async (req, res) =>{
    const { rw, bulan_pemeriksaan, kategori, nama, jenis_kelamin, usia_kehamilan, tekanan_darah, berat_badan, tinggi_badan, detak_jantung_janin, lingkar_lengan_atas, hemoglobin, protein_urin, status_kehamilan} = req.body;
    try {
        await LaporanPoswindu.create({
            rw: rw,
            bulan_pemeriksaan: bulan_pemeriksaan,
            kategori: kategori,
            nama: nama,
            jenis_kelamin: jenis_kelamin,
            usia_kehamilan: usia_kehamilan,
            tekanan_darah: tekanan_darah,
            berat_badan: berat_badan,
            tinggi_badan: tinggi_badan,
            detak_jantung_janin: detak_jantung_janin,
            lingkar_lengan_atas: lingkar_lengan_atas,
            hemoglobin: hemoglobin,
            protein_urin: protein_urin,
            status_kehamilan: status_kehamilan,
        });
        res.status(201).json({msg: "Laporan Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateLaporanPoswindu = async (req, res) =>{
    const laporanPoswindu = await LaporanPoswindu.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!laporanPoswindu) return res.status(404).json({msg: "LaporanPoswindu tidak ditemukan"});
    const { rw, bulan_pemeriksaan, kategori, nama, jenis_kelamin, usia_kehamilan, tekanan_darah, berat_badan, tinggi_badan, detak_jantung_janin, lingkar_lengan_atas, hemoglobin, protein_urin, status_kehamilan} = req.body;
    try {
        await LaporanPoswindu.update({
            rw: rw,
            bulan_pemeriksaan: bulan_pemeriksaan,
            kategori: kategori,
            nama: nama,
            jenis_kelamin: jenis_kelamin,
            usia_kehamilan: usia_kehamilan,
            tekanan_darah: tekanan_darah,
            berat_badan: berat_badan,
            tinggi_badan: tinggi_badan,
            detak_jantung_janin: detak_jantung_janin,
            lingkar_lengan_atas: lingkar_lengan_atas,
            hemoglobin: hemoglobin,
            protein_urin: protein_urin,
            status_kehamilan: status_kehamilan,
        },{
            where:{
                id: laporanPoswindu.id
            }
        });
        res.status(200).json({msg: "Laporan Poswindu Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteLaporanPoswindu = async (req, res) =>{
    const laporanPoswindu = await LaporanPoswindu.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!laporanPoswindu) return res.status(404).json({msg: "Laporan Poswindu tidak ditemukan"});
    try {
        await LaporanPoswindu.destroy({
            where:{
                id: laporanPoswindu.id
            }
        });
        res.status(200).json({msg: "Laporan Poswindu Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
