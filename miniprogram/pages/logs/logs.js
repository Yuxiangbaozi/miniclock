"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../lib/util");
Page({
    data: {
        logs: []
    },
    onLoad: function () {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(function (log) {
                return util_1.formatTime(new Date(log));
            })
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx1Q0FBMkM7QUFFM0MsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLEVBQWM7S0FDckI7SUFDRCxNQUFNO1FBQ0osSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNaLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBVztnQkFDdEQsT0FBTyxpQkFBVSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDbEMsQ0FBQyxDQUFDO1NBQ0gsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vbG9ncy5qc1xuaW1wb3J0IHsgZm9ybWF0VGltZSB9IGZyb20gJy4uLy4uL2xpYi91dGlsJ1xuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGxvZ3M6IFtdIGFzIHN0cmluZ1tdXG4gIH0sXG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLnNldERhdGEhKHtcbiAgICAgIGxvZ3M6ICh3eC5nZXRTdG9yYWdlU3luYygnbG9ncycpIHx8IFtdKS5tYXAoKGxvZzogbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lKG5ldyBEYXRlKGxvZykpXG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG59KVxuIl19