import { App } from "vue";
import registerElement from "@/service/request/plugins/registerElement";
export function globalRegister(app: App): void {
	registerElement(app);
}
