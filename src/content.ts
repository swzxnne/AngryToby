const nocapContainer: HTMLDivElement = document.createElement('div');
nocapContainer.id = 'chrome-nocap';
nocapContainer.innerHTML = `
    <div class="nocap-speech-bubble">STOP SHOUTING AT ME!</div>
    <div class="nocap-face-sprite">😡</div>
    <div class="nocap-shaking-fist">🔥</div>
`;

const mountNocap = (): void => {
    if (!document.body || document.body.contains(nocapContainer)) return;
    document.body.appendChild(nocapContainer);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountNocap, { once: true });
} else {
    mountNocap();
}

document.addEventListener('input', (event: Event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const isInputElement = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
    const isEditable = target.isContentEditable;

    if (isInputElement || isEditable) {
        let value = '';
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            value = (target as HTMLInputElement | HTMLTextAreaElement).value;
        } else {
            value = target.innerText || '';
        }

        const words: string[] = value.trim().split(/\s+/).filter(Boolean);

        if (words.length >= 3) {
            const lastThree: string[] = words.slice(-3);
            const isShouting: boolean = lastThree.every((word: string) => {
                const hasLetters = /[A-Z]/.test(word);
                const isAllUpper = word === word.toUpperCase();
                return hasLetters && isAllUpper;
            });

            if (isShouting) {
                nocapContainer.classList.add('nocap-active');
                return;
            }
        }
    }

    nocapContainer.classList.remove('nocap-active');
});
