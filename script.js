const cart_icon = document.querySelector('.cart-icon');
const bar_icon = document.querySelector('.nav-icon');
const cart = document.querySelector('.cart');
const cart_items = document.querySelector('.cart-items');
const modal = document.querySelector('.modal');
const sidebar = document.querySelector('.sidebar');
const desktopModal = document.querySelector('.modal-content--desktop');
const closeIcons = document.querySelectorAll('.close');
const heroImg = document.querySelector('.hero-img img');
const header = document.querySelector('header');
const main = document.querySelector('main');
const next = document.querySelectorAll('.next');
const previous = document.querySelectorAll('.previous');
const productImage = document.querySelectorAll('.product-image');

function handelCart() {
  function hideCart() {
    cart.classList.add('hide-cart');
  }
  header.addEventListener('click', hideCart);
  main.addEventListener('click', hideCart);

  cart.addEventListener('click', e => e.stopPropagation());

  cart_icon.addEventListener('click', e => {
    e.stopPropagation();
    cart.classList.toggle('hide-cart');
  });
}

function handelModal() {
  function showModal() {
    modal.classList.remove('hide-modal');
    cart.classList.add('hide-cart');
  }

  function hideModal() {
    modal.classList.toggle('hide-modal');
  }

  bar_icon.addEventListener('click', showModal);

  modal.addEventListener('click', hideModal);

  sidebar &&
    sidebar.addEventListener('click', e => {
      e.stopPropagation();
    });

  desktopModal &&
    desktopModal.addEventListener('click', e => {
      e.stopPropagation();
    });

  heroImg.addEventListener('click', () => {
    if (document.body.clientWidth > 768) showModal();
  });

  closeIcons.forEach(close => close.addEventListener('click', hideModal));
}

document.addEventListener('DOMContentLoaded', () => {
  handelCart();
  handelModal();
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modal.classList.add('hide-modal');
      cart.classList.add('hide-cart');
    }
  });

  let photoIndex = 1;
  function changeImgSrc(src = null, index, element = null) {
    const parent = element.parentNode || heroImg.parentNode;
    const currentHeroImage = parent.querySelector('img');
    const productThumbnails =
      parent.parentNode.childNodes[3].querySelectorAll('div');

    src
      ? (currentHeroImage.src = src)
      : (currentHeroImage.src = `./images/image-product-${index}.jpg`);

    productThumbnails.forEach(thumbnail => {
      const url = thumbnail.childNodes[1].src.replace('-thumbnail', '');
      thumbnail.classList.toggle('active', url == currentHeroImage.src);
    });
  }

  next.forEach(next => {
    next.addEventListener('click', e => {
      e.stopPropagation();
      photoIndex < 4 ? photoIndex++ : (photoIndex = 1);
      changeImgSrc(null, photoIndex, next);
    });
  });

  previous.forEach(previous => {
    previous.addEventListener('click', e => {
      e.stopPropagation();
      photoIndex > 1 ? photoIndex-- : (photoIndex = 4);
      changeImgSrc(null, photoIndex, previous);
    });
  });

  function setActiveThumbnail(target) {
    const thumbnails = target
      .closest('.images, .products-images')
      .querySelectorAll('img');
    for (let thumbnail of thumbnails)
      thumbnail.parentNode.classList.toggle('active', thumbnail == target);
  }

  productImage.forEach(product => {
    const heroImg =
      product.parentNode.parentNode.childNodes[1].querySelector('img');
    product.addEventListener('click', e => {
      heroImg.src = e.target.src.replace('-thumbnail', '');
      setActiveThumbnail(e.target);
    });
  });
});
