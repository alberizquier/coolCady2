import {MainMock} from './main.mock.js';
import {Index} from '../index.js';

class Context {
    constructor(){
        this.main = new MainMock();
        this.index = new Index(this.main);
    }
}

