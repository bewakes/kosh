import React from 'react';

export const NotificationContext = React.createContext({});


export class NotificationProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ephemeral: { show: false, message: null, type: "success" },
            persistent: { show: false, message: null, type: "success" },
            setNotification: this.setNotification,
            clearPersistent: this.clearPersistent,
        };
    }

    clearPersistent = () => {
        const currPersistent = this.state.persistent;
        if (currPersistent.show) {
            this.setState({ persistent: { ...currPersistent, show: false }});
        }
    }

    setNotification = (message: string, type: string, persist: boolean = false) => {
        if (persist) {
            this.setState({ persistent: { message, type, show: true } });
        } else {
            this.setState({ ephemeral: { message, type, show: true } });
            setTimeout(() => {
                this.setState({ ephemeral: { ...this.state.ephemeral, show: false }});
            }, 4000);
        }
    }

    render() {
        return (
            <NotificationContext.Provider value={this.state}>
                {this.props.children}
            </NotificationContext.Provider>
        );
    }
}
