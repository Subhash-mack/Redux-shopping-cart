import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData=()=>{
   
    return async(dispatch)=>{
        const fetchHandler= async()=>{
            const res= await fetch(process.env.REACT_APP_API_GET_URL);
            const data= await res.json();
            return data;
        }
        try{
            const cartData= await fetchHandler();
            dispatch(cartActions.replaceCartData(cartData));
        }
        catch(err){
            dispatch(uiActions.showNotifications({
                open: true,
                message: 'Sending request failed',
                type: 'error'
              }));
        }
    }

}

export const sendCartData=(cart)=>{
    return async (dispatch)=>{
        dispatch(uiActions.showNotifications({
            open: true,
            message: 'Sending request',
            type: 'warning'
          }));
        const sendRequest = async () => {
            console.log(process.env)
            const res = await fetch(process.env.REACT_APP_API_PUT_URL, {
              method: 'PUT',
              body: JSON.stringify(cart)
            });
            const data = await res.json();
            console.log(data);
            dispatch(uiActions.showNotifications({
              open: true,
              message: 'Sent request to DB successfully',
              type: 'success'
            }));
          }
          try{
            await sendRequest();
        }
        catch(err){
            dispatch(uiActions.showNotifications({
                open: true,
                message: 'Sending request failed',
                type: 'error'
              }));
        }

    }
    
}