import * as React from 'react';

interface SessionCreateComponentProps {

}

export class SessionCreateComponent extends React.Component<SessionCreateComponentProps, any> {
    render() {
        return <form>
            <h2>Create Session</h2>
            <div className="form-group">
                <label htmlFor="session-form-name">Name</label>
                <input type="text" className="form-control" id="session-form-name" placeholder="Enter session name" />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>;
    }
}
