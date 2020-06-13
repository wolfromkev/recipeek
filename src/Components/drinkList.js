import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { loadRecipe } from '../Redux/actions';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import uniqid from 'uniqid';
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
		const { drinks } = this.props;
		const { page } = this.state;
		let drinkResults, listButtons;

		if (drinks) {
			drinkResults = drinks.slice((page - 1) * 10, page * 10).map((drink) => {
				return (
					<li onClick={() => this.loadRecipe(drink)} key={uniqid()}>
						<button className='button_test'>
							<figure className='results__fig'>
								<img src={drink.strDrinkThumb} alt='Test' />
							</figure>
							<div className='results__data'>
								<h4 className='results__name'>{drink.strDrink}</h4>
								<p className='results__author'>{drink.strGlass}</p>
							</div>
						</button>
					</li>
				);
			});

			if (drinks.length > 10) {
				if (page === 1) {
					listButtons = (
						<Fragment>
							<button
								className='btn-inline results__btn--next'
								onClick={this.pageForward}
							>
								<span>Page {this.state.page + 1}</span>
								<AiOutlineArrowRight className='search__icon'></AiOutlineArrowRight>
							</button>
						</Fragment>
					);
				} else if (drinks.length / this.state.page <= 10) {
					listButtons = (
						<Fragment>
							<button
								className='btn-inline results__btn--prev'
								onClick={this.pageBack}
							>
								<span> Page {this.state.page - 1}</span>
								<AiOutlineArrowLeft className='search__icon'></AiOutlineArrowLeft>
							</button>
						</Fragment>
					);
				} else {
					listButtons = (
						<Fragment>
							<button
								className='btn-inline results__btn--prev'
								onClick={this.pageBack}
							>
								<span>Page {this.state.page - 1}</span>
								<AiOutlineArrowLeft className='search__icon'></AiOutlineArrowLeft>
							</button>
							<button
								className='btn-inline results__btn--next'
								onClick={this.pageForward}
							>
								<span>Page {this.state.page + 1}</span>
								<AiOutlineArrowRight className='search__icon'></AiOutlineArrowRight>
							</button>
						</Fragment>
					);
				}
			}
		}

		return (
			<div className='results'>
				<ul className='results__list'>{drinkResults}</ul>

				<div className='results__pages'>{listButtons}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	drinks: state.drinks,
});

export default connect(mapStateToProps, { loadRecipe })(listView);
