import type { Metadata } from "next"
import { Card } from "@nextui-org/react"

import PlaceListItem from "./components/place-list-item"
import places from "./components/places"

export const metadata: Metadata = {
    title: "选课管理"
}

export default function CourseChoosePage() {
    return (
        <Card className='my-auto grid h-full grid-cols-1 gap-5 rounded-3xl p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {places.map((place) => (
                <PlaceListItem key={place.id} {...place} />
            ))}
        </Card>
    )
}
