'use strict';

var mainMenu;
var titleBar;

function load() {
    document.getElementById("loading-div").style.display = 'none';

    var TitleBar = posed.div({
        on: {y: 0},
        off: {y: -40}
    });
    var TitleBarLogo = posed.img({
        on: {y: 0, delay: 100},
        off: {y: -40, delay: 100}
    });
    class TopBar extends React.Component {
        state = { isOn: false };

        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this.toggle();
        }

        toggle = () => this.setState({ isOn: !this.state.isOn });

        render() {
            const { isOn } = this.state;
        
            return (
                <TitleBar id="titlebar" className='columns' pose={isOn ? 'on' : 'off'}>
                    <div className='column col-1'></div>
                    <div id='navbar' className='column col-10'>
                        <div className='text-center'>
                            <TitleBarLogo src='img/logo.png' style={{"height": "80px", "position": "relative", "top": "16px"}}></TitleBarLogo>
                        </div>
                    </div>
                    <div className='column col-1'></div>
                </TitleBar>
            );
            
        }
    }
    titleBar = ReactDOM.render(<TopBar />, document.querySelector('#navbar-container'));

    var Menu = posed.div({
        on: { staggerChildren: 50 }
    });
    var Item = posed.div({
        on: { y: 0, x: 0, opacity: 1 },
        off: { y: -10, x: -10, opacity: 0 }
    });
    class MainMenu extends React.Component {
        state = { isOn: false };

        constructor(props) {
            super(props);
        }
    
        toggle = () => this.setState({ isOn: !this.state.isOn });
    
        render() {
            const { isOn } = this.state;
        
            return (
                <Menu id={this.props.id} pose={isOn ? 'on' : 'off'}>
                    <Item className='columns item'>
                        <div className='column col-12 text-center'>
                            <div className='text-container p-centered tooltip tooltip-right' data-tooltip="Why are you hovering over me? \n Go away">
                                <h1 id='dci-login-text'>DCI Login</h1>
                            </div>
                        </div>
                    </Item>

                    <Item className='columns item'>
                        <div className='column col-12 text-center'>
                            <div className='text-input-container p-centered tooltip tooltip-left' data-tooltip="Username goes here">
                                <input id='login-username-input' className='form-input' type='text' placeholder='Username'></input>
                            </div>
                        </div>
                    </Item>
                    <Item className='columns item'>
                        <div className='column col-12 text-center'>
                            <div className='text-input-container p-centered tooltip tooltip-left' data-tooltip="Password goes here">
                                <input id='login-password-input' className='form-input' type='password' placeholder='Password'></input>
                            </div>
                        </div>
                    </Item>

                    <br/>

                    <Item className='columns item'>
                        <div className='column col-12 text-center'>
                            <div id='login-button-container'></div>
                        </div>
                    </Item>
                    <Item className='columns item'>
                        <div className='column col-12 text-center'>
                            <div id='login-register-button-container'></div>
                        </div>
                    </Item>
                </Menu>
            );
        }
    }
    mainMenu = ReactDOM.render(<MainMenu id='mainMenu' />, document.querySelector('#main-container'));
    setTimeout(() => mainMenu.toggle(), 200);

    class LoginButton extends React.Component {
        render() {
            return (<button id='login-button' className="btn btn-primary tooltip" data-tooltip="Click to sign in!" onClick={login}>Log In</button>);
        }
    }
    ReactDOM.render(React.createElement(LoginButton), document.querySelector('#login-button-container'));

    class LoginRegisterButton extends React.Component {
        render() {
            return (<button id='login-register-button' className="btn mt-2 tooltip tooltip-bottom" data-tooltip="Click to sign up!" onClick={loginRegister}>Register</button>);
        }
    }
    ReactDOM.render(React.createElement(LoginRegisterButton), document.querySelector('#login-register-button-container'));
}
load();

function login() {
    // Add loading animation to button
    document.getElementById("login-button").classList.replace("tooltip", "loading");

    var data = {
        user: document.getElementById("login-username-input").value,
        pass: document.getElementById("login-password-input").value
    };
    console.log(data.user);

    socket.emit("submit-login", data);
}

function loginRegister() {
    
}