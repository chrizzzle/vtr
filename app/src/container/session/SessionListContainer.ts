import {AppState} from '../../state/AppState';
import {SessionListComponent} from '../../component/session/SessionListComponent';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const mapStateToProps = (state: AppState, props) => ({});
export const mapDispatchToProps = (dispatch, props) => ({});

// We use the gql tag to parse our query string into a query document
const GET_SESSIONS = gql`
  query {
      sessions {
        _id,
        name,
        active
      }
  }
`;

export const SessionListContainer = graphql(GET_SESSIONS)(SessionListComponent);
