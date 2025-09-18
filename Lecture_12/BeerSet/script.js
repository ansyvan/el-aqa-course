document.addEventListener('DOMContentLoaded', function () {
  const navItems = document.querySelectorAll('.main-nav li')
  const dropdowns = document.querySelectorAll('.has-dropdown')

  navItems.forEach(item => {
    item.addEventListener('click', function (event) {
      event.preventDefault()

      const currentActive = document.querySelector('.main-nav .active')
      if (currentActive && currentActive !== this) {
        currentActive.classList.remove('active')
      }

      this.classList.add('active')
    })
  })

  dropdowns.forEach(dropdown => {
    const dropdownArrow = dropdown.querySelector('.dropdown-arrow-svg')
    const dropdownMenu = dropdown.querySelector('.dropdown-menu')

    if (dropdownArrow && dropdownMenu) {
      dropdownArrow.addEventListener('click', function (event) {
        event.preventDefault()
        event.stopPropagation()

        const currentOpenDropdown = document.querySelector('.dropdown-menu.active')
        if (currentOpenDropdown && currentOpenDropdown !== dropdownArrow) {
          currentOpenDropdown.classList.remove('active')
        }

        dropdownMenu.classList.toggle('active')
      })
    }
  })

  document.addEventListener('click', function (event) {
    const openDropdown = document.querySelector('.main-nav li.has-dropdown.active')
    if (openDropdown && !openDropdown.contains(event.target)) {
      openDropdown.classList.remove('active')
    }
  })
})
