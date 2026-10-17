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

// ==============================
// BAGIAN 3: MESIN KASIR
// ==============================
const kasir = {
  menu: menu,
  saldoKas: 0,
  riwayat: [],
  pecahan: [50000, 20000, 10000, 5000, 2000, 1000],

  cariMenu(nama) {
    for (let m of this.menu) {
      if (m.nama === nama) return m;
    }
    return null;
  },

  hitungSubtotal(pesanan) {
    let subtotal = 0;
    const itemValid = [];
    const itemTidakValid = [];

    for (let item of pesanan) {
      const dataMenu = this.cariMenu(item.menu);
      if (!dataMenu) {
        itemTidakValid.push({ menu: item.menu, alasan: "Menu tidak ditemukan" });
        continue;
      }
      if (item.jumlah <= 0) {
        itemTidakValid.push({ menu: item.menu, alasan: "Jumlah tidak valid" });
        continue;
      }
      if (dataMenu.stok < item.jumlah) {
        itemTidakValid.push({ menu: item.menu, alasan: "Stok tidak cukup" });
        continue;
      }
      subtotal += dataMenu.harga * item.jumlah;
      itemValid.push({ menu: item.menu, jumlah: item.jumlah, harga: dataMenu.harga });
    }
    return { subtotal, itemValid, itemTidakValid };
  },

  hitungPromoHari(hari) {
    let promo = 0;
    switch (hari) {
      case "jumat":
        promo = 3000;
        break;
      case "sabtu":
      case "minggu":
        promo = 5000;
        break;
      default:
        promo = 0;
        break;
    }
    return promo;
  },

  hitungDiskon(subtotal, persenVoucher) {
    let persenSub = 0;
    if (subtotal >= 100000) persenSub = 15;
    else if (subtotal >= 50000) persenSub = 10;
    else if (subtotal >= 25000) persenSub = 5;

    const persenFinal = Math.max(persenSub, persenVoucher);
    return Math.round(subtotal * persenFinal / 100);
  },

  hitungPajak(nilai, tarif = 0.11) {
    return Math.round(nilai * tarif);
  },

  hitungKembalianPecahan(kembalian) {
    if (kembalian < 0) return null;
    let sisa = kembalian;
    const hasil = {};
    for (let nominal of this.pecahan) {
      let lembar = 0;
      while (sisa >= nominal) {
        sisa -= nominal;
        lembar++;
      }
      if (lembar > 0) hasil[nominal] = lembar;
    }
    hasil.sisa = sisa;
    return hasil;
  },

  prosesTransaksi(trx) {
    if (!trx.pelanggan) {
      const hasil = { kode: trx.kode, pelanggan: trx.pelanggan, status: "DITOLAK", alasan: "Nama pelanggan kosong" };
      this.riwayat.push(hasil); return hasil;
    }
    if (!trx.pesanan.length) {
      const hasil = { kode: trx.kode, pelanggan: trx.pelanggan, status: "DITOLAK", alasan: "Pesanan kosong" };
      this.riwayat.push(hasil); return hasil;
    }

    const { subtotal, itemValid, itemTidakValid } = this.hitungSubtotal(trx.pesanan);
    if (!itemValid.length) {
      const hasil = { kode: trx.kode, pelanggan: trx.pelanggan, status: "DITOLAK", alasan: "Tidak ada item valid" };
      this.riwayat.push(hasil); return hasil;
    }

    const promoHari = this.hitungPromoHari(trx.hari);
    const diskon = this.hitungDiskon(subtotal, trx.persenVoucher);
    let nilaiSetelahDiskon = subtotal - diskon - promoHari;
    if (nilaiSetelahDiskon < 0) nilaiSetelahDiskon = 0;
    
    const pajak = this.hitungPajak(nilaiSetelahDiskon);
    const total = nilaiSetelahDiskon + pajak;
    const kembalian = trx.uangBayar - total;
    const status = kembalian >= 0 ? "LUNAS" : "KURANG";
    
    let pecahanKembalian = null;
    if (status === "LUNAS") {
      itemValid.forEach(item => {
        const m = this.cariMenu(item.menu);
        m.stok -= item.jumlah;
      });
      this.saldoKas += total;
      pecahanKembalian = this.hitungKembalianPecahan(kembalian);
    }

    const hasil = { kode: trx.kode, pelanggan: trx.pelanggan, status, subtotal, promoHari, diskon, pajak, total, uangBayar: trx.uangBayar, kembalian, pecahanKembalian, itemValid, itemTidakValid };
    this.riwayat.push(hasil);
    return hasil;
  },

  cetakStruk(hasil) {
    console.log(`\n=== STRUK ${hasil.kode} ===`);
    console.log(`Pelanggan: ${hasil.pelanggan || '-'}`);
    if (hasil.status === "DITOLAK") {
      console.log(`Status: DITOLAK\nAlasan: ${hasil.alasan}`);
      return;
    }
    
    console.log("Pesanan:");
    hasil.itemValid.forEach((item, i) => console.log(`${i+1}. ${item.menu} (x${item.jumlah}) - ${formatRupiah(item.harga)}`));
    if (hasil.itemTidakValid.length) {
      console.log("Item Ditolak:");
      hasil.itemTidakValid.forEach(item => console.log(`- ${item.menu}: ${item.alasan}`));
    }
    console.log(`Subtotal: ${formatRupiah(hasil.subtotal)}`);
    console.log(`Promo Hari: -${formatRupiah(hasil.promoHari)}`);
    console.log(`Diskon: -${formatRupiah(hasil.diskon)}`);
    console.log(`Pajak: ${formatRupiah(hasil.pajak)}`);
    console.log(`TOTAL: ${formatRupiah(hasil.total)}`);
    console.log(`Bayar: ${formatRupiah(hasil.uangBayar)}`);
    console.log(`Kembalian: ${formatRupiah(hasil.kembalian)}`);
    console.log(`Status: ${hasil.status}`);
    if (hasil.pecahanKembalian) {
      console.log("Pecahan:", JSON.stringify(hasil.pecahanKembalian));
    }
  }
};

const TARGET_KAS = 1000000; // Ubah ke nilai kecil untuk eksperimen break
for (let trx of transaksiBersih) {
  const hasil = kasir.prosesTransaksi(trx);
  kasir.cetakStruk(hasil);
  if (kasir.saldoKas >= TARGET_KAS) {
    console.log("Target kas tercapai");
    break;
  }
}

/* Jawaban Bagian 3:
1. `this.menu` digunakan karena variabel berada dalam object instance. `this` merujuk pada object `kasir` itu sendiri.
2. `switch` cocok karena mengecek nilai absolut (string hari). Saya tidak menulis `break` pada `case "sabtu":` agar langsung jatuh/gabung ke `"minggu"` (fall-through) karena promonya sama.
3. `!trx.pesanan.length` bernilai benar (masuk if) jika length adalah 0 (0 itu falsy). Nilai Falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN`.
4. `break` (di loop TARGET_KAS) menghentikan perulangan sepenuhnya. `continue` (di `hitungSubtotal`) melompati sisa kode pada iterasi saat ini dan lanjut ke iterasi berikutnya.
5. Karena untuk struk kita perlu merinci barang apa saja yang valid dijual dan ditolak, bukan sekadar angka harga akhirnya saja.
6. `while` memastikan satu pecahan diulang pengurangannya selama sisa masih lebih besar. Bisa memakai `%` dan `/` (misal Math.floor(sisa / nominal)), hasilnya lebih efisien secara matematis.
*/