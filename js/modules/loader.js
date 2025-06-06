function loader(loaderWrapperSelector){
    const loaderWrapper = document.querySelector(loaderWrapperSelector);

  setTimeout(() => {
    loaderWrapper.style.display = "none";
  }, 1500);
}

export default loader;