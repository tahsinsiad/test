import axios from 'axios';
import React, { Component } from 'react';
// import { Button, Modal } from "semantic-ui-react";
import { Button, Modal } from 'semantic-ui-react';

export default class Subscribe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      success: false,
      open: false,
      errorMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      email: e.target.value
    });
  };

  close = () => {
    this.setState({
      open: false,
      email: ''
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email: this.state.email };
    data['api_key'] = 'bafemy';
    // console.log(data);
    const url = 'https://app.centre.my/api/newsletter/v1/subscribe';

    let result = await axios
      .post(url, data)
      .then(function (res) {
        if (res.status == 200) {
          // console.log(res);
          return res.status;
        } else {
          // console.log(res.status);
        }
      })
      .catch(function (error) {
        console.log(`something happen 😭 ${error}`);
        return error.response.data.message;
      });

    if (result === 200) {
      this.setState({ success: true, open: true });
    } else {
      this.setState({ open: true, errorMessage: result });
    }

    return this.state.success;
  };

  render() {
    return (
      <>
        <div id="subscribe" className="subscribe-container">
          <div className="sub-left">
            <h2>Sign up for Updates</h2>
            <p>New primers, commentaries, research and more</p>
          </div>

          <div className="sub-right">
            <div>
              <div>
                <form id="subscribe" onSubmit={this.handleSubmit}>
                  <input
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    value={this.state.email}
                  />
                  <button className="subscribe-btn" type="submit"></button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Modal size="tiny" open={this.state.open}>
          <Modal.Content>
            <Modal.Description>
              {this.state.success ? (
                <p style={{ color: '#000000' }}>Thanks for signing up!</p>
              ) : (
                <p>{this.state.errorMessage}</p>
              )}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} content="OK" color="brown" />
          </Modal.Actions>
        </Modal>
        <style jsx>
          {`
            .subscribe-container {
              width: 1200px;
              margin: auto;
              display: flex;
              margin-bottom: 80px;
              justify-content: space-between;
            }
            .subscribe-btn {
              background-color: transparent;
              border: none;
              cursor: pointer;
              margin-left: -20px;
              margin-top: 7%;
              width: 150px;
            }

            .subscribe-btn img {
              width: 100%;
            }

            .subscribe-btn:focus,
            .subscribe-btn img:focus {
              outline: none;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              font-family: 'Catamaran', sans-serif;
              font-weight: 700;
            }
            p {
              font-family: 'Poly', serif;
              font-size: 24px;
              line-height: 25px;
              color: #bf8844;
              font-weight: 400;
            }

            h2 {
              font-size: 100px;
              line-height: 90px;
              margin: 0;
              font-weight: 800;
              margin-bottom: 20px;
            }

            .sub-left {
              width: 43%;
            }

            .sub-right {
              width: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .sub-right > div {
              width: 100%;
              display: flex;
            }

            input {
              font-size: 25px;
              width: 100%;
              border-top: 0;
              border-left: 0;
              border-right: 0;
              border-radius: 0;
              border-bottom: 2px solid #bf8845;
            }

            input:focus {
              outline: none;
            }

            input::placeholder {
              color: #f1dfcb;
              font-size: 25px;
            }

            .delivery-time {
              color: #707070;
              font-size: 13px;
            }

            #subscribe {
              display: flex;
              align-items: center;
            }

            @media all and (min-width: 768px) and (max-width: 1024px) {
              .subscribe-container {
                width: 90%;
              }

              h2 {
                font-size: 50px;
                line-height: 55px;
                margin: 0;
              }

              .subscribe-btn {
                width: 70px;
                height: 70px;
                font-size: 10px;
              }
            }

            @media all and (max-width: 767px) {
              .subscribe-container {
                width: 90%;
                flex-direction: column;
                margin-top: 20px;
                margin-bottom: 40px;
              }

              input::placeholder {
                color: #f1dfcb;
                font-size: unset;
              }

              input {
                font-size: unset;
              }

              .sub-left,
              .sub-right {
                width: 100%;
              }
              .sub-left {
                margin-top: 40px;
              }

              .sub-left h2 {
                font-size: 50px;
                line-height: 50px;
                text-align: center;
              }

              .sub-left p,
              .sub-right p {
                text-align: center;
                font-size: 16px;
                line-height: 16px;
              }

              input {
                width: 100%;
                margin-bottom: 20px;
                text-align: center;
              }

              input:focus {
                outline: none;
              }

              .sub-right > div {
                display: flex;
                flex-direction: column;
              }

              .subscribe-btn {
                height: unset;
                width: 42%;
                color: #fff;
                border: none;
                margin-top: 0;
                cursor: pointer;
                padding: 20px 0;
                font-size: 20px;
              }
              #subscribe {
                margin-bottom: 40px;
              }
            }
          `}
        </style>
      </>
    );
  }
}
