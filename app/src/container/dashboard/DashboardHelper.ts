import {Session} from '../../entity/Session';
import {Vote} from '../../entity/Vote';
import {Option} from '../../entity/Option';

export const getVotesBySession = (votes: Vote[], session: Session): Vote[] =>
    votes.filter((vote: Vote) => vote.sessionId === session._id);
export const getOptionsBySession = (options: Option[], session: Session): Option[] =>
    options.filter((option: Option) => option.sessionId === session._id);
export const getOptionNames = (options: Option[]): string[] =>
    options.map((option: Option) => option.name);
export const getOptionsSorted = (options: Option[], votes: Vote[]): Option[] =>
    [...options].sort((optionA: Option, optionB: Option) => {
        const countA = getVoteCountByOption(optionA, votes);
        const countB = getVoteCountByOption(optionB, votes);
        if (countA > countB) {
            return -1;
        } else if (countA < countB) {
            return 1;
        }
        return 0;
    });
export const getVoteCount = (votes: Vote[]): number => votes.length;
export const getVoteCountByOptions = (options: Option[], votes: Vote[]) => {
    return options.map((option: Option) => getVoteCountByOption(option, votes));
};
export const getVoteCountByOption = (option: Option, votes: Vote[]): number => {
    return votes.reduce(
        (acc: number, vote: Vote) => {
            return vote.optionId === option._id ? acc + 1 : acc;
        },
        0
    );
};
export const getSessionById = (sessions: Session[], sessionId: string): Session =>
    sessions.find((session: Session) => session._id === sessionId);
