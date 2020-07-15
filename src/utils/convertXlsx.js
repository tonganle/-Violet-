/**
 * require js-xlsx
 * https://github.com/SheetJS/js-xlsx
 */
import XLSX from 'xlsx'
import { isPlaintObject } from './utils'
/**
 * convert uploaded xlsx file to json
 * @params file: File
 * @return Promise(array of {sheetName, sheetJson})
 */
const xlsxfile2json = file => {
  return new Promise((resolve, reject) => {
    let result = []
    file2workbook(file)
      .then(wb => {
        for (let i = 0; i < wb.SheetNames.length; i++) {
          let sheetName = wb.SheetNames[i]
          let sheet = wb.Sheets[sheetName]
          let sheetJson = XLSX.utils.sheet_to_json(sheet)
          result.push({
            sheetName,
            sheetJson
          })
        }
        resolve(result)
      })
      .catch(e => {
        reject(e)
      })
  })
}

/**
 * convert json to xlsx file
 * @params obj:Object
 * @params filename:String
 * @return Promise(file:File)
 */
const json2xlsxfile = (obj, filename) => {
  return new Promise((resolve, reject) => {
    json2workbook(obj)
      .then(wb => {
        workbook2file(wb, filename).then(file => {
          resolve(file)
        })
      })
      .catch(e => {
        reject(e)
      })
  })
}

/**
 * convert file to XLSX workbook
 * @params file:File
 * @return Promise(workbook)
 */

const file2workbook = file => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Argument reqiured'))
      return
    }

    if (!(file instanceof File)) {
      reject(new Error('The provided value should be a File object'))
      return
    }

    let reader = new FileReader()
    reader.onload = e => {
      let binary = ''
      let bytes = new Uint8Array(e.target.result)
      let length = bytes.length
      for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      let wb = XLSX.read(binary, { type: 'binary' })
      resolve(wb)
    }

    reader.readAsArrayBuffer(file)
  })
}

/**
 * convert xlsx workbook to File object
 * @params workbook
 * @parmas filename:String
 * @return Promise(File)
 */
const workbook2file = (workbook, filename) => {
  let extension = '.xlsx'
  let fname = (filename || 'download') + extension
  return new Promise((resolve) => {
    let wopts = {
      bookType: 'xlsx',
      bookSST: false,
      type: 'array'
    }
    let wbout = XLSX.write(workbook, wopts)
    let file = new File(new Uint8Array(wbout), fname)
    resolve(file)
  })
}

/**
 * convert json to XLSX workbook
 * @params obj:Object
 * @params sheetName:String
 * @return Promise(workbook)
 */

const json2workbook = (obj, sheetName) => {
  let sn = sheetName || 'New Sheet'
  return new Promise((resolve, reject) => {
    if (!obj) {
      reject(new Error('Argument required'))
      return
    }
    if (!isPlaintObject(obj)) {
      reject(new Error('First argument should be an object'))
      return
    }
    let wb = XLSX.utils.book_new()
    let sheet = XLSX.utils.json_to_sheet(obj)
    XLSX.utils.book_append_sheet(wb, sheet, sn)
    resolve(wb)
  })
}

export { xlsxfile2json, json2xlsxfile }
