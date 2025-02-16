document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.sidebar');
  const categoryList = document.querySelector('.category-list');
  
  // Define categories
  const categories = [
      { id: 'all', name: 'All Events', icon: '/static/images/menu.png' },
      { id: 'Natural disaster', name: 'Natural Disaster', icon: '/static/images/disaster_icon.png' },
      { id: 'Human rights', name: 'Human Rights', icon: '/static/images/equal_icon.png' },
      { id: 'Health and disease', name: 'Health & Disease', icon: '/static/images/health_icon.png' },
      { id: 'Conflict of war', name: 'Conflict & War', icon: '/static/images/war_icon.png' },
      { id: 'Environmental', name: 'Environmental', icon: '/static/images/tree_icon.png' }
  ];

  // Create toggle button
  const toggleButton = document.createElement('div');
  toggleButton.className = 'toggle-button';
  toggleButton.innerHTML = `
      <img src="/static/images/menu.png" alt="Menu">
      <span>All Events</span>
  `;
  document.body.appendChild(toggleButton);

  // Create category list
  const categoryHTML = categories.map(category => `
      <div class="category-item" data-category="${category.id}">
          <img src="${category.icon}" class="category-icon" alt="${category.name}">
          <span class="category-name">${category.name}</span>
      </div>
  `).join('');

  categoryList.innerHTML = categoryHTML;

  // Toggle sidebar
  toggleButton.addEventListener('click', () => {
      sidebar.classList.toggle('active');
  });

  // Category click event
  document.querySelectorAll('.category-item').forEach(item => {
      item.addEventListener('click', () => {
          // Update active state
          document.querySelectorAll('.category-item').forEach(i => {
              i.classList.remove('active');
          });
          item.classList.add('active');

          // Trigger filter event
          window.dispatchEvent(new CustomEvent('filterMarkers', {
              detail: { category: item.dataset.category }
          }));
      });
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !toggleButton.contains(e.target)) {
          sidebar.classList.remove('active');
      }
  });
});