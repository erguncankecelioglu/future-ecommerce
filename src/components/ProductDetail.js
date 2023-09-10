import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {useParams} from 'react-router-dom';
import {useCart} from '../context/CartContext';

const ProductDetailContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f0f0;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  @media (max-width: 768px) {
    padding: 1rem;
    margin: auto;
  }
`;

const ImageContainer = styled.div`
  justify-content: end;
  align-items: end;
  display: flex;
  max-width: 100%;

  @media (max-width: 768px) {
    max-width: 90%;
    position: relative;
    justify-content: center;
    align-items: center;

  }
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-top: 1rem;
  margin-bottom: 0.5rem;

`;

const ProductDescription = styled.p`
  color: #666;
  margin: 1rem 0;
  font-size: 1.2rem;
`;

const PriceTag = styled.span`
  color: #e44d26;
  font-size: 1.5rem;
`;

const AddToCartButton = styled.button`
  padding: 1rem 2rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #555;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;

const QuantityButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const Quantity = styled.span`
  padding: 0.5rem;
  font-size: 1rem;
`;

const Popup = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #399d55;
  color: white;
  padding: 1rem;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 2rem;
  @media (max-width: 768px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
  }
`;


const HowToOrder = styled.div`
  flex: 1;
  margin-left: 10rem;
  padding: 1rem;
  background: #e3e3e3;
  border-radius: 8px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const FAQItem = styled.div`
  margin-top: 0.5rem;
  cursor: pointer;
  max-width: 500px;

  & dt {
    font-weight: bold;
  }

  & dd {
    display: ${props => (props.isExpanded ? 'block' : 'none')};
    margin-left: 1rem;
    word-wrap: break-word;
  }
`;

const FAQ = styled.div`
  margin-top: 3rem;
  padding: 1rem;
  background: #e3e3e3;
  border-radius: 8px;
`;

const ProductImage = styled.img`
  width: 80%;
  height: auto;
  object-fit: cover;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 50%;
    display: flex;
    align-items: center;
    margin-left: 1.2rem;
  }
`;

const ProductDetail = () => {

    const {id} = useParams();
    console.log("Captured ID:", id);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/product/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Product data:", data);
                setProduct(data);
            })
            .catch(error => console.error('Error:', error));
    }, [id]);

    console.log("Product:", product);


    const {addToCart} = useCart();
    const [showPopup, setShowPopup] = useState(false);


    const handleAddToCart = () => {
        if (!product) return;
        const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        };
        addToCart(newItem);

        setShowPopup(true);

        setTimeout(() => setShowPopup(false), 3000);
    };


    const toggleFAQ = (faqKey) => {
        if (expandedFAQ === faqKey) {
            setExpandedFAQ(null);
        } else {
            setExpandedFAQ(faqKey);
        }
    };
    const incrementQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
    const decrementQuantity = () => setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));

    return (
        <ProductDetailContainer>
            {product && (
                <>
                    {showPopup && <Popup>Item added to cart! Quantity: {quantity}</Popup>}
                    <InfoSection>
                        <ProductInfo>
                            <ImageContainer>
                                <ProductImage src={`/images/${product.image}`} alt={product.name}/>
                            </ImageContainer>
                            <ProductTitle>{product.name}</ProductTitle>
                            <ProductDescription>{product.description}</ProductDescription>
                            <PriceTag>${product.price.toFixed(2)}</PriceTag>
                            <QuantitySelector>
                                <QuantityButton onClick={decrementQuantity}>-</QuantityButton>
                                <Quantity>{quantity}</Quantity>
                                <QuantityButton onClick={incrementQuantity}>+</QuantityButton>
                            </QuantitySelector>
                            <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
                        </ProductInfo>
                        <HowToOrder>
                            <h2>How to Order with MailPay™️</h2>
                            <p>Welcome to the future of seamless online shopping!</p>
                            <p>Our patented MailPay system allows you to make instant purchases securely with just your
                                email.</p>
                            <ol>
                                <li>Browse through our product listings and add your favorites to the cart.</li>
                                <li>When you're ready to checkout, enter your email in the MailPay section.</li>
                                <li>Hit "Place Order" and voila! Your order is placed.</li>
                                <li>A secure transaction will automatically happen through your MailPay-registered
                                    email.
                                </li>
                                <li>Enjoy your purchase!</li>
                            </ol>
                            <p>No more credit cards, no more lengthy forms—just your email and a click!</p>
                        </HowToOrder>
                    </InfoSection>
                    <FAQ>
                        <h2>MailPay™️ FAQ</h2>
                        <FAQItem isExpanded={expandedFAQ === 'whatIsMailPay'}
                                 onClick={() => toggleFAQ('whatIsMailPay')}>
                            <dt>What is MailPay?</dt>
                            <dd>MailPay is our cutting-edge payment system that only requires your email to complete
                                transactions.
                            </dd>
                        </FAQItem>
                        <FAQItem isExpanded={expandedFAQ === 'isItSecure'} onClick={() => toggleFAQ('isItSecure')}>
                            <dt>Is it secure?</dt>
                            <dd>Absolutely! All MailPay transactions are encrypted and secure.</dd>
                        </FAQItem>
                        <FAQItem isExpanded={expandedFAQ === 'howDoIRegister'}
                                 onClick={() => toggleFAQ('howDoIRegister')}>
                            <dt>How do I register for MailPay?</dt>
                            <dd>No registration needed! Your email is automatically connected to your secure MailPay
                                wallet the moment you make your first purchase.
                            </dd>
                        </FAQItem>
                        <FAQItem isExpanded={expandedFAQ === 'whatIfIWantToReturn'}
                                 onClick={() => toggleFAQ('whatIfIWantToReturn')}>
                            <dt>What if I want to return my purchase?</dt>
                            <dd>Returns are just as easy—simply request a return and the funds are instantly back in
                                your MailPay wallet.
                            </dd>
                        </FAQItem>
                    </FAQ>
                </>
            )}
        </ProductDetailContainer>
    );
};

export default ProductDetail;
