const date = new Date()
const hours = []
const minutes = []
const seconds = []
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()

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
    date: '2018-08-03',
    now: `${year}-${month}-${day}`,
    defaultTime: 0,
    defaultDate: 0,
    countDown: 0,
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
    opentime: false,
  },
  onShow: function () {
    this.changeTime()
  },
  changeTime() {
    let h = Math.floor(this.data.defaultTime / 3600)
    let m = Math.floor(this.data.defaultTime / 60)
    let s = Math.floor(this.data.defaultTime % 60)
    if (s === 0) {
      s = "00"
    }
    if (m === 60) {
      m = "00"
    }
    if (m > 60) {
      m = m % 60
    }
    if ((s + "").length === 1) {
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
    this.setData({ countDown: time + this.data.defaultDate})
  },
  closeSelect() {
    this.setData({ opentime: false })
  },
  openSelectTime() {
    this.setData({ opentime: true })
  },
  bindDateChange: function (event) {
    console.log('picker发送选择改变，携带值为', event.detail.value)
    this.setData({
      date: event.detail.value
    })
  },
  changeDate(){
    let time = this.data.countDown
    if (time < 60) { return '1分钟内' }
    else if (time / 60 < 60) { return parseInt(time / 60) + '分钟后' }
    else if (time / 3600 < 24) { return parseInt(time / 3600) + '小时后' }
    else if (time / 86400 < 31) { return parseInt(time / 86400) + '天后' }
    else if (time / 2592000 < 12) { return parseInt(time / 2592000) + '月后' }
    else { return parseInt(time / 31536000) + '年后' }
  }
});
