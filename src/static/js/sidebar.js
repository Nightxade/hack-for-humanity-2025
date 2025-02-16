const sidebarToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

sidebarToggle.addEventListener('click', () => {
  sidebarToggle.classList.toggle('active');
  showcase.classList.toggle('active');
})