'use babel';

import { CompositeDisposable, Point, TextEditor } from 'atom';

export function replaceall(buffer, argList) {
  buffer.scan(new RegExp(argList[0], 'g'), function(obj) { obj.replace(argList[1])} )
}
export function replaceone(buffer, argList) {
  buffer.scan(new RegExp(argList[0]), function(obj) { obj.replace(argList[1])} )
}
export function goto(editor,miniEditor, argList) {

  const lineNumber = argList[0]
  if (!editor || !lineNumber.length) return

  const currentRow = editor.getCursorBufferPosition().row
  const rowLineNumber = lineNumber.split(/:+/)[0] || ''
  const row = rowLineNumber.length > 0 ? parseInt(rowLineNumber) - 1 : currentRow
  const columnLineNumber = lineNumber.split(/:+/)[1] || ''
  const column = columnLineNumber.length > 0 ? parseInt(columnLineNumber) - 1 : -1

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
