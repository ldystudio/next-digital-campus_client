import { JudgeRenderingEnv } from "~/hooks/common"
import { deCrypto, enCrypto } from "../crypto"

function createSessionStorage<T extends StorageInterface.Session = StorageInterface.Session>() {
    const { isServer } = JudgeRenderingEnv()
    if (isServer) {
        return {
            set: () => {},
            get: () => null,
            remove: () => {},
            clear: () => {}
        }
    }

    function set<K extends keyof T>(key: K, value: T[K]) {
        const json = enCrypto(value)
        sessionStorage.setItem(key as string, json)
    }
    function get<K extends keyof T>(key: K) {
        const json = sessionStorage.getItem(key as string)
        let data: T[K] | null = null
        if (json) {
            try {
                data = deCrypto(json)
            } catch {
                // 防止解析失败
            }
        }
        return data
    }
    function remove(key: keyof T) {
        window.sessionStorage.removeItem(key as string)
    }
    function clear() {
        window.sessionStorage.clear()
    }

    return {
        set,
        get,
        remove,
        clear
    }
}

export const sessionStg = createSessionStorage()
