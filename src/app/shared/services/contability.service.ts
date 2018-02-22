import { InfoService } from './info.service';
import { userInfo } from 'os';
import { Injectable } from '@angular/core'

import { APIService } from './api/api.service'
const moment = require('moment-timezone')


@Injectable()
export class ContabilityService {

    constructor(private infoService: InfoService) {
    }

    getInfo() {
        return this.infoService.getInfo('contability')
    }

    getMonthlyInfoByYearFromNow(amount) {
        var resultMonthlyInfoByYear = []
        var promises = []
        var date = moment().utc().startOf('year').subtract(1, 'months')
        Array.apply(null, { length: amount })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getMonthlyInfo(date.valueOf(), 12)
                    .then(currentMonthlyInfo => {
                        resultMonthlyInfoByYear[index] = currentMonthlyInfo.reverse()
                    })
                promises.push(promise)
                date.subtract(1, 'year')
            })
        return Promise.all(promises).then(_ => resultMonthlyInfoByYear)
    }

    getMonthlyInfo(startDate, amount) {
        var resultMonthlyInfo = []
        var promises = []
        var date = moment(startDate.valueOf()).utc()
        Array.apply(null, { length: amount })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getMonthInfo(date.valueOf())
                    .then(currentMonthInfo => {
                        currentMonthInfo.period = moment(currentMonthInfo.startDate).utc().get('month') + 1
                        currentMonthInfo.year = moment(currentMonthInfo.startDate).utc().get('year')
                        resultMonthlyInfo[index] = currentMonthInfo
                    })
                promises.push(promise)
                date.subtract(1, 'month')
            })
        return Promise.all(promises).then(_ => {
            return resultMonthlyInfo
        })
    }

    getQuarterlyInfo(startDate, amount) {
        var resultQuarterlyInfo = []
        var promises = []
        var date = moment(startDate.valueOf()).utc()
        Array.apply(null, { length: amount })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getQuarterInfo(date.valueOf())
                    .then(currentQuarterInfo => {
                        currentQuarterInfo.period = moment(currentQuarterInfo.startDate).utc().get('quarter')
                        currentQuarterInfo.year = moment(currentQuarterInfo.startDate).utc().get('year')
                        resultQuarterlyInfo[index] = currentQuarterInfo
                    })
                promises.push(promise)
                date.subtract(3, 'month')
            })
        return Promise.all(promises).then(_ => resultQuarterlyInfo)
    }

    getBiannuallyInfo(startDate, amount) {
        var resultBiannualInfo = []
        var promises = []
        var date = moment(startDate.valueOf()).utc()
        Array.apply(null, { length: amount })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getBiannualInfo(date.valueOf())
                    .then(currentBiannualInfo => {
                        currentBiannualInfo.period = moment(currentBiannualInfo.startDate).utc().get('month') > 5 ? 2 : 1
                        currentBiannualInfo.year = moment(currentBiannualInfo.startDate).utc().get('year')
                        resultBiannualInfo[index] = currentBiannualInfo
                    })
                promises.push(promise)
                date.subtract(6, 'month')
            })
        return Promise.all(promises).then(_ => resultBiannualInfo)
    }

    getAnnuallyInfo(startDate, amount) {
        var resultAnnuallyInfo = []
        var promises = []
        var date = moment(startDate.valueOf())
        Array.apply(null, { length: amount })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getAnnualInfo(date.valueOf())
                    .then(info => {
                        info.year = moment(info.startDate).get('year')
                        info.period = '' + info.year
                        info.period = info.period.substring(2)
                        resultAnnuallyInfo[index] = info
                    })
                promises.push(promise)
                date.subtract(1, 'years')
            })

        return Promise.all(promises).then(_ => resultAnnuallyInfo)
    }

    getMonthInfoByYear(startDate, amountYears) {
        var resultMonthByYearInfo = []
        var numberMonth = moment(startDate.valueOf()).utc().month()
        var date = moment().utc().startOf('year').add(numberMonth, 'months')

        var promises = []
        Array.apply(null, { length: amountYears })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getMonthInfo(date.valueOf())
                    .then(currentMonthInfo => {
                        currentMonthInfo.year = moment(currentMonthInfo.startDate).get('year')
                        resultMonthByYearInfo[index] = currentMonthInfo
                    })

                promises.push(promise)
                date.subtract(1, 'year')
            })

        return Promise.all(promises).then(_ => resultMonthByYearInfo)
    }

    getQuarterInfoByYear(startDate, amountYears) {
        var resultQuarterByYearInfo = []
        var numberMonth = moment(startDate.valueOf()).utc().month()
        var date = moment().utc().startOf('year').add(numberMonth, 'months')

        var promises = []
        Array.apply(null, { length: amountYears })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getQuarterInfo(date.valueOf())
                    .then(currentQuarterInfo => {
                        currentQuarterInfo.year = moment(currentQuarterInfo.startDate).get('year')
                        resultQuarterByYearInfo[index] = currentQuarterInfo
                    })

                promises.push(promise)
                date.subtract(1, 'year')
            })

        return Promise.all(promises).then(_ => resultQuarterByYearInfo)
    }

    getBiannualInfoByYear(startDate, amountYears) {
        var resultBiannualByYearInfo = []
        var numberMonth = moment(startDate.valueOf()).utc().month()
        var date = moment().utc().startOf('year').add(numberMonth, 'months')

        var promises = []
        Array.apply(null, { length: amountYears })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getBiannualInfo(date.valueOf())
                    .then(currentBiannualInfo => {
                        currentBiannualInfo.year = moment(currentBiannualInfo.startDate).get('year')
                        resultBiannualByYearInfo[index] = currentBiannualInfo
                    })

                promises.push(promise)
                date.subtract(1, 'year')
            })

        return Promise.all(promises).then(_ => resultBiannualByYearInfo)
    }

    getMonthInfo(startDate) {
        return this._getCustomInfo(startDate, 1)
    }

    getQuarterInfo(startDate) {
        return this._getCustomInfo(startDate, 3)
    }

    getBiannualInfo(startDate) {
        return this._getCustomInfo(startDate, 6)
    }

    getAnnualInfo(startDate) {
        return this._getCustomInfo(startDate, 12)
    }

    _getCustomInfo(startDate, months) {
        var resultInfo = {
            incomes: 0,
            expenses: 0,
            startDate: 0,
            year: 0,
            irpf: 0,
            ss: 0,
            iva: 0,
            sociedades: 0,
            salarios: 0,
            nominas: 0
        }


        var date = moment(startDate).utc()
        return this.getInfo()
            .then(info => {
                Array.apply(null, { length: months })
                    .map(Number.call, Number)
                    .forEach(index => {
                        var currentInfo = info.find(currentMonthInfo => {
                            return moment(currentMonthInfo.startPeriod).utc().valueOf() === date.valueOf()
                        });
                        resultInfo.incomes += currentInfo ? currentInfo.incomes : 0
                        resultInfo.expenses += currentInfo ? currentInfo.expenses : 0
                        resultInfo.irpf += currentInfo ? currentInfo.irpf : 0
                        resultInfo.ss += currentInfo ? currentInfo.ss : 0
                        resultInfo.iva += currentInfo ? currentInfo.iva : 0
                        resultInfo.sociedades += currentInfo ? currentInfo.sociedades : 0
                        resultInfo.salarios += currentInfo ? currentInfo.salary : 0
                        resultInfo.nominas += currentInfo ? currentInfo.paysheetAmount : 0
                        if (index === 0) {
                            resultInfo.startDate = date.valueOf()
                            resultInfo.year = moment(date.valueOf()).utc().get('year')
                        }

                        date.add(1, 'month')
                    })

                return resultInfo
            })
    }
}