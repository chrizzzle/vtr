import * as React from 'react';
import {DashboardContainer} from '../container/dashboard/DashboardContainer';
import './AppComponent.css';
import {OptionListContainer} from '../container/option/OptionListContainer';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Wrapper from '../Wrapper';
import {SessionListContainer} from '../container/session/SessionListContainer';

interface AppComponentProps {
    loading: boolean;
    onSessionCreate: () => void;
}

class AppComponent extends React.Component<AppComponentProps, any> {
    render() {
        const {loading} = this.props;

        return <Wrapper loading={loading}>
            <Router>
                <div>
                    <Route exact path="/" component={SessionListContainer} />
                    <Route path="/session/:id/options" component={OptionListContainer} />
                    <Route path="/session/:id/dashboard" component={DashboardContainer} />
                </div>
            </Router>
        </Wrapper>
    }
}

export default AppComponent;
