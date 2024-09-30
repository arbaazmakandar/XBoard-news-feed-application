async function fetchData(index) {
  let response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${magazines[index]}`
  );
  let json = await response.json();
  return json;
}

async function populateAccordians() {
  let accordianClass = document.querySelector("#accordionExample");

  for (let i = 0; i < accordianClass.children.length; i++) {
    const child = accordianClass.children[i];

    const response = await fetchData(i);

    let button = child.querySelector(".accordion-item .accordion-button");
    button.textContent = response.feed.title;

    let body = child.querySelector(
      ".accordion-collapse > #photo-gallery"
    );

    // console.log(response. to );

    let carousel = document.createElement("div");
    carousel.classList = "carousel slide";
    carousel.id = "carouselExampleControls";
    carousel.setAttribute("data-bs-ride", "carousel");

    let innerCarousel = document.createElement("div");
    innerCarousel.classList = "carousel-inner px-3";

    response.items.forEach(async (element, idx) => {
      let carouselItemCard = document.createElement("div");
      carouselItemCard.classList = idx === 0 ? "carousel-item active" : "carousel-item";

      carouselItemCard.innerHTML = `
              <a href="${element.link}" style="text-decoration: none; color:black;"> 
                <div>
                <img class="card-img-top" src="${element.enclosure.link}" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class='authorAndDate'>${element.author} . ${element.pubDate.split(' ')[0]}</p>
                    <p class="card-text">${element.content}</p>
                  </div>
                </div>
              </a>`;

      innerCarousel.appendChild(carouselItemCard);
    });
    let button2 = document.createElement("button");
    button2.classList = "carousel-control-next";
    button2.innerHTML = '>'
    button2.type = "button";
    button2.setAttribute("data-bs-target", "#carouselExampleControls");
    button2.setAttribute("data-bs-slide", "next");

    button2.innerHTML = `<i class="fa-sharp fa-solid fa-angle-right"></i>`;

    carousel.appendChild(innerCarousel);
    carousel.appendChild(button2);


    console.log(body);

    body.appendChild(carousel);

  }
}
populateAccordians();
