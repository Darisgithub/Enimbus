const API_KEY = '246439e531898f680eade7b53929ec76';

function ambilCuaca() {
  const kota = document.getElementById('lokasi').value;
  const hasilEl = document.getElementById('hasil-cuaca');

  if (!kota) {
    hasilEl.innerHTML = '<p style="color:red;">Silakan masukkan nama kota!</p>';
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=${API_KEY}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Kota tidak ditemukan');
      }
      return response.json();
    })
    .then(data => {
      const nama = data.name;
      const suhu = data.main.temp;
      const cuaca = data.weather[0].description;
      const kelembapan = data.main.humidity;
      const angin = data.wind.speed;

      hasilEl.innerHTML = `
        <h3>Cuaca di ${nama}</h3>
        <p><strong>Deskripsi:</strong> ${cuaca}</p>
        <p><strong>Suhu:</strong> ${suhu}°C</p>
        <p><strong>Kelembapan:</strong> ${kelembapan}%</p>
        <p><strong>Angin:</strong> ${angin} m/s</p>
      `;
    })
    .catch(error => {
      hasilEl.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
