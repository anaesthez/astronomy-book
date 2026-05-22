(() => {
    const modelViewer = document.querySelector('#xfade-demo');
    const currentAnimationSpan = document.getElementById('current-animation');

    self.setInterval(() => {
        modelViewer.animationName = modelViewer.animationName === 'Running' ? 'Idle' : 'Running';
        currentAnimationSpan.textContent = modelViewer.animationName;
    }, 1500.0);
            
    modelViewer.addEventListener('load', () => {
            currentAnimationSpan.textContent = modelViewer.animationName;
        });
    })();
        
    function changeAnimation(animationName) {
        const modelViewer = document.querySelector('#xfade-demo');
        const currentAnimationSpan = document.getElementById('current-animation');
            
        modelViewer.animationName = animationName;
        currentAnimationSpan.textContent = animationName;
    }