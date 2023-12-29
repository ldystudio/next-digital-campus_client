import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react"
import { EffectCards } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

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
            className='flex h-full max-w-[220px] items-center justify-center'
        >
            {userList.map((item, index) => (
                <SwiperSlide key={`userList - ${index}`} className='rounded-2xl'>
                    <Card className='flex h-full bg-primary-300'>
                        <CardHeader className='mt-unit-lg items-center justify-center'>
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
                            <p className='text-xl text-default-900'>{item.name}</p>
                            <p className='text-medium text-default-500'>{item.description}</p>
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
