function encodeHtmlEntities (str) {
  return str.replace(/[\u00A0-\u9999<>&]/gim, (i) => (
    `&#${i.charCodeAt(0)};`
  ))
}

export default encodeHtmlEntities
