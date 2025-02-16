// sidebar.js
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.category-list');
  const toggle = document.querySelector('.toggle');
  
  // 定义分类数据
  const categories = [
      { id: 'all', name: 'All Events', icon: '/static/images/menu.png' },
      { id: 'Natural disaster', name: 'Natural Disaster', icon: '/static/images/disaster_icon.png' },
      { id: 'Human rights', name: 'Human Rights', icon: '/static/images/equal_icon.png' },
      { id: 'Health and disease', name: 'Health & Disease', icon: '/static/images/health_icon.png' },
      { id: 'Conflict of war', name: 'Conflict & War', icon: '/static/images/war_icon.png' },
      { id: 'Environmental', name: 'Environmental', icon: '/static/images/tree_icon.png' }
  ];

  // 创建分类列表
  const categoryHTML = categories.map(category => `
      <div class="category-item" data-category="${category.id}">
          <img src="${category.icon}" class="category-icon">
          <span class="category-name">${category.name}</span>
      </div>
  `).join('');

  sidebar.innerHTML = categoryHTML;

  // 侧边栏切换
  toggle.addEventListener('click', () => {
      document.querySelector('.sidebar').classList.toggle('active');
  });

  // 分类点击事件
  document.querySelectorAll('.category-item').forEach(item => {
      item.addEventListener('click', () => {
          // 更新选中状态
          document.querySelectorAll('.category-item').forEach(i => {
              i.classList.remove('active');
          });
          item.classList.add('active');

          // 触发筛选事件
          window.dispatchEvent(new CustomEvent('filterMarkers', {
              detail: { category: item.dataset.category }
          }));
      });
  });
});