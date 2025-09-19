// Gallery modal with data-large attributes and nav highlight
const galleryImages = [
  {
    thumb: "https://www.gokite.travel/wp-content/uploads/schema-and-structured-data-for-wp/The-stunning-and-unique-destinations-to-visit-in-Georgia-1200x675.webp",
    large: "https://www.gokite.travel/wp-content/uploads/schema-and-structured-data-for-wp/The-stunning-and-unique-destinations-to-visit-in-Georgia-1200x675.webp",
    alt: "Georgia",
    caption: "Georgia – The Land of Wonders"
  },
  {
    thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeQuN-krxbcCB79_xTKlIyjDKl_1BdNpQLPw&s",
    large: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeQuN-krxbcCB79_xTKlIyjDKl_1BdNpQLPw&s",
    alt: "Sunset view of Paris",
    caption: "Paris – City of Lights"
  },
  {
    thumb: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a3/2a/f2/big-hand-ang-golden-bridge.jpg?w=600&h=400&s=1",
    large: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a3/2a/f2/big-hand-ang-golden-bridge.jpg?w=1200&h=800&s=1",
    alt: "Vietnam Golden Bridge",
    caption: "Vietnam – The Land of Golden Bridges"
  }
];

function renderGallery() {
  const main = document.querySelector('main.gallery');
  main.innerHTML = '';
  galleryImages.forEach(img => {
    const fig = document.createElement('figure');
    const image = document.createElement('img');
    image.src = img.thumb;
    image.alt = img.alt;
    image.setAttribute('data-large', img.large);
    image.title = img.caption;
    fig.appendChild(image);
    const cap = document.createElement('figcaption');
    cap.textContent = img.caption;
    fig.appendChild(cap);
    main.appendChild(fig);
  });
}

function createModal() {
  let modal = document.getElementById('gallery-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'gallery-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '1000';
    modal.style.visibility = 'hidden';
    modal.innerHTML = '<img style="max-width:80vw;max-height:80vh;border-radius:10px;"><span style="position:absolute;top:20px;right:40px;font-size:2em;color:white;cursor:pointer;">&times;</span>';
    document.body.appendChild(modal);
    modal.querySelector('span').onclick = () => { modal.style.visibility = 'hidden'; };
    modal.onclick = e => { if (e.target === modal) modal.style.visibility = 'hidden'; };
  }
  return modal;
}

document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  const modal = createModal();
  document.querySelectorAll('main.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      const large = img.getAttribute('data-large');
      const alt = img.alt;
      const title = img.title;
      const modalImg = modal.querySelector('img');
      modalImg.src = large;
      modalImg.alt = alt;
      modalImg.title = title;
      modal.style.visibility = 'visible';
    });
  });
  // Nav highlight
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href').includes('gallery')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
});
