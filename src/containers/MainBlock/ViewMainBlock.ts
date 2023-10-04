import { ElementsArgs } from '../../types/types';
import View from '../view/view';
import './MainBlock.scss';
import ViewFooter from './footer/footer';
import ViewHeader from './header/header';
import ViewPanel from './panel/panel';
import ViewTable from './table/table';

const argsMainBlock: ElementsArgs = {
    tag: 'div',
    classes: ['main-block'],
    textContent: '',
};

export default class ViewMainBlock extends View {
    public static panelView: HTMLElement;

    constructor() {
        super(argsMainBlock);
        this.addTags();
    }

    private addTags(): void {
        const header = new ViewHeader();
        const table = new ViewTable();
        const panel = new ViewPanel();
        const footer = new ViewFooter();
        ViewMainBlock.panelView = panel.getHtmlElement() as HTMLElement;
        ViewMainBlock.panelView.addEventListener('animationend', () => {
            ViewMainBlock.panelView.classList.remove('shake');
        });
        this.viewElementCreator.addInnerHtml(header.getHtmlElement() as HTMLElement);
        this.viewElementCreator.addInnerHtml(table.getHtmlElement() as HTMLElement);
        this.viewElementCreator.addInnerHtml(panel.getHtmlElement() as HTMLElement);
        this.viewElementCreator.addInnerHtml(footer.getHtmlElement() as HTMLElement);
    }
}
