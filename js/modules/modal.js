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
export {openModal, closeModal}
export default modal