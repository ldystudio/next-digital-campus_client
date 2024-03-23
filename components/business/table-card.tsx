"use client"

import { Key, useCallback, useMemo, useState } from "react"

import toast from "react-hot-toast"
import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import { Icon } from "@iconify/react"
import {
    Button,
    Card,
    CardBody,
    Chip,
    ChipProps,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
    User
} from "@nextui-org/react"

import {
    ChevronDownIcon,
    Col,
    notice,
    PlusIcon,
    SearchIcon,
    VerticalDotsIcon
} from "@/components/common"
import RenderModalCell from "@/components/custom/render-modal-cell"
import SingleSelection from "@/components/custom/single-selection"
import { useTableParams } from "~/hooks/business"
import { calculateYearDifference, convertToDetail, isString } from "~/utils/common"

interface TableCardProps {
    ariaLabel: string
    columns: Columns
    filterColumns: Columns
    url: string
    statusField?: string
    dateFields: string[]
    isAddDisabled?: boolean
    isDelDisabled?: boolean
    statusOptions?: Columns
    statusColorMap?: Record<string, ChipProps["color"]>
    initialSortColumn?: string
    initialInvisibleColumns?: string[]
}

interface ActionProps {
    rows: any
    onOpen: () => void
    setDetails: (value: any) => void
    setModifiedDetails: (value: any) => void
    isDelDisabled: boolean
    mutate: (url: string) => void
    finalUrl: string
    getOneFn: (id: number) => Promise<Service.RequestResult<ApiPage.Detail>>
    removeOneFn: (id: number) => Promise<Service.RequestResult<null>>
}

function Action({
    rows,
    onOpen,
    setDetails,
    setModifiedDetails,
    isDelDisabled,
    mutate,
    finalUrl,
    getOneFn,
    removeOneFn
}: ActionProps) {
    return (
        <div className='relative flex items-center gap-2'>
            <Dropdown>
                <DropdownTrigger>
                    <Button isIconOnly size='sm' variant='light'>
                        <VerticalDotsIcon className='text-default-300' />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    variant='faded'
                    aria-label={`${rows.id} - DropdownMenu`}
                    disabledKeys={isDelDisabled ? ["delete"] : []}
                >
                    <DropdownItem
                        key='edit'
                        showDivider
                        description='Edit this information'
                        startContent={
                            <Icon
                                icon='solar:pen-new-square-bold-duotone'
                                height={32}
                            />
                        }
                        onPress={async () => {
                            const { data } = await getOneFn(rows.id)
                            setDetails(data)
                            setModifiedDetails({ id: data?.id })
                            onOpen()
                        }}
                    >
                        修改
                    </DropdownItem>
                    <DropdownItem
                        key='delete'
                        className='text-danger'
                        color='danger'
                        description='Delete this information'
                        startContent={
                            <Icon icon='solar:trash-bin-2-bold-duotone' height={32} />
                        }
                        onPress={async () => {
                            const { error } = await removeOneFn(rows.id)
                            mutate(finalUrl)
                            error ? toast.error(error.msg) : toast.success("删除成功")
                        }}
                    >
                        删除
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default function TableCard({
    ariaLabel,
    columns,
    filterColumns,
    url,
    statusField,
    dateFields,
    isAddDisabled = false,
    isDelDisabled = false,
    statusOptions,
    statusColorMap,
    initialSortColumn = "id",
    initialInvisibleColumns = []
}: TableCardProps) {
    const [selectedFilterKeys, setSelectedFilterKeys] = useState(new Set(["id"]))
    const {
        filterValue,
        selectedKeys,
        setSelectedKeys,
        visibleColumns,
        setVisibleColumns,
        statusFilter,
        setStatusFilter,
        rowsPerPage,
        sortDescriptor,
        setSortDescriptor,
        details,
        setDetails,
        modifiedDetails,
        setModifiedDetails,
        page,
        setPage,
        rows,
        pageData,
        headerColumns,
        pages,
        isLoading,
        findStatusName,
        mutate,
        finalUrl,
        onNextPage,
        onPreviousPage,
        onRowsPerPageChange,
        onSearchChange,
        onClear,
        modifiedAttribute,
        getOneFn,
        removeOneFn,
        updateOneFn,
        saveOneFn
    } = useTableParams({
        columns,
        url,
        selectedFilterKeys,
        statusField,
        statusOptions,
        initialSortColumn,
        initialInvisibleColumns
    })

    type Rows = (typeof rows)[0]

    const isInformationPage = url.includes("information")
    const modelColumns = isInformationPage
        ? headerColumns.concat([
              { uid: "email", name: "邮箱" },
              { uid: "avatar", name: "头像" }
          ])
        : headerColumns

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const renderCell = useCallback(
        (rows: Rows, columnKey: Key) => {
            const cellValue = rows[columnKey as keyof Rows]

            if (isString(statusField) && columnKey === statusField && statusColorMap) {
                return (
                    <Chip
                        className='capitalize'
                        color={statusColorMap[rows[statusField as keyof Rows]]}
                        size='sm'
                        variant='flat'
                    >
                        {findStatusName(cellValue as number)}
                    </Chip>
                )
            }

            switch (columnKey) {
                case "real_name":
                    return (
                        <User
                            avatarProps={{
                                radius: "lg",
                                src: createAvatar(adventurer, {
                                    seed: rows.avatar
                                }).toDataUriSync()
                            }}
                            description={rows.email}
                            name={cellValue}
                        >
                            {rows.email}
                        </User>
                    )
                case "gender":
                    return cellValue === 1 ? "男" : "女"
                case "birth_date":
                    return calculateYearDifference(cellValue as string)
                case "leave_start_time":
                case "leave_end_time":
                    return `${cellValue}`.replace("T", " ")
                case "actions":
                    return (
                        <Action
                            rows={rows}
                            onOpen={onOpen}
                            setDetails={setDetails}
                            setModifiedDetails={setModifiedDetails}
                            isDelDisabled={isDelDisabled}
                            getOneFn={getOneFn}
                            removeOneFn={removeOneFn}
                            mutate={mutate}
                            finalUrl={finalUrl}
                        />
                    )
                default:
                    return cellValue
            }
        },
        [
            finalUrl,
            findStatusName,
            getOneFn,
            isDelDisabled,
            mutate,
            onOpen,
            removeOneFn,
            setDetails,
            setModifiedDetails,
            statusColorMap,
            statusField
        ]
    )

    function checkProperty(obj: object) {
        const keys = Object.keys(obj)
        return keys.length === 0 || (keys.length === 1 && keys[0] === "id")
    }

    const selectedValue = useMemo(
        () =>
            columns.find(
                (column) => column.uid === Array.from(selectedFilterKeys).join(", ")
            )?.name,
        [columns, selectedFilterKeys]
    )

    const topContent = useMemo(() => {
        return (
            <div className='flex flex-col gap-4'>
                <div className='flex items-end justify-between gap-3'>
                    <div className='flex gap-3'>
                        <SingleSelection
                            className='hidden lg:flex'
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
                    <div className='flex gap-3'>
                        <div className='hidden gap-3 lg:flex'>
                            {statusField && statusOptions && (
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            endContent={
                                                <ChevronDownIcon className='text-small' />
                                            }
                                            variant='flat'
                                        >
                                            {
                                                columns.find(
                                                    (column) =>
                                                        column.uid === statusField
                                                )?.name
                                            }
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        disallowEmptySelection
                                        aria-label='Table Columns'
                                        closeOnSelect={false}
                                        selectedKeys={statusFilter}
                                        selectionMode='multiple'
                                        onSelectionChange={setStatusFilter}
                                    >
                                        {statusOptions.map((status) => (
                                            <DropdownItem
                                                key={status.uid}
                                                className='capitalize'
                                            >
                                                {status.name}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            )}
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        endContent={
                                            <ChevronDownIcon className='text-small' />
                                        }
                                        variant='flat'
                                    >
                                        选择列
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label='Table Columns'
                                    closeOnSelect={false}
                                    selectedKeys={visibleColumns}
                                    selectionMode='multiple'
                                    onSelectionChange={setVisibleColumns}
                                >
                                    {columns.map((column) => (
                                        <DropdownItem
                                            key={column.uid}
                                            className='capitalize'
                                        >
                                            {column.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <Button
                            color='primary'
                            endContent={<PlusIcon />}
                            isDisabled={isAddDisabled}
                            onPress={() => {
                                setDetails(convertToDetail(modelColumns))
                                onOpen()
                            }}
                        >
                            添加
                        </Button>
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <span className='text-small text-default-400'>
                        共 {pageData?.count ?? 0} 条数据
                    </span>
                    <label className='flex items-center text-small text-default-400'>
                        每页行数:
                        <select
                            className='bg-transparent text-small text-default-400 outline-none'
                            onChange={onRowsPerPageChange}
                            defaultValue={rowsPerPage}
                        >
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                        </select>
                    </label>
                </div>
            </div>
        )
    }, [
        columns,
        filterColumns,
        filterValue,
        isAddDisabled,
        modelColumns,
        onClear,
        onOpen,
        onRowsPerPageChange,
        onSearchChange,
        pageData?.count,
        rowsPerPage,
        selectedFilterKeys,
        selectedValue,
        setDetails,
        setStatusFilter,
        setVisibleColumns,
        statusField,
        statusFilter,
        statusOptions,
        visibleColumns
    ])

    const bottomContent = useMemo(() => {
        return (
            <div className='flex items-center justify-between p-2'>
                <span className='w-[30%] text-small text-default-400'>
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${pageData?.count} selected`}
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
            </div>
        )
    }, [
        onNextPage,
        onPreviousPage,
        page,
        pageData?.count,
        pages,
        selectedKeys,
        setPage
    ])

    return (
        <Card className='rounded-3xl lg:h-full'>
            <CardBody className='no-scrollbar'>
                <Table
                    aria-label={ariaLabel}
                    isHeaderSticky
                    selectedKeys={selectedKeys}
                    selectionMode='multiple'
                    onSelectionChange={setSelectedKeys}
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}
                    topContent={topContent}
                    topContentPlacement='outside'
                    bottomContent={bottomContent}
                    bottomContentPlacement='outside'
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align='center'
                                allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        loadingContent={<Spinner />}
                        loadingState={isLoading ? "loading" : "idle"}
                        emptyContent={
                            <Col fullWidth justify='center'>
                                <Icon
                                    icon='solar:sleeping-square-bold-duotone'
                                    color='#a1a1aa'
                                    height={56}
                                />
                                <p>No rows to display.</p>
                            </Col>
                        }
                        items={rows}
                    >
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardBody>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior='inside'
                isDismissable={false}
                backdrop='blur'
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut"
                            }
                        },
                        exit: {
                            y: 50,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn"
                            }
                        }
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                {modifiedDetails.id ? "修改资料" : "新增资料"}
                            </ModalHeader>
                            <ModalBody>
                                <RenderModalCell
                                    modelColumns={modelColumns}
                                    details={details}
                                    modifiedAttribute={modifiedAttribute}
                                    statusField={statusField}
                                    dateFields={dateFields}
                                    statusOptions={statusOptions}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={() => {
                                        setModifiedDetails({})
                                        onClose()
                                    }}
                                >
                                    关闭
                                </Button>
                                <Button
                                    color='primary'
                                    onPress={async () => {
                                        const actionType = modifiedDetails.id
                                            ? "修改"
                                            : "新增"

                                        if (checkProperty(modifiedDetails)) {
                                            toast.error(
                                                modifiedDetails.id
                                                    ? "请至少修改一项信息"
                                                    : "未输入任何信息"
                                            )
                                            return
                                        }

                                        const { error } = modifiedDetails.id
                                            ? await updateOneFn(modifiedDetails)
                                            : await saveOneFn(modifiedDetails)

                                        if (error) {
                                            notice.error({
                                                description: `${actionType}失败，请稍后再试`
                                            })
                                            return
                                        }

                                        notice.success({
                                            description: `${actionType}成功`
                                        })
                                        mutate(finalUrl)
                                        onClose()
                                    }}
                                >
                                    {modifiedDetails.id ? "修改" : "新增"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Card>
    )
}
