// popupHandler.js
let showPopup = null;
let closePopup = null;

// 注册弹窗控制函数
export const registerPopupHandlers = (show, close) => {
    showPopup = show;
    closePopup = close;
};

// 用于在map.js中调用的全局函数
window.showEventPopup = (data) => {
    if (showPopup) {
        showPopup(data);
    }
};

window.closeEventPopup = () => {
    if (closePopup) {
        closePopup();
    }
};