/*
Nama: Reynaldi Abditio
Tanggal: 17 Oktober 2026
Tujuan: Membersihkan data, memproses transaksi kasir Kedai Senja, dan membuat laporan harian.
*/

// ==============================
// BAGIAN 2: DATA & PEMBERSIHAN
// ==============================
const kedai = {
  nama: "Kedai Senja",
  pemilik: "Budi",
  kota: "Jakarta",
  tahunBerdiri: 2022,
  sedangBuka: true,
  nomorWhatsApp: "08123456789",
  website: null,
  jamOperasional: { buka: "09:00", tutup: "22:00" }
};

const menu = [
  { nama: "Kopi Susu", kategori: "Minuman", harga: 20000, stok: 50 },
  { nama: "Teh Tarik", kategori: "Minuman", harga: 15000, stok: 30 },
  { nama: "Roti Bakar", kategori: "Makanan", harga: 25000, stok: 20 },
  { nama: "Kentang Goreng", kategori: "Camilan", harga: 18000, stok: 40 },
  { nama: "Nasi Goreng", kategori: "Makanan", harga: 35000, stok: 15 },
  { nama: "Es Krim", kategori: "Dessert", harga: 12000, stok: 0 },
  { nama: "Americano", kategori: "Minuman", harga: 22000, stok: 25 },
  { nama: "Pisang Goreng", kategori: "Camilan", harga: 15000, stok: 10 }
];

const transaksiMentah = [
  { kode: "trx-001", pelanggan: "  rina WULANDARI ", hari: "Sabtu", uangBayar: "150.000", voucher: " diskon10 ", pesanan: [{ menu: " kopi SUSU", jumlah: "2" }, { menu: "ROTI bakar", jumlah: "1" }] },
  { kode: "trx-002", pelanggan: "andi", hari: "jumat", uangBayar: "50000", voucher: "PROMO5", pesanan: [{ menu: "teh tarik", jumlah: "3" }] },
  { kode: "trx-003", pelanggan: "", hari: "minggu", uangBayar: "100000", voucher: "", pesanan: [] },
  { kode: "trx-004", pelanggan: "Budi  Santoso", hari: "Senin", uangBayar: "20.000", voucher: "DISKON20", pesanan: [{ menu: "es krim", jumlah: "2" }, { menu: "kopi susu", jumlah: "1" }] }, // es krim stok 0
  { kode: "trx-005", pelanggan: "siti", hari: "Sabtu", uangBayar: "10000", voucher: "", pesanan: [{ menu: "nasi goreng", jumlah: "1" }] }, // uang kurang
  { kode: "trx-006", pelanggan: "Joko", hari: "Rabu", uangBayar: "200.000", voucher: "diskon50", pesanan: [{ menu: "kentang goreng", jumlah: "2" }] }
];

// Function Declarations, Expressions, Arrow Functions
function bersihkanNama(teks) {
  if (!teks.trim()) return "";
  return teks.trim().replace(/\s+/g, ' ').split(' ')
    .map(kata => kata.charAt(0).toUpperCase() + kata.slice(1).toLowerCase())
    .join(' ');
}

const ubahKeAngka = function(teks) {
  const angka = Number(teks.replaceAll('.', '').replace(/\s/g, ''));
  return isNaN(angka) ? 0 : angka;
};

const ambilPersenVoucher = (kode) => {
  const bersih = kode.trim().toUpperCase();
  if (bersih.startsWith("DISKON")) {
    const angka = parseInt(bersih.replace("DISKON", ""));
    return isNaN(angka) ? 0 : angka;
  }
  return 0;
};

function formatRupiah(angka) {
  let rupiah = '';
  const angkarev = angka.toString().split('').reverse().join('');
  for (let i = 0; i < angkarev.length; i++) {
    if (i % 3 === 0 && i !== 0) rupiah += '.';
    rupiah += angkarev[i];
  }
  return 'Rp ' + rupiah.split('').reverse().join('');
}

const transaksiBersih = [];
for (let trx of transaksiMentah) {
  transaksiBersih.push({
    kode: trx.kode.toUpperCase(),
    pelanggan: bersihkanNama(trx.pelanggan),
    hari: trx.hari.toLowerCase().trim(),
    uangBayar: ubahKeAngka(trx.uangBayar),
    persenVoucher: ambilPersenVoucher(trx.voucher),
    pesanan: trx.pesanan.map(p => ({
      menu: bersihkanNama(p.menu),
      jumlah: ubahKeAngka(p.jumlah)
    }))
  });
}
console.log("Transaksi Bersih:", transaksiBersih);

/* Jawaban Bagian 2:
1. `parseInt` mengubah ke integer mengabaikan desimal/teks setelah angka, `parseFloat` untuk desimal, `Number` strict mengubah tipe data. `ubahKeAngka` menghapus titik karena titik dibaca sebagai desimal oleh JS, bukan ribuan. `parseInt("150.000")` mengembalikan 150.
2. `toFixed` mengembalikan teks (string). `typeof (1.5).toFixed(2)` adalah string. Jika dijumlahkan, terjadi konkatenasi string (misal "1.50" + 2 = "1.502").
3. `replace` hanya mengubah kemunculan pertama (kecuali pakai regex /g), `replaceAll` mengubah semua kemunculan. `ubahKeAngka` butuh `replaceAll` untuk menghapus semua titik jika ada uang jutaan (misal "1.500.000").
4. Method string seperti `toUpperCase()` tidak mengubah variabel asli (immutable) melainkan mengembalikan string baru.
5. Function declaration (`bersihkanNama`) bisa di-hoisting. Expression (`ubahKeAngka`) cocok disimpan di variabel. Arrow (`ambilPersenVoucher`) ringkas tanpa binding `this` baru.
*/