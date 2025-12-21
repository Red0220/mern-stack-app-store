export const formatPrice = v => {
    if(!Number.isInteger(v)) {
        throw new Error('Value must be an integer representing cents');
    }
    return `$ ${(v / 100).toFixed(2)}`;
}