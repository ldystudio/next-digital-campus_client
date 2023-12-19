"use client"
import { useState } from "react"

import { useMediaQuery } from "react-responsive"
import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"

export function useAvatarList() {
    const [avatar, setAvatar] = useState("")

    const [avatarList, setAvatarList] = useState<Map<string, string>>(generateAvatars())
    function generateAvatars(num: number = 12) {
        const avatars = new Map<string, string>()

        for (let i = 0; i < num; i++) {
            const seed = `${Math.random().toString(36).slice(-8)}`
            const avatar = createAvatar(adventurer, { seed }).toDataUriSync()
            avatars.set(seed, avatar)
        }
        return avatars
    }

    // 竖屏设备显示9个头像，否则显示12个
    const avatarListKeys: string[] = useMediaQuery({ orientation: "portrait" })
        ? Array.from(avatarList.keys()).slice(3)
        : Array.from(avatarList.keys())

    return { avatar, setAvatar, avatarList, setAvatarList, generateAvatars, avatarListKeys }
}
