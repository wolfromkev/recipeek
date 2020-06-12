import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
	AiOutlineHeart,
	AiFillHeart,
	AiOutlineMinusCircle,
	AiOutlinePlusCircle,
	AiOutlineCheck,
} from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import {
	addToFavorites,
	removeFromFavorites,
	addToShopping,
	updateShoppingItem,
} from '../Redux/actions';
import ShoppingList from './shoppingList';

export class recipeView extends Component {
	state = {
		servings: 1,
	};

	servingsPlus = () => {
		this.setState({ servings: this.state.servings + 1 });
	};

	servingsMinus = () => {
		if (this.state.servings > 1) {
			this.setState({ servings: this.state.servings - 1 });
		}
	};

	likeHandler = (drink) => {
		this.props.addToFavorites(drink);
	};

	unlikeHandler = (drinkId) => {
		this.props.removeFromFavorites(drinkId);
	};

	shoppingListHandler = (ingredients, shoppingList) => {
		if (shoppingList.length === 0) {
			for (let i = 0; i < ingredients.length; i++) {
				this.props.addToShopping(ingredients[i]);
			}
		}

		for (let i = 0; i < ingredients.length; i++) {
			if (
				shoppingList.find(
					(item) => item.stateIngredient === ingredients[i].stateIngredient
				)
			) {
				this.props.updateShoppingItem(
					ingredients[i].stateIngredient,
					ingredients[i].stateNumber
				);
			} else {
				this.props.addToShopping(ingredients[i]);
			}
		}
	};

	render() {
		const { likes, drink, shoppingList } = this.props;
		let ingredientList = [];
		let ingredientListRender = [];
		let likesList = [];
		let LikeButton;

		for (let i = 0; i < likes.length; i++) {
			likesList.push(likes[i].idDrink);
		}

		if (drink) {
			LikeButton = likesList.includes(drink.idDrink) ? (
				<button
					className='recipe__love'
					onClick={() => this.unlikeHandler(drink.idDrink)}
				>
					<AiFillHeart className='header__likes'></AiFillHeart>
				</button>
			) : (
				<button
					className='recipe__love'
					onClick={() => this.likeHandler(drink)}
				>
					<AiOutlineHeart className='header__likes'></AiOutlineHeart>
				</button>
			);
		}

		if (drink) {
			for (let i = 1; i < 15; i++) {
				if (eval(`drink.strIngredient${i}`)) {
					let totalNumber = '';
					let splitMeasure = '';
					let unit = '';
					if (
						eval(`drink.strMeasure${i}`) &&
						/\b[0-9]/.test(eval(`drink.strMeasure${i}`))
					) {
						splitMeasure = eval(`drink.strMeasure${i}`).split(' ');
						unit = splitMeasure.filter((word) => /\b[a-z]/i.test(word));

						let wholeNumber = splitMeasure
							.filter((num) => /\b[0-9]/.test(num) && !/\//.test(num))
							.map((num) => parseInt(num, 10));

						let fractionNumber = splitMeasure.filter(
							(num) => /\b[0-9]/.test(num) && /\//.test(num)
						);

						if (fractionNumber.length === 0 && wholeNumber.length > 0) {
							totalNumber = wholeNumber[0].toFixed(2);
						}

						if (fractionNumber.length > 0 && wholeNumber.length > 0) {
							let evalFraction = fractionNumber[0]
								.split('/')
								.map((num) => parseInt(num, 10));
							totalNumber = (
								wholeNumber[0] +
								parseInt(evalFraction[0], 10) / parseInt(evalFraction[1], 10)
							).toFixed(3);
						}

						if (fractionNumber.length > 0 && wholeNumber.length === 0) {
							let evalFraction = fractionNumber[0]
								.split('/')
								.map((num) => parseInt(num, 10));
							totalNumber = (
								parseInt(evalFraction[0], 10) / parseInt(evalFraction[1], 10)
							).toFixed(3);
						}
						totalNumber = totalNumber * this.state.servings;
					}

					if (unit.length === 1) {
						ingredientList.push({
							stateNumber: totalNumber,
							stateUnit: unit[0].toLowerCase(),
							stateIngredient: eval(`drink.strIngredient${i}`),
						});
					}

					if (unit.length > 1) {
						ingredientList.push({
							stateNumber: totalNumber,
							stateUnit: (unit[0] + ' ' + unit[1]).toLowerCase(),
							stateIngredient: eval(`drink.strIngredient${i}`),
						});
					}

					ingredientListRender.push(
						<li className='recipe__item'>
							<AiOutlineCheck class='recipe__icon'></AiOutlineCheck>
							<div className='recipe__count' className='recipe__info-text'>
								{totalNumber} {unit[0]} {unit[1]}{' '}
								{eval(`drink.strIngredient${i}`)}
							</div>
						</li>
					);
				}
			}
		}

		let recipeContents = drink ? (
			<Fragment>
				<figure className='recipe__fig'>
					<img src={drink.strDrinkThumb} alt='Tomato' className='recipe__img' />
					<h1 className='recipe__title'>
						<span>
							{drink.strDrink} <br /> - {drink.strCategory} -
						</span>
					</h1>
				</figure>
				<div className='recipe__details'>
					<div className='recipe__info'>
						<BsFillPeopleFill className='recipe__info-icon'></BsFillPeopleFill>
						<span className='recipe__info-text'>
							{' '}
							{this.state.servings} servings
						</span>

						<div className='recipe__info-buttons'>
							<button className='btn-tiny' onClick={this.servingsMinus}>
								<AiOutlineMinusCircle></AiOutlineMinusCircle>
							</button>
							<button className='btn-tiny'>
								<AiOutlinePlusCircle onClick={this.servingsPlus} />
							</button>
						</div>
					</div>
					{LikeButton}
				</div>

				<div className='recipe__ingredients'>
					<ul className='recipe__ingredient-list'>{ingredientListRender}</ul>

					<button
						className='btn-small recipe__btn'
						onClick={() =>
							this.shoppingListHandler(ingredientList, shoppingList)
						}
					>
						<span className='recipe-btn-txt'>Add to shopping list</span>
					</button>
				</div>

				<div className='recipe__directions'>
					<h2 className='heading-2'>Preperation</h2>
					<p className='recipe__directions-text'>
						{drink.strInstructions} <br /> <br />
					</p>
				</div>
			</Fragment>
		) : null;

		return <div className='recipe'>{recipeContents}</div>;
	}
}

const mapStateToProps = (state) => ({
	recipes: state.recipes,
	drink: state.drink,
	likes: state.likes,
	shoppingList: state.shoppingList,
});

export default connect(mapStateToProps, {
	addToFavorites,
	removeFromFavorites,
	addToShopping,
	updateShoppingItem,
})(recipeView);
