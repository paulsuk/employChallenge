import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions/Actions.js'
import Filters from '../components/Filters.js'

const mapStateToProps = (state, ownProps) => {
	return {
		activeFilter: state.visibilityFilter
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(setVisibilityFilter(ownProps.filter))
		}
	}
}

const FiltersLink = connect(
	mapStateToProps,
	mapDispatchToProps
)(Filters)

export default FiltersLink