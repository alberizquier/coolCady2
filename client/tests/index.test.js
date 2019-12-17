//import {MainMock} from './main.mock.js';
import Index from '../index.js';

class Context {
    constructor() {
        this.main = new MainMock();
        this.index = new Index(this.main);
    }
}

test('should hide the selected node', () => {
    let context = new Context();
    let orderAreaNode = document.getElementById('orderArea');
    let caddyAreaNode = document.getElementById('caddyArea');
    index.hideNode('orderArea', true);
    expect(index.hideNode).toHaveBeenCalled();
    expect(orderAreaNode.style.display).toBe('none');
    expect(caddyAreaNode.style.display).toBe('block');
});

