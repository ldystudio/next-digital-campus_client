import { useState } from "react"

import Upload from "rc-upload"
import {
    BeforeUploadFileType,
    RcFile,
    UploadRequestOption
} from "rc-upload/lib/interface"
import toast from "react-hot-toast"
import { Icon } from "@iconify/react"
import { Snippet } from "@nextui-org/react"

import { Iconify } from "@/components/common/iconify"
import { request } from "~/service/request"

interface UploadBoxProps {
    entityId: string | number
    uploadUrl: string
    label: string
    fileField: string
    fileName: string
}

export default function UploadBox({
    entityId,
    uploadUrl,
    label,
    fileField,
    fileName
}: UploadBoxProps) {
    const [selectedFileName, setSelectedFileName] = useState(fileName)

    const action = `${uploadUrl}${entityId}/`

    const uploadProps = {
        action,
        multiple: false,
        type: "drag",
        accept: ".jpg,.jpeg,.png,.webp,.gif",
        className: "p-12 cursor-pointer",
        onBatchStart(
            fileList: {
                file: RcFile
                parsedFile: Exclude<BeforeUploadFileType, boolean>
            }[]
        ) {
            setSelectedFileName(fileList[0].file.name)
        },
        onSuccess() {
            toast.success("上传成功")
        },
        onError() {
            toast.error("上传失败，请稍后再试")
        },
        async customRequest({
            action,
            file,
            onError,
            onSuccess
        }: UploadRequestOption<any>) {
            const formData = new FormData()
            formData.append(fileField, file)

            const { error } = await request.patch(action, formData)
            // @ts-expect-error ts(2722) Error: 不能调用可能是“未定义”的对象。
            error ? onError() : onSuccess()
        }
    }

    function handleDelete() {
        request.patch<any>(action, { [fileField]: null })
        setSelectedFileName("")
    }

    return (
        <div className='rounded-lg bg-gray-100 p-2'>
            <p className='mb-2 block text-sm'>{label}</p>
            <div className='flex h-32 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-400'>
                <Upload {...uploadProps}>
                    <p className=' text-gray-500'>点击或者拖动文件到该区域来上传</p>
                </Upload>
            </div>
            {selectedFileName && (
                <Snippet
                    symbol={
                        <Iconify icon='solar:paperclip-2-line-duotone' height='auto' />
                    }
                    variant='flat'
                    color='primary'
                    className='mt-2 w-full'
                    copyIcon={
                        <Icon
                            icon='solar:trash-bin-minimalistic-line-duotone'
                            height='auto'
                        />
                    }
                    onCopy={handleDelete}
                    classNames={{ pre: "flex flex-row items-center gap-2" }}
                >
                    <span>{selectedFileName.slice(0, 33)}</span>
                </Snippet>
            )}
        </div>
    )
}
