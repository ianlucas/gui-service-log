import sortBy from 'lodash.sortby'

function groupRecords (records) {
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

export default groupRecords
