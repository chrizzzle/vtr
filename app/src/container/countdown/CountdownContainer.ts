import {CountdownComponent} from '../../component/countdown/CountdownComponent';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const GET_COUNTDOWN = gql`
  query($sessionId: ID!) {
      session(_id: $sessionId) {
        _id,
        countdown,
        active,
        percent
      }
  }
`;

export const CountdownContainer = graphql(GET_COUNTDOWN, {
    options: (ownProps: any) => ({
        variables: {
            sessionId: ownProps.session._id
        }
    })
})(CountdownComponent);
