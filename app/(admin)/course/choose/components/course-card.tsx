"use client"

import React from "react"

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    useDisclosure
} from "@nextui-org/react"

import { SearchIcon } from "@/components/common/icons"
import SingleSelection from "@/components/custom/single-selection"
import { useTableParams } from "~/hooks/business"
import { useEffectOnce } from "~/hooks/common"
import CourseDetail from "./course-detail"
import CourseListItem, { CourseItem } from "./course-item"

interface CourseListCardProps {
    columns: Columns
    filterColumns: Columns
    url: string
}

export default function CourseListCard({
    columns,
    filterColumns,
    url
}: CourseListCardProps) {
    const [selectedFilterKeys, setSelectedFilterKeys] = React.useState(new Set(["id"]))
    const [selectedCourseId, setSelectedCourseId] = React.useState("")

    const {
        filterValue,
        page,
        setPage,
        rows,
        pageData,
        pages,
        isLoading,
        onNextPage,
        onPreviousPage,
        onSearchChange,
        onClear,
        setRowsPerPage
    } = useTableParams({
        columns,
        url,
        selectedFilterKeys
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    useEffectOnce(() => {
        setRowsPerPage(12)
    })

    const selectedValue = React.useMemo(
        () =>
            filterColumns.find(
                (filterColumns) =>
                    filterColumns.uid === Array.from(selectedFilterKeys).join(", ")
            )?.name,
        [filterColumns, selectedFilterKeys]
    )

    return (
        <Card className='my-auto h-full rounded-3xl'>
            <CardHeader>
                <div className='flex gap-3'>
                    <SingleSelection
                        columns={filterColumns}
                        selectedValue={selectedValue!}
                        selectedFilterKeys={selectedFilterKeys}
                        setSelectedFilterKeys={setSelectedFilterKeys}
                    />
                    <Input
                        isClearable
                        fullWidth
                        placeholder={`按${selectedValue}搜索...`}
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={onClear}
                        onValueChange={onSearchChange}
                    />
                </div>
            </CardHeader>
            <CardBody>
                <Card
                    className='grid h-full grid-cols-2 gap-5 overflow-y-auto p-4 scrollbar-hide sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
                    shadow='none'
                >
                    {(rows as unknown as CourseItem[])?.map((course) => (
                        <CourseListItem
                            key={course.id}
                            isLoading={isLoading}
                            onOpen={onOpen}
                            setSelectedCourseId={setSelectedCourseId}
                            {...course}
                        />
                    ))}
                </Card>
            </CardBody>
            <CardFooter className='flex items-center justify-between'>
                <span className='hidden w-[30%] text-small text-default-400 md:block'>
                    共{pageData?.count}条可选课程
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color='primary'
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className='hidden w-[30%] justify-end gap-2 sm:flex'>
                    <Button
                        isDisabled={pages === 1}
                        size='sm'
                        variant='flat'
                        onPress={onPreviousPage}
                    >
                        上一页
                    </Button>
                    <Button
                        isDisabled={pages === 1}
                        size='sm'
                        variant='flat'
                        onPress={onNextPage}
                    >
                        下一页
                    </Button>
                </div>
            </CardFooter>

            <Modal
                size='5xl'
                scrollBehavior='inside'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                课程详情
                            </ModalHeader>
                            <ModalBody>
                                <CourseDetail
                                    columns={columns}
                                    course={
                                        (rows as unknown as CourseItem[]).find(
                                            (row) => row.id === selectedCourseId
                                        )!
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
                                >
                                    关闭
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Card>
    )
}
