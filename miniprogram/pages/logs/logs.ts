//logs.js
import { formatTime } from '../../lib/util'

Page({
  data: {
    logs: [] as string[]
  },
  onLoad() {
    this.setData!({
      logs: (wx.getStorageSync('logs') || []).map((log: number) => {
        return formatTime(new Date(log))
      })
    })
  },
})
