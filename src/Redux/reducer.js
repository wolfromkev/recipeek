import {
	GET_RECIPES,
	GOT_RECIPES,
	SET_ERRORS,
	LOAD_RECIPE,
	SET_LIKED,
	SET_UNLIKED,
	ADD_TO_SHOPPING,
	REMOVE_FROM_SHOPPING,
	UPDATE_SHOPPING_ITEM,
} from './types';
import { filter } from 'mathjs';

const initState = {
	drinks: [],
	drink: null,
	likes: [],
	shoppingList: [],
	shoppingListRef: 0,
};

const reducer = (state = initState, action) => {
	switch (action.type) {
		case GET_RECIPES:
			return {
				...state,
			};

		case GOT_RECIPES:
			let filteredDrinks = action.payload.drinks.filter((drink) => {
				for (let i = 1; i < 15; i++) {
					if (
						eval(`drink.strIngredient${i}`) !== null &&
						eval(`drink.strMeasure${i}`) === null
					) {
						console.log(drink);
						return false;
					} else if (
						/1\/3|2\/3|\/6|\/9|\/11/i.test(eval(`drink.strMeasure${i}`))
					) {
						console.log(drink);
						return false;
					}
				}
				return true;
			});

			return {
				...state,
				drinks: filteredDrinks,
			};

		case SET_ERRORS:
			return {
				...state,
				errors: action.payload,
			};
		case LOAD_RECIPE:
			return {
				...state,
				drink: action.payload,
			};
		case SET_LIKED:
			return {
				...state,
				likes: [...state.likes, action.payload],
			};
		case SET_UNLIKED:
			let newLikes = state.likes.filter(
				(drink) => drink.idDrink !== action.payload
			);
			return {
				...state,
				likes: newLikes,
			};
		case ADD_TO_SHOPPING:
			state.shoppingList.push(action.payload);
			return {
				...state,
				shoppingList: [...state.shoppingList],
			};
		case REMOVE_FROM_SHOPPING:
			let newShoppingList = state.shoppingList.filter(
				(item) => item.stateIngredient !== action.payload
			);
			return {
				...state,
				shoppingList: newShoppingList,
			};
		case UPDATE_SHOPPING_ITEM:
			let itemIndex = state.shoppingList.findIndex(
				(obj) => obj.stateIngredient === action.drink
			);
			let newList = state.shoppingList;
			newList[itemIndex].stateNumber =
				newList[itemIndex].stateNumber + action.quant;
			return {
				...state,
				shoppingListRef: state.shoppingListRef + 1,
				shoppingList: newList,
			};
		default:
			return state;
	}
};

export default reducer;
