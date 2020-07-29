import sortBy from 'lodash.sortby'
import FileSaver from 'file-saver'

export function empty (...htmlElements) {
  htmlElements.forEach((htmlElement) => {
    while (htmlElement.firstChild) {
      htmlElement.removeChild(htmlElement.firstChild)
    }
  })
}

export function encodeHtmlEntities (str) {
  return str.replace(/[\u00A0-\u9999<>&]/gim, (i) => (
    `&#${i.charCodeAt(0)};`
  ))
}

export function groupRecords (records) {
  const result = []
  const cache = {}

  sortBy(records, (record) => record.requestTime.epoch)
    .reverse()
    .forEach((record) => {
      const { group } = record
      if (!cache[group]) {
        cache[group] = {
          group,
          infobox: [],
          records: []
        }

        result.push(cache[group])
      }

      cache[group].infobox = record.infobox
      cache[group].records.push(record)
    })

  return result
}

/**
 * @param {HTMLElement|String} htmlElement
 */
export function copyHtmlElement (htmlElement) {
  let element = htmlElement
  let dummy = null

  if (typeof htmlElement === 'string') {
    dummy = document.createElement('div')
    dummy.innerHTML = htmlElement
    document.body.appendChild(dummy)
    element = dummy
  }

  if (document.body.createTextRange) {
    const range = document.body.createTextRange()
    range.moveToElementText(element)
    range.select()
    document.execCommand('Copy')
  } else if (window.getSelection) {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('Copy')
  }

  if (dummy) {
    document.body.removeChild(dummy)
  }
}

/**
 * @param {String} text
 */
export function copyText (text) {
  const textarea = document.createElement('textarea')
  document.body.appendChild(textarea)
  textarea.value = text
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export function writeFile (name, content, type = 'application/json;charset=utf-8') {
  const blob = new Blob([content], { type })
  FileSaver.saveAs(blob, name)
}
