import { Col, LoadingIcon } from "@/components/common";

export default function Loading() {
	return (
		<Col fullWidth justify='center' className='h-screen'>
			<LoadingIcon size={40} color='#006FEE' />
			<p>Loading...</p>
		</Col>
	);
}
