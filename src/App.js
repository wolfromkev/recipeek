import React from 'react';
import './App.css';

//Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './Redux/reducer';
import { PersistGate } from 'redux-persist/integration/react';
//Imports
import Search from './Components/search';
import List from './Components/drinkList';
import Recipe from './Components/recipe';
import ShoppingList from './Components/shoppingList';

const middleWare = [ReduxThunk];

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['drink', 'recipes'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
	persistedReducer,
	compose(
		applyMiddleware(...middleWare),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

let persistor = persistStore(store);

function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<div className='container'>
					<Search></Search>
					<List></List>
					<Recipe></Recipe>
					<ShoppingList></ShoppingList>
				</div>
			</PersistGate>
		</Provider>
	);
}

export default App;
