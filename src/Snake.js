import React, { useState, useEffect } from 'react';

class Snake extends React.Component {
    render() {
        return (
            <div>
                {this.props.snakeBody.map((tile, i) => {
                    const style = {
                        top: tile.y,
                        left: tile.x
                    }
                    return (
                        <div className="player-tile" key={i} style={style}></div>
                    );
                })}
            </div>
        );
    }
}

export default Snake;
