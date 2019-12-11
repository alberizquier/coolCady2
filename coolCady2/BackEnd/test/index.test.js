import {dataCollect} from '../js/dataCollect.js';

test("Checking if the Fetch works", () => {
    dataCollect();
    expect(dataCollect).toHaveBeenCalled();
});