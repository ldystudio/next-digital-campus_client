import { Col } from "@/components/common"

import "~/styles/loading.css"

export default function LoadingPage() {
    return (
        <Col fullWidth justify='center' className='h-screen'>
            <div className='semicircle'>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p>Loading...</p>
        </Col>
    )
}
