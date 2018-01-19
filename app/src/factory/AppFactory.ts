import {ApiService} from '../service/api/ApiService';
import {WsService} from '../service/ws/WsService';
import {StorageService} from '../service/storage/StorageService';

export interface AppFactory {
    getApiService(): ApiService;
    getWsService(): WsService;
    getStorage(): StorageService;
}
