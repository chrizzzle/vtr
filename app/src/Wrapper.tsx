import * as React from 'react';
import {LoadingSpinnerComponent} from './component/loadingspinner/LoadingSpinnerComponent';

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
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Wrapper;
