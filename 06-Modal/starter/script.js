'use strict';

const modal = document.querySelector(".modal");
const overlay = document.querySelector('.overlay');
// There are three buttons so we need querySelectorAll instead of querySelector.
const btns = document.querySelectorAll(".show-modal");
const btnClose = document.querySelector(".close-modal");

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', showModal);
};

btnClose.addEventListener('click', closeModal);

// Two ways to hidde or show the modal: removing the class that hides it or 
// modifying the display property style within the class. This second way gets 
// complicated in case you have several styles within a class and maybe it's better to  
// remove the entire class.
function showModal() {
    // modal.classList.remove("hidden");
    modal.style.display = 'block';
    // overlay.classList.remove("hidden");
    overlay.style.display = 'block';
};

function closeModal() {
    // modal.classList.add("hidden");
    modal.style.display = 'none';
    // overlay.classList.add("hidden");
    overlay.style.display = 'none';
};

// [AMN] Instead of adding the listener to a button we now want to detect and catch
// the key escape so we can close the modal. For this we need to add a listener on the
// entire document and then check whether the pressed key is the escape one (and 
// obviously we must check that the modal is 'block'). 
document.addEventListener('keydown', function (e) {
    console.log(e.key);
  
    // if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    };
  });