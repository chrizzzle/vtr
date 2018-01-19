export interface WsState {
    isLoading: boolean;
    connected: boolean;
}

export const createInitialWsState = () => {
  return {
      isLoading: false,
      connected: false
  };
};
