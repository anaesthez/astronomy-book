// ============================================
// 🔹 ИНИЦИАЛИЗАЦИЯ MODEL-VIEWER + АУДИО
// ============================================

// ============================================
// 🔹 ИНИЦИАЛИЗАЦИЯ MODEL-VIEWER + АУДИО
// ============================================

let currentAudio = null;
let audioStarted = false;
let wasPlayingBeforeSeek = false;
let isARActive = false; 

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
    
    // Инициализируем аудио, если оно есть
    if (modelInfo.audio) {
        const audioTitle = modelInfo.audioTitle || modelInfo.name;
        initAudioPlayer(modelInfo.audio, audioTitle);
    } else {
        const audioPlayer = document.getElementById('audioPlayer');
        if (audioPlayer) audioPlayer.classList.add('hidden');
    }
    
    // События загрузки модели
    if (modelViewer) {
        modelViewer.addEventListener('load', () => {
            if (loading) loading.classList.add('hidden');
            if (arButton) arButton.disabled = false;
        });
        
        modelViewer.addEventListener('error', () => {
            if (loading) loading.innerHTML = '<span>❌ Ошибка загрузки модели</span>';
            if (arButton) arButton.disabled = true;
        });
        
        // AR события - выключаем звук при входе в AR
        modelViewer.addEventListener('ar-status', (event) => {
            const status = event.detail.status;
            
            if (status === 'session-started' && currentAudio) {
                // Вход в AR режим
                isARActive = true;
                if (currentAudio && !currentAudio.paused && audioStarted) {
                    // Сохраняем состояние и ставим на паузу
                    window.wasAudioPlayingBeforeAR = !currentAudio.paused;
                    currentAudio.pause();
                }
                // Также можно полностью отключить звук на модели
                if (modelViewer) {
                    modelViewer.muted = true;
                }
            } 
            else if (status === 'session-ended' && currentAudio) {
                // Выход из AR режима
                isARActive = false;
                // Восстанавливаем аудио, если оно играло до AR
                if (window.wasAudioPlayingBeforeAR && audioStarted) {
                    setTimeout(() => {
                        if (currentAudio && currentAudio.paused && !isARActive) {
                            currentAudio.play().catch(e => console.log('Audio resume after AR:', e));
                        }
                    }, 500);
                }
                // Восстанавливаем звук модели
                if (modelViewer) {
                    modelViewer.muted = false;
                }
                delete window.wasAudioPlayingBeforeAR;
            }
        });
        
        // Дополнительная проверка для AR кнопки
        if (arButton) {
            arButton.addEventListener('click', () => {
                if (currentAudio && !currentAudio.paused) {
                    window.wasAudioPlayingBeforeAR = true;
                    currentAudio.pause();
                }
            });
        }
    }
    
    // Кнопка старта
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            introOverlay.classList.add('hidden');
            
            // Запускаем аудио после старта
            if (currentAudio && !audioStarted && !isARActive) {
                audioStarted = true;
                currentAudio.play().catch(e => console.log('⚠️ Нужно взаимодействие с пользователем'));
            }
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
                    alert('Не удалось запустить AR');
                }
                arButton.disabled = false;
                arButton.textContent = '📱 Смотреть в AR';
            } else {
                alert('Ваше устройство не поддерживает AR');
            }
        });
    }
}

// ============================================
// 🔹 АУДИО ПЛЕЕР (исправленная версия)
// ============================================
function initAudioPlayer(audioSrc, audioDisplayName) {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const audioTitle = document.getElementById('audioTitle');
    const audioProgress = document.getElementById('audioProgress');
    const progressContainer = document.getElementById('progressContainer');
    
    if (!audioPlayer || !audioSrc) return;
    
    // Создаем аудио объект
    currentAudio = new Audio(audioSrc);
    currentAudio.loop = true;
    currentAudio.volume = 0.7;
    
    // Устанавливаем название
    if (audioTitle) {
        audioTitle.textContent = `🎵 ${audioDisplayName || 'Фоновая музыка'}`;
    }
    
    // Показываем плеер
    audioPlayer.classList.remove('hidden');
    
    // Индикатор загрузки
    if (playPauseBtn) {
        playPauseBtn.textContent = '⏳';
        playPauseBtn.style.opacity = '0.5';
    }
    
    // Функция обновления кнопки
    function updatePlayPauseButton() {
        if (!playPauseBtn) return;
        
        if (currentAudio.paused || isARActive) {
            playPauseBtn.textContent = '▶️';
        } else {
            playPauseBtn.textContent = '⏸️';
        }
    }
    
    // Аудио загружено
    currentAudio.addEventListener('canplaythrough', () => {
        if (playPauseBtn) {
            playPauseBtn.style.opacity = '1';
            updatePlayPauseButton();
        }
    });
    
    // Ошибка загрузки
    currentAudio.addEventListener('error', () => {
        console.error('❌ Ошибка загрузки аудио');
        audioPlayer.classList.add('hidden');
    });
    
    // Обновление прогресс-бара
    currentAudio.addEventListener('timeupdate', () => {
        if (currentAudio.duration && audioProgress && !isARActive) {
            const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
            audioProgress.style.width = `${percent}%`;
        }
    });
    
    // Обновление кнопки при воспроизведении
    currentAudio.addEventListener('play', () => {
        if (!isARActive) {
            updatePlayPauseButton();
        }
        if (currentAudio.currentTime === 0 && audioProgress) {
            audioProgress.style.width = '0%';
        }
    });
    
    // Обновление кнопки при паузе
    currentAudio.addEventListener('pause', () => {
        updatePlayPauseButton();
    });
    
    // Кнопка Play/Pause
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // В AR режиме плеер не работает
            if (isARActive) {
                showTooltip('🎧 Музыка отключена в AR-режиме');
                return;
            }
            
            if (!audioStarted) {
                showTooltip('✨ Сначала нажмите "Запустить просмотр"');
                return;
            }
            
            if (currentAudio.paused) {
                currentAudio.play().catch(err => console.warn('Ошибка воспроизведения:', err));
            } else {
                currentAudio.pause();
            }
        });
    }
    
    // Прогресс-бар с паузой при перемотке
    if (progressContainer) {
        let isDragging = false;
        
        const startSeek = (e) => {
            e.stopPropagation();
            if (!audioStarted || isARActive) return;
            
            isDragging = true;
            wasPlayingBeforeSeek = !currentAudio.paused;
            
            if (wasPlayingBeforeSeek) {
                currentAudio.pause();
            }
        };
        
        const seek = (e) => {
            if (!isDragging || !currentAudio.duration || isARActive) return;
            
            const rect = progressContainer.getBoundingClientRect();
            let percent = (e.clientX - rect.left) / rect.width;
            percent = Math.min(1, Math.max(0, percent));
            
            audioProgress.style.width = `${percent * 100}%`;
            currentAudio.currentTime = percent * currentAudio.duration;
        };
        
        const endSeek = () => {
            if (!isDragging) return;
            isDragging = false;
            
            if (wasPlayingBeforeSeek && audioStarted && !isARActive) {
                currentAudio.play().catch(err => console.warn('Ошибка после перемотки:', err));
            }
        };
        
        // События мыши
        progressContainer.addEventListener('mousedown', startSeek);
        window.addEventListener('mousemove', seek);
        window.addEventListener('mouseup', endSeek);
        
        // События для касаний
        progressContainer.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startSeek(e.touches[0]);
        });
        window.addEventListener('touchmove', (e) => {
            if (isDragging) {
                e.preventDefault();
                seek(e.touches[0]);
            }
        });
        window.addEventListener('touchend', endSeek);
    }
}

// Вспомогательная функция для подсказок
function showTooltip(message) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.85);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        z-index: 200;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(102,126,234,0.5);
        animation: fadeInOut 2s ease-out;
        pointer-events: none;
        white-space: nowrap;
    `;
    document.body.appendChild(tooltip);
    setTimeout(() => tooltip.remove(), 2000);
}

// Добавляем анимацию
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        15% { opacity: 1; transform: translateX(-50%) translateY(0); }
        85% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
    
    .audio-progress-container {
        cursor: pointer;
    }
    
    .audio-progress-container:active {
        cursor: grabbing;
    }
`;
document.head.appendChild(style);