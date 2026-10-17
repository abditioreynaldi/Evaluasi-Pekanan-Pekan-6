// POTONGAN A
/*
Tebakan:
1. 9
2. KOPI
3. 3
4. bonana
5. bonono
6. 42
7. NaN
8. 3
9. string
10. 0.30
11. "1010"
12. true
*/
console.log("  Hai Kawan  ".trim().length); // 9
console.log("Kopi Susu".toUpperCase().slice(0, 4)); // KOPI
console.log("a,b,c".split(",").length); // 3
console.log("banana".replace("a", "o")); // bonana
console.log("banana".replaceAll("a", "o")); // bonono
console.log(parseInt("42px")); // 42
console.log(Number("42px")); // NaN
console.log(parseInt("3.99")); // 3
console.log(typeof (3.14159).toFixed(2)); // string
console.log((0.1 + 0.2).toFixed(2)); // 0.30 (floating point presisi)
console.log("10" + 5 * 2); // "1010"
console.log(!0 && !""); // true

// POTONGAN B
let angka = [10, 20, 30, 40];
let potongan = angka.slice(1, 3);
let hapus = angka.splice(1, 2);
console.log(potongan); // [20, 30]
console.log(hapus); // [20, 30]
console.log(angka); // [10, 40]

function ganda(n) { return n * 2; }
function cetak(n) { console.log(n * 2); }
console.log(ganda(4) + ganda(1)); // 10
console.log(cetak(4)); // print 8, return undefined

const toko = { nama: "Senja", stok: 5, jual(n) { this.stok -= n; return this.stok; } };
toko.jual(2);
console.log(toko.jual(1)); // 2
console.log("stok" in toko); // true
for (let k in toko) { console.log(k); } // nama, stok, jual

// POTONGAN C
let hasil = "";
for (let i = 1; i <= 6; i++) {
  if (i === 2) continue;
  if (i === 5) break;
  hasil += i;
}
console.log(hasil); // "134"

let n = 3;
let kali = 1;
while (n > 0) {
  kali *= n;
  n--;
}
console.log(kali); // 6

let x = 0;
do {
  x += 5;
} while (x < 3);
console.log(x); // 5

for (let huruf of "ABC") {
  console.log(huruf + huruf.toLowerCase()); // Aa, Bb, Cc
}

/* JAWABAN BAGIAN 7.3:
1. `5 * 2` dikerjakan dulu karena hierarki kali lebih tinggi = 10. Lalu operasi "10" + 10 menjadi string concat = "1010".
2. `slice` menghasilkan copy bagian tertentu (tidak mengubah `angka`). Tapi saat dipanggil `splice`, ia mengambil [20,30] (isi hapus) dan MENGHAPUSNYA DARI `angka`, bikin array aslinya keubah sisa [10,40].
3. `cetak(4)` di dalam function menjalankan `console.log(8)`. Karena fungsi `cetak` tidak mereturn nilai (gak ada "return x;"), maka nilai return function defaultnya di JS adalah `undefined`. `console.log()` pelapis luar mencetak return itu.
4. i=1: masuk, hasil="1". i=2: kena `continue` (lompati iterasi ini), hasil="1". i=3: masuk, hasil="13". i=4: masuk, hasil="134". i=5: kena `break` (berhentikan loop permanen). Maka output 134.
5. `do...while` mengeksekusi blok 'do' MINIMAL SATU KALI SEBELUM kondisi di 'while' diperiksa di akhir.
*/