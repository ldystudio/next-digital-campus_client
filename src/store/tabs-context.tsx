// import { createContext, useContext, useState } from "react";

// import _ from "lodash";

// interface tabType {
// 	title: string;
// 	icon: string;
// }

// const tabsContext = createContext({
// 	tabs: [{ title: "", icon: "" }],
// 	appendTab: (title: string, icon: string) => {},
// 	removeTab: (title: string) => {},
// 	clearTabs: () => {}
// });

// interface tabsProviderProps {
// 	children: React.ReactNode;
// }

// export function TabsContextProvider(props: tabsProviderProps) {
// 	const [tabs, setTabs] = useState<tabType[]>([]);

// 	function appendTab(title: string, icon: string) {
// 		if (
// 			_.findIndex(tabs, (t) => {
// 				return t.title === title;
// 			}) === -1
// 		) {
// 			setTabs(_.concat(tabs, { title, icon }));
// 		}
// 	}

// 	function removeTab(title: string) {
// 		_.pullAllBy(tabs, [{ title }], "title");
// 	}

// 	function clearTabs() {
// 		setTabs([]);
// 	}

// 	const context = {
// 		tabs,
// 		appendTab,
// 		removeTab,
// 		clearTabs
// 	};

// 	return <tabsContext.Provider value={context}>{props.children}</tabsContext.Provider>;
// }

// export function useTabs() {
// 	return useContext(tabsContext);
// }
