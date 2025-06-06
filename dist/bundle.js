/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function form(botAPI, chatID, modalSelector, modalContentSelector, modalTimerId ){
  const form = document.querySelector("form")
  const message = {
    loading: "Loading...",
    success: "Thanks for contacting with us",
    failure: "Something went wrong",
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const loader = document.createElement("div");
    loader.classList.add("loader");
    loader.style.width = "20px";
    loader.style.height = "20px";
    loader.style.marginTop = "20px";
    form.append(loader);

    const formData = new FormData(form);

    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    fetch(`https://api.telegram.org/bot${botAPI}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatID,
        text: `
          Name: ${object.name}, Phone: ${object.phone}  
        `,
      }),
    })
    .then(() => {
      showStatusMessage(message.success);
      form.reset();
    })
    .catch(() => showStatusMessage(message.failure))
    .finally(() => loader.remove());

  })

  function showStatusMessage(message) {
    const modalDialog = document.querySelector(".modal__dialog");

    modalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector, modalContentSelector, modalTimerId);

    const statusModal = document.createElement("div");
    statusModal.classList.add("modal__dialog");
    statusModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

    document.querySelector(".modal").append(statusModal);

    setTimeout(() => {
      statusModal.remove();
      modalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/loader.js":
/*!******************************!*\
  !*** ./js/modules/loader.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function loader(loaderWrapperSelector){
    const loaderWrapper = document.querySelector(loaderWrapperSelector);

  setTimeout(() => {
    loaderWrapper.style.display = "none";
  }, 1500);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loader);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_get_resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/get-resources */ "./js/services/get-resources.js");


function menu(api){
     class FullMenu {
    constructor(src, title, price, descr, parentSelector) {
      this.src = src;
      this.title = title;
      this.price = price;
      this.descr = descr;
      this.parent = document.querySelector(parentSelector);
      this.formatToUSD();
    }
    formatToUSD() {
      this.price = this.price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    render() {
      const element = document.createElement("div");
      element.classList.add("menu-item");
      element.innerHTML = `
				<img src="${this.src}" alt="${this.title}">
              <div>
                <h3>${this.title} <span class="primary-text">${this.price}</span></h3>
                <p>${this.descr}</p>
              </div>
			`;

      this.parent.append(element);
    }
  }

  

  (0,_services_get_resources__WEBPACK_IMPORTED_MODULE_0__["default"])(api).then(data => {
      data.forEach((menu) => {
        const { src, title, price, descr, parentSelector } = menu;
        new FullMenu(src, title, price, descr, parentSelector).render();
      });
  })
  .catch(error => console.error("Failed to fetch menu:", error));

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalContentSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector),
  modalContent = document.querySelector(modalContentSelector);
  modalContent.classList.add("modal_fade");
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  clearInterval(modalTimerId);
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector)
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}


function modal(btnSelector, modalSelector, modalContentSelector, modalTimerId){
    const modalOpenBtns = document.querySelectorAll(btnSelector),
    modal = document.querySelector(modalSelector, modalContentSelector)


  modalOpenBtns.forEach((btn) => {
    btn.addEventListener("click", ()=> openModal(modalSelector, modalContentSelector, modalTimerId));
  });

  modal.addEventListener("click", (event) => {
    if (
      event.target === modal ||
      event.target.getAttribute("data-modal-close") === ""
    ) {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/offer.js":
/*!*****************************!*\
  !*** ./js/modules/offer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function offer(api){
    class OfferMenu {
    constructor(src, alt, title, descr, discount, sale, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.discount = discount;
      this.sale = sale;
      this.parent = document.querySelector(parentSelector);
      this.formatToUSD();
    }

    formatToUSD() {
      this.discount = this.discount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      this.sale = this.sale.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }

    render() {
      const element = document.createElement("div");
      element.innerHTML = `
				<img src="${this.src}" alt="${this.alt}">
				<div>
					<h3>${this.title}</h3>
					<p>${this.descr}</p>
					<p><del>${this.discount}</del> <span class="primary-text">${this.sale}</span></p>
				</div>
			`;

      this.parent.append(element);
    }
  }

  fetch(api, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  .then((response) => response.json())
  .then((data) => {
    data.forEach((offer) => {
      const { src, alt, descr, discount, sale, title } = offer;
      new OfferMenu(
        src,
        alt,
        title,
        descr,
        discount,
        sale,
        ".offers-items"
      ).render();
    })
  })
  .catch(error => console.error("Failed to fetch offer:", error));

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (offer);

/***/ }),

/***/ "./js/modules/slides.js":
/*!******************************!*\
  !*** ./js/modules/slides.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slidesModul);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabContentsSelector, tabParentsSelector){
  const tabs = document.querySelectorAll(tabsSelector),
    tabContents = document.querySelectorAll(tabContentsSelector),
    tabParents = document.querySelector(tabParentsSelector);

  function hideTabContents() {
    tabContents.forEach((tabContent) => {
      tabContent.classList.add("hide");
      tabContent.classList.remove("show");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(index = 0) {
    tabContents[index].classList.add("show", "fade");
    tabContents[index].classList.remove("hide");
    tabs[index].classList.add("tabheader__item_active");
  }

  hideTabContents();
  showTabContent();

  tabParents.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, index) => {
        if (target === tab) {
          hideTabContents();
          showTabContent(index);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(deadline){
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const time = Date.parse(endtime) - Date.parse(new Date());

    if (time <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      (days = Math.floor(time / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((time / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((time / (1000 * 60)) % 60)),
        (seconds = Math.floor((time / 1000) % 60));
    }

    return {
      totalTime: time,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function formatNumber(number) {
    if (number >= 0 && number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const time = getTimeRemaining(endtime);

      days.textContent = formatNumber(time.days);
      hours.textContent = formatNumber(time.hours);
      minutes.textContent = formatNumber(time.minutes);
      seconds.textContent = formatNumber(time.seconds);

      if (time.totalTime <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/get-resources.js":
/*!**************************************!*\
  !*** ./js/services/get-resources.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
async function getResources(api) {
    try {
        const response = await fetch(api)
        return response.json()
    } catch (err) {
        return `Erorr: ${err}`
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getResources);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/loader */ "./js/modules/loader.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_offer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/offer */ "./js/modules/offer.js");
/* harmony import */ var _modules_slides__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slides */ "./js/modules/slides.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

;









window.addEventListener("DOMContentLoaded", () => {

  const modalTimerId = setTimeout(()=> (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)(".modal", ".modal__content", modalTimerId), 40000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_6__["default"])(".tabheader__item", ".tab_content", ".tabheader__items")
  ;(0,_modules_loader__WEBPACK_IMPORTED_MODULE_1__["default"])(".loader-wrapper")
  ;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_7__["default"])("2025-08-18")
  ;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])(
    "[data-modal]",
    ".modal",
    ".modal__content",
    modalTimerId
  )
  ;(0,_modules_offer__WEBPACK_IMPORTED_MODULE_4__["default"])("http://localhost:3000/offers")
  ;(0,_modules_menu__WEBPACK_IMPORTED_MODULE_2__["default"])("http://localhost:3000/menu")
  ;(0,_modules_form__WEBPACK_IMPORTED_MODULE_0__["default"])(
    "7079348264:AAEDDb5BHHSrSbSGAToIQC5h5bIuFeUebW8", 
    "5841656536",
    ".modal",
    ".modal__content",
    modalTimerId
  )
  ;(0,_modules_slides__WEBPACK_IMPORTED_MODULE_5__["default"])(
    ".offer__slide",
    ".offer__slider-prev",
    ".offer__slider-next",
    "#total",
    "#current",
    ".offer__slider-wrapper",
    ".offer__slider-inner"
  )
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map