const initailState = {
   loading: false,
   cartProducts: []
}

export const indexReducers = (state = initailState, action) => {
   switch (action.type) {

      case 'addToCart':
         return {
            ...state,
            cartProducts: [...state.cartProducts, action.payload]
         }
      case 'updateCart':
         return {
            ...state,
            cartProducts: state.cartProducts.map((item) => item._id === action.payload._id ? { ...item, quantity: action.payload.quantity } : item)
         }

         case 'deleteCart':
            return {
               ...state,
               cartProducts: state.cartProducts.filter((item)=> item._id !== action.payload._id)
            }   
      default: return state
   }
}