import React from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

const ShopContainer = styled(motion.div)`
  padding: 2rem;
  background: #f0f0f0;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  color: #333;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 1.5rem;
`;

const FilterContainer = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  background: #fff;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
`;

const FilterLabel = styled.label`
  margin-right: 1rem;
  font-size: 1rem;
`;

const FilterOption = styled.select`
  padding: 0.5rem 1rem;
  border: none;
  background: #333;
  color: white;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
`;

const Shop = () => {
    const [filter, setFilter] = React.useState('all');
    const navigate = useNavigate();

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const navigateToDetail = (productId) => {
        navigate(`/shop/${productId}`);
    };

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {duration: 1}}
    };

    return (
        <ShopContainer
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Title>Welcome to Our Shop!</Title>
            <FilterContainer>
                <FilterLabel>Filter by: </FilterLabel>
                <FilterOption onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="games">Games</option>
                    <option value="apps">Apps</option>
                </FilterOption>
            </FilterContainer>
            <ProductList filter={filter} navigateToDetail={navigateToDetail}/>
        </ShopContainer>
    );
};

export default Shop;
