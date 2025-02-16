const MapPopup = (function() {
    class MapPopup {
        constructor(options = {}) {
            this.width = options.width || '300px';
            this.height = options.height || 'auto';
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
            this.container.style.width = this.width;
            this.container.style.height = this.height;
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

            if (position) {
                this.setPosition(position);
            }

            this.container.style.display = 'block';
        }

        formatEventData(data) {
            if (!data) return '<p>No data available</p>';
            
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
            const x = position.x || 0;
            const y = position.y || 0;
            
            const popupRect = this.container.getBoundingClientRect();
            
            let left = x;
            let top = y;

            if (left + popupRect.width > window.innerWidth) {
                left = window.innerWidth - popupRect.width - 20;
            }

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

    return MapPopup;
})();