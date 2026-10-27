const Prodi = require('../models/prodiModel');
exports.create = async (req, res) => {
  try {
    const prodi = await Prodi.create(req.body);
    res.status(201).json(prodi);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  const filter = {};
  if (req.query.kota) {
    filter['alamat.kota'] = String(req.query.kota);
  }
  if (req.query.prodi) {
    const prodi = await Prodi.findOne({ kode: String(req.query.prodi).toUpperCase() });
    // Kode prodi tidak dikenal -> hasil kosong ($in: [] tidak cocok dengan apa pun)
    filter.prodiId = prodi ? prodi._id : { $in: [] };
  }
  const data = await Mahasiswa.find(filter).populate('prodiId');
  res.json(data);
};