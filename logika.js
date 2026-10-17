function hitungFaktorial(n) {
  if (n < 0) return null;
  let hasil = 1;
  for (let i = 1; i <= n; i++) hasil *= i;
  return hasil;
}

function cekPalindrom(teks) {
  const bersih = teks.trim().toLowerCase();
  if (bersih.length === 0) return false;
  let kiri = 0, kanan = bersih.length - 1;
  while (kiri < kanan) {
    if (bersih[kiri] !== bersih[kanan]) return false;
    kiri++; kanan--;
  }
  return true;
}

function hitungVokal(teks) {
  let count = 0;
  for (let char of teks.toLowerCase()) {
    if (['a', 'i', 'u', 'e', 'o'].includes(char)) count++;
  }
  return count;
}

function cariTerbesar(daftar) {
  if (daftar.length === 0) return null;
  let max = daftar[0], idx = 0;
  for (let i = 1; i < daftar.length; i++) {
    if (daftar[i] > max) { max = daftar[i]; idx = i; }
  }
  return { nilai: max, indeks: idx };
}

function hapusDuplikat(daftar) {
  const hasil = [];
  for (let item of daftar) {
    if (!hasil.includes(item)) hasil.push(item);
  }
  return hasil;
}

function cekBilanganPrima(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

/* Jawaban Bagian 5:
1. `hitungFaktorial(3)`: n=3. hasil awal 1. Putaran 1: i=1, hasil = 1*1=1. Putaran 2: i=2, hasil = 1*2=2. Putaran 3: i=3, hasil = 2*3=6. Selesai. Output: 6.
2. Pada `hapusDuplikat`, saya membuat array baru `hasil` dan men-push elemen ke sana, sehingga array `daftar` asli tidak disentuh. `includes()` mudah digunakan.
3. Di loop `cekBilanganPrima`, jika ditemui modulus 0, saya memakai `return false;` (bukan `break`). Jika pakai break (dan tidak return false), hasil berpotensi meleset true di akhir fungsi, atau hanya bikin kode berjalan lambat kalau tidak segera return out.
4. Karena array kosong merepresentasikan 'tidak ada nilai (null)' untuk dicari terbesarnya, jika direturn 0 padahal array bisa berisi angka negatif, itu akan memberikan representasi nilai buatan yang salah secara logika matematis.
5. `for` di `cariTerbesar` karena saya butuh mengakses indeks (`i`). `for...of` di `hapusDuplikat` karena saya hanya peduli pada nilai elemennya satu per satu, tidak butuh indeks.
*/
//