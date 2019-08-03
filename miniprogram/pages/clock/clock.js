// pages/clock/clock.js
const date = new Date()
const hours = []
const minutes = []
const seconds = []

for (let i = 0; i <= 23; i++) {
  hours.push(i)
}

for (let i = 0; i <= 59; i++) {
  minutes.push(i)
}

for (let i = 0; i <= 59; i++) {
  seconds.push(i)
}
Page({
  data: {
    defaultTime: 0,
    time: "",
    timer: null,
    status: 'start',
    hours: hours,
    hour: date.getHours(),
    minutes: minutes,
    minute: date.getMinutes(),
    seconds: seconds,
    second: date.getSeconds(),
    value: [date.getHours(), date.getMinutes(), date.getSeconds()],
    open: false,
  },
  onShow: function () {
    this.changeTime()
  },
  cancelTime(){
    clearInterval(this.data.timer)
    this.setData({
      status: 'start',
      defaultTime: 0,
      timer: null
    })
    this.changeTime()
  },
  continueTime(){
    if (this.data.defaultTime <= 0){
      this.setData({ status: 'start' })
    }else{
      this.setData({ status: 'stop' })
      this.data.timer = setInterval(() => {
        this.data.defaultTime -= 1
        this.changeTime()
        if (this.data.defaultTime === 0) {
          this.clearTime()
          return
        }
      }, 1000)
    }
  },
  clearTime(){
    this.setData({ status: 'start' })
    clearInterval(this.data.timer)
    this.data.timer = null
  },
  changeTime(){
    let h = Math.floor(this.data.defaultTime/3600)
    let m = Math.floor(this.data.defaultTime/60)
    let s = Math.floor(this.data.defaultTime % 60)
    if(s === 0){
      s = "00"
    }
    if (m === 60) {
      m = "00"
    }
    if (m > 60) {
      m = m % 60
    }
    if((s+"").length === 1){
      s = '0' + s
    }
    if ((m + "").length === 1) {
      m = '0' + m
    }
    if ((h + "").length === 1) {
      h = '0' + h
    }
    this.setData({ time: `${h}:${m}:${s}` }) 
  },
  changeHome(){
    wx.navigateTo({
      url: '../../pages/index/index',
    })
  },
  bindChange: function (event) {
    const val = event.detail.value
    this.setData({
      hour: this.data.hours[val[0]],
      minute: this.data.minutes[val[1]],
      second: this.data.seconds[val[2]]
    })
    let str = `${this.data.hour}:${this.data.minute}:${this.data.second}`
    let arr = str.split(':')
    let time = parseInt(arr[0]) * 3600 + parseInt(arr[1]) * 60 + parseInt(arr[2])
    this.data.defaultTime = time
    this.changeTime()
  },
  closeSelect() {
    this.setData({ open: false })
  },
  openSelect() {
    this.setData({ open: true })
  }
})