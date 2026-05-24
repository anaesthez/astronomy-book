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
    const audioBtn = document.getElementById('audioBtn');
    const modelName = document.getElementById('modelName');
    const modelIcon = document.getElementById('modelIcon');
    const modelDescription = document.getElementById('modelDescription');
    
    // Показываем интерфейс
    introOverlay?.classList.remove('hidden');
    
    // Настраиваем модель
    if (modelViewer) {
        modelViewer.src = modelSrc;
        modelViewer.setAttribute('scale', modelInfo.scale);
        modelViewer.setAttribute
    }
    
    // Заполняем меню
    if (modelName) modelName.textContent = modelInfo.name;
    if (modelIcon) modelIcon.textContent = modelInfo.icon;
    if (modelDescription) modelDescription.textContent = modelInfo.description;
    
    // Аудио
    let audioElement = null;
    let isAudioPlaying = false;
    
    if (modelInfo.audio) {
        audioElement = new Audio(modelInfo.audio);
        audioElement.loop = true;
        
        if (audioBtn) {
            audioBtn.style.display = 'flex';
            audioBtn.addEventListener('click', () => toggleAudio());
        }
    } else if (audioBtn) {
        audioBtn.style.display = 'none';
    }
    
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
                console.log('👋 AR сессия завершена');
            }
        });
    }
    
    // Кнопка старта
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (introOverlay) introOverlay.classList.add('hidden');
            
            if (audioElement && !isAudioPlaying) {
                audioElement.play().then(() => {
                    isAudioPlaying = true;
                    updateAudioButton();
                }).catch(err => {
                    console.log('Автовоспроизведение заблокировано:', err);
                });
            }
        });
    }
    
    // Управление аудио
    function toggleAudio() {
        if (!audioElement) return;
        if (isAudioPlaying) {
            audioElement.pause();
            isAudioPlaying = false;
        } else {
            audioElement.play().then(() => {
                isAudioPlaying = true;
            }).catch(err => console.log('Ошибка:', err));
        }
        updateAudioButton();
    }
    
    function updateAudioButton() {
        const icon = audioBtn?.querySelector('.audio-icon');
        if (!icon) return;
        if (isAudioPlaying) {
            icon.textContent = '⏸️';
            audioBtn?.classList.add('pause');
        } else {
            icon.textContent = '▶️';
            audioBtn?.classList.remove('pause');
        }
    }
    
    // AR кнопка
    if (arButton) {
        arButton.addEventListener('click', async () => {
            if (modelViewer?.canActivateAR) {
                arButton.disabled = true;
                arButton.textContent = '⏳ Запуск AR...';
                try {
                    await modelViewer.activateAR();
                } catch (error) {
                    console.error('❌ Ошибка AR:', error);
                    alert('Не удалось запустить AR. Попробуйте ещё раз.');
                }
                arButton.disabled = false;
                arButton.textContent = '📱 Смотреть в AR';
            } else {
                alert('📱 Ваше устройство не поддерживает AR\n\nПопробуйте открыть на смартфоне или планшете');
            }
        });
    }
}

// ============================================
// 🔹 FALLBACK: если модель не найдена в конфиге
// ============================================
function getModelInfoFallback(filename) {
    const name = filename.toLowerCase();
    // Здесь можно добавить свою базу моделей, если нужно
    return {
        name: filename.replace('.glb', '').replace('-', ' '),
        icon: '📦',
        description: '3D модель для просмотра в дополненной реальности.',
        audio: null,
        scale: '0.2 0.2 0.2'
    };
}

function showFallback(message) {
    const loading = document.getElementById('loading');
    const arButton = document.getElementById('arButton');
    const startBtn = document.getElementById('startBtn');
    
    if (loading) {
        loading.classList.remove('hidden');
        loading.innerHTML = `<span>${message}</span>`;
    }
    if (arButton) arButton.disabled = true;
    if (startBtn) startBtn.style.display = 'none';
    
    // Кнопка "На главную"
    const homeBtn = document.createElement('button');
    homeBtn.textContent = '🏠 На главную';
    homeBtn.style.cssText = 'margin-top:20px;padding:12px 24px;background:#fff;color:#000;border:none;border-radius:8px;cursor:pointer;font-size:14px;';
    homeBtn.onclick = () => window.location.href = '/';
    if (loading) loading.appendChild(homeBtn);
}