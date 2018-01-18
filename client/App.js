import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>Hello World</div>
        )
    }
}
ReactDom.render(<App />, document.getElementById('app'));