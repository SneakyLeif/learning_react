'use strict';

var titleBar;
var mainMenu;
var regMenu;

var CoolForm = posed.form({
    on: { staggerChildren: 50 }
});
var CoolFormItem = posed.div({
    on: { y: 0, x: 0, opacity: 1 },
    off: { y: -10, x: -10, opacity: 0 }
});
class MainMenu extends React.Component {
    state = { isOn: false };

    submit(e) {
        e.preventDefault();
        login();
    }

    toggle = () => this.setState({ isOn: !this.state.isOn });

    render() {
        const { isOn } = this.state;
    
        return (
            <CoolForm id='mainMenu' onSubmit={this.submit} pose={isOn ? 'on' : 'off'}>
                <CoolFormItem className='columns item'>
                    <div className='column col-12 text-center'>
                        <h1 id='dci-login-text' className='p-centered'>Hi :)</h1>
                    </div>
                </CoolFormItem>

                <CoolFormItem className='columns item'>
                    <div className='column col-12 text-center'>
                        <div className='text-input-container p-centered'>
                            <input id='login-username-input' className='form-input' type='text' placeholder='Username'></input>
                        </div>
                    </div>
                </CoolFormItem>
                <CoolFormItem className='columns item'>
                    <div className='column col-12 text-center'>
                        <div className='text-input-container p-centered'>
                            <input id='login-password-input' className='form-input' type='password' placeholder='Password'></input>
                        </div>
                    </div>
                </CoolFormItem>

                <br/>

                <CoolFormItem className='columns item'>
                    <div className='column col-12 text-center'>
                        <div id='login-button-container'>
                            <button type='submit' id='login-button' className="btn btn-primary">Log In</button>
                        </div>
                    </div>
                </CoolFormItem>
                <CoolFormItem className='columns item'>
                    <div className='column col-12 text-center'>
                        <div id='login-register-button-container'>
                            <button type='button' id='login-register-button' className="btn mt-2 tooltip tooltip-bottom" data-tooltip="Click to sign up! :)" onClick={loginRegister}>Register</button>
                        </div>
                    </div>
                </CoolFormItem>
            </CoolForm>
        );
    }
}

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

    mainMenu = ReactDOM.render(<MainMenu />, document.querySelector('#main-container'));
    setTimeout(() => mainMenu.toggle(), 200);
}
load();

class RegisterMenu extends React.Component {
    state = { isOn: false };

    submit(e) {
        e.preventDefault();
        register();
    }

    toggle = () => this.setState({ isOn: !this.state.isOn });

    render() {
        const { isOn } = this.state;
        
        return (
            <CoolForm id='regMenu' onSubmit={this.submit} pose={isOn ? 'on' : 'off'}>
                <CoolFormItem className='columns item'>
                    <div className='column col-12 text-center'>
                        <h1 id='dci-register-text' className='p-centered'>Making an account? Nice :)</h1>
                    </div>
                </CoolFormItem>

                <CoolFormItem className='columns item'>
                    <div className='column col-12 text-center'>First, let's start off by entering the Access Code given to you by your administrator/supervisor:</div>
                </CoolFormItem>

                <br/>

                <CoolFormItem className='columns item'>
                    <div className='column col-12 text-center'>
                        <div className='text-input-container p-centered'>
                            <input id='register-code-input' className='form-input' type='text' placeholder='Access Code'></input>
                        </div>
                    </div>
                </CoolFormItem>

                <br/>

                <CoolFormItem className='columns item'>
                    <div className='column col-12 text-center'>
                        <div id='register-back-button-container'>
                            <button type='submit' id='register-continue-button' className="btn btn-primary">Continue</button>
                        </div>
                    </div>
                </CoolFormItem>
                <CoolFormItem className='columns item'>
                    <div className='column col-12 text-center'>
                        <div id='register-back-button-container'>
                            <button type='button' id='register-back-button' className="btn mt-2 tooltip tooltip-bottom" data-tooltip="Changed your mind? :(" onClick={registerBack}>Back</button>
                        </div>
                    </div>
                </CoolFormItem>
            </CoolForm>
        );
        
    }
}

function login() {
    // Add loading animation to button
    document.getElementById("login-button").classList.replace("tooltip", "loading");

    var data = {
        user: document.getElementById("login-username-input").value,
        pass: document.getElementById("login-password-input").value
    };

    socket.emit("submit-login", data);
}
socket.on("login-response", function(data) {
    if (data.status) {
        console.log("Hi there "+ data.username);

        mainMenu.toggle();
        setTimeout(function() {
            
        }, 200);
    } else {
        console.log(data);
    }
});

function loginRegister() {
    mainMenu.toggle();
    setTimeout(function() {
        regMenu = ReactDOM.render(<RegisterMenu />, document.querySelector('#main-container'));
        regMenu.toggle();
    }, 200);
}

function registerBack() {
    regMenu.toggle();
    setTimeout(function() {
        mainMenu = ReactDOM.render(<MainMenu />, document.querySelector('#main-container'));
        mainMenu.toggle();
    }, 200);
}

function register() {
    console.log("no can do :(");
}