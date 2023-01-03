const toggle = document.getElementById('toggle');
const body = document.getElementById('body');
const currentMode = document.getElementById('currentMode');

toggle.addEventListener('change', function(){
  body.classList.toggle('theme-dark');
  if (currentMode.innerText === 'on') {
    currentMode.innerText = 'off'
  } else {
    currentMode.innerText = 'on'
  } 
})