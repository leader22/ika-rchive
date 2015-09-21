'use strict';
let Const = require('../const');
let BaseModel = require('./_base');

class RecordModel extends BaseModel {
  constructor() {
    super('IA_RECORD', {
      'items': []
    });
  }

  // といいつつ修正するコ
  _preSave(record) {
    let isWin = (record.result|0) % 2;
    if (isWin) { record.missmatch = false; }

    return record;
  }

  setRecord(record) {
    // 登録日はココでいれる
    record.createdAt = Date.now();

    let items = this.get('items');
    // リスト追加
    items.push(this._preSave(record));
    // data.lengthはLIMITを超えないし、超えたら先頭が消える
    while (items.length > Const.RECORD_LIMIT) {
      items.shift();
    }

    this.set('items', items);
  }

  getRecord(idx) {
    return this.get('items')[idx];
  }

  update(idx, record) {
    let items = this.get('items');
    items.splice(idx, 1, this._preSave(record));
    this.set('items', items);
  }

  remove(idx) {
    let items = this.get('items');
    items.splice(idx, 1);
    this.set('items', items);
  }

  getLatestRecord() {
    let items = this.get('items');
    return items[items.length - 1];
  }
}

let instance = null;
module.exports = {
  getInstance: () => {
    if (instance === null) {
      instance = new RecordModel();
    }

    return instance;
  }
};
