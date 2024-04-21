import { Col } from "@/components/common/dimension"
import Scrollbar from "@/components/common/scrollbar"
import { cn } from "~/utils"

export default function OverlayScrollbar({
    children,
    className
}: LayoutProps & { className?: string }) {
    return (
        <Scrollbar className='h-screen'>
            <Col className={cn("grow", className)}>{children}</Col>
        </Scrollbar>
    )
}
