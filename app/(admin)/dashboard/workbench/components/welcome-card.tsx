import { Card } from "@nextui-org/card"

import { cn } from "~/utils"

export default function WelcomeCard({ className }: PageComponentProps) {
    return (
        <Card
            className={cn(
                className,
                "min-h-48 bg-[url(https://api.oick.cn/api/netcard)] bg-cover bg-center bg-no-repeat"
            )}
        />
    )
}
