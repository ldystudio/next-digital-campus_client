import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import {
    Avatar as NextUIAvatar,
    AvatarProps as NextUIAvatarProps
} from "@nextui-org/react"

interface AvatarProps extends NextUIAvatarProps {
    avatar: string
}

export default function DicebearAvatar({ avatar, ...props }: AvatarProps) {
    return (
        <NextUIAvatar
            src={createAvatar(adventurer, {
                seed: avatar
            }).toDataUriSync()}
            {...props}
        />
    )
}
