import React, {useState} from 'react';
import styled from 'styled-components';
import {useCart} from '../context/CartContext';
import {useAuth} from "../context/AuthContext";

const CartContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  height: 100vh;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-top: 0;
  padding-top: 0;
`;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  padding-top: 1rem;
`;

const Header = styled.h1`
  font-size: 3rem;
  margin-top: 2rem;
`;

const CartContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2rem;

  @media (min-width: 480px) {
    flex-direction: column;
    padding-right: 10rem;
    padding-left: 12rem;

  }

  @media (min-width: 768px) {
    flex-direction: row;
    padding-right: 15rem;
    padding-left: 20rem;
  }

  @media (min-width: 1024px) {
    justify-content: space-between;
  }
`;

const CartList = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  margin-right: 5rem;
  margin-left: 5rem;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1024px) {
    max-width: 90%;
    margin: auto;
  }

`;

const CartItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const CheckoutForm = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 70%;
    margin-top: 1rem;
    margin-left: 2rem;

  }

  @media (max-width: 480px) {
    width: 90%;
    margin-top: 1rem;
    margin-left: 1rem;

  }
`;

const CheckoutButton = styled.button`
  padding: 1rem 2rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #555;
  }
`;

const Popup = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: green;
  color: white;
  padding: 1rem;
  border-radius: 8px;
`;


const EmailInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Cart = () => {
    const {
        cart,
        removeFromCart,
        addToOrder,
        setCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotalValue
    } = useCart();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const {currentUser} = useAuth();

    const isValidEmail = (email) => {
        return email.includes("@");
    };

    const triggerPopup = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    const handleCheckout = async (email) => {

        if (cart.length === 0) {
            triggerPopup("Your cart is empty. Add items before you checkout.");
            return;
        }

        if (!isValidEmail(email)) {
            triggerPopup("Invalid email address!");
            return;
        }

        if (!currentUser) {
            triggerPopup("You must be logged in to checkout!");
            return;
        }

        if (email) {
            try {
                const totalValue = calculateTotalValue();
                const items = cart;

                const response = await addToOrder({items, totalValue});

                if (response.status === 201) {
                    triggerPopup(`Order successful for ${email}`);
                    setCart([]);
                    localStorage.removeItem("cart");
                } else {
                    triggerPopup("Something went wrong with your order.");
                }
            } catch (error) {
                console.log("Entered catch block:", error);

                if (error && error.response && error.response.status === 403) {
                    triggerPopup("Failed to place order. Unauthorized!");
                } else if (error instanceof TypeError) {
                    triggerPopup("Oops, looks like a bug on our end. Hang tight.");
                } else {
                    triggerPopup("Something went wrong! Only logged in users can place orders.");
                }
            }

        } else {
            triggerPopup("Please enter your email.");
        }
    };


    return (
        <CartContainer>
            {showPopup && <Popup>{popupMessage}</Popup>}
            <HeaderContainer>
                <Header>Your Cart</Header>
                <div></div>
            </HeaderContainer>
            <CartContent>
                <CartList>
                    {cart.length === 0 ? (
                        <div>No items in cart</div>
                    ) : (
                        cart.map((item, index) => (
                            <CartItem key={index}>
                                <span title={item.name}>{item.name}</span>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <QuantityContainer>
                                        <button onClick={() => decreaseQuantity(index)}>-</button>
                                        <span> {item.quantity} </span>
                                        <button onClick={() => increaseQuantity(index)}>+</button>
                                    </QuantityContainer>
                                    <button onClick={() => removeFromCart(index)}>Remove</button>
                                </div>
                            </CartItem>
                        ))
                    )}
                </CartList>
                <CheckoutForm>
                    <h2>Checkout via MailPay™️</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <EmailInput
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                        <CheckoutButton
                            onClick={() => {
                                const email = document.querySelector('[name="email"]').value;
                                handleCheckout(email);
                            }}
                        >
                            Checkout
                        </CheckoutButton>
                    </form>
                </CheckoutForm>
            </CartContent>
        </CartContainer>
    );
};

export default Cart;
