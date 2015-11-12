'use strict';
let Const = require('../const');
let Util  = require('../util');
let RecordModel = require('../model/record-model').getInstance();
let UserModel   = require('../model/user-model').getInstance();

// 本セッションでの増減を見る用
let last = RecordModel.getLatestRecord();
let lastScore = last ? last.rate : 0;

module.exports = {
  el: '#js-view-input',
  data: {
    result:      1,
    rule:        1,
    rateRank:    (UserModel.get('lastRank')|0) || 600,
    rateScore:   '',
    stageA:      1,
    stageB:      2,
    chosenStage: 'stageA',
    missmatch:   false,
    tagmatch:    false,

    recentRatePfx: '±',
    recentRateGap: 0,

    results: Const.RESULT,
    rules:   Const.RULE,
    stages:  Util.objToOptionsArr(Const.STAGE),
    rates:   Util.objToOptionsArr(Const.RATE_TABLE, 'REVERSE'),

    _timer:          null,
    showSetReaction: false
  },
  computed: {
    isDisconnected: function() {
      return Util.isDisconnected(this.result);
    },
    canSet: function() {
      return Util.canInput(this.rateScore);
    }
  },
  methods: {
    onClickSet: function() {
      let record = {
        result:    this.result|0,
        missmatch: this.missmatch|0,
        tagmatch:  this.tagmatch|0,
        rule:      this.rule|0,
        stage:     this[this.chosenStage]|0,
        rate:      (this.rateRank|0) + (this.rateScore|0)
      };
      RecordModel.setRecord(record);
      // 最後に記録したウデマエを次回のデフォルトに
      UserModel.set('lastRank', this.rateRank);
      // 通算バトル数も更新
      UserModel.updateTotalIdx();
      // ベストウデマエも更新
      UserModel.updateBestRate(record.rate);

      this._cleanUpInput();
      this._showReaction();
      this._updateRecentRateGap(record.rate);
    },
    _cleanUpInput: function() {
      // input[number]なのでPCはむしろ消さないで欲しい
      if (Util.isMobile()) {
        this.rateScore = '';
      }
      this.missmatch = false;
    },
    _showReaction: function() {
      let that = this;
      this.showSetReaction = true;
      this._timer = setTimeout(function() {
        that.showSetReaction = false;
      }, 1000);
    },
    _updateRecentRateGap: function(latestScore) {
      let gap = latestScore - lastScore;
      this.recentRateGap = gap;

      switch (true) {
      case gap === 0:
        this.recentRatePfx = '±';
        break;
      case gap > 0:
        this.recentRatePfx = '+';
        break;
      case gap < 0:
        this.recentRatePfx = '';
        break;
      }
    }
  }
};
