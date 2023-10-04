import ViewAsideBlock from '../containers/AsideBlock/aside-block';
import ViewMainBlock from '../containers/MainBlock/ViewMainBlock';
import levels from './levels';
import checkElement from '../utils/functions';
import { ElementsArgs } from '../types/types';
import ElementCreator from '../utils/elementCreator';

export default class MainPage {
    public static levelNum = localStorage.getItem('levelNum') ? Number(localStorage.getItem('levelNum')) : 0;

    public static lastLevel = levels.length - 1;

    public static firstLevel = 0;

    public static index = 0;

    public static arrayLevels = Array.from(
        { length: MainPage.lastLevel - MainPage.firstLevel + 1 },
        (value, index) => MainPage.firstLevel + index * 1
    );

    public static arrayUseHelp: number[] | undefined = localStorage.getItem('array')
        ? MainPage.getStorageUseHelp()
        : [];

    public static arrayComplitedLevels: number[] = localStorage.getItem('array') ? MainPage.getStorage() : [];

    public MainBlock: ViewMainBlock;

    public AsideBlock: ViewAsideBlock;

    constructor() {
        MainPage.getStorage();
        MainPage.getStorageUseHelp();
        this.MainBlock = new ViewMainBlock();
        this.AsideBlock = new ViewAsideBlock();
    }

    public static clickLevel(event: Event | undefined): void {
        if (event) {
            const level = event.target as HTMLElement;
            MainPage.levelNum = Number(level.id);
            localStorage.setItem('levelNum', String(MainPage.levelNum));
        }
        MainPage.renderPage();
        MainPage.addStyle();
    }

    public static addStyle(): void {
        const levelsContainer = document.querySelectorAll('.menu__level');
        const levelsHTML = document.querySelectorAll('.level');
        for (let i = 0; i < levelsHTML.length; i += 1) {
            const levelId = Number(levelsHTML[i].id);
            if (MainPage.levelNum === levelId) {
                levelsContainer[i].classList.add('selected');
            } else {
                levelsContainer[i].classList.remove('selected');
            }
        }
    }

    public static getResult(): void {
        const input: HTMLInputElement | null = document.querySelector('.panel__input');
        const value: string | undefined = input?.value;
        const answers = levels[MainPage.levelNum].answer;

        if (value !== undefined && answers.includes(value)) {
            const elementHidden = document.querySelectorAll('.animation');
            MainPage.setAnimation();
            MainPage.getLevelComplited();
            if (!MainPage.arrayComplitedLevels.includes(MainPage.levelNum)) {
                MainPage.arrayComplitedLevels?.push(MainPage.levelNum);
            }
            localStorage.setItem('arrayResults', JSON.stringify(MainPage.arrayComplitedLevels));
            if (MainPage.arrayComplitedLevels?.length >= MainPage.arrayLevels.length) {
                MainPage.getWin();
            } else {
                if (MainPage.levelNum === MainPage.lastLevel) {
                    MainPage.levelNum = MainPage.arrayLevels.find(
                        (item) => !MainPage.arrayComplitedLevels.includes(item)
                    ) as number;
                } else {
                    MainPage.levelNum += 1;
                }
                localStorage.setItem('levelNum', String(MainPage.levelNum));
                elementHidden.forEach((item) =>
                    item.addEventListener('animationend', () => {
                        MainPage.renderPage();
                        MainPage.addStyle();
                    })
                );
            }
        } else {
            ViewMainBlock.panelView?.classList.add('shake');
        }
    }

    public static setAnimation(): void {
        const elementHidden = document.querySelectorAll('.animation');
        elementHidden.forEach((item) => item.classList.add('hidden'));
    }

    public static getHelp(): void {
        const input: HTMLInputElement = checkElement(document.querySelector('.panel__input')) as HTMLInputElement;
        const help = levels[MainPage.levelNum].answer[0].split('');
        const buttonHelp = document.querySelector('.button__help') as HTMLButtonElement;
        const buttonReset = document.querySelector('.button__reset') as HTMLButtonElement;
        console.log(input.value);
        input.value = '';
        buttonHelp.disabled = true;
        buttonReset.disabled = true;
        const timeId = setInterval(() => {
            if (input.value.length === help.length - 1) {
                clearInterval(timeId);
                buttonHelp.disabled = false;
                buttonReset.disabled = false;
            }
            input.value += help[MainPage.index];
            MainPage.index += 1;
        }, 300);
        MainPage.index = 0;
        if (MainPage.arrayUseHelp && MainPage.arrayUseHelp instanceof Object) {
            MainPage.arrayUseHelp.push(MainPage.levelNum);
        }
        localStorage.setItem('array', JSON.stringify(MainPage.arrayUseHelp));
    }

    public static clickReset(): void {
        const input: HTMLInputElement = checkElement(document.querySelector('.panel__input')) as HTMLInputElement;
        input.value = '';
        localStorage.clear();
        MainPage.levelNum = 0;
        localStorage.setItem('levelNum', String(MainPage.levelNum));
        MainPage.arrayUseHelp = [];
        MainPage.arrayComplitedLevels = [];
        MainPage.renderPage();
    }

    public createView(): void {
        if (this.MainBlock) {
            document.body.append(this.MainBlock.getHtmlElement() as HTMLElement);
            document.body.append(this.AsideBlock.getHtmlElement() as HTMLElement);
        }
        MainPage.addStyle();
    }

    private static renderPage(): void {
        const mainBlock = document.querySelector('.main-block');
        const asideBlock = document.querySelector('.aside-block');
        mainBlock?.remove();
        asideBlock?.remove();
        const mainPage = new MainPage();
        mainPage.createView();
    }

    private static getLevelComplited(): void {
        const levelElems = document.querySelectorAll('.menu__level');
        levelElems[MainPage.levelNum].classList.add('green');
        localStorage.setItem(`level${MainPage.levelNum}`, levelElems[MainPage.levelNum].className);
    }

    private static getStorageUseHelp<T>(): T {
        const storedArray = localStorage.getItem('array');
        let array;
        if (storedArray !== null) {
            array = JSON.parse(storedArray);
        }
        return array;
    }

    private static getStorage<T>(): T {
        const storedArray = localStorage.getItem('arrayResults');
        let array;
        if (storedArray !== null) {
            array = JSON.parse(storedArray);
        }
        return array;
    }

    public static getWin(): void {
        const table = document.querySelector('.table');
        const tableEdge = document.querySelector('.table__edge') as HTMLElement;
        const panel = document.querySelector('.panel__wrapper') as HTMLElement;
        const wrapper = document.querySelector('.table__wrapper');
        table?.remove();
        tableEdge.remove();
        panel.remove();
        const divArgs: ElementsArgs = {
            tag: 'div',
            classes: ['win-modal'],
            textContent: 'Congratulations!! You finished all levels!!!',
        };
        const div = new ElementCreator(divArgs);
        wrapper?.append(div.getElement() as HTMLElement);
    }

    public static clickMenu(): void {
        const viewMenu: HTMLElement | null = document.querySelector('.aside-block');
        const burger = document.querySelector('.header__burger-menu');
        if (burger) {
            burger.classList.toggle('active');
            if (viewMenu) {
                viewMenu.classList.toggle('open');
            }
        }
    }
}
