
/*
* 日期转字符串
* now 为时间
* flag 为格式
*   1: YYYY-MM-DD
*   2: HH:mm
*   3: YYYY-MM-DD HH:mm
*   4: YYYY-MM-DD HH:mm:ss
* */
export function dateToStr(now, flag) {
  if (!now) return ''
  if (typeof now === 'string') return now
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var hour = now.getHours()
  var min = now.getMinutes()
  var sec = now.getSeconds()
  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (min < 10) {
    min = '0' + min
  }
  if (sec < 10) {
    sec = '0' + sec
  }
  if (flag === 1) {
    return year + '-' + month + '-' + date
  } else if (flag === 2) {
    return hour + ':' + min
  } else if (flag === 3) {
    return year + '-' + month + '-' + date + ' ' + hour + ':' + min
  } else if (flag === 4) {
    return year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec
  } else if (flag === 5) {
    return month + '-' + date
  }
}

// 获取当前时间 时分秒
export function getCurTime () {
  const date = new Date()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  hours = hours.toString().length > 1 ? hours : '0' + hours
  minutes = minutes.toString().length > 1 ? minutes : '0' + minutes
  seconds = seconds.toString().length > 1 ? seconds : '0' + seconds
  return {
    hours,
    minutes,
    seconds
  }
}

// 获取当前日期 年月日
export function getCurDate() {
  const date = new Date()

  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month.toString().length > 1 ? month : '0' + month
  day = day.toString().length > 1 ? day : '0' + day
  return {
    year,
    month,
    day
  }
}

// 获取当前周 周几
const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
export function getCurWeek() {
  const date = new Date()
  const week = weeks[date.getDay()]
  return {
    week
  }
}

// 获取当前时间 年月日 时分秒 周几
export function getCurDateTimeWeek() {
  const date = this.getCurDate()
  const time = this.getCurTime()
  const week = this.getCurWeek()
  return (
    date.year +
    '-' +
    date.month +
    '-' +
    date.day +
    ' ' +
    time.hours +
    ':' +
    time.minutes +
    ':' +
    time.seconds +
    ' ' +
    week.week
  )
}

// 用选中的时间获取周一和周日的函数(含时分秒)=>返回一个包含起止时间的数组
export function getWeekList(val) {
  if (!val) { return [] }
  const num = new Date(val).getDay()
  const newNum = num || 7
  const begin = new Date(val).getTime() - (newNum - 1) * 24 * 60 * 60 * 1000
  const end = new Date(val).getTime() + (7 - newNum) * 24 * 60 * 60 * 1000
  const startTime = dateToStr(new Date(begin), 1) + ' 00:00:00'
  const endTime = dateToStr(new Date(end), 1) + ' 23:59:59'
  return [startTime, endTime]
}

// 用选中的时间获取月初和月末的函数(含时分秒)=>返回一个包含起止时间的数组
export function getMonthList(val) {
  const date = val.split('-')
  const month = date[1]
  const year = parseInt(date[0])
  switch (month) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      return [val + '-01 00:00:00', val + '-31 23:59:59']
    case '04':
    case '06':
    case '09':
    case '11':
      return [val + '-01 00:00:00', val + '-30 23:59:59']
    case '02':
      return [
        val + '-01 00:00:00',
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
          ? val + '-29 23:59:59'
          : val + '-28 23:59:59'
      ]
    default:
      return 0
  }
}

// 用选中的时间获取季度第一天和季度最后一天的函数(含时分秒)=>返回一个包含起止时间的数组
export function getSeasonList(val) {
  if (!val) { return [] }
  var yearSeason = Array.isArray(val) ? val : val.split('-')
  switch (yearSeason[1]) {
    case '1':
      return [`${yearSeason[0]}-01-01 00:00:00`, `${yearSeason[0]}-03-31 23:59:59`]
    case '2':
      return [`${yearSeason[0]}-04-01 00:00:00`, `${yearSeason[0]}-06-30 23:59:59`]
    case '3':
      return [`${yearSeason[0]}-07-01 00:00:00`, `${yearSeason[0]}-09-30 23:59:59`]
    case '4':
      return [`${yearSeason[0]}-10-01 00:00:00`, `${yearSeason[0]}-12-31 23:59:59`]
  }
}

// 用选中的时间，来求的是这一年的第几周
export function getWeekNum(val) {
  let y, m, d
  if (!val) return
  if (Array.isArray(val)) { // 如果传过来的是[y,m,d]形式的数组
    y = val[0]
    m = val[1]
    d = val[2]
  } else { // 如果传过来的是'y-m-d'形式的字符串
    const arr = val.split('-')
    y = arr[0]
    m = arr[1]
    d = arr[2]
  }
  const day1 = new Date(y, parseInt(m) - 1, d)
  const day2 = new Date(y, 0, 1)
  const day = Math.round((day1.valueOf() - day2.valueOf()) / 86400000) // valueOf()返回string对象的原始值
  const week = Math.ceil((day + day2.getDay()) / 7)
  return day2.getDay() > 4 ? week - 1 : week // 如果是第一周是少于4天，则被算入头一年的最后一周，当前周-1
}
