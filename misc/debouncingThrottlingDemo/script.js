// Utility functions for debouncing and throttling
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Function to update the output text
function updateOutput(element, value) {
    element.textContent = `You typed: ${value}`;
}

// Without any control
const noControlInput = document.getElementById('no-control');
const noControlOutput = document.getElementById('no-control-output');
noControlInput.addEventListener('input', (e) => {
    updateOutput(noControlOutput, e.target.value);
});

// With debouncing
const debouncedInput = document.getElementById('debounced');
const debouncedOutput = document.getElementById('debounced-output');
debouncedInput.addEventListener('input', debounce((e) => {
    updateOutput(debouncedOutput, e.target.value);
}, 300)); // 300ms debounce

// With throttling
const throttledInput = document.getElementById('throttled');
const throttledOutput = document.getElementById('throttled-output');
throttledInput.addEventListener('input', throttle((e) => {
    updateOutput(throttledOutput, e.target.value);
}, 300)); // 300ms throttle