const searchContainer = document.querySelector('.search-container');
const searchBar =
  `<form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
  </form>`;
searchContainer.innerHTML = searchBar;
searchContainer.style.display = 'none';

const modalContainer = document.createElement('DIV');
modalContainer.className = 'modal-container';
modalContainer.innerHTML =
   `<div class="modal">
       <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
       <div class="modal-info-container">
           <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
           <h3 id="name" class="modal-name cap">name</h3>
           <p class="modal-text">email</p>
           <p class="modal-text cap">city</p>
           <hr>
           <p class="modal-text">(555) 555-5555</p>
           <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
           <p class="modal-text">Birthday: 10/21/2015</p>
       </div>
   </div>

   // IMPORTANT: Below is only for exceeds tasks
   <div class="modal-btn-container">
       <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
       <button type="button" id="modal-next" class="modal-next btn">Next</button>
   </div>`;
document.querySelector('body').appendChild(modalContainer);
modalContainer.style.display = 'none';
