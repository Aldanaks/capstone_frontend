import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { BASE_URL } from "../api";
import { useNavigate } from "react-router";
import AddtoCart from "../Materials/AddtoCart.png";

const Cart = () => {
  const { cartItems, cartCount, removeFromCart, addToCart, user } =
    useContext(UserContext);
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.cartCount,
      0
    );
  };

  const handleCardClick = (item) => {
    navigate(`/productdetails/${item._id}`);
  };

  console.log(user.username);

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden bg-custom-gray">
      <div className="flex-col overflow-y-auto h-full w-full max-w-4xl m-10">
        <h1 className="text-xl font-bold mt-4 mb-8 flex items-center justify-center">
          {cartCount} items are in your cart
        </h1>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card card-compact bg-base-100 w-full shadow-xl mb-3 cursor-pointer"
                onClick={() => handleCardClick(item)}
              >
                <figure>
                  <img src={BASE_URL + "/" + item.image} alt={item.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>

                  <h2 className="card-title">{item.price} KD</h2>
                  <div
                    className="flex flex-row items-center justify-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="btn btn-primary text-white"
                      onClick={() => removeFromCart(item)}
                    >
                      -
                    </button>
                    <div className="btn btn-primary text-white px-6">
                      {item.cartCount}
                    </div>
                    <button
                      className="btn btn-primary text-white"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <h2 className="text-2xl font-bold flex justify-end">
                Total: {getTotalPrice()} KD
              </h2>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-primary text-white"
                type="button"
                onClick={() => navigate(`/checkout`)}
              >
                Check Out
              </button>
              <button
                className="btn btn-primary text-white ml-3"
                type="button"
                onClick={() => navigate(`/${user?.username}`)}
              >
                Go Shopping
              </button>
            </div>
          </>
        ) : (
          <div className="text-center m-10">
            <img
              className="h-[500px] rounded-3xl p-4 object-contain"
              src={AddtoCart}
              alt={"Your cart is empty"}
            />
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <button
              className="bg-transparent text-black p-5"
              type="button"
              onClick={() => navigate(`/${user?.username}`)}
            >
              Start Shopping
            </button>
          </div>
        )}
        <div className="w-full flex justify-center mt-9 ">
          <button
            onClick={() => navigate(`/customersupport`)}
            className="btn  text-white"
          >
            <h4 className="text-black">Contact Us</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
