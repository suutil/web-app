import { APIService } from './api/api.service';
import { FeathersDataResourceService } from './api/data-resoucers-feathers.service';
import { Injectable } from '@angular/core'
const moment = require('moment-timezone')



@Injectable()
export class ObjectivesService {

    private objectivesService: any

    constructor(private apiService: APIService) {
        this.objectivesService = this.apiService.getService('objectives')
    }

    get(year: number, month?: number) {
        var userId = this.apiService.getUserId()
        let params = {
            query: {
                year,
                userId,
                month
            }
        }

        return this.objectivesService.find(params)
    }

    getMonthObjective(timestamp) {
        var date = moment(timestamp)
        var year = date.get('year')
        var month = date.get('month') + 1

        return this.get(year, month)
            .then(data => data[0])
    }

    getQuarterObjective(timestamp) {
        var date = moment(timestamp)
        var year = date.get('year')
        var quarter = date.get('quarter')

        return this.get(year)
            .then(yearObjective => {
                var incomes = 0
                var expenses = 0
                var profit = 0
                yearObjective.forEach(currentMonth => {
                    if (currentMonth.month > ((quarter - 1) * 3) && currentMonth.month < (quarter * 3 + 1)) {
                        incomes += currentMonth.incomes
                        expenses += currentMonth.expenses
                        profit += currentMonth.incomes - currentMonth.expenses
                    }
                })

                return {
                    incomes,
                    expenses,
                    profit
                }
            })
    }

    getBiannualObjective(timestamp) {
        var date = moment(timestamp)
        var year = date.get('year')
        var firstBiannual = date.get('month') < 6

        return this.get(year)
            .then(yearObjective => {
                var incomes = 0
                var expenses = 0
                var profit = 0
                yearObjective.forEach(currentMonth => {
                    if ((currentMonth.month < 7 && firstBiannual) ||
                        (currentMonth.month > 6 && !firstBiannual)) {
                        incomes += currentMonth.incomes
                        expenses += currentMonth.expenses
                        profit += currentMonth.incomes - currentMonth.expenses
                    }
                })

                return {
                    incomes,
                    expenses,
                    profit
                }
            })
    }


    getAnnualObjective(timestamp) {
        var date = moment(timestamp)
        var year = date.get('year')

        return this.get(year)
            .then(yearObjective => {
                var incomes = 0
                var expenses = 0
                var profit = 0
                yearObjective.forEach(currentMonth => {
                    incomes += currentMonth.incomes
                    expenses += currentMonth.expenses
                    profit += currentMonth.incomes - currentMonth.expenses

                })

                return {
                    incomes,
                    expenses,
                    profit
                }
            })
    }


    edit(data) {
        var userId = this.apiService.getUserId()
        let params = {
            query: {
                userId
            }
        }

        return this.objectivesService.create(data, params)
    }
}