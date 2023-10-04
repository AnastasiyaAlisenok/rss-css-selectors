import { ElementsArgs } from '../types/types';
import ElementCreator from './elementCreator';

describe('element creator: ', () => {
    const args: ElementsArgs = {
        tag: 'div',
        classes: ['block'],
        textContent: 'Hello world!',
    };

    const creator = new ElementCreator(args);

    test('should defined method', () => {
        expect(creator.createElement).toBeDefined();
        expect(creator.createElement).not.toBeUndefined();
    });

    test('should return HTMLElement', () => {
        expect(creator.getElement()).toBeInstanceOf(HTMLElement);
    });

    test('should return element with properties', () => {
        const result = document.createElement('div');
        result.className = 'block';
        result.textContent = args.textContent;
        expect(creator.getElement()).toEqual(result);
    });
});
