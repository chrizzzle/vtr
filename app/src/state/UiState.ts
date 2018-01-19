export interface UIState {
    loading: boolean;
    timer: {
        sessionId: string,
        number: number
    };
}

export const createInitialUiState = (): UIState => {
    return {
        loading: false,
        timer: null
    };
};
