import { useState } from "react";

import {
	REGEXP_CODE_FOUR,
	REGEXP_CODE_SIX,
	REGEXP_EMAIL,
	REGEXP_PWD,
	REGEXP_USERNAME
} from "~/config/regexp";
import { useFormValidation } from "~/hooks/common";

export function useAuthForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [verificationFailed, setVerificationFailed] = useState(false);
	const [roleType, setRoleType] = useState("student");
	const [rememberMe, setRememberMe] = useState(false);

	const {
		field: email,
		setField: setEmail,
		isInvalidField: isInvalidEmail
	} = useFormValidation(REGEXP_EMAIL);
	const {
		field: password,
		setField: setPassword,
		isInvalidField: isInvalidPassword
	} = useFormValidation(REGEXP_PWD);
	const {
		field: captcha,
		setField: setCaptcha,
		isInvalidField: isInvalidCaptcha
	} = useFormValidation(REGEXP_CODE_FOUR);
	const {
		field: emailCaptcha,
		setField: setEmailCaptcha,
		isInvalidField: isInvalidEmailCaptcha
	} = useFormValidation(REGEXP_CODE_SIX);
	const {
		field: username,
		setField: setUsername,
		isInvalidField: isInvalidUsername
	} = useFormValidation(REGEXP_USERNAME);
	const [confirmPassword, setConfirmPassword] = useState("");
	const isInvalidConfirmPassword = confirmPassword !== "" && password !== confirmPassword;

	return {
		isLoading,
		setIsLoading,
		rememberMe,
		setRememberMe,
		verificationFailed,
		setVerificationFailed,
		roleType,
		setRoleType,
		email,
		setEmail,
		isInvalidEmail,
		password,
		setPassword,
		isInvalidPassword,
		captcha,
		setCaptcha,
		isInvalidCaptcha,
		emailCaptcha,
		setEmailCaptcha,
		isInvalidEmailCaptcha,
		username,
		setUsername,
		isInvalidUsername,
		confirmPassword,
		setConfirmPassword,
		isInvalidConfirmPassword
	};
}
