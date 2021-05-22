;(function () {
  let isCollapsed = false

  function onScroll() {
    console.log('scroll')
    const header = document.querySelector('.header')
    const wrapper = document.querySelector('.header-wrapper')
    if (!header) return
    if (window.scrollY > 50 && !isCollapsed) {
      header.classList.add('header_collapsed')
      wrapper.classList.add('header-wrapper_collapsed')
      isCollapsed = true
    } else if (window.scrollY < 50 && isCollapsed) {
      header.classList.remove('header_collapsed')
      wrapper.classList.remove('header-wrapper_collapsed')
      isCollapsed = false
    }
  }

  function onNavigationClick(event) {
    event.preventDefault()
    const target = event.target
    const className = target.getAttribute('data-scrollto')
    const block = document.querySelector('.' + className)
    if (!block) return

    window.scrollTo({
      top: block.getBoundingClientRect().top + window.scrollY,
      behavior: 'smooth',
    })
  }

  function addNavigationBehaviour() {
    const links = Array.from(document.querySelectorAll('.navigation__item'))
    links.forEach((item) => item.addEventListener('click', onNavigationClick))
  }

  let currentPlanIndex = 0
  function getPlans() {
    return Array.from(document.querySelectorAll('.plans__card'))
  }

  function applyPlanStyles() {
    const plans = getPlans()
    if (plans.length == 0) return

    const scrollSize = plans[0].getBoundingClientRect().width * 3 + 100 - window.innerWidth
    const offset = (scrollSize * currentPlanIndex) / 2
    for (const plan of plans) {
      plan.style.transform = `translateX(${-offset}px)`
      plan.style.transition = 'transform 0.3s'
    }
  }

  function removePlanStyles() {
    const plans = getPlans()
    for (const plan of plans) {
      plan.style.transform = ''
      plan.style.transition = ''
    }
  }

  function onPlanClick(index) {
    if (window.innerWidth > 840) return
    currentPlanIndex = index
    applyPlanStyles()
  }

  function addPlanSelectionBehaviour() {
    const plans = getPlans()
    plans.forEach((item, index) => item.addEventListener('click', () => onPlanClick(index)))
    window.addEventListener('resize', () => {
      if (window.innerWidth > 840) removePlanStyles()
      else applyPlanStyles()
    })
  }

  let currentTestimonial = 0
  function getTestimonials() {
    return Array.from(document.querySelectorAll('.customers__card'))
  }

  function getTestimonialMarks() {
    return Array.from(document.querySelectorAll('.pagination__dot'))
  }

  function applyTestimonialStyles() {
    const testimonials = getTestimonials()
    const marks = getTestimonialMarks()
    if (testimonials.length == 0 || marks.length == 0) return

    const testimonialWidth = testimonials[0].getBoundingClientRect().width
    const offset = -(testimonialWidth + 54) * currentTestimonial

    marks.forEach((item, index) => {
      if (item.classList.contains('pagination__dot_selected') && index != currentTestimonial)
        item.classList.remove('pagination__dot_selected')
      if (!item.classList.contains('pagination__dot_selected') && index == currentTestimonial)
        item.classList.add('pagination__dot_selected')
    })

    testimonials.forEach((item) => {
      item.style.transform = `translateX(${offset}px)`
      item.style.transition = 'transform 0.3s'
    })
  }

  function onTestimonialClick(index) {
    currentTestimonial = index
    applyTestimonialStyles()
  }

  function addTestimonialBehaviour() {
    const testimonials = getTestimonials()
    const marks = getTestimonialMarks()
    testimonials.forEach((item, index) => item.addEventListener('click', () => onTestimonialClick(index)))
    marks.forEach((item, index) => item.addEventListener('click', () => onTestimonialClick(index)))
    window.addEventListener('resize', () => {
      applyTestimonialStyles()
    })

    document.querySelector('.pagination__left')?.addEventListener('click', () => {
      if (currentTestimonial > 0) currentTestimonial--
      applyTestimonialStyles()
    })
    document.querySelector('.pagination__right')?.addEventListener('click', () => {
      if (currentTestimonial < testimonials.length - 1) currentTestimonial++
      applyTestimonialStyles()
    })
  }

  addTestimonialBehaviour()
  addNavigationBehaviour()
  addPlanSelectionBehaviour()
  window.addEventListener('scroll', onScroll)
})()
