import { useMenuItemStore, setMenuItem } from "~/store/menu-item";

export function useMenuItem() {
	const menuItem = useMenuItemStore((state) => state);

	return { menuItem, setMenuItem };
}
