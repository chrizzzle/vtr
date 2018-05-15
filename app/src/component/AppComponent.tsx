import * as React from 'react';
import './AppComponent.css';
import {OptionListContainer} from '../container/option/OptionListContainer';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Wrapper from '../Wrapper';
import {SessionListContainer} from '../container/session/SessionListContainer';

interface AppComponentProps {
}

class AppComponent extends React.Component<AppComponentProps> {
    render() {
        return (
            <Router>
                <Wrapper>
                    <div>
                        <Route exact={true} path="/" component={SessionListContainer} />
                        <Route path="/session/:id" component={OptionListContainer} />
                    </div>
                </Wrapper>
            </Router>
        );
    }
}

export default AppComponent;
