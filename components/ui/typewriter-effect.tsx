"use client"

import { motion } from "framer-motion"

import { cn } from "~/utils"

interface TypewriterEffectSmoothProps {
    words: {
        text: string
        className?: string
    }[]
    className?: string
    hasCursor?: boolean
    cursorClassName?: string
}

export const TypewriterEffectSmooth = ({
    words,
    className,
    hasCursor,
    cursorClassName
}: TypewriterEffectSmoothProps) => {
    // split text inside of words into array of characters
    const wordsArray = words.map((word) => {
        return {
            ...word,
            text: Array.from(word.text)
        }
    })
    const renderWords = () => {
        return (
            <div>
                {wordsArray.map((word, idx) => {
                    return (
                        <div
                            key={`word-${idx}`}
                            className={cn("inline-block", word.className)}
                        >
                            {word.text.map((char, index) => (
                                <span key={`char-${index}`}>{char}</span>
                            ))}
                            &nbsp;
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={cn("my-3 inline-flex items-center gap-1", className)}>
            <motion.div
                className='overflow-hidden'
                initial={{
                    width: "0%"
                }}
                whileInView={{
                    width: "fit-content"
                }}
                transition={{
                    duration: 2,
                    ease: "linear",
                    delay: 1
                }}
            >
                <div className='whitespace-nowrap'>{renderWords()}</div>
            </motion.div>
            {hasCursor && (
                <motion.span
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className={cn(
                        "block h-6 w-[4px] rounded-sm bg-primary lg:h-8",
                        cursorClassName
                    )}
                />
            )}
        </div>
    )
}
