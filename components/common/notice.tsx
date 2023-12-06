import { toast, ToastContent } from "react-toastify";

interface ContentProps {
	title?: string;
	description: string;
}

class notice {
	static info(message: ContentProps) {
		toast.info(createContent(message));
	}
	static success(message: ContentProps) {
		toast.success(createContent(message));
	}
	static warning(message: ContentProps) {
		toast.warning(createContent(message));
	}
	static error(message: ContentProps) {
		toast.error(createContent(message));
	}
}

const createContent = (message: ContentProps): ToastContent => {
	return (
		<>
			{message.title && <p className='font-bold'>{message.title}</p>}
			<p>{message.description}</p>
		</>
	);
};

export default notice;
