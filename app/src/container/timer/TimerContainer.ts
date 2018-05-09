import {TimerComponent} from '../../component/timer/TimerComponent';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';


const GET_TIMER = gql`
  query($sessionId: ID!) {
      session(_id: $sessionId) {
        _id,
        timer,
        percent
      }
  }
`;

export const TIMER_SUBSCRIPTION = gql`
  subscription timerChanged($sessionId: ID!) {
    timerChanged(sessionId: $sessionId) {
        _id,
        timer,
        percent
    }
  }
`;

export const TimerContainer = graphql(GET_TIMER, {
    options: (ownProps: any) => ({
        variables: {
            sessionId: ownProps.session._id
        }
    })
}
)(TimerComponent);
