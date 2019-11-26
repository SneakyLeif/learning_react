'use strict';

var user = {
    name: ""
};

var titleBar;
var mainMenu;
var regMenu;
var leftNavBar;
var rightNavBar;
var focusScreen;

var CoolForm = posed.form({
    on: { staggerChildren: 75 },
    off: { staggerChildren: 25 }
});
var CoolFormItem = posed.div({
    on: { y: 0, x: 0, opacity: 1 },
    off: { y: -10, x: -20, opacity: 0 }
});
class MainMenu extends React.Component {
    state = { isOn: false };

    submit(e) {
        e.preventDefault();
        login_submit();
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
        on: {y: 0}
    });
    var TitleBarLogo = posed.img({
        on: {y: 0},
        off: {y: -50}
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
                    <div id='left-navbar' className='column col-5'></div>
                    <div id='navbar' className='column col-2 dciLogo'>
                        <div className='text-center'>
                            <TitleBarLogo src='img/logo.png' style={{"position": "relative", "height": "80px", "opacity": "1", "z-index": "10"}}></TitleBarLogo>
                        </div>
                    </div>
                    <div id='right-navbar' className='column col-5'></div>
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

var CoolTabsLeft = posed.section({
    on: {
        staggerChildren: 100,
        staggerDirection: -1,
        opacity: 1
    },
    off: {
        opacity: 0
    }
});
var CoolTabsRight = posed.section({
    on: {
        staggerChildren: 100,
        opacity: 1
    },
    off: {
        opacity: 0
    }
});
var CoolTabItem = posed.div({
    on: {
        y: 0,
        x: 0,
        opacity: 1
    },
    off: {
        y: 10,
        x: 0,
        opacity: 0
    }
});
class Tabs extends React.Component {
    state = { isOn: false };

    constructor(props) {
        super(props);
    }

    toggle = () => this.setState({ isOn: !this.state.isOn });

    render() {
        const { isOn } = this.state;

        if (this.props.id == 'left-bar') {
            return (
                <CoolTabsLeft class="tab tab-block" pose={isOn ? 'on' : 'off'}>
                    <CoolTabItem class="tab-item">
                        <a href="#" onClick={() => changeTab(1)}>Invoices</a>
                    </CoolTabItem>
                    <CoolTabItem class="tab-item">
                        <a href="#" onClick={() => changeTab(2)}>Work Orders</a>
                    </CoolTabItem>
                    <CoolTabItem class="tab-item">
                        <a href="#" onClick={() => changeTab(3)}>Customers</a>
                    </CoolTabItem>
                    <CoolTabItem class="tab-item active">
                        <a href="#" onClick={() => changeTab(4)}>Dashboard</a>
                    </CoolTabItem>
                </CoolTabsLeft>
            );
        } else if (this.props.id == 'right-bar') {
            return (
                <CoolTabsRight class="tab tab-block" pose={isOn ? 'on' : 'off'}>
                    <CoolTabItem class="tab-item">
                        <a href="#" onClick={() => changeTab(5)}>Inventory</a>
                    </CoolTabItem>
                    <CoolTabItem class="tab-item">
                        <a href="#" onClick={() => changeTab(6)}>Vendors</a>
                    </CoolTabItem>
                    <CoolTabItem class="tab-item">
                        <a href="#" onClick={() => changeTab(7)}>Purchasing</a>
                    </CoolTabItem>
                    <CoolTabItem class="tab-item">
                        <a href="#" onClick={() => changeTab(8)}>Settings</a>
                    </CoolTabItem>
                </CoolTabsRight>
            );
        }
        
    }
}
var leftNavBar = ReactDOM.render(<Tabs id='left-bar' />, document.querySelector('#left-navbar'));
var rightNavBar = ReactDOM.render(<Tabs id='right-bar' />, document.querySelector('#right-navbar'));

function changeTab(tab) {
    if (tab == 1) {
        console.log("inv");
    } else if (tab == 2) {
        console.log("wo's");
    } else if (tab == 3) {
        console.log("hi");
    } else if (tab == 4) {
        
    } else if (tab == 5) {
        
    } else if (tab == 6) {
        
    } else if (tab == 7) {
        
    } else if (tab == 8) {
        
    }
}

var AnimatedFocusScreen = posed.div({
    on: {
        y: 0,
        opacity: 1,
        transition: { duration: 300, ease: "backIn", type: "spring", damping: 15, mass: 0.85 },
        "margin-left": "0px",
        "margin-right": "0px",
        width: "100%"
    },
    off: {
        y: "50%",
        opacity: 0,
        transition: { duration: 300, ease: "backOut", type: "spring"},
        "margin-left": "25%",
        "margin-right": "25%",
        width: "50%"
    }
});
class FocusScreen extends React.Component {
    state = { isOn: false };

    constructor(props) {
        super(props);
    }

    toggle = () => this.setState({ isOn: !this.state.isOn });

    render() {
        const { isOn } = this.state;

        return (
            <AnimatedFocusScreen id='focus-screen' pose={isOn ? 'on' : 'off'}>

            </AnimatedFocusScreen>
        );
    }
}
/*
class Customers extends React.Component {
    state = { isOn: false };

    constructor(props) {
        super(props);
    }

    toggle = () => this.setState({ isOn: !this.state.isOn });

    render() {
        const { isOn } = this.state;

        return (

        );
    }
}
*/
class Dashboard extends React.Component {

}

function login_submit() {
    // Add loading animation to button
    document.getElementById("login-button").classList.add("loading");

    var data = {
        user: document.getElementById("login-username-input").value,
        pass: document.getElementById("login-password-input").value
    };

    socket.emit("submit-login", data);
}
socket.on("login-response", function(data) {
    if (data.status) {
        console.log("Hi there "+ data.username);

        user.name = data.username;

        document.getElementById("login-button").classList.remove("loading");
        document.getElementById("login-button").innerHTML = "Done!";

        mainMenu.toggle();
        setTimeout(function() {
            leftNavBar.toggle();
            rightNavBar.toggle();
            focusScreen = ReactDOM.render(<FocusScreen />, document.querySelector('#main-container'));
            //setTimeout(() => focusScreen.toggle(), 300);
            focusScreen.toggle();
            
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