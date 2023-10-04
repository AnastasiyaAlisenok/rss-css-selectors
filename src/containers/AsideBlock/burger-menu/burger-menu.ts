import View from '../../view/view';
import { ElementsArgs } from '../../../types/types';
import ElementCreator from '../../../utils/elementCreator';
import MainPage from '../../../MainPage/MainPage';

const lineArgs: ElementsArgs = {
    tag: 'span',
    classes: ['line'],
    textContent: '',
};

export default class ViewBurgerMenu extends View {
    constructor() {
        const menuLevelArgs: ElementsArgs = {
            tag: 'div',
            classes: ['header__burger-menu'],
            textContent: '',
            callback: MainPage.clickMenu,
        };
        super(menuLevelArgs);
        this.addtags();
    }

    public addtags(): void {
        const lineBurger = new ElementCreator(lineArgs);
        this.viewElementCreator.addInnerHtml(lineBurger.getElement() as HTMLElement);
    }
}
