// js/main.js

const yearButtons = document.getElementById("yearButtons");

// ボタン生成
Object.keys(setlists).forEach((year, index) => {
  const btn = document.createElement("div");
  btn.className = "year-btn";
  btn.innerText = year;

  btn.onclick = () => {
    document.querySelectorAll(".year-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(year);
  };

  yearButtons.appendChild(btn);

  // 最初の年をアクティブに
  if (index === 0) {
    btn.classList.add("active");
  }
});

// 描画
function render(year) {
  const container = document.getElementById("setlistContainer");
  let html = "";

  setlists[year].forEach(live => {
    let songs = "";
    live.songs.forEach((s, i) => {
      songs += `<div class="song"><span>${i + 1}</span>${s}</div>`;
    });

    html += `
      <div class="live-card">
        <h4>${year}年『${live.title}』</h4>
        ${songs}
      </div>
    `;
  });

  container.innerHTML = html;
}

// 初期表示
const firstYear = Object.keys(setlists)[0];
if (firstYear) {
  render(firstYear);
}

// スライド
const images = document.querySelectorAll(".hero img");
let current = 0;

setInterval(() => {
  images[current].classList.remove("active");
  current = (current + 1) % images.length;
  images[current].classList.add("active");
}, 3000);
