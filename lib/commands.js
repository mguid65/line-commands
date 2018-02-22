'use babel';

import { CompositeDisposable } from 'atom';

export function replaceall(buffer, argList) {
  buffer.scan(new RegExp(argList[0], 'g'), function(obj) { obj.replace(argList[1])} )
}
export function replaceone(buffer, argList) {
  buffer.scan(new RegExp(argList[0]), function(obj) { obj.replace(argList[1])} )
}
export function goto(buffer, argList) {
  return
}
