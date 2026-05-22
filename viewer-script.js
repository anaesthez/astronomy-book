const modelViewer = document.getElementById('modelViewer');
const loading = document.getElementById('loading');
const arButton = document.getElementById('arButton');
const introOverlay = document.getElementById('introOverlay');
const startBtn = document.getElementById('startBtn');
const audioBtn = document.getElementById('audioBtn');
const modelName = document.getElementById('modelName');
const modelIcon = document.getElementById('modelIcon');
const modelDescription = document.getElementById('modelDescription');

let audioElement = null;
let isAudioPlaying = false;

// База данных моделей
const modelsDB = {
    earth: {
        name: 'Земля',
        icon: '🌍',
        description: 'Наша родная планета — третья от Солнца. Единственное известное место во Вселенной, где существует жизнь. Имеет один естественный спутник — Луну.',
        audio: 'audio/earth.mp3',
        scale: '0.02 0.02 0.02'
    },
    mars: {
        name: 'Марс',
        icon: '🌕',
        description: 'Красная планета — четвёртая от Солнца. Имеет два спутника: Фобос и Деймос.',
        audio: 'audio/mars.mp3',
        scale: '0.1 0.1 0.1'
    },
    iss: {
        name: 'МКС',
        icon: '🛰️',
        description: 'Международная космическая станция — крупнейший искусственный объект на орбите Земли. Совместный проект 14 стран.',
        audio: 'audio/iss.mp3',
        scale: '0.05 0.05 0.05'
    },
    asteroid: {
        name: 'Астероид',
        icon: '☄️',
        description: 'Небесное тело, движущееся по орбите вокруг Солнца. Размеры варьируются от нескольких метров до сотен километров.',
        audio: 'audio/asteroid.mp3',
        scale: '0.15 0.15 0.15'
    },
    meteorite: {
        name: 'Метеорит',
        icon: '💫',
        description: 'Твёрдое тело космического происхождения, упавшее на поверхность Земли. Может содержать редкие минералы.',
        audio: 'audio/meteorite.mp3',
        scale: '0.12 0.12 0.12'
    },
    lunu: {
        name: 'Луна',
        icon: '🌙',
        description: 'Единственный естественный спутник Земли. Пятый по величине спутник в Солнечной системе. Всегда повёрнута к Земле одной стороной.',
        audio: 'audio/lunu.mp3',
        scale: '0.1 0.1 0.1'
    },
    saturn: {
        name: 'Сатурн',
        icon: '🪐',
        description: 'Шестая планета от Солнца, газовый гигант. Известна своими великолепными кольцами, состоящими из льда и пыли.',
        audio: 'audio/saturn.mp3',
        scale: '0.12 0.12 0.12'
    },
    suit: {
        name: 'Скафандр',
        icon: '👨‍🚀',
        description: 'Специальное снаряжение для выхода в открытый космос. Защищает от радиации, экстремальных температур и обеспечивает кислородом.',
        audio: 'audio/suit.mp3',
        scale: '0.4 0.4 0.4'
    }
};

// Функция определения модели по имени файла
function getModelInfo(filename) {
    const name = filename.toLowerCase();
    for (const [key, data] of Object.entries(modelsDB)) {
        if (name.includes(key)) {
            return data;
        }
    }
    return {
        name: 'Модель',
        icon: '📦',
        description: 'Загадочная 3D модель для просмотра в дополненной реальности.',
        audio: null,
        scale: '0.2 0.2 0.2'
    };
}

// Получаем параметр src из URL
const urlParams = new URLSearchParams(window.location.search);
let modelSrc = urlParams.get('src');

if (modelSrc) {
    modelViewer.src = modelSrc;
    
    const fileName = modelSrc.split('/').pop();
    const modelInfo = getModelInfo(fileName);
    
    // Устанавливаем масштаб
    modelViewer.setAttribute('scale', modelInfo.scale);
    
    // Заполняем начальное меню
    modelName.textContent = modelInfo.name;
    modelIcon.textContent = modelInfo.icon;
    modelDescription.textContent = modelInfo.description;
    
    // Настраиваем аудио
    if (modelInfo.audio) {
        audioElement = new Audio(modelInfo.audio);
        audioElement.loop = true;
        
        audioBtn.addEventListener('click', toggleAudio);
    } else {
        audioBtn.style.display = 'none';
    }
    
    // Загрузка модели
    modelViewer.addEventListener('load', () => {
        loading.classList.add('hidden');
        arButton.disabled = false;
    });
    
    modelViewer.addEventListener('error', () => {
        loading.innerHTML = '<span>❌ Ошибка загрузки модели</span>';
        arButton.disabled = true;
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
    
} else {
    loading.innerHTML = '<span>⚠️ Не указан параметр src</span>';
    arButton.disabled = true;
    startBtn.style.display = 'none';
}

// Кнопка старта
startBtn.addEventListener('click', () => {
    introOverlay.classList.add('hidden');
    
    // Начинаем воспроизведение аудио при старте
    if (audioElement && !isAudioPlaying) {
        audioElement.play().then(() => {
            isAudioPlaying = true;
            updateAudioButton();
        }).catch(err => {
            console.log('Автовоспроизведение заблокировано:', err);
        });
    }
});

// Управление аудио
function toggleAudio() {
    if (!audioElement) return;
    
    if (isAudioPlaying) {
        audioElement.pause();
        isAudioPlaying = false;
    } else {
        audioElement.play().then(() => {
            isAudioPlaying = true;
        }).catch(err => {
            console.log('Ошибка воспроизведения:', err);
        });
    }
    updateAudioButton();
}

function updateAudioButton() {
    const icon = audioBtn.querySelector('.audio-icon');
    if (isAudioPlaying) {
        icon.textContent = '⏸️';
        audioBtn.classList.add('pause');
    } else {
        icon.textContent = '▶️';
        audioBtn.classList.remove('pause');
    }
}

// AR кнопка
arButton.addEventListener('click', async () => {
    if (modelViewer.canActivateAR) {
        arButton.disabled = true;
        arButton.textContent = '⏳ Запуск AR...';
        
        try {
            await modelViewer.activateAR();
        } catch (error) {
            console.error('❌ Ошибка AR:', error);
        }
        
        arButton.disabled = false;
        arButton.textContent = '📱 Смотреть в AR';
    } else {
        alert('📱 Ваше устройство не поддерживает AR\n\nПопробуйте открыть на смартфоне или планшете');
    }
});