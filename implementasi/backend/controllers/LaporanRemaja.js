import LaporanRemaja from "../models/LaporanRemajaModel.js";

export const getLaporanRemaja = async (req, res) =>{
    try{
        const response = await LaporanRemaja.findAll({
            attributes: ['uuid', 'rw','bulanPemeriksaan', 'kategori', 'nik', 'nama', 'tanggalLahir', 'jenisKelamin', 'alamat', 'merokok', 'sistol', 'diastol', 'tinggiBadan', 'beratBadan', 'lingkarPerut']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getLaporanRemajaById = async (req, res) =>{
    try{
        const response = await LaporanRemaja.findOne({
            attributes: ['uuid','rw', 'bulanPemeriksaan', 'kategori', 'nik', 'nama', 'tanggalLahir', 'jenisKelamin', 'alamat', 'merokok', 'sistol', 'diastol', 'tinggiBadan', 'beratBadan', 'lingkarPerut'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createLaporanRemaja = async (req, res) =>{
    const { rw, bulanPemeriksaan, kategori, nik, nama, tanggalLahir, jenisKelamin, alamat, merokok, sistol, diastol, tinggiBadan, beratBadan, lingkarPerut} = req.body;
    try {
        await LaporanRemaja.create({
            rw: rw,
            bulanPemeriksaan: bulanPemeriksaan,
            kategori: kategori,
            nik: nik,
            nama: nama,
            tanggalLahir: tanggalLahir,
            jenisKelamin: jenisKelamin,
            alamat: alamat,
            merokok: merokok,
            sistol: sistol,
            diastol: diastol,
            tinggiBadan: tinggiBadan,
            beratBadan: beratBadan,
            lingkarPerut: lingkarPerut
        });
        res.status(201).json({msg: "Laporan Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateLaporanRemaja = async (req, res) =>{
    const laporanRemaja = await LaporanRemaja.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!laporanRemaja) return res.status(404).json({msg: "LaporanRemaja tidak ditemukan"});
    const {rw, bulanPemeriksaan, kategori, nik, nama, tanggalLahir, jenisKelamin, alamat, merokok, sistol, diastol, tinggiBadan, beratBadan, lingkarPerut} = req.body;
    try {
        await LaporanRemaja.update({
            rw: rw,
            bulanPemeriksaan:bulanPemeriksaan,
            kategori, kategori,
            nik: nik,
            nama: nama,
            tanggalLahir: tanggalLahir,
            jenisKelamin: jenisKelamin,
            alamat: alamat,
            merokok: merokok,
            sistol: sistol,
            diastol: diastol,
            tinggiBadan: tinggiBadan,
            beratBadan: beratBadan,
            lingkarPerut: lingkarPerut
        },{
            where:{
                id: laporanRemaja.id
            }
        });
        res.status(200).json({msg: "LaporanRemaja Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteLaporanRemaja = async (req, res) =>{
    const laporanRemaja = await LaporanRemaja.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!laporanRemaja) return res.status(404).json({msg: "LaporanRemaja tidak ditemukan"});
    try {
        await LaporanRemaja.destroy({
            where:{
                id: laporanRemaja.id
            }
        });
        res.status(200).json({msg: "LaporanRemaja Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
