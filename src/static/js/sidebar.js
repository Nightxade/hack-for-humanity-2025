document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const categoryList = document.querySelector('.category-list');
    
    // Define categories with exact matches to map.js
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
                   id="checkbox-${category.id.replace(/\s+/g, '-')}"
                   ${category.id === 'all' ? 'checked' : ''}>
            <img src="${category.icon}" class="category-icon" alt="${category.name}">
            <span class="category-name">${category.name}</span>
        </div>
    `).join('');

    categoryList.innerHTML = categoryHTML;

    // Toggle sidebar
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Initialize selected categories array (exclude 'all')
    let selectedCategories = categories
        .filter(cat => cat.id !== 'all')
        .map(cat => cat.id);

    // Set initial checkbox states
    document.querySelectorAll('.category-checkbox').forEach(checkbox => {
        const categoryId = checkbox.closest('.category-item').dataset.category;
        if (categoryId !== 'all') {
            checkbox.checked = true;
        }
    });

    // Function to update All Events checkbox
    function updateAllCheckbox() {
        const allCheckbox = document.querySelector('#checkbox-all');
        const categoryCheckboxes = Array.from(document.querySelectorAll('.category-checkbox'))
            .filter(cb => cb.closest('.category-item').dataset.category !== 'all');
        
        const allChecked = categoryCheckboxes.every(cb => cb.checked);
        if (allCheckbox) {
            allCheckbox.checked = allChecked;
        }
    }

    // Function to dispatch marker update event
    function updateMarkers() {
        window.dispatchEvent(new CustomEvent('filterMarkers', {
            detail: { categories: selectedCategories }
        }));
    }

    // Handle checkbox changes
    document.querySelectorAll('.category-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const categoryItem = e.target.closest('.category-item');
            const category = categoryItem.dataset.category;
            const isChecked = e.target.checked;

            if (category === 'all') {
                // Handle "All Events" checkbox
                document.querySelectorAll('.category-checkbox').forEach(cb => {
                    const catId = cb.closest('.category-item').dataset.category;
                    if (catId !== 'all') {
                        cb.checked = isChecked;
                        if (isChecked && !selectedCategories.includes(catId)) {
                            selectedCategories.push(catId);
                        } else if (!isChecked) {
                            selectedCategories = selectedCategories.filter(c => c !== catId);
                        }
                    }
                });
            } else {
                // Handle individual category checkboxes
                if (isChecked && !selectedCategories.includes(category)) {
                    selectedCategories.push(category);
                } else if (!isChecked) {
                    selectedCategories = selectedCategories.filter(cat => cat !== category);
                }
                updateAllCheckbox();
            }

            // Update marker visibility based on selected categories
            updateMarkers();
        });
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !toggleButton.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Initial marker update
    updateMarkers();
});