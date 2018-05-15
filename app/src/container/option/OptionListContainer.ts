import {OptionListComponent} from '../../component/option/OptionListComponent';
import gql from 'graphql-tag';
import {compose, graphql} from 'react-apollo';

export const GET_OPTIONS_BY_SESSION = gql`
    query ($sessionId: ID!, $userId: ID!) {
        options(sessionId: $sessionId) {
            _id
            name
            sessionId
        }
        session(_id: $sessionId) {
            _id
            name
            timer
            countdown
            active
            percent
        }
        votes(sessionId: $sessionId) {
            _id
            sessionId
            optionId
        },
        voteCount(sessionId: $sessionId, userId: $userId) {
            optionId
            voteCount
      }
    }
`;

export const VOTE_OPTION = gql`
    mutation($sessionId: ID!, $optionId: ID!, $userId: ID!) {
        createVote(sessionId: $sessionId, optionId: $optionId, userId: $userId) {
            sessionId,
            optionId,
            userId
        }
    }
`;

export const GET_USER = gql`
    query {
        user @client {
            _id
        }
    }
`;

export const OptionListContainer = compose(
    graphql(GET_USER, {
        props: ({data}: any) => ({
            user: data.user
        })
    }),
    graphql(GET_OPTIONS_BY_SESSION, {
        options: (ownProps: any) => ({
            variables: {
                sessionId: ownProps.match.params.id,
                userId: ownProps.user._id
            }
        }),
        props: ({data}: any) => {
            const {loading, session, options, votes, voteCount, error} = data;

            if (loading) {
                return {
                    loading
                };
            }

            if (error) {
                return {
                    error
                };
            }

            return {
                loading,
                session,
                options,
                votes,
                voteCount
            };
        }
    }),
    graphql(VOTE_OPTION, {
        options: (ownProps: any) => {
            return {
                refetchQueries: [{
                    query: GET_OPTIONS_BY_SESSION,
                    variables: {
                        sessionId: ownProps.match.params.id,
                        userId: ownProps.user._id
                    }
                }],

            };
        }
    })
) (OptionListComponent);
