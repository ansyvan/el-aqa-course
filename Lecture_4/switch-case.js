function browserCheck (browser) {
  switch (browser) {
    case 'Edge':
      console.log("You've got the Edge!")
      break
    case 'Chrome':
    case 'Firefox':
    case 'Safari':
    case 'Opera':
      console.log('Okay we support these browsers too')
      break
    default:
      console.log('We hope that this page looks ok!')
  }
}

const browsers = ['Edge', 'Chrome', 'Firefox', 'Safari', 'Opera', 'BlaBlaBla']
const myBrowser = browsers[Math.floor(Math.random() * browsers.length)]

browserCheck(myBrowser)
