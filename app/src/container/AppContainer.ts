import {connect} from 'react-redux';
import {AppState} from '../state/AppState';
import AppComponent from '../component/AppComponent';

export const mapStateToProps = (state: AppState, props) => {
    return {
        loading: state.ui.loading
    };
};

export const mapDispatchToProps = (dispatch, props) => {
    return {

    };
};

export const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);
