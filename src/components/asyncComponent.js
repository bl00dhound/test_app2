import './asyncComponent.css';
import React, { Component } from 'react';
import { path, prop } from 'ramda';

const asyncComponent = () => {

	class CustomComponent extends Component {

		constructor(props) {
			super(props);

			this.state = {
				component: null
			}
		}

		componentDidMount() {
			const componentName = path(['props', 'match', 'params', 'dummyComponent'])(this);

			import(`../tabs/${componentName}`)
				.then(prop('default'))
				.then(component => this.setState({component}))
				.catch(() => this.setState({ component:null }));
		}

		render() {
			const TargetComponent = this.state.component;
			return TargetComponent ? <TargetComponent {...this.props} /> : null;
		}

	}

	return CustomComponent;
}

export default asyncComponent;