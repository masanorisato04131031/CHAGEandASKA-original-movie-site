const yearButtons = document.getElementById("yearButtons");

const years = Object.keys(window.setlists).sort();

years.forEach((year, index) => {

  const btn = document.createElement("div");

  btn.className = "year-btn";

  btn.innerText = year;

  btn.onclick = () => {

    document
      .querySelectorAll(".year-btn")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    render(year);
  };

  yearButtons.appendChild(btn);

  if(index === 0){
    btn.classList.add("active");
  }
});

function render(year){

  const container = document.getElementById("setlistContainer");

  let html = "";

  window.setlists[year].forEach(live => {

    let songs = "";

    live.songs.forEach((song, index) => {

      songs += `
        <div class="song">
          <span>${index + 1}</span>
          ${song}
        </div>
      `;
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

render(years[0]);

const images = document.querySelectorAll(".hero img");

let current = 0;

setInterval(() => {

  images[current].classList.remove("active");

  current = (current + 1) % images.length;

  images[current].classList.add("active");

},3000);
