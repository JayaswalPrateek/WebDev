function debounce(func, delay=300) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle(func, limit=300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const debouncedUpdate = debounce(function (value) {
    document.getElementById('debouncedOutput').innerText = value;
});

const throttledUpdate = throttle(function (value) {
    document.getElementById('throttledOutput').innerText = value;
});

document.getElementById('inputField').addEventListener('input', function (event) {
    const inputValue = event.target.value;
    document.getElementById('normalOutput').innerText = inputValue;
    debouncedUpdate(inputValue);
    throttledUpdate(inputValue);
});