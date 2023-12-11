"use client"
import Link from "next/link"

import { motion } from "framer-motion"

// Our custom easing
const easing = [0.6, -0.05, 0.01, 0.99]

// animate: defines animation
// initial: defines initial state of animation or stating point.
// exit: defines animation when component exits

// Custom variant
const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.6, ease: easing }
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing
        }
    }
}

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

const products = [
    {
        id: "ghost-whey-x-chips-ahoy",
        name: "Ghost Whey X Chips Ahoy",
        details:
            "We've said it before and we will say it again, nothing beats the real thing. With years of R&D and REAL CHIPS AHOY!® cookie pieces in every scoop, this flavor is second to none.",
        price: "$39.99",
        image: "https://cdn.shopify.com/s/files/1/2060/6331/products/image.png?v=1571331841"
    },
    {
        id: "ghost-whey-vegan",
        name: "GHOST® Vegan Protein",
        details:
            "GHOST Vegan Protein combines a premium, fully disclosed vegan protein blend with industry-leading flavors...what more could you ask for?",
        price: "$49.99",
        image: "https://cdn.shopify.com/s/files/1/2060/6331/products/Vegan.png?v=1574882358"
    }
]

export default function Motion() {
    return (
        <motion.div initial='initial' animate='animate' exit={{ opacity: 0 }}>
            <div className='container center'>
                <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className='title'>
                    <h1>Select a protein</h1>
                </motion.div>
                <motion.div variants={stagger} className='product-row'>
                    {products.map((product: any) => (
                        <Link key={product.id} href='/products/[id]' as={`/products/${product.id}`}>
                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className='card'
                            >
                                <span className='category'>Protein</span>
                                <motion.img
                                    initial={{ x: 60, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    key={product.image}
                                    src={product.image}
                                    width={250}
                                />
                                <div className='product-info'>
                                    <h4>{product.name}</h4>
                                    <span>{product.price}</span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    )
}
