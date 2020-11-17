export function debounce(func, delay = 500) {
    let timer = null;
    return function () {
        const args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                func(args)
            }, delay)
        }
    }
}