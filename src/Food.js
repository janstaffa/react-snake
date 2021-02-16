import React, { useState, useEffect } from 'react';

class Food extends React.Component {
    render() {
        const style = {
            top: this.props.foodPosition.y,
            left: this.props.foodPosition.x
        }
        return (
            <div>
                <div className="food-tile" style={style}></div>
            </div>
        );
    }
}

export default Food;
