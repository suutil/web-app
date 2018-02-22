export class User {
    _id: string
    email: string
    name: string
    rol: string
    CIF: string
    status: boolean
    company: string
    managers: Array<string>
    managersName: Object
    createdAt: Date
    updatedAt: Date

    get id() {
        return this._id
    }

    constructor(email?: string, name?: string, rol?: string, CIF?: string, company?: string, managers?: Array<string>, managersName?: Object) {
        this.email = email
        this.name = name
        this.rol = rol
        this.CIF = CIF
        this.company = company
        this.managers = managers
        this.managersName = managersName
    }
}
