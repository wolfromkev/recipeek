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
import axios from 'axios';

export const getRecipes = (search) => (dispatch) => {
	dispatch({ type: GET_RECIPES });
	axios
		.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
		.then((res) => {
			dispatch({
				type: GOT_RECIPES,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch({
				type: SET_ERRORS,
				payload: err,
			});
		});
};

export const loadRecipe = (drink) => (dispatch) => {
	dispatch({ type: LOAD_RECIPE, payload: drink });
};

export const addToFavorites = (drink) => (dispatch) => {
	dispatch({ type: SET_LIKED, payload: drink });
};

export const removeFromFavorites = (drinkId) => (dispatch) => {
	dispatch({ type: SET_UNLIKED, payload: drinkId });
};

export const addToShopping = (items) => (dispatch) => {
	dispatch({ type: ADD_TO_SHOPPING, payload: items });
};

export const removeFromShopping = (item) => (dispatch) => {
	dispatch({ type: REMOVE_FROM_SHOPPING, payload: item });
};

export const updateShoppingItem = (item, amount) => (dispatch) => {
	dispatch({ type: UPDATE_SHOPPING_ITEM, drink: item, quant: amount });
};
