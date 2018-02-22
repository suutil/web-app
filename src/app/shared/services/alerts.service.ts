import { Alert } from '../models/Alert.model';
import { APIService } from './api/api.service';
import { FeathersDataResourceService } from './api/data-resoucers-feathers.service';
import { Injectable } from '@angular/core'


@Injectable()
export class AlertsService {
    private alertsService: any

    constructor(private apiService: APIService,
        private feathersDataResourceService: FeathersDataResourceService) {
        this.alertsService = this.apiService.getService('alerts')
    }

    getDataResources() {
        return this.feathersDataResourceService.get('alerts')
    }

    getMyDataResources() {
        return this.feathersDataResourceService.get('alerts',
            { from: this.apiService.getUserId() })
    }

    getAlertsType() {
        return [{
            value: 'documentation',
            label: 'Documentación',
        },
        {
            value: 'socialInsurance',
            label: 'Seguros sociales'
        },
        {
            value: 'taxes',
            label: 'Impuestos'
        },
        {
            value: 'other',
            label: 'Otros'
        }]
    }

    sendAlerts(alert: Alert) {
        return this.alertsService.create(alert)
    }

    setAlertRead(alert){
      return this.alertsService.patch(alert._id, { read: true })
    }

    getMyAlerts(): Promise<Array<Alert>> {
        return this.getAlerts(this.apiService.getUserId())
    }


    getMyNewReadAlerts(): Promise<Array<Alert>> {
        return this.getAlerts(this.apiService.getUserId(), true)
    }

    getMyNewUnreadAlerts(): Promise<Array<Alert>> {
        return this.getAlerts(this.apiService.getUserId(), false)
    }

    getAlerts(userId: string, readStatus?: boolean): Promise<Array<Alert>> {
        let params = {
            query: {
                to: userId,
                $sort: {'createdAt': -1},
                $limit: 20
            }
        }

         if (readStatus!==undefined) {
          params.query['read']= readStatus
        }

        return this.alertsService.find(params)
            .then(response => response.data)
            .then(alerts => alerts.map(alert => Object.assign(new Alert(), alert)))
    }

}
