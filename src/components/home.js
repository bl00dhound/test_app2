import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import {
	sort, compose, ifElse,
	isEmpty, not, pathOr,
	path, identity, equals
} from 'ramda';

import './home.css';

const getButtons = ( clickHandler ) => tab =>
	<Button
		key={tab.order}
		onClick={clickHandler(tab)}
	>{tab.title}</Button>

class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			tabs: []
		}

		this.clickHandler = this.clickHandler.bind(this);
	}

	componentWillMount() {
		fetch('http://localhost:9999/tabs.json')
			.then(data => data.json())
			.then(ifElse(
				isEmpty,
				identity,
				compose(tabs => this.setState({ tabs }), sort((a, b) => a.order - b.order))
			))
			.then(() => {
				const isTabsNotEmpty = compose(not, isEmpty, pathOr([], ['state', 'tabs']))(this);
				const isPathOnRoot = compose(equals('/'), path(['props', 'location', 'pathname']))(this)
				if (isTabsNotEmpty && isPathOnRoot) {
					this.props.history.push('/path/' + this.state.tabs[0].id);
				}
			})
			.catch(console.error);
	}

	clickHandler(tab) {
		return() => {
			this.props.history.push('/path');
			setTimeout(() => this.props.history.push('/path/' + tab.id), 0)
		};
	}

	render() {
		return (
			<div className='homepage'>
				<Button.Group>
					{this.state.tabs.length && this.state.tabs.map(getButtons(this.clickHandler))}
				</Button.Group>
			</div>
		);
	}
}

export default Home;