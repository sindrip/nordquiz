class Game {

  // GAME STATES: [PRE, PLAY, POST, END]
  constructor(questions) {
    this.state = 'PRE';

    this.questions = questions;
    this.question = null;
    this.questionNumber = -1;

    this.players = {};
  }

  // PAYLOAD : { STATE, DATA }
  _payload(data) {
    return {
      state: this.state,
      data,
    };
  };
    
  start() {
    if (this.state === 'PRE') {
      this.state = 'PLAY';
    }    
  }

  nextQuestion() {
    if (this.state != 'PLAY') return this._payload(null);

    if (++this.questionNumber === this.questions.length) {
      this.state = 'POST';
      return this._payload(null);
    }

    this.question = this.questions[this.questionNumber];

    return this._payload(this.question);
  }

  addPlayer(name, code) {
    if (this.players[name]) {
      return this._payload(null);
    }

    this.players[name] = [];
    return this._payload(name);
  }

  answerQuestion(name, questionNumber, answer) {
    if (this.players[name]) {
      this.players[name][questionNumber] = answer;
      return this._payload(answer);
    }

    return this._payload(null);
  }

  getQuestions() {
    return this.questions;
  }

  getQuestionNumber() {
    return this.questionNumber;
  }

  getState() {
    return this.state;
  }

  getPlayers() {
    return this.players;
  }
}

module.exports.Game = Game;
