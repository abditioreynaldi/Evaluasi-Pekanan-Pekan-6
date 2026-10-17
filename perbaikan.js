const TARIF_PAJAK = 0.11;
const harga = { kopi: 20000, teh: 7500, roti: 15000 };
let keranjang = ["kopi", "teh", "roti", "teh"];
let jumlahMember = 5; // FIX: Ubah dari string "5" jadi integer 5

const pelanggan = {
  nama: "rina",
  saldo: 100000,
  bayar(jumlah) {
    this.saldo -= jumlah; // FIX: Tambahkan this. untuk akses property object
    return this.saldo;
  },
};

let subtotal = 0;
// FIX: Ubah i <= keranjang.length menjadi i < keranjang.length (out of bounds array)
for (let i = 0; i < keranjang.length; i++) {
  subtotal += harga[keranjang[i]];
}

let persen;
// FIX: Urutan if salah, 50000 harus ditaruh paling atas agar 50000 tidak ditangkap kondisi >= 25000 lebih dulu
if (subtotal >= 50000) {
  persen = 10;
} else if (subtotal >= 25000) {
  persen = 5;
} else {
  persen = 0;
}
let diskon = (subtotal * persen) / 100;

let hari = "jumat";
let promo;
switch (hari) {
  case "jumat":
    promo = 3000;
    break; // FIX: Tambahkan break, kalau tidak akan diteruskan (fallthrough) ke sabtu
  case "sabtu":
  case "minggu":
    promo = 5000;
    break;
  default:
    promo = 0;
}

// FIX: Kurung buka/tutup pada prioritas operasi aritmatika sebelum dikali TARIF_PAJAK
let pajak = (subtotal - diskon - promo) * TARIF_PAJAK; 
let total = subtotal - diskon - promo + pajak;

let uangBayarTeks = "100.000";
// FIX: Hapus titik sebelum diparse ke int, jika tidak parseInt hanya baca 100
let uangBayar = parseInt(uangBayarTeks.replace('.', '')); 
let kembalian = uangBayar - total;

let status;
// FIX: Ubah assignment (=) menjadi operator komparasi (>= atau ==)
if (uangBayar >= total) {
  status = "Lunas";
} else {
  status = "Kurang";
}

// FIX: Ganti slice(0) di bagian akhir dengan slice(1) agar huruf pertama yang di-toUpperCase digabung dgn sisa namanya (huruf kedua dst)
let namaRapi = pelanggan.nama.slice(0, 1).toUpperCase() + pelanggan.nama.slice(1);

// FIX: slice tidak mengubah array, harus pakai splice(1, 1) dan push("air") (unshift nambah di awal, instruksi nambah di akhir)
keranjang.splice(1, 1);
keranjang.push("air");

let jumlahMemberBaru = jumlahMember + 1; // FIX: Atas sudah jadi integer

// FIX: toFixed mengubah jadi string. Harus parse ke Float atau Number dulu
let rataRata = Number((total / 4).toFixed(2));
let rataRataTotal = rataRata + 10;

function formatRupiah(angka) {
  return "Rp " + angka; // FIX: fungsi awalnya hilang keyword "return"
}

// Tampilkan sesuai ekspektasi console
console.log(subtotal, diskon, promo, pajak, total);
console.log(uangBayar, kembalian, status);
console.log(namaRapi);
console.log(keranjang);
console.log(jumlahMemberBaru);
console.log(rataRataTotal);
console.log(formatRupiah(kembalian));
console.log(pelanggan.bayar(30000));
// FIX: Object di-iterate pakai for...in , bukan for...of (itu utk array)
for (let kunci in harga) {
  console.log(kunci + ": " + harga[kunci]);
}

/*
CATATAN BUG:
1. `jumlahMember = "5"` -> (Salah hasil) jadi "51" pas dijumlah.
2. `saldo -= jumlah` -> (Error) undefined variable, harus `this.saldo`.
3. `i <= length` -> (Error logic) Iterasi array terakhir melampaui indeks, undefined value dijumlah jadi NaN.
4. Urutan If Diskon -> (Salah hasil) nilai subtotal besar terblokir if kecil.
5. Kurang break di switch -> (Salah hasil) "jumat" berubah jadi promo sabtu (5000).
6. Kurung operasi pajak -> (Salah hasil) perkalian dikerjakan sebelum pengurangan, matematikanya berantakan.
7. `parseInt("100.000")` -> (Salah hasil) parse string berhenti di karakter titik.
8. `uangBayar = total` -> (Salah hasil) variable `uangBayar` di-assign dan kondisi return true terus, tidak ngecek nilai kurang/lebih.
9. `slice(0)` buat nama -> (Salah hasil) "Rrina" dobel huruf pertama karena ngambil dari index 0 lagi.
10. `slice(1,1)` pada array -> (Tidak ngapa-ngapain) array original tetap utuh, pakai splice.
11. `unshift("air")` -> (Salah hasil) masuk di indeks pertama, diminta di indeks akhir (pakai push).
12. `toFixed(2)` string concat -> (Salah hasil) jadinya nempel string, pakai Number().
13. `formatRupiah` gapunya return -> (Error logic) akan return undefined ke console.
14. `for...of harga` -> (Error) Object bukan iterable buat di looping pakai of, pakai for in.
15. Kondisi di status memakai >= -> Memastikan uang lebih bisa "Lunas".

Jawaban:
1. `uangBayar = total` adalah operator assignment. Statement if melihat hasilnya sebagai truthy (46620), jadi if itu lolos. Variabel uangBayar jadi berubah isinya ke total tersebut.
2. `parseInt` membaca string dari kiri ke kanan sampai ketemu non-integer char. Titik di "100.000" dianggap non-integer char, stop parse. Output 100.
*/