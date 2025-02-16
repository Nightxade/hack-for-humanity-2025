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

    // Initialize selected categories
    let selectedCategories = categories
        .filter(cat => cat.id !== 'all')
        .map(cat => cat.id);

    // Function to update markers
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
                // 处理 All Events 复选框
                document.querySelectorAll('.category-checkbox').forEach(cb => {
                    if (cb.id !== 'checkbox-all') {
                        cb.checked = isChecked;
                    }
                });
                
                if (isChecked) {
                    // 选中所有类别
                    selectedCategories = categories
                        .filter(cat => cat.id !== 'all')
                        .map(cat => cat.id);
                } else {
                    // 清空所有选中的类别
                    selectedCategories = [];
                }
            } else {
                // 处理单个类别复选框
                if (isChecked) {
                    // 添加类别到选中列表
                    if (!selectedCategories.includes(category)) {
                        selectedCategories.push(category);
                    }
                } else {
                    // 从选中列表中移除类别
                    selectedCategories = selectedCategories.filter(cat => cat !== category);
                }

                // 更新 All Events 复选框状态
                const allCategoriesSelected = categories
                    .filter(cat => cat.id !== 'all')
                    .every(cat => {
                        const cb = document.querySelector(`#checkbox-${cat.id}`);
                        return cb.checked;
                    });
                
                document.querySelector('#checkbox-all').checked = allCategoriesSelected;
            }

            // 更新地图标记
            updateMarkers();
        });
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !toggleButton.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // 初始更新标记
    updateMarkers();
});