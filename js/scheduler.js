// * * * * * *
// ┬ ┬ ┬ ┬ ┬ ┬ 
// │ │ │ │ │ | 
// │ │ │ │ │ └ 주중반복시기 (0 - 7) (0 or 7 일요일) 
// │ │ │ │ └───── 달 (1 - 12) 
// │ │ │ └────────── 일 (1 - 31) 
// │ │ └─────────────── 시 (0 - 23) 
// │ └──────────────────── 분 (0 - 59) 
// └───────────────────────── 초 (0 - 59, OPTIONAL)
const cron = require('node-cron');
const dailySubjectController = require('../controllers/dailySubject.controllers');
const dayjs = require('dayjs')
const timezone = require('dayjs/plugin/timezone')
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs().tz("Asia/Seoul")

const EVERY_DAY_MIDNIGHT = '00 00 00 * * *'
const EVERY_MINITES = '00 * * * * *'
const EVERY_SECONDS = '* * * * * *'

cron.schedule(EVERY_DAY_MIDNIGHT, dailySubjectController.choiceDailySubject)

