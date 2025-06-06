'use strict'
import form from "./modules/form";
import loader from "./modules/loader";
import menu from "./modules/menu";
import modalModul from "./modules/modal";
import offer from "./modules/offer";
import slidesModul from "./modules/slides";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {

  const modalTimerId = setTimeout(()=> openModal(".modal", ".modal__content", modalTimerId), 40000);

  tabs(".tabheader__item", ".tab_content", ".tabheader__items")
  loader(".loader-wrapper")
  timer("2025-08-18")
  modalModul(
    "[data-modal]",
    ".modal",
    ".modal__content",
    modalTimerId
  )
  offer("http://localhost:3000/offers")
  menu("http://localhost:3000/menu")
  form(
    "7079348264:AAEDDb5BHHSrSbSGAToIQC5h5bIuFeUebW8", 
    "5841656536",
    ".modal",
    ".modal__content",
    modalTimerId
  )
  slidesModul(
    ".offer__slide",
    ".offer__slider-prev",
    ".offer__slider-next",
    "#total",
    "#current",
    ".offer__slider-wrapper",
    ".offer__slider-inner"
  )
});
