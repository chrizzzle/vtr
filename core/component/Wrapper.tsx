import * as React from 'react';
import { LoadingSpinnerComponent } from './loadingspinner/LoadingSpinnerComponent';
import './Wrapper.css';

const logo = require('./logo.svg');

export interface WrapperProps {
    loading: boolean;
}

class Wrapper extends React.Component<WrapperProps, {}> {
    render() {
        if (this.props.loading) {
            return (<LoadingSpinnerComponent />);
        }
        return (
            <div className="wrapper">
                <div className="wrapper__header">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Wrapper;
