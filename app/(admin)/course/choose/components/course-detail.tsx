import React from "react"

import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import { Avatar, AvatarGroup } from "@nextui-org/avatar"
import { Image } from "@nextui-org/image"
import { Tooltip } from "@nextui-org/tooltip"

import { Col } from "@/components/common/dimension"
import { NotoSansSC } from "~/config"
import CellValue from "./cell-value"
import { CourseItem } from "./course-item"

interface CourseDetailProps {
    columns: Columns
    course: CourseItem
}

export default function CourseDetail({ columns, course }: CourseDetailProps) {
    const { course_name, course_picture, course_description } = course

    return (
        course && (
            <div
                className={`${NotoSansSC.className} flex w-full flex-col items-center justify-between gap-3 lg:flex-row lg:gap-5`}
            >
                <Col justify='center' className='lg:w-1/2'>
                    <Image
                        isZoomed
                        alt={course_name}
                        className='aspect-square h-72 hover:scale-110'
                        src={course_picture}
                        fallbackSrc='https://via.placeholder.com/300x300'
                    />
                    <p className='text-lg font-bold'>{course_name}</p>
                    <p className='indent-8 text-default-500'>{course_description}</p>
                </Col>
                <Col
                    justify='between'
                    className='w-full rounded-lg bg-default-50 px-3 lg:w-1/2'
                >
                    {columns.map(
                        (column) =>
                            ![
                                "id",
                                "course_name",
                                "course_picture",
                                "course_description"
                            ].includes(column.uid) &&
                            (column.uid !== "teacher" ? (
                                <CellValue
                                    key={column.uid}
                                    label={column.name}
                                    value={`${course[column.uid as keyof CourseItem]}`}
                                />
                            ) : (
                                <CellValue
                                    key={column.uid}
                                    label={column.name}
                                    value={
                                        <AvatarGroup
                                            isBordered
                                            max={5}
                                            className='justify-start'
                                        >
                                            {course.teacher.map((row) => (
                                                <Tooltip
                                                    key={row.id}
                                                    content={
                                                        <div className='w-11'>
                                                            {row.real_name}
                                                        </div>
                                                    }
                                                >
                                                    <Avatar
                                                        src={createAvatar(adventurer, {
                                                            seed: row.avatar
                                                        }).toDataUriSync()}
                                                    />
                                                </Tooltip>
                                            ))}
                                        </AvatarGroup>
                                    }
                                />
                            ))
                    )}
                </Col>
            </div>
        )
    )
}
