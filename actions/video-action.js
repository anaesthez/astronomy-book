// ============================================
// 🎥 ACTION: ВИДЕО
// ============================================

export async function initVideoAction(config) {
    const { videoUrl, autoplay = true, showControls = true } = config;
    
    await waitForDOM();
    
    // Скрываем model-viewer
    const modelViewer = document.getElementById('modelViewer');
    if (modelViewer) modelViewer.style.display = 'none';
    
    // Создаём видео элемент
    const video = document.createElement('video');
    video.src = videoUrl;
    video.controls = showControls;
    video.autoplay = autoplay;
    video.loop = true;
    video.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        background: #000;
        z-index: 9999;
    `;
    
    document.body.appendChild(video);
    
    // Кнопка закрытия
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: rgba(255,255,255,0.9);
        color: #000;
        font-size: 24px;
        cursor: pointer;
        z-index: 10000;
    `;
    closeBtn.onclick = () => {
        video.pause();
        video.remove();
        closeBtn.remove();
        if (modelViewer) modelViewer.style.display = 'block';
    };
    
    document.body.appendChild(closeBtn);
}

function waitForDOM() {
    return new Promise(resolve => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
        } else {
            resolve();
        }
    });
}