import moment from 'moment'

function isDifferenceOver10Days (date) {
  const currentDate = moment.utc()
  const dateToCompare = moment.utc(date)
  const differenceInDays = currentDate.diff(dateToCompare, 'days')

return differenceInDays > 10
}

function substract8Hours (date) {
  return moment.utc(date).subtract(8, 'hours')
}

function printCurrentDate (result) {
  console.log(`The current UTC date is: ${result}`)
}

function printSubstractedDate (result) {
  console.log(`8 hours were substracted: ${result}`)
}

function formatDate (date) {
  return moment.utc(date).format('DD-MM-YYYY HH:mm:ss')
}

function compareWithCurrent (date) {
  const currentDate = moment.utc()

  if (isDifferenceOver10Days(date)) {
    printCurrentDate(formatDate(currentDate))
  } else {
    const dateMinus8Hours = substract8Hours(date)
    printSubstractedDate(formatDate(dateMinus8Hours))
  }
}

compareWithCurrent(new Date('2025-07-10T00:00'))
compareWithCurrent(new Date('2025-08-10T11:00'))
