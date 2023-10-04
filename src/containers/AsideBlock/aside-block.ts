import { ElementsArgs } from '../../types/types';
import View from '../view/view';
import './aside-block.scss';
import '../../style.scss';
import ViewMenu from './menu/menu';
import ViewButtonReset from './button-reset/button-reset';

const asideBlockArgs: ElementsArgs = {
    tag: 'div',
    classes: ['aside-block'],
    textContent: '',
};

export default class ViewAsideBlock extends View {
    constructor() {
        super(asideBlockArgs);
        this.addTags();
    }

    private addTags(): void {
        const menu = new ViewMenu();
        const button = new ViewButtonReset();
        this.viewElementCreator.addInnerHtml(menu.getHtmlElement() as HTMLElement);
        this.viewElementCreator.addInnerHtml(button.getHtmlElement() as HTMLElement);
    }
}
