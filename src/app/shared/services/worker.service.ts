import { InfoService } from './info.service';
import { userInfo } from 'os';
import { Injectable } from '@angular/core'

import { APIService } from './api/api.service'
const moment = require('moment-timezone')


@Injectable()
export class WorkerService {

    workersAbsenteeismInfo
    workerNames
    workersFlowInfo

    private workersService: any;


    constructor(private infoService: InfoService, private apiService: APIService) {
        this.workersService = this.apiService.getService('workers')
    }

    getInfo(type) {
        if (type === 'ABSENTEEISM' && this.workersAbsenteeismInfo) {
            return Promise.resolve(this.workersAbsenteeismInfo)
        }
        else if (type === 'FLOW' && this.workersFlowInfo) {
            return Promise.resolve(this.workersFlowInfo)
        }
        else {
            return this.infoService.getInfo('worker').
                then(info => {
                    this.workersAbsenteeismInfo = info.filter(currentInfo => {
                        return currentInfo.it !== 0 || currentInfo.absenteeism !== 0
                    })

                    this.workersFlowInfo = info.filter(currentInfo => {
                        return currentInfo.statusFlow === 'INCORPORATION' ||
                            currentInfo.statusFlow === 'DROP'
                    })

                    if (type === 'ABSENTEEISM') {
                        return this.workersAbsenteeismInfo
                    }
                    else if (type === 'FLOW') {
                        return this.workersFlowInfo
                    }
                })
        }
    }

    getWorkerNames() {
        if (this.workerNames) {
            return Promise.resolve(this.workerNames)
        }
        else {
            let userId = this.apiService.getUserId()

            let params = {
                query: {
                    userId
                },
            }
            return this.workersService.find(params).
                then(workersName => {
                    this.workerNames = workersName
                    return workersName
                })
        }
    }

    getMonthlyInfoByYearFromNow(amount, type) {
        var resultMonthlyInfoByYear = []
        var promises = []
        var date = moment().utc().startOf('year').subtract(1, 'months')
        Array.apply(null, { length: amount })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getMonthlyInfo(date.valueOf(), 12, type)
                    .then(currentMonthlyInfo => {
                        resultMonthlyInfoByYear[index] = currentMonthlyInfo.reverse()
                    })
                promises.push(promise)
                date.subtract(1, 'year')
            })
        return Promise.all(promises).then(_ => resultMonthlyInfoByYear)
    }

    getMonthlyInfo(startDate, amount, type) {
        var resultMonthlyInfo = []
        var promises = []
        var date = moment(startDate.valueOf()).utc()
        Array.apply(null, { length: amount })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getMonthInfo(date.valueOf(), type)
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

    getQuarterlyInfo(startDate, amount, type) {
        var resultQuarterlyInfo = []
        var promises = []
        var date = moment(startDate.valueOf()).utc()
        Array.apply(null, { length: amount })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getQuarterInfo(date.valueOf(), type)
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

    getBiannuallyInfo(startDate, amount, type) {
        var resultBiannualInfo = []
        var promises = []
        var date = moment(startDate.valueOf()).utc()
        Array.apply(null, { length: amount })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getBiannualInfo(date.valueOf(), type)
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

    getAnnuallyInfo(startDate, amount, type) {
        var resultAnnuallyInfo = []
        var promises = []
        var date = moment(startDate.valueOf())
        Array.apply(null, { length: amount })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getAnnualInfo(date.valueOf(), type)
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

    getMonthInfoByYear(startDate, amountYears, type) {
        var resultMonthByYearInfo = []
        var numberMonth = moment(startDate.valueOf()).utc().month()
        var date = moment().utc().startOf('year').add(numberMonth, 'months')

        var promises = []
        Array.apply(null, { length: amountYears })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getMonthInfo(date.valueOf(), type)
                    .then(currentMonthInfo => {
                        currentMonthInfo.year = moment(currentMonthInfo.startDate).get('year')
                        resultMonthByYearInfo[index] = currentMonthInfo
                    })

                promises.push(promise)
                date.subtract(1, 'year')
            })

        return Promise.all(promises).then(_ => resultMonthByYearInfo)
    }

    getQuarterInfoByYear(startDate, amountYears, type) {
        var resultQuarterByYearInfo = []
        var numberMonth = moment(startDate.valueOf()).utc().month()
        var date = moment().utc().startOf('year').add(numberMonth, 'months')

        var promises = []
        Array.apply(null, { length: amountYears })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getQuarterInfo(date.valueOf(), type)
                    .then(currentQuarterInfo => {
                        currentQuarterInfo.year = moment(currentQuarterInfo.startDate).get('year')
                        resultQuarterByYearInfo[index] = currentQuarterInfo
                    })

                promises.push(promise)
                date.subtract(1, 'year')
            })

        return Promise.all(promises).then(_ => resultQuarterByYearInfo)
    }

    getBiannualInfoByYear(startDate, amountYears, type) {
        var resultBiannualByYearInfo = []
        var numberMonth = moment(startDate.valueOf()).utc().month()
        var date = moment().utc().startOf('year').add(numberMonth, 'months')

        var promises = []
        Array.apply(null, { length: amountYears })
            .map(Number.call, Number)
            .forEach((_, index) => {
                var promise = this.getBiannualInfo(date.valueOf(), type)
                    .then(currentBiannualInfo => {
                        currentBiannualInfo.year = moment(currentBiannualInfo.startDate).get('year')
                        resultBiannualByYearInfo[index] = currentBiannualInfo
                    })

                promises.push(promise)
                date.subtract(1, 'year')
            })

        return Promise.all(promises).then(_ => resultBiannualByYearInfo)
    }

    getMonthInfo(startDate, type) {
        return this._getCustomInfo(startDate, 1, type)
    }

    getQuarterInfo(startDate, type) {
        return this._getCustomInfo(startDate, 3, type)
    }

    getBiannualInfo(startDate, type) {
        return this._getCustomInfo(startDate, 6, type)
    }

    getAnnualInfo(startDate, type) {
        return this._getCustomInfo(startDate, 12, type)
    }

    getAnnualInfoByWorker(startDate, type, searchName) {
        return this._getCustomInfoByWorker(startDate, 12, type, searchName)
    }

    _getCustomInfo(startDate, months, type, workerName?) {
        var resultInfo = {
            it: 0,
            abseenteism: 0,
            incorporations: 0,
            drops: 0,
            startDate: 0,
            year: 0
        }


        var date = moment(startDate).utc()
        return this.getInfo(type)
            .then(info => {
                Array.apply(null, { length: months })
                    .map(Number.call, Number)
                    .forEach(index => {
                        info.forEach(currentMonthInfo => {
                            if (!workerName || workerName === currentMonthInfo.workerName) {
                                if (moment(currentMonthInfo.startPeriod).utc().valueOf() === date.valueOf()) {
                                    if (type === 'ABSENTEEISM') {
                                        resultInfo.it += currentMonthInfo.it
                                        resultInfo.abseenteism += currentMonthInfo.absenteeism
                                    }
                                    else if (type === 'FLOW') {
                                        if (currentMonthInfo.statusFlow === 'INCORPORATION') {
                                            resultInfo.incorporations += 1
                                        }
                                        else if (currentMonthInfo.statusFlow === 'DROP') {
                                            resultInfo.drops += 1
                                        }
                                    }
                                }
                            }
                        });

                        if (index === 0) {
                            resultInfo.startDate = date.valueOf()
                            resultInfo.year = moment(date.valueOf()).utc().get('year')
                        }
                        date.add(1, 'month')
                    })

                return resultInfo
            })
    }

    _getCustomInfoByWorker(startDate, months, type, searchName) {
        var infoByWorker = []
        return this.getWorkerNames().
            then(workerNames => {
                if (searchName) {
                    var searchNameRegExp = new RegExp(searchName, 'g')
                    workerNames = workerNames.filter(currentWorkerName => {
                        return currentWorkerName.match(searchNameRegExp)
                    })
                }

                var promises = []
                workerNames.forEach((currentWorkerName, index) => {
                    var promise = this._getCustomInfo(startDate, months, type, currentWorkerName)
                        .then(resultInfo => {
                            infoByWorker.push({
                                resultInfo,
                                workerName: workerNames[index]
                            })
                        })
                    promises.push(promise)
                })

                return Promise.all(promises)
                    .then(_ => infoByWorker)

            })
    }
}