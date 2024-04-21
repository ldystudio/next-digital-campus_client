import { toast } from "sonner"

interface ContentProps {
    title?: string
    description: string
}

function createNotice() {
    function info(message: ContentProps) {
        toast.info(message.title, {
            description: message.description
        })
    }
    function success(message: ContentProps) {
        toast.success(message.title, {
            description: message.description
        })
    }
    function warning(message: ContentProps) {
        toast.warning(message.title, {
            description: message.description
        })
    }
    function error(message: ContentProps) {
        toast.error(message.title, {
            description: message.description
        })
    }
    return {
        info,
        success,
        warning,
        error
    }
}

export const notice = createNotice()
