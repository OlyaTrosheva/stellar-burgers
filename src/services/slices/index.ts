export { ingredientsReducer, getIngredients } from './ingredients-slice';

export {
  burgerConstructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './burger-constructor-slice';

export {
  orderReducer,
  createOrder,
  getOrderByNumber,
  clearOrder
} from './order-slice';

export {
  userReducer,
  getUser,
  login,
  register,
  logout,
  updateUser
} from './user-slice';

export { ordersReducer, getOrders } from './orders-slice';

export { feedReducer, getFeeds } from './feed-slice';
