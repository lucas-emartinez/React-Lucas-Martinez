import obj from './obj'

const getFetch = new Promise((resolve, reject) => {
    // acciones asincrónicas o no
    let condition = true;
    if (condition) {
        setTimeout(() => {
            resolve(obj);
        },2000)
    } else {
        reject('400 - Not Found');
    }

})

export default getFetch;