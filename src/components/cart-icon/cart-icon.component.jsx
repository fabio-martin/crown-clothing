import React from 'react'

import { connect } from 'react-redux'


import { toggleCardHidden } from '../../redux/cart/cart.action'

import { ReactComponent as ShoppingIcon} from '../../assets/shoping-bag.svg'

import '../cart-icon/cart-icon.styles.scss'


const CartIcon = ({ toggleCardHidden}) => (
    <div className='cart-icon' onClick={toggleCardHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>0</span>
    </div>
)


const mapDispatchToProps = dispatch => ({
    toggleCardHidden: () => dispatch(toggleCardHidden())
})


export default connect(null, mapDispatchToProps)(CartIcon)