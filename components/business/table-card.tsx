"use client"

import { Key, useCallback, useMemo, useState } from "react"

import clsx from "clsx"
import toast from "react-hot-toast"
import * as adventurer from "@dicebear/adventurer"
import { createAvatar } from "@dicebear/core"
import { Icon } from "@iconify/react"
import {
    Avatar,
    AvatarGroup,
    Button,
    Card,
    CardBody,
    Chip,
    ChipProps,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
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
    Tooltip,
    useDisclosure,
    User
} from "@nextui-org/react"

import { Col } from "@/components/common/dimension"
import {
    ChevronDownIcon,
    PlusIcon,
    SearchIcon,
    VerticalDotsIcon
} from "@/components/common/icons"
import { notice } from "@/components/common/notice"
import Scrollbar from "@/components/common/scrollbar"
import RenderModalCell from "@/components/custom/render-modal-cell"
import SingleSelection from "@/components/custom/single-selection"
import { useTableParams } from "~/hooks/business"
import {
    calculateYearDifference,
    convertToDetail,
    isIncludeSubstring,
    isString
} from "~/utils/common"

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
    disabledInput?: string[]
    initialSortColumn?: string
    initialInvisibleColumns?: string[]
    groupField?: string
    groupFetchUrl?: string
}

interface ActionProps {
    rows: any
    onOpen: () => void
    setDetails: (value: any) => void
    setModifiedDetails: (value: any) => void
    isDelDisabled: boolean
    refetch: () => void
    getOneFn: (id: string) => Promise<Service.RequestResult<ApiPage.Detail>>
    removeOneFn: (id: string) => Promise<Service.RequestResult<null>>
}

function Action({
    rows,
    onOpen,
    setDetails,
    setModifiedDetails,
    isDelDisabled,
    refetch,
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
                    aria-label={`DropdownMenu - ${rows?.id}`}
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
                            refetch()
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
    disabledInput,
    initialSortColumn = "-id",
    initialInvisibleColumns = [],
    groupField,
    groupFetchUrl
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
        refetch,
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

    const isInformationPage = [
        "/student/information/",
        "/teacher/information/"
    ].includes(url)
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
            if (["student", "entered_by"].includes(columnKey as string)) {
                const { [columnKey as keyof Rows]: simpleUser, ...remainingRows } = rows
                // @ts-expect-error cellValue is a SimpleUser
                rows = { ...remainingRows, ...simpleUser }
            }

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

            if (groupField && columnKey === groupField && groupField !== "student") {
                const userGroup = rows[
                    groupField as keyof Rows
                ] as unknown as ApiPage.Detail[]
                return (
                    <AvatarGroup isBordered max={5} className='justify-start'>
                        {userGroup.map((row) => (
                            <Tooltip
                                key={row.id}
                                content={<div className='w-11'>{row.real_name}</div>}
                            >
                                <Avatar
                                    src={createAvatar(adventurer, {
                                        seed: row.avatar
                                    }).toDataUriSync()}
                                />
                            </Tooltip>
                        ))}
                    </AvatarGroup>
                )
            }

            if ((columnKey as string).includes("picture")) {
                return cellValue === null ? (
                    "暂无图片"
                ) : (
                    <Image
                        src={cellValue as string}
                        alt={cellValue as string}
                        width={150}
                    />
                )
            }

            if (isIncludeSubstring(columnKey as string, ["description", "notes"])) {
                const displayValue = `${cellValue}`
                if (displayValue && displayValue.length > 20) {
                    return displayValue.slice(0, 20) + "..."
                }
            }

            switch (columnKey) {
                case "real_name":
                case "student":
                case "entered_by":
                    return (
                        <User
                            avatarProps={{
                                radius: "lg",
                                src: createAvatar(adventurer, {
                                    seed: rows.avatar
                                }).toDataUriSync()
                            }}
                            description={rows.email}
                            name={
                                columnKey === "real_name" ? cellValue : rows.real_name
                            }
                        >
                            {rows.email}
                        </User>
                    )
                case "gender":
                    return cellValue === 1 ? "男" : "女"
                case "birth_date":
                    return calculateYearDifference(cellValue as string)
                case "exam_score":
                    return (
                        <span
                            className={clsx(
                                "font-bold",
                                (cellValue as number) >= 60
                                    ? (cellValue as number) >= 80
                                        ? "text-success"
                                        : "text-warning"
                                    : "text-danger"
                            )}
                        >
                            {cellValue}
                        </span>
                    )
                case "leave_start_time":
                case "leave_end_time":
                    return `${cellValue}`.replace("T", " ")
                case "classes":
                    return (cellValue as unknown as Classes[]).map((cls) => (
                        <p key={cls.id} className='truncate'>
                            {cls.class_name}
                        </p>
                    ))
                case "course":
                    // @ts-expect-error cellValue is a Object
                    return cellValue.course_name
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
                            refetch={refetch}
                        />
                    )
                default:
                    return cellValue
            }
        },
        [
            findStatusName,
            getOneFn,
            isDelDisabled,
            refetch,
            onOpen,
            removeOneFn,
            setDetails,
            setModifiedDetails,
            statusColorMap,
            statusField,
            groupField
        ]
    )

    function checkProperty(obj: object) {
        const keys = Object.keys(obj)
        return keys.length === 0 || (keys.length === 1 && keys[0] === "id")
    }

    const selectedValue = useMemo(
        () =>
            filterColumns.find(
                (filterColumns) =>
                    filterColumns.uid === Array.from(selectedFilterKeys).join(", ")
            )?.name,
        [filterColumns, selectedFilterKeys]
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
                            type={selectedFilterKeys.has("id") ? "number" : "text"}
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
                                setDetails(convertToDetail(modelColumns, groupField))
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
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                            <option value='12'>12</option>
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
        groupField,
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
                <span className='hidden w-[30%] text-small text-default-400 md:block'>
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
        <Card className='h-[calc(100dvh-100px)] rounded-3xl lg:h-full'>
            <CardBody className='scrollbar-hide'>
                <Table
                    aria-label={ariaLabel}
                    // isStriped
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
                            isLoading ? (
                                <div />
                            ) : (
                                <Col fullWidth justify='center'>
                                    <Icon
                                        icon='solar:sleeping-square-bold-duotone'
                                        color='#a1a1aa'
                                        height={56}
                                    />
                                    <p>无内容</p>
                                </Col>
                            )
                        }
                        items={rows}
                    >
                        {(item) => (
                            <TableRow key={`TableRow - ${item?.id}`}>
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
                onClose={() => {
                    setModifiedDetails({})
                    refetch()
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                {modifiedDetails.id ? "修改资料" : "新增资料"}
                            </ModalHeader>
                            <Scrollbar>
                                <ModalBody>
                                    <RenderModalCell
                                        modelColumns={modelColumns}
                                        details={details}
                                        modifiedDetails={modifiedDetails}
                                        modifiedAttribute={modifiedAttribute}
                                        url={url}
                                        statusField={statusField}
                                        dateFields={dateFields}
                                        statusOptions={statusOptions}
                                        disabledInput={
                                            modifiedDetails.id
                                                ? disabledInput
                                                : ["entered_by"]
                                        }
                                        groupField={groupField}
                                        groupFetchUrl={groupFetchUrl}
                                    />
                                </ModalBody>
                            </Scrollbar>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
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
                                                title: `${actionType}失败`,
                                                description: error.msg
                                            })
                                            return
                                        }

                                        notice.success({
                                            description: `${actionType}成功`
                                        })
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
