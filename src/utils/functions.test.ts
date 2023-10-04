import checkElement from './functions';

describe('check element Element or null', () => {
    const bodyEl: HTMLElement = document.body;

    test('should return Element', () => {
        expect(checkElement(bodyEl)).toBe(bodyEl);
    });

    const element = null;

    test('should return error', () => {
        expect(() => {
            checkElement(element);
        }).toThrow();
    });
});
