import { EffectCards } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react"

import { Iconify } from "@/components/common"
import "swiper/css"
import "swiper/css/effect-cards"

export function RotationChart() {
    const avatarStyle = "adventurer"
    const userList = [
        {
            name: "Chloe",
            description: "Backend developer",
            avatar: `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=Chloe`
        },
        {
            name: "Scooter",
            description: "Backend developer",
            avatar: `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=Scooter`
        },
        {
            name: "Whiskers",
            description: "Backend developer",
            avatar: `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=Whiskers`
        },
        {
            name: "Angel",
            description: "Backend developer",
            avatar: `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=Angel`
        },
        {
            name: "Boots",
            description: "Backend developer",
            avatar: `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=Boots`
        },
        {
            name: "Pepper",
            description: "Backend developer",
            avatar: `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=Pepper`
        }
    ]
    return (
        <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            className='h-full max-w-[220px] flex justify-center items-center'
        >
            {userList.map((item, index) => (
                <SwiperSlide key={`userList - ${index}`} className='rounded-2xl'>
                    <Card className='h-full bg-primary-300 flex'>
                        <CardHeader className='justify-center items-center mt-unit-lg'>
                            <Image
                                src={item.avatar}
                                alt='Avatar'
                                width={120}
                                height={120}
                                shadow='md'
                                radius='full'
                                isBlurred
                                isZoomed
                            ></Image>
                        </CardHeader>
                        <CardBody className='items-center'>
                            <p className='text-default-900 text-xl'>{item.name}</p>
                            <p className='text-default-500 text-md'>{item.description}</p>
                        </CardBody>
                        <CardFooter className='justify-center'>
                            <Iconify icon='solar:calendar-mark-bold-duotone' color='#f4f4f5' />
                            <Iconify
                                icon='solar:chat-round-dots-bold-duotone'
                                color='#f4f4f5'
                                className='mx-unit-lg'
                            />
                            <Iconify icon='solar:clock-circle-bold-duotone' color='#f4f4f5' />
                        </CardFooter>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
