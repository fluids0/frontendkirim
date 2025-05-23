const backendURL = "https://backend-viewer-production.up.railway.app/"; // Ganti dengan URL backend kamu

// Handle submit form
document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const status = document.getElementById("status");

  const teks = document.getElementById("teks").value.trim();
  const gambar = document.getElementById("gambar").files[0];

  // Validasi: minimal salah satu diisi
  if (!teks && !gambar) {
    status.innerText = "⚠️ Harus diisi teks atau gambar (minimal satu)";
    status.style.color = "red";
    return;
  }

  status.innerText = "Mengirim...";
  status.style.color = "black";

  try {
    const res = await fetch(`${backendURL}/kirim`, {
      method: "POST",
      body: formData
    });

    const text = await res.text();
    status.innerText = "✅ Berhasil: " + text;
    status.style.color = "green";
    form.reset();

    // Sembunyikan preview dan tombol hapus setelah kirim
    previewImage.style.display = "none";
    hapusBtn.style.display = "none";
  } catch (err) {
    status.innerText = "❌ Gagal: " + err.message;
    status.style.color = "red";
  }
});

// Toggle Tema Gelap/Terang
function toggleTheme() {
  document.body.classList.toggle("dark");
  const btn = document.getElementById("themeBtn");
  if (document.body.classList.contains("dark")) {
    btn.innerText = "☀️ Light Mode";
  } else {
    btn.innerText = "🌙 Dark Mode";
  }
}

// Preview dan tombol hapus gambar
const fileInput = document.getElementById("gambar");
const previewImage = document.getElementById("previewImage");
const hapusBtn = document.getElementById("hapusGambarBtn");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
      hapusBtn.style.display = "inline-block";
    };
    reader.readAsDataURL(file);
  } else {
    previewImage.src = "";
    previewImage.style.display = "none";
    hapusBtn.style.display = "none";
  }
});

hapusBtn.addEventListener("click", () => {
  fileInput.value = "";
  previewImage.src = "";
  previewImage.style.display = "none";
  hapusBtn.style.display = "none";
});
