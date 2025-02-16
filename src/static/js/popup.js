class MapPopup {
    constructor(options = {}) {
        this.width = options.width || '300px';
        this.height = options.height || 'auto';
        this.backgroundColor = options.backgroundColor || '#ffffff';
        this.borderColor = options.borderColor || '#cccccc';
        this.container = null;
        this.closeButton = null;
        this.content = null;
        this._instance = null;  // 单例模式
        
        if (MapPopup._instance) {
            return MapPopup._instance;
        }
        MapPopup._instance = this;
        this.create();
    }

    create() {
        this.container = document.createElement('div');
        this.container.className = 'map-popup';
        this.container.style.width = this.width;
        this.container.style.height = this.height;
        this.container.style.backgroundColor = this.backgroundColor;
        this.container.style.borderColor = this.borderColor;

        this.closeButton = document.createElement('div');
        this.closeButton.className = 'map-popup-close';
        this.closeButton.innerHTML = '×';
        this.closeButton.addEventListener('click', () => this.close());

        this.content = document.createElement('div');
        this.content.className = 'map-popup-content';

        this.container.appendChild(this.closeButton);
        this.container.appendChild(this.content);
    }

    show(data, position) {
        // 格式化数据显示
        let formattedContent = '';
        if (typeof data === 'object') {
            formattedContent = this.formatEventData(data);
        } else {
            formattedContent = `<p>${data}</p>`;
        }
        
        this.content.innerHTML = formattedContent;

        // 如果容器还没有添加到页面，就添加它
        if (!document.body.contains(this.container)) {
            document.body.appendChild(this.container);
        }

        // 根据 marker 位置计算弹窗位置
        if (position) {
            // 转换 Leaflet 的 LatLng 到屏幕坐标
            this.setPosition(position);
        }

        this.container.style.display = 'block';
    }

    formatEventData(data) {
        if (!data) return '<p>No data available</p>';
        
        // 这里可以根据实际数据结构自定义格式化方式
        let html = '<div class="event-data">';
        Object.entries(data).forEach(([key, value]) => {
            html += `
                <div class="event-item">
                    <strong>${key}:</strong> 
                    <span>${typeof value === 'object' ? JSON.stringify(value) : value}</span>
                </div>
            `;
        });
        html += '</div>';
        return html;
    }

    setPosition(position) {
        const { containerPoint } = position;
        if (!containerPoint) return;

        const x = containerPoint.x;
        const y = containerPoint.y;
        
        // 获取弹窗尺寸
        const popupRect = this.container.getBoundingClientRect();
        
        // 调整位置，确保弹窗在视口内
        let left = x;
        let top = y;

        // 检查右边界
        if (left + popupRect.width > window.innerWidth) {
            left = window.innerWidth - popupRect.width - 20;
        }

        // 检查下边界
        if (top + popupRect.height > window.innerHeight) {
            top = window.innerHeight - popupRect.height - 20;
        }

        this.container.style.left = `${left}px`;
        this.container.style.top = `${top}px`;
    }

    close() {
        if (this.container) {
            this.container.style.display = 'none';
        }
    }

    showError(error) {
        this.content.innerHTML = `
            <div class="error-message">
                <p style="color: red;">Error loading data: ${error.message}</p>
            </div>
        `;
        this.container.style.display = 'block';
    }
}

export default MapPopup;