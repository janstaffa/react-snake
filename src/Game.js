import React, { useState, useEffect } from 'react';
import Snake from './Snake';
import Food from './Food';




const TICK_SPEED = 100;
const TILE_SIZE = 20;
const MAP_TILES = 25;




const score = new Event('onscore');
const lose = new Event('onlost');



class Game extends React.Component {
    constructor(props) {
        super(props);
        this.newGame = {
            player: [
                { x: 0, y: 0 },
                { x: 20, y: 0 },
                { x: 40, y: 0 }
            ],
            dirrection: 'RIGHT',
            food: { x: 60, y: 60 },
            score: 0
        };
        this.state = { ...this.newGame };
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        document.onkeydown = this.keyPress;
        document.addEventListener('onscore', this.score);
        document.addEventListener('onlost', this.lost);

        this.interval = setInterval(
            () => this.tick(),
            TICK_SPEED
        );
    }

    componentDidUpdate() {
        this.checkCollision();
    }

    checkCollision() {
        let player = [...this.state.player];
        let playerHead = player[player.length - 1];
        player.pop();

        player.forEach(tile => {
            if (playerHead.x === tile.x && playerHead.y === tile.y) {
                document.dispatchEvent(lose);
            }
        });
    }
    generateFood() {
        let foodPosition = { x: 0, y: 0 };
        for (let i = 1; i <= 2; i++) {
            let newFood = Math.random() * MAP_TILES;
            newFood = Math.floor(newFood);
            if (i === 1) {
                foodPosition.x = newFood * TILE_SIZE;
            } else {
                foodPosition.y = newFood * TILE_SIZE;
            }
        }
        for (var i = 0; i < this.state.player.length; i++) {
            if (JSON.stringify(this.state.player[i]) === JSON.stringify(foodPosition)) {
                return this.generateFood();
            } else if (i == this.state.player.length - 1) {
                return foodPosition;
            }
        }
    }


    tick() {
        let player = this.state.player;
        let playerHead = player[player.length - 1];

        let dirrection = this.state.dirrection;
        switch (dirrection) {
            case 'UP':
                player.push({ x: playerHead.x, y: playerHead.y - TILE_SIZE });
                break;
            case 'DOWN':
                player.push({ x: playerHead.x, y: playerHead.y + TILE_SIZE });
                break;
            case 'RIGHT':
                player.push({ x: playerHead.x + TILE_SIZE, y: playerHead.y });
                break;
            case 'LEFT':
                player.push({ x: playerHead.x - TILE_SIZE, y: playerHead.y });
                break;
            default:
                break;
        }
        player.shift();
        player.forEach((tile) => {
            if (tile.x > 480) {
                tile.x = 0;
            } else if (tile.x < 0) {
                tile.x = 480;
            }

            if (tile.y > 480) {
                tile.y = 0;
            } else if (tile.y < 0) {
                tile.y = 480;
            }

        });

        this.setState({ player: player });


        const food = this.state.food;
        player = this.state.player;
        playerHead = player[player.length - 1];

        if (playerHead.x === food.x && playerHead.y === food.y) {
            document.dispatchEvent(score);
        }
    }


    keyPress = (event) => {
        const keyName = event.key;
        let dirrection = this.state.dirrection;
        switch (keyName) {
            case 'ArrowUp':
                dirrection = 'UP';
                break;
            case 'ArrowDown':
                dirrection = 'DOWN';
                break;
            case 'ArrowRight':
                dirrection = 'RIGHT';
                break;
            case 'ArrowLeft':
                dirrection = 'LEFT';
                break;
            default:
                break;
        }
        if (this.state.dirrection === 'LEFT' && dirrection === 'RIGHT') {
            dirrection = 'LEFT';
        }
        if (this.state.dirrection === 'RIGHT' && dirrection === 'LEFT') {
            dirrection = 'RIGHT';
        }
        if (this.state.dirrection === 'UP' && dirrection === 'DOWN') {
            dirrection = 'UP';
        }
        if (this.state.dirrection === 'DOWN' && dirrection === 'UP') {
            dirrection = 'DOWN';
        }

        this.setState({ dirrection: dirrection });
    }

    score = () => {
        this.setState({ food: this.generateFood() });
        this.setState({ score: this.state.score + 1 });

        let player = this.state.player;
        let lastTile = player[0];
        let dirrection = this.state.dirrection;
        switch (dirrection) {
            case 'UP':
                player.unshift({ x: lastTile.x, y: lastTile.y + TILE_SIZE });
                break;
            case 'DOWN':
                player.unshift({ x: lastTile.x, y: lastTile.y - TILE_SIZE });
                break;
            case 'RIGHT':
                player.unshift({ x: lastTile.x - TILE_SIZE, y: lastTile.y });
                break;
            case 'LEFT':
                player.unshift({ x: lastTile.x + TILE_SIZE, y: lastTile.y });
                break;
            default:
                break;
        }
        this.setState({ player: player });

    }
    lost = () => {
        this.setState({
            player: [
                { x: 0, y: 0 },
                { x: 20, y: 0 },
                { x: 40, y: 0 }
            ],
            dirrection: 'RIGHT',
            food: { x: 60, y: 60 },
            score: 0
        });
        alert('lost! you had' + this.state.score + 'points');
    }
    render() {
        return (
            <div className="app" >
                <p className="title">Amazing snake! Score: {this.state.score}</p>
                <div className="game">
                    <Snake snakeBody={this.state.player} />
                    <Food foodPosition={this.state.food} />
                </div>
            </div>
        );
    }

}

export default Game;
