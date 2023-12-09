import { toast, ToastContent } from "react-toastify";

interface ContentProps {
	title?: string;
	description: string;
}

function createNotice() {
	function info(message: ContentProps) {
		toast.info(createContent(message));
	}
	function success(message: ContentProps) {
		toast.success(createContent(message));
	}
	function warning(message: ContentProps) {
		toast.warning(createContent(message));
	}
	function error(message: ContentProps) {
		toast.error(createContent(message));
	}
	return {
		info,
		success,
		warning,
		error
	};
}

const createContent = (message: ContentProps): ToastContent => {
	return (
		<>
			{message.title && <p className='font-bold'>{message.title}</p>}
			<p>{message.description}</p>
		</>
	);
};

export const notice = createNotice();
