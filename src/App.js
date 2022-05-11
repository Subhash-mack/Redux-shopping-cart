import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isFirstRender=true;
function App() {
  const dispatch = useDispatch();
 
  const cart = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const notification=useSelector(state=>state.ui.notification);
  useEffect(() => {
    if(isFirstRender){
      isFirstRender=false;
      return;
    }
  dispatch(fetchCartData())
}, [dispatch]);

  useEffect(() => {
      if(cart.changed)
      dispatch(sendCartData(cart))
  }, [cart,dispatch]);

  //const {type,message}=notification;
  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
