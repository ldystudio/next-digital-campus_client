import { motion, useMotionTemplate } from "framer-motion"

export function CardPattern({ mouseX, mouseY, randomString }: any) {
    const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`
    const style = { maskImage, WebkitMaskImage: maskImage }

    return (
        <div className='pointer-events-none'>
            <div className='absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50'></div>
            <motion.div
                className='absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0  backdrop-blur-xl transition duration-500 group-hover/card:opacity-100'
                style={style}
            />
            <motion.div
                className='absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay  group-hover/card:opacity-100'
                style={style}
            >
                <p className='absolute inset-x-0 h-full whitespace-pre-wrap break-words font-mono text-xs font-bold text-white transition duration-500'>
                    {randomString}
                </p>
            </motion.div>
        </div>
    )
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
export const generateRandomString = (length: number) => {
    let result = ""
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}
