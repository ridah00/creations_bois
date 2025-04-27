import { createClient } from 'https://cdn.skypack.dev/@sanity/client';

const client = createClient({
  projectId: 'caejqdtp',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-04-04',
});


document.addEventListener('DOMContentLoaded', function () {
 
  
  
  
  
  client
    .fetch(`*[_type == "mainImage"][0]{
      "imageUrl": image.asset->url
    }`)
    .then((data) => {
      const img = document.querySelector('#apropos img');
      img.src = data.imageUrl;
    })
    .catch((err) => {
      console.error("Erreur (main image):", err);
    });
  
  
  client
    .fetch(`*[_type == "carouselImage"] | order(_createdAt asc){
      "imageUrl": image.asset->url
    }`)
    .then((images) => {
      const carouselInner = document.querySelector(".carousel-inner");
      carouselInner.innerHTML = "";
  
      images.forEach((img, index) => {
        const div = document.createElement("div");
        div.className = `carousel-item${index === 0 ? " active" : ""}`;
        div.innerHTML = `<img src="${img.imageUrl}" class="d-block w-100 img-fluid" alt="">`;
        carouselInner.appendChild(div);
      });
    })
    .catch((err) => {
      console.error("Erreur (carousel):", err);
    });
  
  
  client
    .fetch(`*[_type == "creation" && defined(image.asset)] | order(_createdAt desc) {
      _id,
      title,
      description,
      "imageUrl": image.asset->url
    }`)
    .then((creations) => {
      const container = document.querySelector(".galerie");
  
      container.innerHTML = "";
  
      creations.forEach((creation) => {
        const card = document.createElement("div");
        card.className = "produit card";
        card.style.width = "20rem";
  
        card.innerHTML = `
          <img src="${creation.imageUrl}" class="card-img-top img-fluid" alt="${creation.title}">
          <div class="card-body">
            <p class="card-title h3">${creation.title}</p>
            <p class="card-text">${creation.description}</p>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Erreur:", err);
    });
  
  
  
    client
    .fetch(`*[_type == "pageContent"][0]{ Titre, Bienvenue, Apropos }`)
    .then((data) => {
      console.log(data);
  
      const titleElement = document.querySelector("#titre-page");
      const para1Element = document.querySelector("#paragraphe1");
      const para2Element = document.querySelector("#paragraphe2");
  
      if (titleElement) titleElement.innerHTML = data.Titre;
      if (para1Element) para1Element.innerHTML = data.Bienvenue;
      if (para2Element) para2Element.innerHTML = data.Apropos;
    })
    .catch((err) => {
      console.error("Erreur (pageContent):", err);
    });
  });