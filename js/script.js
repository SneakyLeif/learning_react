'use strict';

function load() {
    document.getElementById("loading-div").style.display = 'none';

    var element = (
        <div id="titlebar" className='columns'>
            <div className='column col-1'></div>
            <div id='navbar' className='column col-10'>
                <div className='text-center'>
                    <img src='img/logo.png' style={{"height": "80px", "position": "relative", "top": "-4px"}}></img>
                </div>
            </div>
            <div className='column col-1'></div>
        </div>
    );
    ReactDOM.render(element, document.querySelector('#navbar-container'));

    var element = (
        <div>
            <div className='columns'>
                <div className='column col-12 text-center'>
                    <h1>DCI Login</h1>
                </div>
            </div>

            <br/>

            <div className='columns'>
                <div className='column col-5'></div>

                <div className='column col-2' style={{"textAlign": "center"}}>
                    <input id='login-username-input' class='form-input' type='text' placeholder='Username'></input>

                    <br/><br/>

                    <input id='login-password-input' class='form-input' type='password' placeholder='Password'></input>
                </div>
                
                <div className='column col-5'></div>
            </div>

            <br/>

            <div className='columns'>
                <div className='column col-12 text-center'>
                    <div id='login-button-container'>login</div>
                    <div id='login-register-button-container'>register</div>
                </div>
            </div>
        </div>
    );
    ReactDOM.render(element, document.querySelector('#main-container'));

    class LoginButton extends React.Component {
        render() {
            return (<button className="btn btn-primary" onClick={login}>Log In</button>);
        }
    }
    ReactDOM.render(React.createElement(LoginButton), document.querySelector('#login-button-container'));

    class LoginRegisterButton extends React.Component {
        render() {
            return (<button className="btn mt-2" onClick={loginRegister}>Register</button>);
        }
    }
    ReactDOM.render(React.createElement(LoginRegisterButton), document.querySelector('#login-register-button-container'));
}
load();

function login() {
    var user = document.getElementById("login-username-input").value;
    var pass = document.getElementById("login-password-input").value;
    console.log(user);
}

function loginRegister() {

}

/*
var clicks = 0;
var stored = 0;

function refresh() {
    ReactDOM.render(<div>Clicks: {clicks}</div>, document.querySelector('#click_count_container'));
    ReactDOM.render(<div>Stored: {stored}</div>, document.querySelector('#stored_count_container'));
}
refresh();

class ClickButton extends React.Component {
    constructor(props) {
        super(props);
    }

    clickButton() {
        clicks++;
        refresh();
    }

    render() {
        return (
            <button class="btn" onClick={() => this.clickButton()}>
                Increment
            </button>
        );
    }
}
ReactDOM.render(React.createElement(ClickButton), document.querySelector('#click_button_container'));

class StoreButton extends React.Component {
    constructor(props) {
        super(props);
    }

    clickButton() {
        if (clicks > 0) {
            socket.emit("storeClicks", clicks);
        }
    }

    render() {
        return(
            <button class="btn" onClick={() => this.clickButton()}>
                Store
            </button>
        )
    }
}
ReactDOM.render(React.createElement(StoreButton), document.querySelector('#store_button_container'));

socket.on("storeResponse", function(data) {
    if (data.status) {
        clicks -= data.storedClicks;
        stored = data.totalStored;
        refresh();
    }
});*/