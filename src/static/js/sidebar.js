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

  // Create category list with checkboxes
  const categoryHTML = categories.map(category => `
      <div class="category-item" data-category="${category.id}">
          <input type="checkbox" 
                 class="category-checkbox" 
                 id="checkbox-${category.id}"
                 ${category.id === 'all' ? 'checked' : 'checked'}>
          <img src="${category.icon}" class="category-icon" alt="${category.name}">
          <span class="category-name">${category.name}</span>
      </div>
  `).join('');

  categoryList.innerHTML = categoryHTML;

  // Toggle sidebar
  toggleButton.addEventListener('click', () => {
      sidebar.classList.toggle('active');
  });

  // Initialize selected categories array with all categories
  let selectedCategories = categories.map(cat => cat.id);

  // Handle checkbox changes
  document.querySelectorAll('.category-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
          const categoryItem = e.target.closest('.category-item');
          const category = categoryItem.dataset.category;
          
          if (category === 'all') {
              // If "All Events" is checked/unchecked
              if (e.target.checked) {
                  // Check all checkboxes
                  document.querySelectorAll('.category-checkbox').forEach(cb => {
                      cb.checked = true;
                  });
                  selectedCategories = categories.map(cat => cat.id);
              } else {
                  // Uncheck all checkboxes
                  document.querySelectorAll('.category-checkbox').forEach(cb => {
                      cb.checked = false;
                  });
                  selectedCategories = [];
              }
          } else {
              if (e.target.checked) {
                  // Add category to selected
                  if (!selectedCategories.includes(category)) {
                      selectedCategories.push(category);
                  }
              } else {
                  // Remove category from selected
                  selectedCategories = selectedCategories.filter(cat => cat !== category);
              }

              // Update "All Events" checkbox state
              const allCheckbox = document.querySelector('#checkbox-all');
              const allCategoriesSelected = Array.from(document.querySelectorAll('.category-checkbox'))
                  .filter(cb => cb.closest('.category-item').dataset.category !== 'all')
                  .every(cb => cb.checked);

              allCheckbox.checked = allCategoriesSelected;
              
              // Update selectedCategories array
              if (allCategoriesSelected) {
                  selectedCategories = categories.map(cat => cat.id);
              } else {
                  selectedCategories = selectedCategories.filter(cat => cat !== 'all');
              }
          }

          // Trigger filter event with all selected categories
          window.dispatchEvent(new CustomEvent('filterMarkers', {
              detail: { categories: selectedCategories.length > 0 ? selectedCategories : ['all'] }
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