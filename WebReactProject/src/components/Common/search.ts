import { useEffect, useState } from "react";

var timeout: any = 0;

export const useSearchDelay = (func: any) => {
    if (timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
        return func;
    }, 300)
}

function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

export default useDebounce