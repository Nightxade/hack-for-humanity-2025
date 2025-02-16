// Popup.jsx
import React, { useState, useEffect } from 'react';
import { registerPopupHandlers } from './popupHandler';

const Popup = () => {
    const [isActive, setIsActive] = useState(false);
    const [content, setContent] = useState(null);

    useEffect(() => {
        registerPopupHandlers(
            (data) => {
                setContent(data);
                setIsActive(true);
            },
            () => {
                setIsActive(false);
                setContent(null);
            }
        );
    }, []);

    if (!isActive) return null;

    return (
        <>
            {/* 弹窗主体 */}
            <div className={`
                fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                border border-black rounded-lg z-50 bg-white
                transition-transform duration-200 ease-in-out
                
                /* 控制弹窗大小 */
                w-[600px]           /* 宽度 */
                max-w-[90%]         /* 最大宽度（移动端适配）*/
                min-h-[200px]       /* 最小高度 */
                max-h-[80vh]        /* 最大高度（视口的80%）*/
                overflow-y-auto     /* 内容过多时允许滚动 */
                
                /* 控制弹窗动画 */
                ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                
                /* 控制弹窗阴影 */
                shadow-lg          /* 阴影大小 */
            `}>
                {/* 弹窗头部 */}
                <div className={`
                    px-6 py-4 
                    flex justify-between items-center 
                    border-b border-gray-200
                    bg-gray-50     /* 浅灰色背景 */
                `}>
                    <div className="text-xl font-bold text-gray-800">Event Details</div>
                    <button 
                        onClick={() => window.closeEventPopup()}
                        className="
                            border-none bg-transparent 
                            text-2xl font-bold 
                            cursor-pointer 
                            hover:text-gray-700
                            transition-colors
                            w-8 h-8
                            flex items-center justify-center
                            rounded-full
                            hover:bg-gray-200
                        "
                    >
                        &times;
                    </button>
                </div>

                {/* 弹窗内容 */}
                <div className="px-6 py-4">
                    {content && (
                        <div className="text-gray-700">
                            <pre className="whitespace-pre-wrap">
                                {JSON.stringify(content, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>

            {/* 背景遮罩 */}
            <div 
                onClick={() => window.closeEventPopup()}
                className={`
                    fixed inset-0 
                    transition-opacity duration-200 ease-in-out
                    
                    /* 控制背景颜色和透明度 */
                    bg-black/60         /* 黑色背景，60%不透明度 */
                    backdrop-blur-sm    /* 轻微模糊效果 */
                    
                    /* 控制背景点击和显示 */
                    ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
            />
        </>
    );
};

export default Popup;