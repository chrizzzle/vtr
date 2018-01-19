import {AppConfig} from '../../index';
import {AppFactory} from '../../factory/AppFactory';
import {DEVApiService} from '../../service/api/DEVApiService';
import {DEVWsService} from '../../service/ws/DEVWsService';
import {WsService} from '../../service/ws/WsService';
import {ApiService} from '../../service/api/ApiService';
import {StorageService} from '../../service/storage/StorageService';
import {DEVStorageService} from '../../service/storage/DEVStorageService';

export class DevAppFactory implements AppFactory {
    private wsService: WsService;
    private apiService: ApiService;
    private storageService: StorageService;

    constructor(private config: AppConfig, private window: Window) {}

    getApiService(): ApiService {
        if (!Boolean(this.apiService)) {
            this.apiService = new DEVApiService(this.config.apiBaseURL);
        }
        return this.apiService;
    }

    getWsService() {
        if (!Boolean(this.wsService)) {
            this.wsService = new DEVWsService(this.config.wsBaseUrl);
        }
        return this.wsService;
    }

    getStorage() {
        if (!Boolean(this.storageService)) {
            this.storageService = new DEVStorageService(this.window.localStorage);
        }

        return this.storageService;
    }
}
