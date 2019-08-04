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
    selectTime: 0,
    defaultTime: 0,
    defaultDate: 0,
    countDown: 0,
    time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
    status: 'start',
    hours: hours,
    hour: date.getHours(),
    minutes: minutes,
    minute: date.getMinutes(),
    seconds: seconds,
    second: date.getSeconds(),
    value: [date.getHours(), date.getMinutes(), date.getSeconds()],
    opentime: false,
    visible: false,
    itemActive: '',
    list: [{ id: 1, text: 'qqqqqqq' }, { id: 2, text: 'wwwwww' }, { id: 3, text: 'eeeeeee' }]
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
    let date2 = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    let arr2 = date2.split(':')
    let time2 = parseInt(arr2[0]) * 3600 + parseInt(arr2[1]) * 60 + parseInt(arr2[2])
    let selectTime = time - time2
    this.data.defaultTime = time
    this.changeTime()
    this.setData({
      selectTime: selectTime,
      countDown: selectTime + this.data.defaultDate
    })
  },
  closeSelect() {
    this.setData({ opentime: false })
  },
  openSelectTime() {
    this.setData({ opentime: true })
  },
  bindDateChange: function (event) {
    let date1 = event.detail.value
    let date2 = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    let date1Str = date1.split("-");
    let date1Obj = new Date(date1Str[0], (date1Str[1] - 1), date1Str[2]);
    let date2Str = date2.split("-");
    let date2Obj = new Date(date2Str[0], (date2Str[1] - 1), date2Str[2]);
    let t1 = date1Obj.getTime();
    let t2 = date2Obj.getTime();
    let s = Math.floor(((t2 - t1) / 1000));
    let defaultDate = Math.abs(s);
    this.setData({
      date: event.detail.value,
      defaultDate: defaultDate,
      countDown: defaultDate + this.data.selectTime
    })
    console.log(this.data.countDown)
  },
  changeDate(value){
    let time = value
    if (time === 0) { return '时间到' }
    else if (time < 60) { return '1分钟内' }
    else if (time / 60 < 60) { return parseInt(time / 60) + '分钟后' }
    else if (time / 3600 < 24) { return parseInt(time / 3600) + '小时后' }
    else if (time / 86400 < 31) { return parseInt(time / 86400) + '天后' }
    else if (time / 2592000 < 12) { return parseInt(time / 2592000) + '月后' }
    else { return parseInt(time / 31536000) + '年后' }
  },
  openMission(){
    if (this.data.countDown !== 0){
      this.setData({ visible: true })
    }
  },
  cancel(){
    this.setData({ visible: false })
  },
  sure(event){
    let id = this.creatMission(event)
    let obj = this.findMission(id)
    obj.clock = setInterval(()=> {
      obj.countDown -=1
      let lastTime = this.changeDate(obj.countDown)
      this.setData({ list: this.data.list })
      if(lastTime !== obj.lasttime){
        obj.lasttime = lastTime
      }
      if(obj.countDown === 0){
        clearInterval(obj.clock)
        obj.clock = null
        this.setData({ list: this.data.list })
      }
    },1000)
    
  },
  creatMission(event){
    let id = parseInt(Math.random() * 10000)
    let text = event.detail
    let countdown = this.data.countDown
    let lasttime = this.changeDate(countdown)
    let arr = [{ id: id, text: text, countDown: countdown, lasttime: lasttime, clock: null }]
    let list = arr.concat(this.data.list)
    this.setData({ list: list, lastTime: lasttime })
    this.setData({ visible: false })
    return id
  },
  findMission(id){
    let index = this.data.list.findIndex((el) => { return el.di = id })
    let obj = this.data.list[index]
    return obj
  },
  activeItem(event){
    let id = event.currentTarget.dataset.itemid
    this.setData({ itemActive: id })
  },
  deleteClock(){
    
  }
});
