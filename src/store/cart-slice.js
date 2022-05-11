import { createSlice } from "@reduxjs/toolkit";
const cartSlice= createSlice({
    name:'cart',
    initialState:{
        itemList:[],
        totalQuantity:0,
        showCart:false,
        changed:false,
    },
    reducers:{
        replaceCartData(state,action){
            state.totalQuantity=action.payload;
            state.itemList=action.payload.itemList;
        },

        addToCart(state,action){
            state.changed=true;
            const newItem= action.payload;
            const existingItem=state.itemList.find(item=> item.id===newItem.id);
            if(existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice+=newItem.price;
            }
            else{
                state.itemList.push({
                    id:newItem.id,
                    price:newItem.price,
                    quantity:1,
                    name:newItem.name,
                    totalPrice:newItem.price
                });
                state.totalQuantity+=1;

            }
           
        },
        removeFromCart(state,action){
            state.changed=true;
            const id= action.payload;
            const existingItem=state.itemList.find(item=> item.id===id);
            if(existingItem.quantity===1){
                state.itemList=state.itemList.filter(item=> item.id!==id);
                state.totalQuantity-=1;
            }
            else {
                existingItem.quantity--;
                existingItem.totalPrice-=existingItem.price;

            }
        },
        setShowCart(state){
            state.showCart=!state.showCart;
        }
    }
})


export const cartActions= cartSlice.actions;
export default cartSlice;