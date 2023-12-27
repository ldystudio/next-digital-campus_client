export function JudgeRenderingEnv() {
    const isDOM =
        typeof window !== "undefined" && window.document && window.document.documentElement

    return {
        isBrowser: isDOM,
        isServer: !isDOM
    }
}
