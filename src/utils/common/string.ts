export function isIncludeSubstring(string: string, subStrings: string[]): boolean {
    for (const subString of subStrings) {
        if (string.includes(subString)) {
            return true
        }
    }
    return false
}
