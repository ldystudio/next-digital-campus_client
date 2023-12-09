"use client";
import { useState, useCallback, useMemo } from "react";

export function useFormValidation(regexp: RegExp, defaultValue: string = "") {
	const [field, setField] = useState(defaultValue);
	const validateField = useCallback((value: string) => value.match(regexp), [regexp]);

	const isInvalidField = useMemo(() => {
		if (field === "") return false;

		return !validateField(field);
	}, [field, validateField]);

	return { field, setField, isInvalidField };
}
