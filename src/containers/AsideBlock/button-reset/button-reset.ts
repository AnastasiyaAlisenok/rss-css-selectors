import MainPage from '../../../MainPage/MainPage';
import { ElementsArgs } from '../../../types/types';
import View from '../../view/view';
import './button-reset.scss';

export default class ViewButtonReset extends View {
    constructor() {
        const buttonArgs: ElementsArgs = {
            tag: 'button',
            classes: ['button__reset'],
            textContent: 'Reset',
            callback: MainPage.clickReset,
        };
        super(buttonArgs);
    }
}
