import ElementCreator from '../../utils/elementCreator';
import { ElementsArgs } from '../../types/types';

export default class View {
    public viewElementCreator: ElementCreator;

    constructor(args: ElementsArgs) {
        this.viewElementCreator = new ElementCreator(args);
    }

    public getHtmlElement(): HTMLElement | null {
        return this.viewElementCreator.getElement();
    }
}
