const expect = require('expect');

const {Game} = require('./../Game.js');

describe('Game', () => {
    it('should create a new game object', (done) => {
        try {
            let questions = ['q1', 'q2'];
            let game = new Game(questions);
            expect(game.getState()).toBe('pregame');
    
            done();
        } catch(e) {
            done(e);
        }
    });

    it('should not return first question if start() is not called', (done) => {
        let questions = ['q1', 'q2'];
        let game = new Game(questions);
        expect(game.getState()).toBe('pregame');
        expect(game.nextQuestion()).toBeNull();
        expect(game.getState()).toBe('pregame');
    
        done();
    });

    it('should start the game and get the first question', (done) => {
        let questions = ['q1', 'q2'];
        let game = new Game(questions);
        game.start();
        expect(game.nextQuestion()).toBe('q1');
        expect(game.getState()).toBe('game');

        done();
    });

    it('game should be in state postgame after last question is requested', (done) => {
        let questions = ['q1', 'q2'];
        let game = new Game(questions);
        game.start();
        expect(game.nextQuestion()).toBe('q1');
        expect(game.nextQuestion()).toBe('q2');
        expect(game.nextQuestion()).toBeNull();
        expect(game.getState()).toBe('postgame');

        done();
    });
});