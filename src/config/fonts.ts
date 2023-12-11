import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans"
})

const fontMono = FontMono({
    subsets: ["latin"],
    variable: "--font-mono"
})

/**
 * 字体下载地址：https://fonts.google.com/
 * 本地字体使用方法：
 * import { LineFont } from "~/config";
 *
 * <div className={ LineFont.className }></div>
 */

// 线性字体
const LineFont = localFont({ src: "../../public/font/Linefont-Light.ttf" })
const GoogleSans = localFont({ src: "../../public/font/Google Sans.ttf" })
// 适用英文
const JosefinSans = localFont({
    src: [
        {
            path: "../../public/font/JosefinSans/JosefinSans-Light.ttf",
            weight: "300",
            style: "normal"
        },
        {
            path: "../../public/font/JosefinSans/JosefinSans-LightItalic.ttf",
            weight: "300",
            style: "italic"
        },
        {
            path: "../../public/font/JosefinSans/JosefinSans-Regular.ttf",
            weight: "400",
            style: "normal"
        },
        {
            path: "../../public/font/JosefinSans/JosefinSans-Italic.ttf",
            weight: "400",
            style: "italic"
        },
        {
            path: "../../public/font/JosefinSans/JosefinSans-SemiBold.ttf",
            weight: "600",
            style: "normal"
        },
        {
            path: "../../public/font/JosefinSans/JosefinSans-SemiBoldItalic.ttf",
            weight: "600",
            style: "italic"
        }
    ]
})
// 适用文章
const NotoSansSC = localFont({
    src: [
        {
            path: "../../public/font/NotoSansSC/NotoSansSC-Light.ttf",
            weight: "300",
            style: "normal"
        },
        {
            path: "../../public/font/NotoSansSC/NotoSansSC-Regular.ttf",
            weight: "400",
            style: "normal"
        },
        {
            path: "../../public/font/NotoSansSC/NotoSansSC-Medium.ttf",
            weight: "500",
            style: "normal"
        },
        {
            path: "../../public/font/NotoSansSC/NotoSansSC-SemiBold.ttf",
            weight: "600",
            style: "normal"
        }
    ],
    display: "swap"
})
export { fontSans, fontMono, LineFont, GoogleSans, JosefinSans, NotoSansSC }
