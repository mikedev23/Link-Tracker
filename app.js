let myLinks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))
const tabBtn = document.querySelector("#tab-btn")

if (linksFromLocalStorage) {
	myLinks = linksFromLocalStorage
	render(myLinks)
}

tabBtn.addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		myLinks.push(tabs[0].url)
		localStorage.setItem("myLinks", JSON.stringify(myLinks))
		render(myLinks)
	})
})

function render(links) {
	let listItems = ""
	for (const link of links) {
		listItems += `
            <li>
                <a target='_blank' href='${link}'>
                    ${link}
                </a>
            </li>
        `
	}
	ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", () => {
	localStorage.clear()
	myLinks = []
	render(myLinks)
})

inputBtn.addEventListener("click", () => {
	myLinks.push(inputEl.value)
	inputEl.value = ""
	localStorage.setItem("myLinks", JSON.stringify(myLinks))
	render(myLinks)
})
