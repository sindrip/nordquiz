class Game {
    constructor(questions) {
        this.state = 'pregame';
        this.questions = questions;
        this.question = null;
        this.questionNumber = -1;
    }

    start() {
        if (this.state === 'pregame') {
            this.state = 'game';
        }
    }

    nextQuestion() {
        if (this.state != 'game') return null;

        if (++this.questionNumber === this.questions.length) {
            this.state = 'postgame';
            return null;
        }

        this.question = this.questions[this.questionNumber];

        return this.question;
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
}

module.exports.Game = Game;