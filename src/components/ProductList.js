import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {useNavigate} from "react-router-dom";

const ProductCard = styled(motion.div)`
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.5rem;
  margin: 1rem;
  min-width: 200px;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 150px;
  object-fit: cover;
`;


const Description = styled.p`
  font-size: 0.8rem;
  color: #666;
`;

const Price = styled.p`
  font-weight: bold;
`;
const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ProductList = ({filter = 'all'}) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    const navigateToDetail = (productId) => {
        navigate(`/shop/${productId}`);
    };

    const filteredProducts = products.filter((product) => {
        if (filter === 'all') return true;
        return product.category === filter;
    });

    return (
        <ProductContainer>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} whileHover={{scale: 1.05}}
                                 onClick={() => navigateToDetail(product.id)}>
                        <ProductImage src={`/images/${product.image}`} alt={product.name}/>
                        <h3>{product.name}</h3>
                        <Description>{product.description}</Description>
                        <Price>${product.price.toFixed(2)}</Price>
                    </ProductCard>
                ))}
            </div>
        </ProductContainer>
    );
};
export default ProductList;
