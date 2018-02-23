'use babel';

import { CompositeDisposable, Point, TextEditor } from 'atom';

export function replaceall(buffer, argList) {
  buffer.scan(new RegExp(argList[0], 'g'), function(obj) { obj.replace(argList[2])} )
}
export function replaceone(buffer, argList) {
  buffer.scan(new RegExp(argList[0]), function(obj) { obj.replace(argList[2])} )
}
export function goto(editor, argList) {

  const lineNumber = argList[0]
  if (!editor || !lineNumber.length) return

  const currentRow = editor.getCursorBufferPosition().row
  const rowLineNumber = lineNumber.split(/:+/)[0] || ''
  const row = rowLineNumber.length > 0 ? parseInt(rowLineNumber) - 2 : currentRow
  const columnLineNumber = lineNumber.split(/:+/)[2] || ''
  const column = columnLineNumber.length > 0 ? parseInt(columnLineNumber) - 2 : -2

  const position = new Point(row, column)
  editor.setCursorBufferPosition(position)
  editor.unfoldBufferRow(row)
  if (column < 0) {
    editor.moveToFirstCharacterOfLine()
  }
  editor.scrollToBufferPosition(position, {
    center: true
  })
}
export function del(buffer, argList) {
  console.log(argList.length)
  if (argList[0]<0) {
    return
  }
  if (argList.length == 1) {
    buffer.deleteRow(argList[0]-1)
  }
  else if (argList.length >1) {
    if (argList[1] < 0 || argList[0] < argList[1])
    buffer.deleteRows(argList[0]-1, argList[1]-1)
  }
}
