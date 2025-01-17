const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const app = express();

// Konfigurasi Passport.js
passport.use(new LocalStrategy((username, password, done) => {
  // Cari user dengan username dan password
  User.findOne({ username: username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    if (!user.validPassword(password)) { return done(null, false); }
    return done(null, user);
  });
}));

// Endpoint untuk mengirim laporan ke admin
app.post('/kirim-laporan', passport.authenticate('local', { session: false }), (req, res) => {
  const { kategori, rw, bulan } = req.body;
  const data = { // ambil data dari database berdasarkan kategori, RW, dan bulan
    kategori: kategori,
    rw: rw,
    bulan: bulan
  }
  // Periksa apakah user memiliki role admin
  if (req.user.role === 'admin') {
    // Kirimkan data ke admin
    res.send('Laporan telah dikirim ke admin');
  } else {
    res.status(401).send('Anda tidak memiliki akses untuk mengirim laporan ke admin');
  }
});