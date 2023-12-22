import { Button, Card } from "@nextui-org/react"

import { Col, Iconify, Link, Row, Logo, ThemeSwitch } from "@/components/common"
import AdminMenu from "./menu"
import UserInfo from "./user-info"

/**
 * Renders the Side component.
 *
 * @returns {JSX.Element} The JSX element representing the Side component.
 */
export default function Side(): JSX.Element {
    return (
        <Card
            className='hidden lg:flex min-w-[12rem] ml-5 my-5 items-center justify-around'
            shadow='sm'
        >
            <Link href='/index' color='foreground' className='pt-1'>
                <Logo size={60} />
            </Link>
            <div className='h-3/5 w-full'>
                <AdminMenu />
            </div>
            <Col>
                <UserInfo />
                <Row>
                    <ThemeSwitch />
                    <Button isIconOnly size='sm' variant='light'>
                        <Iconify icon='solar:chat-line-bold-duotone' />
                    </Button>
                    <Button isIconOnly size='sm' variant='light'>
                        <Iconify icon='solar:logout-3-bold-duotone' rotate={90} />
                    </Button>
                </Row>
            </Col>
        </Card>
    )
}
