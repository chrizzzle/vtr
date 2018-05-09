import {OptionListComponent} from '../../component/option/OptionListComponent';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

export const GET_OPTIONS_BY_SESSION = gql`
  query($sessionId: ID!) {
      options(sessionId: $sessionId) {
        _id,
        name,
        sessionId
      },
      session(_id: $sessionId) {
        _id,
        name,
        timer,
        countdown,
        active,
        percent
      },
      votes(sessionId: $sessionId) {
        _id,
        sessionId,
        optionId
      }
  }
`;

export const VOTE_OPTION = gql`
    mutation($sessionId: ID!, $optionId: ID!) {
        createVote(sessionId: $sessionId, optionId: $optionId) {
            sessionId,
            optionId
        }
    }
`;

export const VOTE_SUBSCRIPTION = gql`
  subscription ($optionId: ID!) {
    voteCount(optionId: $optionId) {
        optionId,
        voteCount
    }
  }
`;

export const VOTE_COUNT = gql`
    query($optionId: ID!) {
      voteCount(optionId: $optionId) {
        voteCount
      }
  }
`;


export const OptionListContainer = graphql(GET_OPTIONS_BY_SESSION, {
    options: (ownProps: any) => ({
        variables: {
            sessionId: ownProps.match.params.id
        }
    })
}) (OptionListComponent);
