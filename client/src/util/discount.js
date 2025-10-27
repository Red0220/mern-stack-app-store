 export const discountCalculator = (price, discount) => {
  if (!discount) return price;
  return price - (price * discount) / 100;
}