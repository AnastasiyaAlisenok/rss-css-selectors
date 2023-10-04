import { ElementsArgs } from '../../../types/types';
import ElementCreator from '../../../utils/elementCreator';
import ViewBurgerMenu from '../../AsideBlock/burger-menu/burger-menu';
import View from '../../view/view';
import './header.scss';

const argsHeader: ElementsArgs = {
    tag: 'header',
    classes: ['header'],
    textContent: 'CSS Diner',
};

export default class ViewHeader extends View {
    constructor() {
        super(argsHeader);
        this.addTags();
    }

    public addTags(): void {
        const burger = new ViewBurgerMenu();
        this.viewElementCreator.addInnerHtml(burger.getHtmlElement() as HTMLElement);
    }
}
