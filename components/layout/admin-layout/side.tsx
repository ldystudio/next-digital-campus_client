import { Card } from "@nextui-org/react"

import { Col, Link, Logo, Row, ThemeSwitch } from "@/components/common"
import Logout from "./logout"
import AdminMenu from "./menu"
import Message from "./message"
import UserInfo from "./user-info"

/**
 * Renders the Side component.
 *
 * @returns {JSX.Element} The JSX element representing the Side component.
 */
export default function Side(): JSX.Element {
    return (
        <Card
            className='hidden min-w-[12rem] items-center justify-around lg:flex'
            shadow='none'
            radius='none'
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
                    <Message />
                    <Logout />
                </Row>
            </Col>
        </Card>
    )
}
