import { Option } from '../entity/Option';

export interface OptionState {
    isLoading: boolean;
    data: Option[];
    error: string;
}

export const createInitialOptionState = (): OptionState => {
    return {
        isLoading: false,
        data: [],
        error: null
    };
};
