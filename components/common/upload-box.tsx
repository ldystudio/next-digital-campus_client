import { useState } from "react"

import Upload from "rc-upload"
import {
    RcFile,
    UploadRequestError,
    UploadRequestOption
} from "rc-upload/lib/interface"
import toast from "react-hot-toast"

import { request } from "~/service/request"

interface UploadBoxProps {
    entityId: string | number
    uploadUrl: string
    label: string
    fileField: string
}

export default function UploadBox({
    entityId,
    uploadUrl,
    label,
    fileField
}: UploadBoxProps) {
    const [selectedFile, setSelectedFile] = useState("")

    const props = {
        action: `${process.env.SERVER_URL}${uploadUrl}${entityId}/`,
        multiple: false,
        type: "drag",
        accept: ".jpg,.jpeg,.png,.gif",
        onStart(file: RcFile) {
            console.log("file: ", file)
            // setSelectedFile(file.name)
        },
        onSuccess() {
            toast.success("上传成功")
        },
        onError() {
            toast.error("上传失败")
        },
        customRequest({ action, file, onError, onSuccess }: UploadRequestOption<any>) {
            const formData = new FormData()
            formData.append(fileField, file)

            request
                .patch<ApiPage.Detail>(action, formData)
                .then(onSuccess)
                .catch(onError)
        }
    }

    return (
        <div className='rounded-lg bg-gray-100 p-2'>
            <p className='mb-2 block text-sm'>{label}</p>
            <div className='flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-gray-400'>
                {selectedFile ? (
                    <div>
                        <span className='text-gray-700'>{selectedFile.name}</span>
                        <button
                            className='ml-2 rounded bg-red-500 px-4 py-1 text-white hover:bg-red-600 focus:bg-red-600 focus:outline-none'
                            onClick={() => setSelectedFile(null)}
                        >
                            删除
                        </button>
                    </div>
                ) : (
                    <Upload {...props}>
                        <a className='text-gray-500'>点击或者拖动文件到该区域来上传</a>
                    </Upload>
                )}
            </div>
        </div>
    )
}
