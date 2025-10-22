# REST API Cuci Sepatu
## Deskripsi Umum
Proyek ini merupakan sistem REST API yang dikembangkan menggunakan Node.js dan Express.js, terhubung ke Supabase sebagai database.
Aplikasi ini dirancang untuk mengelola layanan cuci sepatu, mulai dari kategori sepatu, jenis layanan, hingga pencatatan pesanan pelanggan beserta status pengerjaannya.

API ini mempermudah proses pencatatan dan pemantauan cucian sepatu secara digital, sehingga lebih efisien dibanding sistem manual.

## Tujuan
- Menerapkan konsep CRUD (Create, Read, Update, Delete) menggunakan Express.js.
- Mengelola data secara terstruktur dengan Supabase sebagai basis data.
- Mempraktikkan pembuatan API dengan standar RESTful.
- Membantu bisnis cuci sepatu dalam melakukan pencatatan pesanan dan status pengerjaan secara real time.
-Memberikan contoh implementasi backend yang dapat diintegrasikan dengan dashboard web atau aplikasi mobile.

## Fitur Utama API

| Metode     | Endpoint                     | Deskripsi                               |
| ---------- | ---------------------------- | --------------------------------------- |
| **GET**    | `/api/categories`            | Menampilkan semua kategori sepatu.      |
| **POST**   | `/api/categories`            | Menambahkan kategori sepatu baru.       |
| **DELETE** | `/api/categories/:id`        | Menghapus kategori sepatu tertentu.     |
| **GET**    | `/api/services`              | Menampilkan daftar layanan cuci sepatu. |
| **POST**   | `/api/services`              | Menambahkan layanan baru.               |
| **DELETE** | `/api/services/:id`          | Menghapus layanan tertentu.             |
| **GET**    | `/api/orders`                | Menampilkan semua pesanan pelanggan.    |
| **GET**    | `/api/orders?status=selesai` | Menampilkan pesanan yang sudah selesai. |
| **POST**   | `/api/orders`                | Membuat pesanan baru.                   |
| **PUT**    | `/api/orders/:id/status`     | Memperbarui status pesanan.             |
| **DELETE** | `/api/orders/:id`            | Menghapus data pesanan.                 |
## Struktur Data
1️⃣Categories
Contoh Struktur data categories
Menyimpan jenis sepatu yang dilayani.
```
{
  "id": "14ef2470-3949-468b-bf0a-54c803136f74",
  "name": "Sneakers",
    "created_at": "2025-10-21T13:00:00.000Z"
}'
```

| Kolom        | Tipe Data   | Keterangan                                              |
| ------------ | ----------- | ------------------------------------------------------- |
| `id`         | `uuid`      | Primary key yang dibuat otomatis oleh Supabase.         |
| `name`       | `varchar`   | Nama kategori sepatu (misal: Sneakers, Kulit, Slip On). |
| `created_at` | `timestamp` | Waktu saat data kategori ditambahkan.                   |
2️⃣service
Digunakan untuk menyimpan informasi layanan cuci sepatu yang tersedia di toko, termasuk harga dan estimasi waktu pengerjaan.
```
{
  "id": "3a2bcbf9-2c1e-49a9-a5c9-77f90c85c6d2",
  "code": "SVC-001",
  "name": "Cuci Sepatu Sneakers Basic",
  "description": "Pencucian ringan dengan pengeringan alami.",
  "price": 25000,
  "estimated_minutes": 60,
  "status": "available",
  "category_id": "14ef2470-3949-468b-bf0a-54c803136f74",
  "created_at": "2025-10-21T13:10:00.000Z"
} 
```
| Kolom               | Tipe Data   | Keterangan                                           |
| ------------------- | ----------- | ---------------------------------------------------- |
| `id`                | `uuid`      | Primary key (otomatis dari Supabase).                |
| `code`              | `varchar`   | Kode unik layanan (contoh: `SVC-001`).               |
| `name`              | `varchar`   | Nama layanan (contoh: “Cuci Premium”, “Fast Dry”).   |
| `description`       | `text`      | Penjelasan singkat layanan.                          |
| `price`             | `integer`   | Harga layanan dalam rupiah.                          |
| `estimated_minutes` | `integer`   | Estimasi waktu pengerjaan dalam menit.               |
| `status`            | `varchar`   | Status layanan (contoh: `available`, `unavailable`). |
| `category_id`       | `uuid`      | Relasi ke tabel `categories` (kategori layanan).     |
| `created_at`        | `timestamp` | Waktu layanan dibuat.                                |
3️⃣washing_orders
Menyimpan data pesanan pelanggan, termasuk siapa pelanggan, layanan apa yang dipilih, dan status pengerjaannya.
```
{
  "id": "98ce9433-812e-4294-ae14-50b712053034",
  "customer_name": "Andi",
  "phone": "08123456789",
  "service_id": "3a2bcbf9-2c1e-49a9-a5c9-77f90c85c6d2",
  "notes": "Sepatu agak bau di bagian depan.",
  "status": "sedang dikerjakan",
  "received_at": "2025-10-21T12:34:56.000Z",
  "finished_at": null,
  "created_at": "2025-10-21T12:34:56.000Z"
}
```
| Kolom           | Tipe Data   | Keterangan                                                          |
| --------------- | ----------- | ------------------------------------------------------------------- |
| `id`            | `uuid`      | Primary key otomatis dari Supabase.                                 |
| `customer_name` | `varchar`   | Nama pelanggan.                                                     |
| `phone`         | `varchar`   | Nomor telepon pelanggan.                                            |
| `service_id`    | `uuid`      | Relasi ke tabel `services`.                                         |
| `notes`         | `text`      | Catatan tambahan dari pelanggan.                                    |
| `status`        | `varchar`   | Status pesanan: `pending`, `sedang dikerjakan`, `selesai`.          |
| `received_at`   | `timestamp` | Waktu sepatu diterima.                                              |
| `finished_at`   | `timestamp` | Waktu sepatu selesai dikerjakan (otomatis jika status = `selesai`). |
| `created_at`    | `timestamp` | Waktu pesanan dibuat.                                               |
## Bonus Fitur
1️⃣ Filter Pesanan Berdasarkan Status

API ini memungkinkan pengguna untuk menampilkan daftar pesanan berdasarkan status tertentu, seperti pending, sedang dikerjakan, atau selesai.
Fitur ini memudahkan pemilik usaha untuk memantau progres cucian sepatu secara lebih terarah tanpa harus melihat seluruh data sekaligus.

2️⃣ Pembaruan Status Otomatis

Saat status pesanan diperbarui menjadi selesai, sistem akan secara otomatis mencatat waktu penyelesaian pada database.
Hal ini membuat proses pencatatan lebih efisien karena pengguna tidak perlu menambahkan waktu selesai secara manual.
## Alur Kerja API

Proses kerja sistem layanan cuci sepatu ini mengikuti alur sederhana namun terstruktur agar setiap data tercatat dan diperbarui secara otomatis.

1️⃣ Pengguna Mengirim Permintaan

Pengguna (melalui Postman, web, atau aplikasi mobile) mengirimkan permintaan ke server menggunakan metode HTTP seperti GET, POST, PUT, atau DELETE.

2️⃣ Server Memproses Permintaan

Server Express.js menerima permintaan tersebut, kemudian meneruskan prosesnya ke controller yang sesuai.
Controller akan memanggil model untuk berinteraksi langsung dengan database di Supabase.

3️⃣ Database Menangani Operasi Data

Model mengirimkan perintah CRUD ke Supabase untuk menyimpan, membaca, memperbarui, atau menghapus data sesuai permintaan pengguna.
Jika status pesanan diperbarui menjadi selesai, sistem otomatis mencatat waktu penyelesaiannya.

4️⃣ Server Mengembalikan Respons

Setelah operasi berhasil, server mengirimkan respons dalam format JSON berisi pesan keberhasilan dan data yang relevan.
Jika terjadi kesalahan, server akan memberikan pesan error yang mudah dipahami.

## Teknologi yang Digunakan
- Node.js – runtime environment untuk menjalankan JavaScript di sisi server.
- Express.js – framework untuk membangun - - REST API dengan cepat dan sederhana.
- JSON – format data utama untuk pertukaran informasi antar sistem.
- Supabase - Sebagai DB untuk deploy
- Vercel - Sebagai server

## Hasil Akhir 
Dengan adanya API ini, proses pengelolaan layanan cuci sepatu menjadi lebih efisien, terorganisir, dan mudah untuk dikembangkan.
Sistem ini dapat dijadikan fondasi untuk pembuatan aplikasi front-end seperti dashboard berbasis web atau aplikasi mobile yang menampilkan data secara real-time.
Selain itu, API ini juga memiliki potensi untuk dikembangkan lebih lanjut menggunakan database lain seperti MongoDB atau tetap memanfaatkan Supabase guna menangani kebutuhan penyimpanan data yang lebih kompleks di masa mendatang.
## Contoh Request dan Response
Request: GET/categories
Response:
```
[
  {
    "id": "14ef2470-3949-468b-bf0a-54c803136f74",
    "name": "Sneakers"
  },
  {
    "id": "2bbd7e83-8239-48a1-8b74-412ff65f4e6f",
    "name": "Sepatu Kulit"
  }
]
```
Request: POST/categories
Body:
```
{
  "name": "Slip On"
}
```
Response:
```
{
  "message": "Kategori baru berhasil ditambahkan",
  "data": {
    "id": "8ef44a91-3f29-49a2-a8e1-110ee02e1a33",
    "name": "Slip On"
  }
}
```
Request:DELETE/categories/id
Response:
```
{
  "message": "Kategori berhasil dihapus"
}
```
Request:GET/service
Response:
```
[
  {
    "id": "3a2bcbf9-2c1e-49a9-a5c9-77f90c85c6d2",
    "code": "SVC-001",
    "name": "Cuci Sepatu Premium",
    "price": 35000,
    "status": "available"
  }
]
```
Request:POST/services
Body:
```
{
  "code": "SVC-002",
  "name": "Fast Dry Express",
  "description": "Cuci cepat dengan pengeringan 30 menit.",
  "category_id": "14ef2470-3949-468b-bf0a-54c803136f74",
  "price": 30000,
  "estimated_minutes": 30,
  "status": "available"
}
```
Response
```
{
  "message": "Layanan baru berhasil ditambahkan",
  "data": {
    "id": "91bdc38c-98f4-4c09-9a37-7a4b8a26f5da",
    "code": "SVC-002",
    "name": "Fast Dry Express"
  }
}
```
Request:DELETE/service/id
Reponse:
```
{
  "message": "Layanan berhasil dihapus"
}
```
Request:GET/orders
Response:
```
[
  {
    "id": "98ce9433-812e-4294-ae14-50b712053034",
    "customer_name": "Andi",
    "status": "pending",
    "received_at": "2025-10-21T12:34:56.000Z",
    "services": {
      "name": "Cuci Sepatu Premium",
      "price": 35000
    }
  }
]
```
Request:GET/orders?status=selesai
```
[
  {
    "id": "98ce9433-812e-4294-ae14-50b712053034",
    "customer_name": "Andi",
    "status": "selesai",
    "finished_at": "2025-10-21T14:45:22.000Z"
  }
]
```
Request:POST/orders
Body:
```
{
  "customer_name": "Budi",
  "phone": "08123456789",
  "service_id": "3a2bcbf9-2c1e-49a9-a5c9-77f90c85c6d2",
  "notes": "Cuci cepat karena mau dipakai besok."
}
```
Response:
```
{
  "message": "Pesanan baru berhasil ditambahkan",
  "data": {
    "id": "e3a1ccf0-3f55-4a2f-bd8a-8d5e5b64f7ad",
    "status": "pending"
  }
}
```
Request:PUT/orders/id/status
Body:
```
{
  "status": "selesai"
}
```
Response:
```
{
  "message": "Status berhasil diperbarui",
  "data": {
    "id": "e3a1ccf0-3f55-4a2f-bd8a-8d5e5b64f7ad",
    "status": "selesai",
    "finished_at": "2025-10-21T14:45:22.000Z"
  }
}
```
Request:DELETE/orders/id
Response:
```
{
  "message": "Pesanan berhasil dihapus"
}
```
## LINK VERCEL
[Vercel](https://cuci-sepatu-i3hnr0bsc-ian-widi-antaressas-projects.vercel.app)


