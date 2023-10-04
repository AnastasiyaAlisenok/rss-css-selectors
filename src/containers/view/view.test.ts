import { ElementsArgs } from '../../types/types';
import View from './view';

describe('view: getHTMLElement', () => {
    const args: ElementsArgs = {
        tag: 'div',
        classes: ['view'],
        textContent: 'Hello',
    };

    const element = new View(args);

    test('should defined method', () => {
        expect(element.getHtmlElement()).toBeDefined();
        expect(element.getHtmlElement()).not.toBeUndefined();
    });

    test('should return HTMLElement', () => {
        expect(element.getHtmlElement()).toBeInstanceOf(HTMLElement);
    });

    test('shoul return elememnt with properties', () => {
        const result = document.createElement('div');
        result.className = 'view';
        result.textContent = args.textContent;
        expect(element.getHtmlElement()).toEqual(result);
    });
});
