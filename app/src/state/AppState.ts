import {createInitialWsState, WsState} from './WsState';
import {createInitialUiState, UIState} from './UiState';
import {createInitialOptionState, OptionState} from './OptionState';
import {createInitialSessionState, SessionState} from './SessionState';
import {createInitialVoteState, VoteState} from './VoteState';

export interface AppState {
    options: OptionState;
    ws: WsState;
    ui: UIState;
    sessions: SessionState;
    votes: VoteState;
}

export const createInitialAppState = (): AppState => {
    return {
        options: createInitialOptionState(),
        ws: createInitialWsState(),
        ui: createInitialUiState(),
        sessions: createInitialSessionState(),
        votes: createInitialVoteState()
    };
};
