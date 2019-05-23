import React, { Component } from 'react';

export class Counter extends Component {
    displayName = Counter.name
    currentCount: number = 0
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Counter</h1>

                <p>This is a simple example of a React component.</p>

                <p>Current count: <strong>{this.currentCount}</strong></p>

                <button onClick={() => {
                    this.currentCount++
                    this.setState({})
                }}>Increment</button>
            </div>
        );
    }
}
