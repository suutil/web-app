export class Alert {
    _id: string
    type: string
    from: string
    to: Array<string>
    detail: string
    customers: Object
    date: Date
    createdAt: Date
    updatedAt: Date

    constructor(type?: string, from?: string, to?: Array<string>, detail?: string, customers?: Object, date?: Date) {
        this.type = type
        this.from = from
        this.to = to
        this.detail = detail
        this.customers = customers
        this.date = date
    }
}