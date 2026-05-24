// ============================================
// 🔗 ACTION: РЕДИРЕКТ
// ============================================

export async function initRedirectAction(config) {
    const { url, delay = 0 } = config;
    
    console.log(`🔗 Редирект на: ${url} (через ${delay}ms)`);
    
    // Показываем индикатор загрузки
    showLoading('⏳ Переход...');
    
    // Выполняем редирект с задержкой
    setTimeout(() => {
        window.location.href = url;
    }, delay);
}

function showLoading(message) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('hidden');
        loading.innerHTML = `<span>${message}</span>`;
    }
    
    // Скрываем другие элементы
    const elements = ['introOverlay', 'arButton', 'startBtn', 'modelViewer'];
    elements.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
}