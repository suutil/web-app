import { User } from '../models/User.model';
import { APIService } from './api/api.service';
import { FeathersDataResourceService } from './api/data-resoucers-feathers.service';
import { Injectable } from '@angular/core'


@Injectable()
export class UserManagementService {

    private usersService: any
    private usersInvitationService: any
    private PAGE_SIZE: number = 50

    constructor(private apiService: APIService,
        private feathersDataResourceService: FeathersDataResourceService) {
        this.usersService = this.apiService.getService('users')
        this.usersInvitationService = this.apiService.getService('invitation-users')
    }


    getDataResources() {
      let params = {
          query: {
              //rol: 'provider',
              //approved: false
          }
      }
      return this.usersService.find(params)
        //  .then(response => response.data)
        //  .then(users => users.map(user => Object.assign(new User(), user)))
    }

    getProviders(){
      let params = {
          query: {
              rol: 'provider',
              //approved: false
          }
      }
      return this.usersService.find(params)
          .then(response => response.data)

    }

    getShops(amount){
      let params = {
          query: {
              rol: 'provider',
              $limit: amount
              //approved: false
          }
      }
      return this.usersService.find(params)
          .then(response => response.data)

    }

    getManagers(): Promise<Array<User>> {
        //TODO getAll?
        let params = {
            query: {
                rol: 'manager'
            }
        }
        return this.usersService.find(params)
            .then(response => response.data)
            .then(users => users.map(user => Object.assign(new User(), user)))
    }

    getMyManagers(): Promise<Array<User>> {
        var managersName = this.apiService.getUser().managersName
        var users = []
        Object.keys(managersName).forEach(currentManagerId => {
            users.push({
                _id: currentManagerId,
                name: managersName[currentManagerId]
            })
        })

        return Promise.resolve(users.map(user => Object.assign(new User(), user)))

    }

    getCustomers(): Promise<Array<User>> {
        return this._getAllUsersPaginated('customer', this.PAGE_SIZE, 0, [])
            .then(users => users.map(user => Object.assign(new User(), user)))
    }

    _getAllUsersPaginated(rol, pageSize, page, allUsers) {
        return this.usersService
            .find({
                query: {
                    rol,
                    $limit: pageSize,
                    $skip: pageSize * page
                }
            })
            .then(users => {
                allUsers = allUsers.concat(users.data)
                if (allUsers.total > page + 1 * pageSize) {
                    return this._getAllUsersPaginated(rol, pageSize, page + 1, allUsers)
                }
                else {
                    return allUsers
                }
            })

    }

    inviteNewUser(user: User) {
        return this.usersInvitationService.create(user)
    }

    changeStatus(userId: string, status: boolean) {
        return this.usersService.patch(userId, { status })
    }

    changeRol(userId: string, rol: string) {
        return this.usersService.patch(userId, { rol })
    }

    changeManagers(userId: string, managers: Array<string>, managersName: Object) {
        return this.usersService.patch(userId, { managers, managersName })
    }

    updateUser(user: User) {
        return this.usersService.update(user._id, user)
    }

    patchUser(){
      console.log('patch user')
    }
}
