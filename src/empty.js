function empty (...htmlElements) {
  htmlElements.forEach((htmlElement) => {
    while (htmlElement.firstChild) {
      htmlElement.removeChild(htmlElement.firstChild)
    }
  })
}

export default empty
