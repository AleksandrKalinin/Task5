import './main.sass';

let toggle = document.getElementById('toggle');
let body = document.getElementById('body');
let currentMode = document.getElementById('currentMode');

toggle.addEventListener('change', function(){
  body.classList.toggle('theme-dark');
  if (currentMode.innerText === 'on') {
    currentMode.innerText = 'off'
  } else {
    currentMode.innerText = 'on'
  } 
})