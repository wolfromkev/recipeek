import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromShopping, updateShoppingItem } from '../Redux/actions';
import {
	AiOutlineDelete,
	AiOutlineMinusCircle,
	AiOutlinePlusCircle,
} from 'react-icons/ai';

export class shoppingList extends Component {
	state = {
		newProps: 0,
	};
	removeItem = (ingName) => {
		this.props.removeFromShopping(ingName);
	};

	addMore = (item, amount, curr) => {
		if (curr + amount >= 0) this.props.updateShoppingItem(item, amount);
	};

	render() {
		const { shoppingList } = this.props;
		let shoppingItem = shoppingList.map((item) => {
			return (
				<li class='shopping__item'>
					<button
						class='btn-tiny'
						onClick={() =>
							this.addMore(item.stateIngredient, -0.25, item.stateNumber)
						}
					>
						<AiOutlineMinusCircle></AiOutlineMinusCircle>
					</button>
					<button
						class='btn-tiny'
						onClick={() =>
							this.addMore(item.stateIngredient, 0.25, item.stateNumber)
						}
					>
						<AiOutlinePlusCircle></AiOutlinePlusCircle>
					</button>

					<span class='shopping__count' className='recipe__info-text'>
						<span class='shopping__description'>
							{' '}
							{item.stateNumber} {item.stateUnit} {item.stateIngredient}
						</span>
					</span>

					<span>
						<button
							class='shopping__delete btn-tiny'
							onClick={() => this.removeItem(item.stateIngredient)}
						>
							<AiOutlineDelete></AiOutlineDelete>
						</button>
					</span>
				</li>
			);
		});

		return (
			<div class='shopping'>
				<h2 class='heading-2'>Shopping List</h2>

				<ul class='shopping__list'>{shoppingItem}</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	shoppingList: state.shoppingList,
	shoppingListRef: state.shoppingListRef,
});

export default connect(mapStateToProps, {
	removeFromShopping,
	updateShoppingItem,
})(shoppingList);
