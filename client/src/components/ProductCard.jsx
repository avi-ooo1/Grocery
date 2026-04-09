import React from "react";
import { assets } from '../assets/assets'
import {useAppContext} from '../context/AppContext'

const ProductCard = ({product}) => {
    const {currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    return product && (
        <div onClick={()=>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`); window.scrollTo(0,0)}} 
             className="border border-gray-100 rounded-xl md:px-4 px-3 py-3 bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer w-full flex flex-col h-full relative">
            
            <div className="flex items-center justify-center p-2 mb-3 bg-gray-50 rounded-lg overflow-hidden h-32 md:h-44 flex-shrink-0">
                <img className="group-hover:scale-110 transition-transform duration-500 w-full h-full object-contain" 
                     src={product.image[0]} 
                     alt={product.name} 
                     loading="lazy" />
            </div>

            <div className="flex flex-col flex-grow">
                <p className="text-gray-400 text-[10px] md:text-sm font-medium uppercase tracking-wider">{product.category}</p>
                <h3 className="text-gray-800 font-bold text-sm md:text-base line-clamp-2 min-h-[2.5rem] md:min-h-[3rem]">{product.name}</h3>
                
                <div className="flex items-center gap-1 py-1">
                    {Array(5).fill('').map((_, i) => (
                           <img key={i} className="w-2.5 md:w-3" src={i<4 ? assets.star_icon : assets.star_dull_icon} alt=""/>
                    ))}
                    <span className="text-[10px] md:text-xs text-gray-400 font-medium">(4.0)</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                    <div>
                        <p className="text-primary font-bold text-base md:text-lg">
                            {currency}{product.offerPrice}
                        </p>
                        <p className="text-gray-400 line-through text-[10px] md:text-xs">
                            {currency}{product.price}
                        </p>
                    </div>

                    <div onClick={(e)=>e.stopPropagation()} className="flex items-center justify-end min-w-[80px]">
                        {!cartItems[product._id] ? (
                            <button className="flex items-center justify-center gap-1 bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all" 
                                    onClick={() => addToCart(product._id)} >
                               <img src={assets.cart_icon} alt="" className="w-3 invert" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center bg-gray-100 rounded-lg border border-gray-200 overflow-hidden h-9">
                                <button onClick={() => removeFromCart(product._id)} 
                                        className="w-8 h-full hover:bg-red-50 hover:text-red-500 transition-colors font-bold text-gray-600">-</button>
                                <span className="w-8 text-center text-xs font-bold text-primary">{cartItems[product._id]}</span>
                                <button onClick={() => addToCart(product._id)} 
                                        className="w-8 h-full hover:bg-primary/10 hover:text-primary transition-colors font-bold text-gray-600">+</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;