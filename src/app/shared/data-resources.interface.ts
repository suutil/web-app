import { Observable } from 'rxjs'

export interface DataResource {
    loadData(page?: number, pageSize?: number, sortField?: string, sortAsc?: boolean, search?: string): any
    get(id: string): Promise<Object>
}