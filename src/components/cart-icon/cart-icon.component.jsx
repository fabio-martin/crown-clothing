import React from 'react'

import { connect } from 'react-redux'

import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

import { toggleCardHidden } from '../../redux/cart/cart.actions'

import { ReactComponent as ShoppingIcon} from '../../assets/shoping-bag.svg'



import '../cart-icon/cart-icon.styles.scss'


const CartIcon = ({ toggleCardHidden , itemCount}) => (
    <div className='cart-icon' onClick={toggleCardHidden}>
        <ShoppingIcon className='shopping-icon'/>
<span className='item-count'>{ itemCount }</span>
    </div>
)


const mapDispatchToProps = dispatch => ({
    toggleCardHidden: () => dispatch(toggleCardHidden())
})


const mapStateToProp = (state) => ({
    itemCount: selectCartItemsCount(state)

})


export default connect(mapStateToProp, mapDispatchToProps)(CartIcon)