import React from 'react'
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Cart({ cartItems, onOpen }) {
 
 

  return (
    <div>
      <div className="FixedDiv" onClick={onOpen}>
        <p>Cart</p>
        <div className="CartBox">
          <FontAwesomeIcon size="2x" icon={faShoppingCart} />
          <div className="CartNumber">{cartItems || 0}</div>
          
        </div>
      </div>
    </div>
  );
}
