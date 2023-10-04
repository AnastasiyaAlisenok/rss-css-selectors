import './panel.scss';
import {
    panelArgs,
    cssEditorArgs,
    htmlViewerArgs,
    cssEditorHeaderArgs,
    cssEditorHeaderFileArgs,
    cssEditorPanelViewArgs,
    panelNumbersArgs,
    panelHtmlArgs,
    panelInputArgs,
    buttonEnterArgs,
    textArgs,
    htmlViewerHeaderFileArgs,
    htmlViewerPanelViewArgs,
    htmlViewerrHeaderArgs,
    htmlArgs,
    tableDivArgs,
} from './panelArgs';
import ElementCreator from '../../../utils/elementCreator';
import View from '../../view/view';
import MainPage from '../../../MainPage/MainPage';
import checkElement from '../../../utils/functions';
import ViewTable from '../table/table';

const textPlaceholder = 'Type in a CSS selector';
const text1 = '/* Styles would go here. */';

export default class ViewPanel extends View {
    public code: string;

    public arrayTags: string[];

    public container: HTMLElement | null;

    public parentElement: HTMLElement | null;

    public datasetNum: number;

    public target: HTMLElement | null;

    constructor() {
        super(panelArgs);
        this.code = '';
        this.container = null;
        this.arrayTags = [];
        this.parentElement = null;
        this.datasetNum = 0;
        this.target = null;
        this.addCSSEditor();
        this.addHTMLViewer();
        this.transformCode();
        this.setElementsToViewer();
        this.addListeners();
    }

    private addCSSEditor(): void {
        const cssEditor = new ElementCreator(cssEditorArgs);
        const cssEditorHeader = new ElementCreator(cssEditorHeaderArgs);
        const cssEditorHeaderFile = new ElementCreator(cssEditorHeaderFileArgs);
        const cssEditorPanelView = new ElementCreator(cssEditorPanelViewArgs);
        const panelNumbers = new ElementCreator(panelNumbersArgs);
        for (let i = 0; i < 15; i += 1) {
            const number = document.createElement('div');
            number.textContent = `${i + 1}`;
            panelNumbers.addInnerHtml(number);
        }
        const panelInput = new ElementCreator(panelInputArgs);
        panelInput.getElement()?.addEventListener('keypress', (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                MainPage.getResult();
            }
        });
        panelInput.addPlaceholder(textPlaceholder);
        const buttonEnter = new ElementCreator(buttonEnterArgs);
        buttonEnter.getElement()?.addEventListener('click', MainPage.getResult);
        const panelTextStyle = new ElementCreator(textArgs);
        const panelText = new ElementCreator(textArgs);
        panelTextStyle.addInnerText(text1);
        cssEditorHeader.addInnerHtml(cssEditorHeaderFile.getElement() as HTMLElement);
        cssEditorPanelView.addInnerHtml(panelNumbers.getElement() as HTMLElement);
        cssEditorPanelView.addInnerHtml(panelInput.getElement() as HTMLElement);
        cssEditorPanelView.addInnerHtml(buttonEnter.getElement() as HTMLElement);
        cssEditorPanelView.addInnerHtml(panelTextStyle.getElement() as HTMLElement);
        cssEditorPanelView.addInnerHtml(panelText.getElement() as HTMLElement);
        cssEditor.addInnerHtml(cssEditorHeader.getElement() as HTMLElement);
        cssEditor.addInnerHtml(cssEditorPanelView.getElement() as HTMLElement);
        this.viewElementCreator.addInnerHtml(cssEditor.getElement() as HTMLElement);
    }

    private addHTMLViewer(): void {
        const htmlViewer = new ElementCreator(htmlViewerArgs);
        const htmlViewerHeader = new ElementCreator(htmlViewerrHeaderArgs);
        const htmlViewerHeaderFile = new ElementCreator(htmlViewerHeaderFileArgs);
        const htmlViewerPanelView = new ElementCreator(htmlViewerPanelViewArgs);
        const panelNumbersHTML = new ElementCreator(panelNumbersArgs);
        for (let i = 0; i < 15; i += 1) {
            const number = document.createElement('div');
            number.textContent = `${i + 1}`;
            panelNumbersHTML.addInnerHtml(number);
        }
        const panelHtml = new ElementCreator(panelHtmlArgs);
        const htmlCode = new ElementCreator(htmlArgs);
        this.container = htmlCode.getElement();
        const tableDiv = new ElementCreator(tableDivArgs);
        const tableCloseDiv = new ElementCreator(tableDivArgs);
        checkElement(tableDiv.getElement()).textContent = '<div class = "table">';
        checkElement(tableCloseDiv.getElement()).textContent = '</div>';
        this.code = ViewTable.tableGame?.innerHTML as string;
        panelHtml.addInnerHtml(tableDiv.getElement() as HTMLElement);
        panelHtml.addInnerHtml(this.container as HTMLElement);
        panelHtml.addInnerHtml(tableCloseDiv.getElement() as HTMLElement);
        htmlViewerHeader.addInnerHtml(htmlViewerHeaderFile.getElement() as HTMLElement);
        htmlViewerPanelView.addInnerHtml(panelNumbersHTML.getElement() as HTMLElement);
        htmlViewerPanelView.addInnerHtml(panelHtml.getElement() as HTMLElement);
        htmlViewer.addInnerHtml(htmlViewerHeader.getElement() as HTMLElement);
        htmlViewer.addInnerHtml(htmlViewerPanelView.getElement() as HTMLElement);
        this.viewElementCreator.addInnerHtml(htmlViewer.getElement() as HTMLElement);
    }

    public transformCode(): void {
        const text = this.code
            .replace(/ class="animation"/gi, '')
            .replace(/-lemon/gi, '')
            .replace(/-attr/, ' value="blue"')
            .replace(/-attr/g, '')
            .replace(/></gi, '>*<')
            .replace(
                / data-tooltip="<plate>| data-tooltip="<raspberry>| data-tooltip="<watermelon>| data-tooltip="<tomato>| data-tooltip="<lemon>| data-tooltip="<plate-attr>| data-tooltip="<lemon-small>/gi,
                ''
            )
            .replace(/<lemon-small/gi, '<lemon class="small"')
            .replace(/lemon-small/gi, 'lemon')
            .replace(/[0-9]"/gi, '');
        const arr = text.split('*');
        this.arrayTags = arr;
    }

    public setElementsToViewer(): void {
        const arr = this.arrayTags;
        for (let i = 0; i < arr.length; i += 1) {
            if (
                !arr[i].startsWith('</') &&
                arr[i + 1].startsWith('</') &&
                (arr[i - 1] === undefined || arr[i - 1].startsWith('</'))
            ) {
                const elem = document.createElement('pre');
                elem.textContent = `${arr[i]} ${arr[i + 1]}`;
                const data = arr[i].replace(/ value="blue"/, '').replace(/ class="small"/, '');
                elem.dataset.tooltip = `${data}${this.datasetNum}`;
                this.container?.append(elem);
                this.datasetNum += 1;
            } else if (!arr[i].startsWith('</') && !arr[i + 1].startsWith('</')) {
                const elem = document.createElement('pre');
                elem.textContent = `${arr[i]}`;
                const data = arr[i].replace(/ value="blue"/, '').replace(/ class="small"/, '');
                elem.dataset.tooltip = `${data}${this.datasetNum}`;
                this.parentElement = elem;
                this.container?.append(this.parentElement);
                this.datasetNum += 1;
            } else if (!arr[i].startsWith('</') && arr[i + 1].startsWith('</')) {
                const elem = document.createElement('pre');
                elem.textContent = `${arr[i]} ${arr[i + 1]}`;
                const data = arr[i].replace(/ value="blue"/, '').replace(/ class="small"/, '');
                elem.dataset.tooltip = `${data}${this.datasetNum}`;
                this.parentElement?.append(elem);
                this.datasetNum += 1;
            } else if (arr[i].startsWith('</') && arr[i - 1].startsWith('</')) {
                const tag = arr[i].replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
                const content = this.parentElement?.innerHTML;
                checkElement(this.parentElement).innerHTML = `${content} ${tag}`;
            }
        }
    }

    public addTooltip(event: Event): void {
        if (event) {
            const target = event?.target as HTMLElement;
            this.target = target;
            target.classList.add('enchange');
            const targetElement = checkElement(target) as HTMLElement;
            const dataAtr = targetElement.dataset.tooltip as string;
            const table: Element | null = document.querySelector('.table__game');
            const elemsOnTable = table?.childNodes;
            const tooltipElem = document.createElement('div');
            tooltipElem.className = 'tooltip';
            tooltipElem.textContent = dataAtr.replace(/[0-9]/gi, '');
            ViewTable.tableGame?.append(tooltipElem);
            if (elemsOnTable) {
                for (let i = 0; i < elemsOnTable?.length; i += 1) {
                    const element = elemsOnTable[i] as HTMLElement;
                    if (element.dataset.tooltip === dataAtr) {
                        element.classList.add('box-shadow');
                        let left = element.offsetLeft - 30;
                        if (left < 0) left = 0;
                        const top = -30 + element.offsetTop;
                        tooltipElem.style.left = `${left}px`;
                        tooltipElem.style.top = `${top}px`;
                    }
                    const childElements = element.children;
                    if (childElements.length >= 1) {
                        const child = childElements[0] as HTMLElement;
                        if (child.dataset.tooltip === dataAtr) {
                            child.classList.add('box-shadow');
                            let left;
                            let top;
                            if (child.dataset.tooltip === '<lemon>4') {
                                left = child.offsetLeft;
                                top = -30 + element.offsetTop;
                            } else {
                                left = element.offsetLeft + child.offsetLeft - 30;
                                if (left < 0) left = 0;
                                top = -30 + element.offsetTop;
                            }
                            tooltipElem.style.left = `${left}px`;
                            tooltipElem.style.top = `${top}px`;
                        }
                    }
                }
            }
        }
    }

    public removeTooltip(): void {
        const tooltipElem = document.querySelector('.tooltip');
        if (tooltipElem) {
            tooltipElem.remove();
            const htmlTags = document.querySelectorAll('pre');
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
            htmlTags.forEach((item) => {
                if (this.target) {
                    if (item.dataset.tooltip === this.target.dataset.tooltip) {
                        item.classList.remove('enchange');
                    }
                }
            });
        }
    }

    private addListeners(): void {
        if (this.container) {
            const elems = this.container.querySelectorAll('pre');
            elems.forEach((item) => {
                item.addEventListener('mouseover', this.addTooltip);
                item.addEventListener('mouseout', this.removeTooltip);
            });
        }
    }
}
