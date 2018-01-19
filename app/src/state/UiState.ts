export interface UIState {
    loading: boolean;
}

export const createInitialUiState = (): UIState => {
    return {
        loading: false
    };
};
