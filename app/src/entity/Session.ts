export interface Session {
    _id: string;
    name: string;
    timer: number;
    countdown: number;
    active: boolean;
    percent: number;
}
