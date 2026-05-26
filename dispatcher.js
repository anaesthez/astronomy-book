
import { qrActions } from "./config/qr-config.js";
import { initModelAction } from "./actions/model-action.js";

// ============================================
// 🔹 ТОЧКА ВХОДА: читаем параметр src (запускается сразу)
// ============================================
console.log('🚀 dispatcher.js запущен');

const urlParams = new URLSearchParams(window.location.search);
const qrCode = urlParams.get('src');

console.log('📥 Получен action:', qrCode);

if (qrCode && qrActions[qrCode]) {
    // ✅ QR-код найден в конфигурации — выполняем действие
    executeAction(qrActions[qrCode]);
} else if (qrCode) {
    // ⚠️ QR-код есть, но не в конфиге — пробуем загрузить как модель (fallback)
    const modelSrc = `/models/${qrCode}.glb`;
    const modelInfo = getModelInfoFallback(qrCode);
    initModelAction(modelSrc, modelInfo);
} else {
    // ❌ Нет параметра src
    showFallback('⚠️ Не указан параметр src');
}

// ============================================
// 🔹 ИСПОЛНИТЕЛЬ ДЕЙСТВИЙ
// ============================================
function executeAction(action) {
    console.log('📥 Получен action:', action);
    console.log(`🏷️ Тип действия: ${action.type}`);

    switch (action.type) {
        case 'model':
            initModelAction(action.modelSrc, action.modelInfo);
            break;
            
        case 'redirect':
            setTimeout(() => {
                window.location.href = action.url;
            }, action.delay || 0);
            break;
            
        case 'page':
            const params = new URLSearchParams(action.params).toString();
            const separator = action.pageUrl.includes('?') ? '&' : '?';
            window.location.href = `${action.pageUrl}${separator}${params}`;
            break;

        case 'quiz':
            window.location.href = action.url || '/quiz.html';
            break;
            
        default:
            showFallback('⚠️ Неизвестный тип действия');
    }
}

// ============================================
// 🔹 ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================
function getModelInfoFallback(filename) {
    return {
        name: filename.replace('.glb', '').replace(/[-_]/g, ' '),
        icon: '📦',
        description: '3D модель для просмотра в дополненной реальности.',
        audio: null,
        scale: '0.2 0.2 0.2'
    };
}

function showFallback(message) {
    console.log('📢 showFallback:', message);
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('hidden');
        const span = loading.querySelector('span');
        if (span) span.textContent = message;
    }
    const arButton = document.getElementById('arButton');
    if (arButton) arButton.disabled = true;
}