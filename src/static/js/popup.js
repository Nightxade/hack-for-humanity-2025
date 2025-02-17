const MapPopup = (function() {
    class MapPopup {
        constructor(options = {}) {
            this.backgroundColor = options.backgroundColor || '#ffffff';
            this.borderColor = options.borderColor || '#cccccc';
            this.container = null;
            this.closeButton = null;
            this.content = null;
            this._instance = null;

            if (MapPopup._instance) {
                return MapPopup._instance;
            }
            MapPopup._instance = this;
            this.create();
        }

        create() {
            this.container = document.createElement('div');
            this.container.className = 'map-popup';
            this.container.style.backgroundColor = this.backgroundColor;
            this.container.style.borderColor = this.borderColor;

            this.closeButton = document.createElement('div');
            this.closeButton.className = 'map-popup-close';
            this.closeButton.innerHTML = '';
            this.closeButton.addEventListener('click', () => this.close());

            this.content = document.createElement('div');
            this.content.className = 'map-popup-content';

            this.container.appendChild(this.closeButton);
            this.container.appendChild(this.content);
        }

        show(data, position) {
            let formattedContent = '';
            if (typeof data === 'object') {
                formattedContent = this.formatEventData(data);
            } else {
                formattedContent = `<p>${data}</p>`;
            }
            
            this.content.innerHTML = formattedContent;

            if (!document.body.contains(this.container)) {
                document.body.appendChild(this.container);
            }

            // 先显示弹窗以获取实际尺寸
            this.container.style.display = 'block';
            
            if (position) {
                this.setPosition(position);
            }
        }

        setPosition(position) {
            const padding = 20; // 边缘padding
            const containerRect = this.container.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let left = position.x;
            let top = position.y;

            // 确保弹窗不会超出右边界
            if (left + containerRect.width > windowWidth - padding) {
                left = Math.max(padding, windowWidth - containerRect.width - padding);
            }

            // 确保弹窗不会超出左边界
            if (left < padding) {
                left = padding;
            }

            // 确保弹窗不会超出底部边界
            if (top + containerRect.height > windowHeight - padding) {
                top = Math.max(padding, windowHeight - containerRect.height - padding);
            }

            // 确保弹窗不会超出顶部边界
            if (top < padding) {
                top = padding;
            }

            this.container.style.left = `${left}px`;
            this.container.style.top = `${top}px`;
        }

        formatEventData(data) {
            if (!data) return '<p>No data available</p>';
            
            const location = `${data.city}, ${data.country}`;
            
            let html = `
                <div class="event-data">
                    <h1 class="event-title">${data.title}</h1>
                    <div class="event-subtitle">
                        <span class="event-location">${location}</span>
                        <span class="event-date">${data.date}</span>
                    </div>
                    <div class="event-content">
                        <p>${data.content}</p>
                    </div>
                    <div class="event-link">
                        <a href="${data.link}" target="_blank">Article Link</a>
                    </div>
                </div>
            `;
            return html;
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

    return MapPopup;
})();