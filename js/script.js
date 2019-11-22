'use strict';

function load() {
    removeElement("loading-div");

    var element = (
        <div id="titlebar" className='columns'>
            <div className='column col-1'></div>
            <div id='navbar' className='column col-10'>
                <div className='text-center'>
                    <img src='img/logo_med.png' style={{"position": "relative", "top": "-4px"}}></img>
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
                    <h1 id='dci-login-text'>DCI Login</h1>
                </div>

            </div>

            <div className='columns'>
                <div className='column col-5'></div>

                <div className='column col-2' style={{"textAlign": "center"}}>
                        <input id='login-username-input' classname='form-input' placeholder="Username" type='text'></input>
                        <input id='login-password-input' classname='form-input' placeholder="Password" type='password'></input>
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

function removeElement(str) {
    var elem = document.querySelector("#"+ str);
    elem.parentNode.removeChild(elem);
}