function slidesModul(slidesSelector, prevSelector, nextSelector, totalSelctor, currentSelector, slidesWrapperSelector, slidesInnerSelector){
    const slides = document.querySelectorAll(slidesSelector),
		prev = document.querySelector(prevSelector),
		next = document.querySelector(nextSelector),
		total = document.querySelector(totalSelctor),
		current = document.querySelector(currentSelector),
		slidesWrapper = document.querySelector(slidesWrapperSelector),
		slidesInner = document.querySelector(slidesInnerSelector),
		width = window.getComputedStyle(slidesWrapper).width

	let slideIndex = 1,
		offset = 0

	if(slides.length < 10) {
		total.textContent = `0${slides.length}`
		current.textContent = `0${slideIndex}`
	}else {
		total.textContent = slides.length
		current.textContent = slideIndex
	}

	slidesInner.style.width = 100 * slides.length + "%"
	slidesInner.style.display = "flex"
	slidesInner.style.transition = "all 0.5s ease"

	slidesWrapper.style.overflow = "hidden"

	slides.forEach(slide => {
		slide.style.width = width
	})

  next.addEventListener("click", () => {
		if(offset === +width.replace(/\D/g, "") * (slides.length - 1)) { 
			offset = 0
		} else {
			offset += +width.replace(/\D/g, "")
		}
		slidesInner.style.transform = `translateX(-${offset}px)`

		if(slideIndex === slides.length) {
			slideIndex = 1
		}else {
			slideIndex++
		}

		if(slides.length < 10) {
			current.textContent = `0${slideIndex}`
		} else {
			current.textContent = slideIndex
		}
	})

	prev.addEventListener("click", () => {
		if(offset === 0) { 
			offset = +width.replace(/\D/g, "") * (slides.length - 1)
		} else {
			offset -= +width.replace(/\D/g, "")
		}
		slidesInner.style.transform = `translateX(-${offset}px)`

		if(slideIndex === 1) {
			slideIndex = slides.length
		}else {
			slideIndex--
		}

		if(slides.length < 10) {
			current.textContent = `0${slideIndex}`
		} else {
			current.textContent = slideIndex
		}
	})

}

export default slidesModul