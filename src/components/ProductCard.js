const ProductCard = ({title, price}) => {
    return (
        <div className="product-card">
            <h2>{title}</h2>
            <p>${price}</p>
        </div>
    );
}

export default ProductCard;
