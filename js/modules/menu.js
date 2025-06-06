import getResources from "../services/get-resources";

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

  

  getResources(api).then(data => {
      data.forEach((menu) => {
        const { src, title, price, descr, parentSelector } = menu;
        new FullMenu(src, title, price, descr, parentSelector).render();
      });
  })
  .catch(error => console.error("Failed to fetch menu:", error));

}

export default menu