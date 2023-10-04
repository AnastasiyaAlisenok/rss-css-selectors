import MainPage from '../../../MainPage/MainPage';
import { ElementsArgs } from '../../../types/types';
import ElementCreator from '../../../utils/elementCreator';
import View from '../../view/view';
import './button-help.scss';

const containerArgs: ElementsArgs = {
    tag: 'div',
    classes: ['button__container'],
    textContent: '',
};

export default class ViewButtonHelp extends View {
    public index: number;

    public static button: HTMLElement | null;

    constructor() {
        super(containerArgs);
        this.index = MainPage.levelNum;
        this.addButton();
    }

    public addButton(): void {
        const buttonArgs: ElementsArgs = {
            tag: 'button',
            classes: ['button__help'],
            textContent: 'Help!',
            callback: MainPage.getHelp,
        };
        const buttonHelp = new ElementCreator(buttonArgs);
        this.viewElementCreator.addInnerHtml(buttonHelp.getElement() as HTMLElement);
    }
}
