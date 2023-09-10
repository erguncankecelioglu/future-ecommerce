import React, {createContext, useContext, useEffect, useState} from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [username, setUsername] = useState(() => {
        const sessionUser = sessionStorage.getItem('user');
        return sessionUser ? sessionUser : null;
    });
    const [cart, setCart] = useState(() => {
        const localCart = localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart) : [];
    });
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const calculateTotalValue = () => {
        return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    const addToCart = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex > -1) {
            const newCart = [...cart];
            newCart[existingItemIndex].quantity += item.quantity;
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));

        } else {
            setCart([...cart, item]);
        }
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity++;
        setCart(updatedCart);
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity--;
        } else {
            updatedCart.splice(index, 1);
        }
        setCart(updatedCart);
    };

    const addToOrder = async ({items, totalValue}) => {
        try {
            const currentUsername = sessionStorage.getItem('user');
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({username: currentUsername, totalValue, items})
            });

            if (response.status === 201) {
                const data = await response.json();
                setOrders([...orders, data]);
                return response;
            } else {
                console.log(response.body);
            }
        } catch (error) {
            console.error('There was an issue with placing the order:', error);
        }
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            orders,
            addToOrder,
            increaseQuantity,
            decreaseQuantity,
            setCart,
            calculateTotalValue
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
