import React from 'react';
import Login from "../../assets/SignIn/LogIn";
import Register from "../../assets/SignIn/Register";
import { Button } from '../../assets/Button/Button';
import "./SignUp.css"

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true
    };
  }

  componentDidMount() {
    this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLoginActive } = this.state;

    if (isLoginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLoginActive: !prevState.isLoginActive }));
  }

  render() {
    const { isLoginActive } = this.state;
    const current = isLoginActive ? "Register" : "Login";
    const currentActive = isLoginActive ? "login" : "register";
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLoginActive && (
              <div>
                <Button
                  buttonStyle='btn--outline'
                  extraStyles={{marginBottom: '60px'}}
                  extraClasses='sign-up-mobile'
                  onClick={() => { this.setState({ isLoginActive: false }); }}
                >
                  {'Register >'}
                </Button>
                <Login containerRef={ref => (this.current = ref)} />
              </div>
            )}
            {!isLoginActive && (
              <div>
                <Button
                    buttonStyle='btn--outline'
                    extraStyles={{marginBottom: '60px'}}
                    extraClasses='sign-up-mobile'
                    onClick={() => { this.setState({ isLoginActive: true }); }}
                  >
                  {'< Log in'}
                </Button>
                <Register containerRef={ref => (this.current = ref)} />
              </div>
            )}
          </div>

          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side-desktop right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>

  );
}

export default SignUp;
