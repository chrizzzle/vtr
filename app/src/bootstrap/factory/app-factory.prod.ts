import {AppConfig} from '../../index';
import {AppFactory} from '../../factory/AppFactory';
import {PRODApiService} from '../../service/api/PRODApiService';
import {PRODWsService} from '../../service/ws/PRODWsService';
import {WsService} from '../../service/ws/WsService';
import {ApiService} from '../../service/api/ApiService';
import {StorageService} from '../../service/storage/StorageService';
import {PRODStorageService} from '../../service/storage/PRODStorageService';

export class ProdAppFactory implements AppFactory {
    private wsService: WsService;
    private apiService: ApiService;
    private storageService: StorageService;

    constructor(private config: AppConfig, private window: Window) {}

    getApiService(): ApiService {
        if (!Boolean(this.apiService)) {
            this.apiService = new PRODApiService(this.config.apiBaseURL);
        }
        return this.apiService;
    }

    getWsService(): WsService {
        if (!Boolean(this.wsService)) {
            this.wsService = new PRODWsService(this.config.wsBaseUrl);
        }
        return this.wsService;
    }

    getStorage() {
        if (!Boolean(this.storageService)) {
            this.storageService = new PRODStorageService(this.window.localStorage);
        }

        return this.storageService;
    }
}
