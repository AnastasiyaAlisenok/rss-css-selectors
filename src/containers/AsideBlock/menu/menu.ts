import { ElementsArgs } from '../../../types/types';
import ElementCreator from '../../../utils/elementCreator';
import View from '../../view/view';
import checkElement from '../../../utils/functions';
import './menu.scss';
import MainPage from '../../../MainPage/MainPage';

const titleArgs: ElementsArgs = {
    tag: 'h2',
    classes: ['helper__menu-title'],
    textContent: 'Choose a level',
};

const resultArgs: ElementsArgs = {
    tag: 'span',
    classes: ['complited'],
    textContent: '',
};

const levelArgs: ElementsArgs = {
    tag: 'span',
    classes: ['level'],
    textContent: '',
};

const countLevels = 10;

export default class ViewMenu extends View {
    constructor() {
        const menuArgs: ElementsArgs = {
            tag: 'div',
            classes: ['helper__menu'],
            textContent: '',
        };
        super(menuArgs);
        this.addTags();
    }

    private addTags(): void {
        const levelsArgs: ElementsArgs = {
            tag: 'div',
            classes: ['menu__level'],
            textContent: '',
            callback: MainPage.clickLevel,
        };
        const title = new ElementCreator(titleArgs);
        this.viewElementCreator.addInnerHtml(title.getElement() as HTMLElement);
        for (let i = 0; i < countLevels; i += 1) {
            const levelContainer = new ElementCreator(levelsArgs);
            const result = new ElementCreator(resultArgs);
            levelContainer.addInnerHtml(result.getElement() as HTMLElement);
            const level = new ElementCreator(levelArgs);
            const levelElement = level.getElement();
            if (levelElement !== null) {
                levelElement.textContent = `Level ${i + 1}`;
                checkElement(levelElement).id = `${i}`;
            }
            const levelContainerHTML = levelContainer.getElement();
            if (localStorage.getItem(`level${i}`)) {
                const levelClass = localStorage.getItem(`level${i}`) as string;
                checkElement(levelContainerHTML).className = levelClass;
            }
            levelContainer.addInnerHtml(levelElement as HTMLElement);
            if (MainPage.arrayUseHelp && MainPage.arrayUseHelp.includes(i)) {
                const star = document.createElement('span');
                star.textContent = '*';
                checkElement(levelContainer.getElement()).append(star);
            }
            this.viewElementCreator.addInnerHtml(levelContainer.getElement() as HTMLElement);
        }
    }
}
