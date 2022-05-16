import { App } from "vue";
import "element-plus/dist/index.css";

import {
	ElButton,
	ElInput,
	ElForm,
	ElFormItem,
	ElTabs,
	ElIcon,
	ElTabPane,
	ElCheckbox,
	ElLink,
} from "element-plus";

const components = [
	ElButton,
	ElInput,
	ElForm,
	ElTabs,
	ElIcon,
	ElTabPane,
	ElFormItem,
	ElCheckbox,
	ElLink,
];

export default function registerElement(app: App) {
	for (const cpn of components) {
		app.component(cpn.name, cpn);
	}
}
