import { ElementsArgs } from '../../../types/types';
import ElementCreator from '../../../utils/elementCreator';
import View from '../../view/view';
import './table.scss';
import './fruits.scss';
import levels from '../../../MainPage/levels';
import checkElement from '../../../utils/functions';
import MainPage from '../../../MainPage/MainPage';
import ViewButtonHelp from '../button-help/button-help';

const taskTextArgs: ElementsArgs = {
    tag: 'h2',
    classes: ['task-text'],
    textContent: 'Select the plates',
};

const tableWrapperArgs: ElementsArgs = {
    tag: 'div',
    classes: ['table__wrapper'],
    textContent: '',
};

const tableArgs: ElementsArgs = {
    tag: 'div',
    classes: ['table'],
    textContent: '',
};

const tableSurfaceArgs: ElementsArgs = {
    tag: 'div',
    classes: ['table__surface'],
    textContent: '',
};

const tableGameArgs: ElementsArgs = {
    tag: 'div',
    classes: ['table__game'],
    textContent: '',
};

const tableEdgeArgs: ElementsArgs = {
    tag: 'div',
    classes: ['table__edge'],
    textContent: '',
};

const tableLegArgs: ElementsArgs = {
    tag: 'div',
    classes: ['table__leg'],
    textContent: '',
};

const wrapperArgs: ElementsArgs = {
    tag: 'div',
    classes: ['wrapper'],
    textContent: '',
};

export default class ViewTable extends View {
    public static table: HTMLElement | null;

    public static tableGame: HTMLElement | null;

    public static tableSurface: HTMLElement | null;

    public static tableEdge: HTMLElement | null;

    public fruit: HTMLElement | null;

    public target: HTMLElement | null;

    constructor() {
        super(tableWrapperArgs);
        this.fruit = null;
        this.target = null;
        this.addTags();
        this.addItemsOnTable();
    }

    public addItemsOnTable(): void {
        const len: number = levels[MainPage.levelNum].table.length;
        const arr = levels[MainPage.levelNum].table;
        const classAnimation = levels[MainPage.levelNum].animation;
        for (let i = 0; i < len; i += 1) {
            let args = {
                tag: `${arr[i]}`,
                textContent: '',
            };
            if (typeof arr[i] === 'string') {
                const fruit = new ElementCreator(args).getElement() as HTMLElement;
                if (classAnimation[i] === 'true') {
                    fruit.classList.add('animation');
                }
                const data = `<${arr[i]}>`.replace(/-attr|-lemon/gi, '').replace(/-small/gi, '');
                fruit.dataset.tooltip = `${data}${i}`;
                fruit.addEventListener('mouseover', this.setTooltip);
                fruit.addEventListener('mouseout', this.removeTooltip);
                ViewTable.tableGame?.append(fruit);
                if (typeof arr[i + 1] === 'object') this.fruit = fruit;
            } else {
                for (let j = 0; j < arr[i].length; j += 1) {
                    args = {
                        tag: `${arr[i][j]}`,
                        textContent: '',
                    };
                    const fruit = new ElementCreator(args).getElement() as HTMLElement;
                    if (classAnimation[i][j] === 'true') fruit.classList.add('animation');
                    fruit.dataset.tooltip = `<${arr[i][j]}>${i + j}`;
                    fruit.addEventListener('mouseover', this.setTooltip);
                    fruit.addEventListener('mouseout', this.removeTooltip);
                    this.fruit?.append(fruit);
                    ViewTable.tableGame?.append(this.fruit as HTMLElement);
                }
            }
        }
        ViewTable.changeTableSize();
    }

    private addTags(): void {
        const taskText = new ElementCreator(taskTextArgs);
        const wrapper = new ElementCreator(wrapperArgs);
        checkElement(taskText.getElement()).textContent = levels[MainPage.levelNum].title;
        const button = new ViewButtonHelp();
        const table = new ElementCreator(tableArgs);
        ViewTable.table = table.getElement();
        const tableSurface = new ElementCreator(tableSurfaceArgs);
        ViewTable.tableSurface = tableSurface.getElement();
        const tableGame = new ElementCreator(tableGameArgs);
        ViewTable.tableGame = tableGame.getElement();
        const tableEdge = new ElementCreator(tableEdgeArgs);
        ViewTable.tableEdge = tableEdge.getElement();
        const tableLeg1 = new ElementCreator(tableLegArgs);
        const tableLeg2 = new ElementCreator(tableLegArgs);
        table.addInnerHtml(tableSurface.getElement() as HTMLElement);
        table.addInnerHtml(tableGame.getElement() as HTMLElement);
        tableEdge.addInnerHtml(tableLeg1.getElement() as HTMLElement);
        tableEdge.addInnerHtml(tableLeg2.getElement() as HTMLElement);
        wrapper.addInnerHtml(button.getHtmlElement() as HTMLElement);
        wrapper.addInnerHtml(taskText.getElement() as HTMLElement);
        this.viewElementCreator.addInnerHtml(wrapper.getElement() as HTMLElement);
        this.viewElementCreator.addInnerHtml(table.getElement() as HTMLElement);
        this.viewElementCreator.addInnerHtml(tableEdge.getElement() as HTMLElement);
    }

    public setTooltip(event: Event): void {
        if (event) {
            const target = event?.target as HTMLElement;
            this.target = target;
            if (target) {
                const tooltipHTML = target.dataset.tooltip
                    ?.replace(/-attr|-lemon/gi, '')
                    .replace(/[0-9]/gi, '')
                    .replace(/-small/, '');
                const tooltipElem = document.createElement('div');
                tooltipElem.className = 'tooltip';
                if (tooltipHTML !== undefined) {
                    tooltipElem.textContent = tooltipHTML;
                }
                ViewTable.tableGame?.append(tooltipElem);
                const chidrenEl = ViewTable.tableGame?.children as HTMLCollection;
                for (let i = 0; i < chidrenEl?.length; i += 1) {
                    let left;
                    let top;
                    if (chidrenEl[i] === target) {
                        chidrenEl[i].classList.add('box-shadow');
                        left = target.offsetLeft - 30;
                        if (left < 0) left = 0;
                        top = -30 + target.offsetTop;
                    } else {
                        const child = chidrenEl[i].children;
                        for (let j = 0; j < child.length; j += 1) {
                            if (child[j] === target) {
                                child[j].classList.add('box-shadow');
                                if (target.dataset.tooltip === '<lemon>4') {
                                    left = target.offsetLeft - 30;
                                    if (left < 0) left = 0;
                                    top = -30 + target.offsetTop;
                                } else {
                                    left = target.offsetLeft + (chidrenEl[i] as HTMLElement).offsetLeft - 30;
                                    if (left < 0) left = 0;
                                    top = -30 + target.offsetTop + (chidrenEl[i] as HTMLElement).offsetTop;
                                }
                            }
                        }
                    }
                    tooltipElem.style.left = `${left}px`;
                    tooltipElem.style.top = `${top}px`;
                }
            }
            const htmlTags = document.querySelectorAll('pre');
            htmlTags.forEach((item) => {
                if (item.dataset.tooltip === target.dataset.tooltip) {
                    item.classList.add('enchange');
                }
            });
        }
    }

    public removeTooltip(): void {
        const tooltipElem = document.querySelector('.tooltip');
        if (tooltipElem) {
            tooltipElem.remove();
            const elements = ViewTable.tableGame?.children;
            if (elements) {
                for (let i = 0; i < elements.length; i += 1) {
                    elements[i].classList.remove('box-shadow');
                    if (elements[i].children.length > 0) {
                        for (let j = 0; j < elements[i].childNodes.length; j += 1) {
                            if (elements[i].firstChild) {
                                (elements[i].firstChild as HTMLElement).classList.remove('box-shadow');
                            }
                        }
                    }
                }
            }
            const htmlTags = document.querySelectorAll('pre');
            htmlTags.forEach((item) => {
                if (this.target) {
                    if (item.dataset.tooltip === this.target.dataset.tooltip) {
                        item.classList.remove('enchange');
                    }
                }
            });
        }
    }

    public static changeTableSize(): void {
        if (window.innerWidth <= 750 && MainPage.levelNum >= 6) {
            (checkElement(ViewTable.table) as HTMLElement).style.width = '90%';
            (checkElement(ViewTable.tableSurface) as HTMLElement).style.width = '100%';
            (checkElement(ViewTable.tableEdge) as HTMLElement).style.width = '90%';
        } else {
            (checkElement(ViewTable.table) as HTMLElement).style.width = levels[MainPage.levelNum].width;
            (checkElement(ViewTable.tableSurface) as HTMLElement).style.width = levels[MainPage.levelNum].width;
            (checkElement(ViewTable.tableEdge) as HTMLElement).style.width = levels[MainPage.levelNum].width;
        }
    }
}
