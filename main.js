// js/main.js

// setlists存在チェック（超重要）
if (typeof setlists === "undefined") {
  console.error("❌ setlistsが読み込まれていません（setlists.jsの読み込み順を確認）");
}

// 年ボタン生成
const yearButtons = document.getElementById("yearButtons");

// 年キー取得（安全化）
const years = Object.keys(setlists || {}).sort();

years.forEach((year, index) => {
  const btn = document.createElement("div");
  btn.className = "year-btn";
  btn.innerText = year;

  btn.onclick = () => {
    document.querySelectorAll(".year-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(year);
  };

  yearButtons.appendChild(btn);

  if (index === 0) {
    btn.classList.add("active");
  }
});

// 描画処理（安全化）
function render(year) {
  const container = document.getElementById("setlistContainer");

  if (!setlists[year]) {
    container.innerHTML = `<p>データがありません（${year}）</p>`;
    return;
  }

  let html = "";

  setlists[year].forEach(live => {
    let songs = "";

    (live.songs || []).forEach((s, i) => {
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
if (years.length > 0) {
  render(years[0]);
}

// スライド（安全化）
const images = document.querySelectorAll(".hero img");
let current = 0;

if (images.length > 0) {
  setInterval(() => {
    images[current].classList.remove("active");
    current = (current + 1) % images.length;
    images[current].classList.add("active");
  }, 3000);
}
