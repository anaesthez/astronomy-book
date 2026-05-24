// ============================================
// 📄 ACTION: ОТКРЫТИЕ СТРАНИЦЫ
// ============================================

export async function initPageAction(config) {
    const { pageUrl, params = {} } = config;
    
    console.log(`📄 Открытие страницы: ${pageUrl}`, params);
    
    // Показываем индикатор
    showLoading('⏳ Загрузка страницы...');
    
    // Формируем URL с параметрами
    const queryString = new URLSearchParams(params).toString();
    const separator = pageUrl.includes('?') ? '&' : '?';
    const fullUrl = queryString ? `${pageUrl}${separator}${queryString}` : pageUrl;
    
    // Небольшая задержка для плавности
    setTimeout(() => {
        window.location.href = fullUrl;
    }, 300);
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