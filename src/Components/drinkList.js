import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadRecipe } from '../Redux/actions';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export class listView extends Component {
	state = {
		page: 1,
	};

	pageBack = () => {
		this.setState({ page: this.state.page - 1 });
	};

	pageForward = () => {
		this.setState({ page: this.state.page + 1 });
	};

	loadRecipe = (drinkId) => {
		this.props.loadRecipe(drinkId);
	};

	render() {
		const { recipes } = this.props;
		const { page } = this.state;
		let drinkResults, listButtons;

		if (recipes.drinks) {
			drinkResults = recipes.drinks
				.slice((page - 1) * 10, page * 10)
				.map((drink) => {
					return (
						<li onClick={() => this.loadRecipe(drink)}>
							<button class='button_test'>
								<figure class='results__fig'>
									<img src={drink.strDrinkThumb} alt='Test' />
								</figure>
								<div class='results__data'>
									<h4 class='results__name'>{drink.strDrink}</h4>
									<p class='results__author'>{drink.strGlass}</p>
								</div>
							</button>
						</li>
					);
				});

			if (recipes.drinks.length > 10) {
				if (page === 1) {
					listButtons = (
						<Fragment>
							<button
								class='btn-inline results__btn--next'
								onClick={this.pageForward}
							>
								<span>Page {this.state.page + 1}</span>
								<AiOutlineArrowRight class='search__icon'></AiOutlineArrowRight>
							</button>
						</Fragment>
					);
				} else if (recipes.drinks.length / this.state.page <= 10) {
					listButtons = (
						<Fragment>
							<button
								class='btn-inline results__btn--prev'
								onClick={this.pageBack}
							>
								<span> Page {this.state.page - 1}</span>
								<AiOutlineArrowLeft class='search__icon'></AiOutlineArrowLeft>
							</button>
						</Fragment>
					);
				} else {
					listButtons = (
						<Fragment>
							<button
								class='btn-inline results__btn--prev'
								onClick={this.pageBack}
							>
								<span>Page {this.state.page - 1}</span>
								<AiOutlineArrowLeft class='search__icon'></AiOutlineArrowLeft>
							</button>
							<button
								class='btn-inline results__btn--next'
								onClick={this.pageForward}
							>
								<span>Page {this.state.page + 1}</span>
								<AiOutlineArrowRight class='search__icon'></AiOutlineArrowRight>
							</button>
						</Fragment>
					);
				}
			}
		}

		return (
			<div class='results'>
				<ul class='results__list'>{drinkResults}</ul>

				<div class='results__pages'>{listButtons}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	recipes: state.recipes,
});

export default connect(mapStateToProps, { loadRecipe })(listView);
