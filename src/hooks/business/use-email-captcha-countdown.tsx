import { useState } from "react"

import { useCountDown } from "ahooks"

export function useEmailCaptchaCountdown(seconds: number = 60) {
    const [targetDate, setTargetDate] = useState<number>()
    const [count] = useCountDown({ targetDate })

    function startCountDown() {
        setTargetDate(Date.now() + seconds * 1000)
    }

    function CountdownText() {
        return count === 0 ? (
            <span>获取验证码</span>
        ) : (
            <span>{Math.round(count / 1000)} 秒后重新获取</span>
        )
    }

    return {
        count,
        startCountDown,
        CountdownText
    }
}
