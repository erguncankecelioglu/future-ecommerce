import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';


const ProductContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
`;

const ProductCard = styled(motion.div)`
  width: 200px;
  height: 300px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  max-width: 90%;
  max-height: 50%;
  object-fit: cover;
`;

const ProductName = styled.h3`
  margin: 8px 0;
`;

const ProductDescription = styled.p`
  margin: 8px 0;
`;

const ProductPrice = styled.strong`
  margin: 8px 0;
`;

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    const featuredProducts = products.slice(0, 5);
    const navigateToDetail = (productId) => {
        navigate(`/shop/${productId}`);
    };

    return (
        <ProductContainer>
            {featuredProducts.map((product, index) => (
                <ProductCard
                    key={product.id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: (index + 1) * 0.2}}
                    onClick={() => navigateToDetail(product.id)}
                >
                    <ProductImage src={`/images/${product.image}`} alt={product.name}/>
                    <ProductName>{product.name}</ProductName>
                    <ProductDescription>{product.description}</ProductDescription>
                    <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                </ProductCard>
            ))}
        </ProductContainer>
    );
};

export default FeaturedProducts;
