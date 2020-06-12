import React, { Component } from 'react';
import { getRecipes } from '../Redux/actions';
import { connect } from 'react-redux';
//Icons
import { AiOutlineHeart } from 'react-icons/ai';
import { IoMdWine } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';
import { loadRecipe } from '../Redux/actions';

export class Search extends Component {
	state = {
		search: '',
	};

	handleSearch = (event) => {
		event.preventDefault();
		this.props.getRecipes(this.state.search);
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	recipeLoader = (likedRecipe) => {
		this.props.loadRecipe(likedRecipe);
	};

	render() {
		const { likes } = this.props;

		let likedRecipes =
			likes.length > 0 ? (
				likes.map((like) => {
					return (
						<li>
							<button
								class='button_test'
								onClick={() => this.recipeLoader(like)}
							>
								<figure class='likes__fig'>
									<img src={like.strDrinkThumb} alt='Image' />
								</figure>
								<div class='likes__data'>
									<h4 class='likes__name'>{like.strDrink}</h4>
									<p class='likes__author'>{like.strGlass}</p>
								</div>
							</button>
						</li>
					);
				})
			) : (
				<li>
					<button class='button_test' href=''>
						<div class='likes__data'>
							<h4 class='likes__name'>You havent saved any recipes yet.</h4>
						</div>
					</button>
				</li>
			);

		return (
			<header class='header'>
				<div class='header_full_logo'>
					<IoMdWine class='header_logo_kevin'></IoMdWine>
					<h1 class='header_slogan'> Recipeek</h1>
				</div>

				<form class='search' onSubmit={this.handleSearch}>
					<input
						type='text'
						class='search__field'
						placeholder='Search over 1,000,000 recipes...'
						submit
						name='search'
						onChange={this.handleChange}
					/>
					<button class='btn search__btn' onClick={this.handleSearch}>
						<BsSearch class='search__icon'></BsSearch>
						<span>Search</span>
					</button>
				</form>

				<div class='likes'>
					<div class='likes__field'>
						<AiOutlineHeart class='likes__icon'></AiOutlineHeart>
					</div>
					<div class='likes__panel'>
						<ul class='likes__list'>{likedRecipes}</ul>
					</div>
				</div>
			</header>
		);
	}
}

const mapStateToProps = (state) => ({
	likes: state.likes,
	recipes: state.recipes,
});

export default connect(mapStateToProps, { getRecipes, loadRecipe })(Search);
