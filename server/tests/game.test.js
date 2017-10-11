const expect = require('expect');

const {Game} = require('./../Game.js');

describe('GAME', () => {
    it('should create a new game object', (done) => {
        try {
            let questions = ['q1', 'q2'];
            let game = new Game(questions);
            expect(game.getState()).toBe('PRE');

            done();
        } catch(e) {
            done(e);
        }
    });

    it('should not return first question if start() is not called', (done) => {
        let questions = ['q1', 'q2'];
        let game = new Game(questions);
        expect(game.getState()).toBe('PRE');
        expect(game.nextQuestion().data).toBeNull();
        expect(game.getState()).toBe('PRE');

        done();
    });

    it('should start the game and get the first question', (done) => {
        let questions = ['q1', 'q2'];
        let game = new Game(questions);
        game.start();
        expect(game.nextQuestion().data).toBe('q1');
        expect(game.getState()).toBe('PLAY');

        done();
    });

    it('game should be in state postgame after last question is requested', (done) => {
        let questions = ['q1', 'q2'];
        let game = new Game(questions);
        game.start();
        expect(game.nextQuestion().data).toBe('q1');
        expect(game.nextQuestion().data).toBe('q2');
        expect(game.nextQuestion().data).toBeNull();
        expect(game.getState()).toBe('POST');

        done();
    });

    it('should add a new player to a game and let him answer a question', (done) => {
        let questions = ['q1', 'q2'];
        let game = new Game(questions);
        game.start();
        expect(game.nextQuestion().data).toBe('q1');
        game.addPlayer('test')
        expect(game.getPlayers()).toEqual({'test': []});
        game.answerQuestion('test', 0, 'answer');
        expect(game.getPlayers()).toEqual({test: ['answer']});
        done();
    });

    it('should not add a player if name already exists', (done) => {
        let questions = ['q1', 'q2'];
        let game = new Game(questions);
        game.start();
        expect(game.nextQuestion().data).toBe('q1');
        game.addPlayer('test')
        expect(game.getPlayers()).toEqual({'test': []});
        expect(game.addPlayer('test').data).toBeNull();
        expect(game.getPlayers()).toEqual({'test': []});
        done();
    });
});
