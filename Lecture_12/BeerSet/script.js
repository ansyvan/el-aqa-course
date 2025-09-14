document.addEventListener('DOMContentLoaded', function () {
  const navItems = document.querySelectorAll('.main-nav li')
  const dropdowns = document.querySelectorAll('.has-dropdown')

  navItems.forEach(item => {
    item.addEventListener('click', function (event) {
      event.preventDefault()

      const currentActive = document.querySelector('.main-nav .active')
      if (currentActive) {
        currentActive.classList.remove('active')
      }

      this.classList.add('active')
    })
  })

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function (event) {
      event.preventDefault()
      event.stopPropagation()

      const currentOpenDropdown = document.querySelector('.has-dropdown.active')
      if (currentOpenDropdown && currentOpenDropdown !== this) {
        currentOpenDropdown.classList.remove('active')
      }

      this.classList.toggle('active')
    })
  })

  document.addEventListener('click', function () {
    const openDropdown = document.querySelector('.has-dropdown.active')
    if (openDropdown) {
      openDropdown.classList.remove('active')
    }
  })
})
