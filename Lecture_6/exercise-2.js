const counter = {
  count: 0,
  increase () {
    this.count = this.count + 1
    return this
  },
  decrease () {
    this.count = this.count - 1
    return this
  },
  getCount () {
    return this.count
  }
}

console.log(counter.increase().increase().increase().decrease().getCount())
