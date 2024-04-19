"use client"

import { useEffect } from "react"

import { motion, stagger, useAnimate } from "framer-motion"

interface TextGenerateEffectProps {
    text: string
    className?: string
}

export const TextGenerateEffect = ({ text, className }: TextGenerateEffectProps) => {
    const [scope, animate] = useAnimate()
    let wordsArray = Array.from(text)

    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1
            },
            {
                duration: 1.5,
                delay: stagger(0.1)
            }
        )
    }, [scope.current])

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return <motion.span key={word + idx}>{word}</motion.span>
                })}
            </motion.div>
        )
    }

    return <p className={className}>{renderWords()}</p>
}
