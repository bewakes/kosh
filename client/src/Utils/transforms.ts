export const objectToParams = (obj) => {
    const params = Object.keys(obj).filter(x => obj[x] != undefined).map(x => `${x}=${encodeURI(obj[x])}`);
    return params.join('&');
}
