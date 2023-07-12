export function getTotalPrice(cart: AddCartType[]) {
  return cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
}
