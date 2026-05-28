// ============================================
// 🔹 ИНИЦИАЛИЗАЦИЯ MODEL-VIEWER
// ============================================
export function initModelAction(modelSrc, modelInfo) {
    // Получаем элементы
    const modelViewer = document.getElementById('modelViewer');
    const loading = document.getElementById('loading');
    const arButton = document.getElementById('arButton');
    const startBtn = document.getElementById('startBtn');
    const introOverlay = document.getElementById('introOverlay');
    const modelName = document.getElementById('modelName');
    const modelIcon = document.getElementById('modelIcon');
    const modelDescription = document.getElementById('modelDescription');
    
    // Показываем интерфейс
    introOverlay?.classList.remove('hidden');
    
    if (modelViewer) {
        modelViewer.src = modelSrc;
        modelViewer.setAttribute('scale', modelInfo.scale);
    }
    
    // Заполняем меню
    if (modelName) modelName.textContent = modelInfo.name;
    if (modelIcon) modelIcon.textContent = modelInfo.icon;
    if (modelDescription) modelDescription.textContent = modelInfo.description;
    
    // События загрузки
    if (modelViewer) {
        modelViewer.addEventListener('load', () => {
            if (loading) loading.classList.add('hidden');
            if (arButton) arButton.disabled = false;
        });
        
        modelViewer.addEventListener('error', () => {
            if (loading) loading.innerHTML = '<span>❌ Ошибка загрузки модели</span>';
            if (arButton) arButton.disabled = true;
        });
        
        // AR события
        modelViewer.addEventListener('ar-status', (event) => {
            const status = event.detail.status;
            if (status === 'session-started') {
                console.log('📱 AR сессия запущена');
            } else if (status === 'session-ended') {
                console.log('� AR сессия завершена');
            }
        });
    }
    
    // Кнопка старта
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (introOverlay) introOverlay.classList.add('hidden');
        });
    }

    // AR кнопка
    if (arButton) {
        arButton.addEventListener('click', async () => {
            if (modelViewer?.canActivateAR) {
                arButton.disabled = true;
                arButton.textContent = '⏳ Запуск AR...';
                try {
                    modelViewer.activateAR();
                } catch (error) {
                    console.error('❌ Ошибка AR:', error);
                    alert('Не удалось запустить AR. Попробуйте ещё раз.');
                }
                arButton.disabled = false;
                arButton.textContent = '📱 Смотреть в AR';
            } else {
                console.log('📱 Ваше устройство не поддерживает AR\n\nПопробуйте открыть на смартфоне или планшете');
            }
        });
    }
}
