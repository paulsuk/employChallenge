import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions/Actions.js'
import Filters from '../components/Filters.js'

const mapStateToProps = (state) => {
	return {
		activeFilter: state.visibilityFilter
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onPress: (filter) => {
			dispatch(setVisibilityFilter(filter))
		}
	}
}

const FiltersLink = connect(
	mapStateToProps,
	mapDispatchToProps
)(Filters) 

export default FiltersLink