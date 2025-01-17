const express = require('express');
const pdfkit = require('pdfkit');

const app = express();

// Endpoint untuk mengunduh PDF
app.get('/unduh-pdf', (req, res) => {
  const { kategori, rw, bulan } = req.query;
  const data = {// ambil data dari database berdasarkan kategori, RW, dan bulan
  kategori: kategori,
  rw: rw,
  bulan: bulan
  }

  // Buat PDF dari data
  const pdf = new pdfkit();
  pdf.fontSize(24).text('Laporan Data', 100, 100);
  pdf.fontSize(18).text('Kategori: ' + kategori, 100, 150);
  pdf.fontSize(18).text('RW: ' + rw, 100, 200);
  pdf.fontSize(18).text('Bulan: ' + bulan, 100, 250);

  // Tambahkan tabel data ke PDF
  pdf.fontSize(14).text('No', 100, 300);
  pdf.fontSize(14).text('Nama', 200, 300);
  pdf.fontSize(14).text('Alamat', 300, 300);

  data.forEach((item, index) => {
    pdf.fontSize(14).text(index + 1, 100, 350 + index * 50);
    pdf.fontSize(14).text(item.nama, 200, 350 + index * 50);
    pdf.fontSize(14).text(item.alamat, 300, 350 + index * 50);
  });

  // Kirimkan PDF ke client sebagai respons
  res.setHeader('Content-Disposition', 'attachment; filename="laporan-data.pdf"');
  res.setHeader('Content-Type', 'application/pdf');
  pdf.pipe(res);
  pdf.end();
});