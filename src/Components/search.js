import React, { Component } from 'react';
import { getRecipes, loadRecipe } from '../Redux/actions';
import { connect } from 'react-redux';
//Icons
import { AiOutlineHeart } from 'react-icons/ai';
import { IoMdWine } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';
import uniqid from 'uniqid';

export class Search extends Component {
	state = {
		search: '',
	};

	componentDidMount() {
		this.props.getRecipes(this.state.search);
	}
	componentDidUpdate(prevProps) {
		this.props.loadRecipe(this.props.drinks[0]);
	}

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
						<li key={uniqid()}>
							<button
								className='button_test'
								onClick={() => this.recipeLoader(like)}
							>
								<figure className='likes__fig'>
									<img src={like.strDrinkThumb} alt='drinkThumbnail' />
								</figure>
								<div className='likes__data'>
									<h4 className='likes__name'>{like.strDrink}</h4>
									<p className='likes__author'>{like.strGlass}</p>
								</div>
							</button>
						</li>
					);
				})
			) : (
				<li>
					<button className='button_test' href=''>
						<div className='likes__data'>
							<h4 className='likes__name'>You havent saved any recipes yet.</h4>
						</div>
					</button>
				</li>
			);

		return (
			<header className='header'>
				<div className='header_full_logo'>
					<IoMdWine className='header_logo_kevin'></IoMdWine>
					<h1 className='header_slogan'> Recipeek</h1>
				</div>

				<form className='search'>
					<input
						type='text'
						className='search__field'
						placeholder='Search over 1,000,000 recipes...'
						name='search'
						onChange={this.handleChange}
					/>
					<button className='btn search__btn' onClick={this.handleSearch}>
						<BsSearch className='search__icon'></BsSearch>
						<span>Search</span>
					</button>
				</form>

				<div className='likes'>
					<div className='likes__field'>
						<AiOutlineHeart className='likes__icon'></AiOutlineHeart>
					</div>
					<div className='likes__panel'>
						<ul className='likes__list'>{likedRecipes}</ul>
					</div>
				</div>
			</header>
		);
	}
}

const mapStateToProps = (state) => ({
	likes: state.likes,
	drinks: state.drinks,
});

export default connect(mapStateToProps, { getRecipes, loadRecipe })(Search);
