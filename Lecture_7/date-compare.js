function isDifferenceOver10Days (date, currentDate) {
  const difference = currentDate - date
  const differenceInDays = difference / (24 * 60 * 60 * 1000)

  if (differenceInDays > 10) {
    return true
  } else {
    return false
  }
}

function substract8Hours (date) {
  return date.getTime() - 8 * 60 * 60 * 1000
}

function printCurrentDate (result) {
  console.log(`The current UTC date is: ${result}`)
}

function printSubstractedDate (result) {
  console.log(`8 hours were substracted: ${result}`)
}

// DD-MM-YYYY HH:MM:SS (05-02-2021 15:56:00)
function convertDate (milliseconds) {
  const date = new Date(milliseconds)
  const day = `${date.getUTCDate()}`.padStart(2, '0')
  const month = `${(date.getUTCMonth() + 1)}`.padStart(2, '0')
  const year = date.getUTCFullYear()
  const hours = `${date.getUTCHours()}`.padStart(2, '0')
  const minutes = `${date.getUTCMinutes()}`.padStart(2, '0')
  const seconds = `${date.getUTCSeconds()}`.padStart(2, '0')
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}

function compareWithCurrent (date) {
  const currentDateInMiliseconds = Date.now()
  const dateInMilliseconds = date.getTime()

  if (isDifferenceOver10Days(dateInMilliseconds, currentDateInMiliseconds)) {
    const result = convertDate(currentDateInMiliseconds)
    printCurrentDate(result)
  } else {
    const dateMinus8Hours = substract8Hours(date)
    const result = convertDate(dateMinus8Hours)
    printSubstractedDate(result)
  }
}

compareWithCurrent(new Date('2025-07-03T00:00'))
compareWithCurrent(new Date('2025-08-10T11:00'))
