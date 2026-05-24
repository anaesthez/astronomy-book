// ============================================
// 🔹 КОНФИГУРАЦИЯ QR-КОДОВ - КОСМИЧЕСКИЙ ПРОЕКТ
// 🔢 Нумерация: qr-1, qr-2, ..., qr-30
// ============================================

export const qrActions = {
    // 🪐 ПЛАНЕТЫ (qr-1 — qr-10)
    'qr-1': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/earth.glb',
        modelInfo: {
            name: 'Земля',
            icon: '🌍',
            description: 'Наша голубая планета — единственное известное место во Вселенной, где существует жизнь.',
            audio: '/audio/earth-narration.mp3',
            scale: '0.1 0.1 0.1'
        },
        attribution: 'Источник: NASA Science'
    },
    
    'qr-2': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: '/models/solar-system.glb',
        modelInfo: {
            name: 'Солнечная система',
            icon: '☀️',
            description: 'Наша звёздная система с Солнцем в центре и восемью планетами на орбитах.',
            audio: '/audio/solar-system-narration.mp3',
            scale: '0.2 0.2 0.2'
        },
        attribution: 'Модель: Solar System Model Orrery by SketchFab'
    },
    
    'qr-3': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/models/Nastya_umnichka_sdelala_lunu.glb',
        modelInfo: {
            name: 'Луна',
            icon: '🌙',
            description: 'Естественный спутник Земли, единственный внеземной объект, на котором побывал человек.',
            audio: '/audio/moon-narration.mp3',
            scale: '0.25 0.25 0.25'
        },
        attribution: null
    },
    
    'qr-4': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/sun.glb',
        modelInfo: {
            name: 'Солнце',
            icon: '☀️',
            description: 'Звезда в центре нашей Солнечной системы. Источник света и тепла для Земли.',
            audio: '/audio/sun-narration.mp3',
            scale: '0.4 0.4 0.4'
        },
        attribution: null
    },
    
    'qr-5': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/mercury.glb',
        modelInfo: {
            name: 'Меркурий',
            icon: ' ',
            description: 'Самая маленькая и близкая к Солнцу планета. Год на Меркурии длится 88 земных дней.',
            audio: '/audio/mercury-narration.mp3',
            scale: '0.2 0.2 0.2'
        },
        attribution: null
    },
    
    'qr-6': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/venus.glb',
        modelInfo: {
            name: 'Венера',
            icon: ' ',
            description: 'Вторая планета от Солнца. Самая горячая планета с температурой до 475°C.',
            audio: '/audio/venus-narration.mp3',
            scale: '0.22 0.22 0.22'
        },
        attribution: null
    },
    
    'qr-7': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'astronomy-book/models/mars.glb',
        modelInfo: {
            name: 'Марс',
            icon: ' ',
            description: 'Красная планета. Цель будущих космических миссий и возможного колонизирования.',
            audio: '/audio/mars-narration.mp3',
            scale: '0.23 0.23 0.23'
        },
        attribution: 'Модель: Planet Mars - NASA Mars Landing 2021'
    },
    
    'qr-8': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/jupiter.glb',
        modelInfo: {
            name: 'Юпитер',
            icon: ' ',
            description: 'Самая большая планета Солнечной системы. Газовый гигант с Большим Красным Пятном.',
            audio: '/audio/jupiter-narration.mp3',
            scale: '0.35 0.35 0.35'
        },
        attribution: 'Модель: Jupiter by SketchFab'
    },
    
    'qr-9': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/Nastya_umnichka_sdelala_saturn.glb',
        modelInfo: {
            name: 'Сатурн',
            icon: ' ',
            description: 'Шестая планета от Солнца, известная своей великолепной системой колец.',
            audio: '/audio/saturn-narration.mp3',
            scale: '0.32 0.32 0.32'
        },
        attribution: null
    },
    
    'qr-10': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/uranus.glb',
        modelInfo: {
            name: 'Уран',
            icon: ' ',
            description: 'Седьмая планета, ледяной гигант, вращающийся «лёжа на боку».',
            audio: '/audio/uranus-narration.mp3',
            scale: '0.28 0.28 0.28'
        },
        attribution: null
    },
    
    // 🌌 ДАЛЬНИЕ ОБЪЕКТЫ И КОСМИЧЕСКИЕ ТЕЛА (qr-11 — qr-17)
    
    'qr-11': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/neptune.glb',
        modelInfo: {
            name: 'Нептун',
            icon: ' ',
            description: 'Восьмая и самая далёкая планета. Ледяной гигант с сильнейшими ветрами.',
            audio: '/audio/neptune-narration.mp3',
            scale: '0.27 0.27 0.27'
        },
        attribution: 'Модель: Neptune by SketchFab'
    },
    
    'qr-12': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/comet.glb',
        modelInfo: {
            name: 'Комета',
            icon: '☄️',
            description: 'Ледяное космическое тело с ярким хвостом, образующимся при приближении к Солнцу.',
            audio: '/audio/comet-narration.mp3',
            scale: '0.2 0.2 0.2'
        },
        attribution: null
    },
    
    'qr-13': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/asteroid.glb',
        modelInfo: {
            name: 'Астероид',
            icon: '🌑',
            description: 'Небесное тело неправильной формы, вращающееся вокруг Солнца.',
            audio: '/audio/asteroid-narration.mp3',
            scale: '0.2 0.2 0.2'
        },
        attribution: null
    },
    
    'qr-14': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/meteorite.glb',
        modelInfo: {
            name: 'Метеорит',
            icon: '☄️',
            description: 'Осколок астероида или кометы, упавший на поверхность Земли.',
            audio: '/audio/meteorite-narration.mp3',
            scale: '0.15 0.15 0.15'
        },
        attribution: null
    },
    
    'qr-15': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: '/models/star.glb',
        modelInfo: {
            name: 'Звезда',
            icon: '⭐',
            description: 'Раскалённый газовый шар, излучающий свет и тепло благодаря ядерным реакциям.',
            audio: '/audio/star-narration.mp3',
            scale: '0.3 0.3 0.3'
        },
        attribution: null
    },
    
    'qr-16': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: '/models/galaxy.glb',
        modelInfo: {
            name: 'Галактика',
            icon: '🌌',
            description: 'Огромная система из миллиардов звёзд, газа и тёмной материи.',
            audio: '/audio/galaxy-narration.mp3',
            scale: '0.25 0.25 0.25'
        },
        attribution: null
    },
    
    'qr-17': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/suit.glb',
        modelInfo: {
            name: 'Космический скафандр',
            icon: '👨‍🚀',
            description: 'Advanced Crew Escape Suit — защитный костюм астронавта для выхода в открытый космос.',
            audio: '/audio/spacesuit-narration.mp3',
            scale: '0.2 0.2 0.2'
        },
        attribution: 'Источник: NASA Science - Advanced Crew Escape Suit'
    },
    
    // 🚀 ТЕХНИКА И СТАНЦИИ (qr-18 — qr-20)
    
    'qr-18': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: '/models/rocket.glb',
        modelInfo: {
            name: 'Космическая ракета',
            icon: '🚀',
            description: 'Средство выведения космических аппаратов на орбиту и за пределы Земли.',
            audio: '/audio/rocket-narration.mp3',
            scale: '0.15 0.15 0.15'
        },
        attribution: null
    },
    
    'qr-19': {
        type: 'model',
        handler: 'actions/model-action.js',
        modelSrc: 'models/iss.glb',
        modelInfo: {
            name: 'Международная космическая станция',
            icon: '🛰️',
            description: 'Орбитальная станция, созданная для научных исследований в космосе.',
            audio: '/audio/iss-narration.mp3',
            scale: '0.1 0.1 0.1'
        },
        attribution: 'Источник: NASA - International Space Station'
    },
    
    // 🔗 РЕДИРЕКТЫ (qr-20 — qr-21)
    
    'qr-20': {
        type: 'redirect',
        handler: 'actions/redirect-action.js',
        url: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D1%80%D1%81',
        delay: 500
    },
    
    'qr-21': {
        type: 'redirect',
        handler: 'actions/redirect-action.js',
        url: 'https://www.roscosmos.ru/202/',
        delay: 500
    },
    
    // 📝 ВИКТОРИНЫ (qr-22 — qr-25)
    
    'qr-22': {
        type: 'quiz',
        handler: 'actions/quiz-action.js',
        quizData: {
            title: 'Викторина: Глава 1 — Введение',
            icon: '📝',
            description: 'Проверьте базовые знания о космосе!',
            questions: [
                {
                    question: 'Какая планета ближе всего к Солнцу?',
                    options: ['Венера', 'Меркурий', 'Земля', 'Марс'],
                    correct: 1
                },
                {
                    question: 'Сколько планет в Солнечной системе?',
                    options: ['7', '8', '9', '10'],
                    correct: 1
                },
                {
                    question: 'Какая планета самая большая?',
                    options: ['Сатурн', 'Нептун', 'Юпитер', 'Уран'],
                    correct: 2
                }
            ]
        }
    },
    
    'qr-23': {
        type: 'quiz',
        handler: 'actions/quiz-action.js',
        quizData: {
            title: 'Викторина: Глава 2 — Планеты',
            icon: '📝',
            description: 'Всё о планетах Солнечной системы!',
            questions: [
                {
                    question: 'Какая планета называется «Красной»?',
                    options: ['Венера', 'Марс', 'Юпитер', 'Сатурн'],
                    correct: 1
                },
                {
                    question: 'У какой планеты есть кольца?',
                    options: ['Юпитер', 'Сатурн', 'Уран', 'Все перечисленные'],
                    correct: 3
                },
                {
                    question: 'На какой планете самый короткий год?',
                    options: ['Меркурий', 'Венера', 'Земля', 'Марс'],
                    correct: 0
                }
            ]
        }
    },
    
    'qr-24': {
        type: 'quiz',
        handler: 'actions/quiz-action.js',
        quizData: {
            title: 'Викторина: Глава 3 — Звёзды и галактики',
            icon: '📝',
            description: 'Проверьте знания о звёздах и дальнем космосе!',
            questions: [
                {
                    question: 'Что такое звезда?',
                    options: [
                        'Холодный каменный объект',
                        'Раскалённый газовый шар',
                        'Ледяное тело с хвостом',
                        'Спутник планеты'
                    ],
                    correct: 1
                },
                {
                    question: 'Как называется наша галактика?',
                    options: ['Андромеда', 'Млечный Путь', 'Треугольник', 'Большое Магелланово Облако'],
                    correct: 1
                },
                {
                    question: 'Что такое комета?',
                    options: [
                        'Планета без атмосферы',
                        'Ледяное тело с хвостом',
                        'Упавший на Землю камень',
                        'Спутник астероида'
                    ],
                    correct: 1
                }
            ]
        }
    },
    
    'qr-25': {
        type: 'quiz',
        handler: 'actions/quiz-action.js',
        quizData: {
            title: 'Викторина: Глава 4 — Космонавтика',
            icon: '📝',
            description: 'Всё о космических полётах и технике!',
            questions: [
                {
                    question: 'Кто первым полетел в космос?',
                    options: ['Нил Армстронг', 'Юрий Гагарин', 'Валентина Терешкова', 'Илон Маск'],
                    correct: 1
                },
                {
                    question: 'Что такое МКС?',
                    options: [
                        'Межконтинентальная космическая станция',
                        'Международная космическая станция',
                        'Московская космическая служба',
                        'Марсианская исследовательская зона'
                    ],
                    correct: 1
                },
                {
                    question: 'Для чего нужен скафандр?',
                    options: [
                        'Для красоты',
                        'Для защиты в открытом космосе',
                        'Для полётов на самолёте',
                        'Для подводных погружений'
                    ],
                    correct: 1
                }
            ]
        }
    }
};

// Fallback для моделей, не указанных в конфиге
export function getModelInfoFallback(filename) {
    return {
        name: filename.replace('.glb', '').replace(/[-_]/g, ' '),
        icon: '📦',
        description: '3D модель для просмотра в дополненной реальности.',
        audio: null,
        scale: '0.2 0.2 0.2'
    };
}