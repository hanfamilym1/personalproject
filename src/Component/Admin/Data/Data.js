import React, { Component } from 'react'
import { Bar, Bubble, Line } from 'react-chartjs-2'
import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
import {Link } from 'react-router-dom'

export default class Data extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                labels: ['8/13', '8/14', '8/15', '8/16', '8/17', '8/18', '8/19'],
                datasets: [{
                    label: 'Michael Han',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                }, {
                    label: 'Ken Benioni',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(229, 252, 136, 1)',
                    borderColor: 'rgba(229, 252, 136, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(229, 252, 136, 1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(229, 252, 136, 1)',
                    pointHoverBorderColor: 'rgba(229, 252, 136, 1))',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [1, 1, 1, 1, 1, 1, 1]
                },
                {
                    label: 'Kenny Crump',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(249, 102, 102, 1)',
                    borderColor: 'rgba(249, 102, 102, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(249, 102, 102, 1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(249, 102, 102, 1)',
                    pointHoverBorderColor: 'rgba(249, 102, 102, 1))',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [2, 2, 2, 2, 2, 2, 2]
                },
                {
                    label: 'Randall Farnworth',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(171, 102, 249, 1)',
                    borderColor: 'rgba(171, 102, 249, 1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(171, 102, 249, 1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(171, 102, 249, 1)',
                    pointHoverBorderColor: 'rgba(171, 102, 249, 1))',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [3, 3, 3, 3, 3, 3, 3]
                }],
                reqStatus: null
            },
            week: '',
            fulldata: [],
            michael: [[0, 0, 0, 0, 0, 0, 0],[1,2,4,1,5,0,0],[1,3,3,3,6,1,2]],
            ken: [],
            kenny: [],
            randall: [],
            ryan: []
        }
    }


    async componentDidMount() {
        let newdata = await axios.get('/api/admin/times').then(res => this.setState({
            fulldata: res.data
        }))
        this.mapKen()
        this.mapKenny()
        this.mapRandall()
    }

    mapKen() {
        let ken = this.state.fulldata.map((e,i)=>{
            if (e.name === 'Ken Benioni'){
                let {name, time} = e
                return name, time
            }
        }).filter(e=>e)
        console.log(ken)
        let newken = []
        for(var i=0;i < ken.length; i++){
            newken.push(
                Number(moment.duration(moment(ken[i+1]).diff(moment(ken[i]))).format('hh')))
        }
        let newken1 = newken.filter(e => e <= 10)
        let newken2 = _.chunk(newken1, 7)
        this.setState({
            ken: newken2
        })
        console.log(newken2)
        console.log(newken1)
    }
    mapKenny() {
        let kenny = this.state.fulldata.map((e,i)=>{
            if (e.name === 'Kenny Crump'){
                let {name, time} = e
                return name, time
            }
        }).filter(e=>e)
        let newkenny = []
        for(var i=0;i < kenny.length; i++){
            newkenny.push(
                Number(moment.duration(moment(kenny[i+1]).diff(moment(kenny[i]))).format('hh')))
        }
        let newkenny1 = newkenny.filter(e => e <= 10)
        let newkenny2 = _.chunk(newkenny1, 7)
        this.setState({
            kenny: newkenny2
        })
        console.log(newkenny2)
        // console.log(newkenny1)
    }
    mapRandall() {
        let randall = this.state.fulldata.map((e,i)=>{
            if (e.name === 'Randall Farnworth'){
                let {name, time} = e
                return name, time
            }
        }).filter(e=>e)
        let newRandall = []
        for(var i=0;i < randall.length; i++){
            newRandall.push(
                Number(moment.duration(moment(randall[i+1]).diff(moment(randall[i]))).format('hh')))
        }
        let newRandall1 = newRandall.filter(e => e <= 10)
        let newRandall2 = _.chunk(newRandall1, 7)
        this.setState({
            randall: newRandall2
        })
        // console.log(newkenny2)
        // console.log(newkenny1)
    }

    getWeek(val) {
        console.log(val)
        this.setState({
            week: val
        })
    }

    updateWeek() {
        //During this stage, this will probably also change the data around as well.
        if (this.state.week === 'Week1') {
            this.state.data.labels = ['8/13', '8/14', '8/15', '8/16', '8/17', '8/18', '8/19']
            let sliceMichael = this.state.michael[0].slice()
            let sliceKen = this.state.ken[0].slice()
            let sliceKenny = this.state.kenny[0].slice()
            let sliceRandall = this.state.randall[0].slice()
            this.state.data.datasets[0].data = sliceMichael
            this.state.data.datasets[1].data = sliceKen
            this.state.data.datasets[2].data = sliceKenny
            this.state.data.datasets[3].data = sliceRandall
        } else if (this.state.week === 'Week2') {
            this.state.data.labels = ['8/20', '8/21', '8/22', '8/23', '8/24', '8/25', '8/26']
            let sliceMichael1 = this.state.michael[1].slice()
            let sliceKen1 = this.state.ken[1].slice()
            let sliceKenny1 = this.state.kenny[1].slice()
            let sliceRandall1 = this.state.randall[1].slice()
            this.state.data.datasets[0].data = sliceMichael1
            this.state.data.datasets[1].data = sliceKen1
            this.state.data.datasets[2].data = sliceKenny1
            this.state.data.datasets[3].data = sliceRandall1
        } else if (this.state.week === 'Week3') {
            this.state.data.labels = ['8/27', '8/28', '8/29', '8/30', '8/31', '9/01', '9/02']
            let sliceMichael2 = this.state.michael[2].slice()
            let sliceKen2 = this.state.ken[2].slice()
            let sliceKenny2 = this.state.kenny[2].slice()
            let sliceRandall2 = this.state.randall[2].slice()
            this.state.data.datasets[0].data = sliceMichael2
            this.state.data.datasets[1].data = sliceKen2
            this.state.data.datasets[2].data = sliceKenny2
            this.state.data.datasets[3].data = sliceRandall2
        } else {
            return null
        }
    }

    render() {
        console.log(this.state.ken)
        console.log(this.state.randall)
        console.log(this.state.michael)
        // let a = moment('2018-08-13 17:05:26.347375')
        // let b = moment('2018-08-13 20:05:26.123456')
        // let c = b.diff(a)
        // console.log(c)
        // let d = moment.duration(c).format('hh')
        // let e = Number(d)

        // console.log(e)
        // let ken = this.state.fulldata.map((e,i)=>{
        //     if (e.name === 'Ken Benioni'){
        //         let {name, time} = e
        //         return name, time
        //     }
        // }).filter(e=>e)
        
        // let newken = []
        // for(var i=0;i < ken.length; i++){
        //     newken.push(
        //         moment.duration(moment(ken[i+1]).diff(moment(ken[i]))).format('hh'))
        // }
        // console.log(newken)
        // let a = moment(ken[5])
        // let b = moment(ken[4])
        // let c = a.diff(b)
        // let d = moment.duration(c).format('hh')
        // let e = Number(d)
        // console.log(e)
        // console.log(this.state.fulldata)
        // console.log(ken)

        return (
            <div>
                <h2>Cohort 41</h2>
                <Link to='/admin'><button>Go Back</button></Link>
                <Line data={this.state.data} />
                <select name="" id="" onClick={this.updateWeek()} onChange={(e) => { this.getWeek(e.target.value) }}>
                    <option value="Week1">Week 1</option>
                    <option value="Week2">Week 2</option>
                    <option value="Week3">Week 3</option>
                </select>
                {/* <button onClick={this.updateWeek()}>Change Week</button> */}
            </div>
        )
    }
}