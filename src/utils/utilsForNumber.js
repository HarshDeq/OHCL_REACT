export const fixedFloatNumber = (num, fixed) => {
    if(typeof num === 'number' || typeof fixed === 'number'){
        return num?.toFixed(fixed);
    }
};
