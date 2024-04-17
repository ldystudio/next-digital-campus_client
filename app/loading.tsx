import { Spinner } from "@nextui-org/react"

import { Col } from "@/components/common/dimension"

export default function LoadingPage() {
    return (
        <Col fullWidth justify='center' className='h-screen'>
            <Spinner size='lg' label='Loading...' />
        </Col>
    )
}
