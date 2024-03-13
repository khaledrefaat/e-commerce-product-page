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
const decrementBtn = document.querySelector('.decrement');
const incrementBtn = document.querySelector('.increment');
const quantity = document.querySelector('.quantity .action span');
const addToCart = document.querySelector('.add-to-cart');

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

function setActiveThumbnail(target) {
  const thumbnails = target
    .closest('.images, .products-images')
    .querySelectorAll('img');
  for (let thumbnail of thumbnails)
    thumbnail.parentNode.classList.toggle('active', thumbnail == target);
}

function addItemToCart(q) {
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');

  const image = document.createElement('img');
  image.src = './images/image-product-1-thumbnail.jpg';
  image.alt = 'cart image';
  cartItem.appendChild(image);

  const details = document.createElement('div');
  details.innerHTML = `<p class="cart-item-title">Fall Limited Edition Sneakers</p>
    <p class="cart-item-price">$${q * 125.0} <span>$${q * 125.0}</span></p>`;
  cartItem.appendChild(details);

  const deleteButton = document.createElement('img');
  deleteButton.src = './images/icon-delete.svg';
  deleteButton.alt = 'delete item';
  cartItem.appendChild(deleteButton);

  const cartItems = document.createElement('div');
  cartItems.classList.add('cart-items');
  cartItems.appendChild(cartItem);

  const checkoutButton = document.createElement('button');
  checkoutButton.classList.add('checkout');
  checkoutButton.textContent = 'Checkout';

  cart.innerHTML = `<h4>Cart</h4>`;
  cart.appendChild(cartItems);
  cart.appendChild(checkoutButton);
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('quantity')) {
    addItemToCart(localStorage.getItem('quantity'));
  }

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

  productImage.forEach(product => {
    const heroImg =
      product.parentNode.parentNode.childNodes[1].querySelector('img');
    product.addEventListener('click', e => {
      heroImg.src = e.target.src.replace('-thumbnail', '');
      setActiveThumbnail(e.target);
    });
  });

  let q = localStorage.getItem('quantity') || 0;
  decrementBtn.addEventListener('click', e => {
    if (q > 0) q--;
    if (quantity) quantity.innerHTML = q;
  });

  incrementBtn.addEventListener('click', e => {
    q++;
    if (quantity) quantity.innerHTML = q;
  });

  addToCart.addEventListener('click', e => {
    if (q > 0) addItemToCart(q);
    localStorage.setItem('quantity', q);
  });

  cart.addEventListener('click', ({ target }) => {
    if (target.tagName === 'IMG' && target.alt === 'delete item') {
      cart.innerHTML = `<h4>Cart</h4>
        <div class="cart-items">
          <h4>Your Cart Is Empty</h4>
        </div>`;
      localStorage.removeItem('quantity');
    }
  });
});
