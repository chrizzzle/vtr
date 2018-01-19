import * as React from 'react';
import {ConnectedContainer} from './container/connected/ConnectedContainer';
import {LoadingSpinnerComponent} from './component/loadingspinner/LoadingSpinnerComponent';

export interface WrapperProps {
    loading: boolean;
}

class Wrapper extends React.Component<WrapperProps, any> {
    render() {
        if (this.props.loading) {
            return (<LoadingSpinnerComponent />)
        }
        return (<div>
                <ConnectedContainer />
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Wrapper;
