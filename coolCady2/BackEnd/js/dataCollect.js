export function dataCollect() {

    fetch('BackEnd/data/data.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}