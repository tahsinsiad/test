import styled from '@emotion/styled';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { Button, Modal } from "semantic-ui-react";
import { Button, Modal } from 'semantic-ui-react';
import Swal from 'sweetalert2';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email };
    data['api_key'] = 'bafemy';
    // console.log(data);
    const url = 'https://app.centre.my/api/newsletter/v1/subscribe';

    let result = await axios
      .post(url, data)
      .then(function (res) {
        if (res.status == 200) {
          Swal.fire({
            title: 'Success!',
            text: "You've successfully subscribed to our newsletter.",
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        } else {
        }
      })
      .catch(function (error) {
        Swal.fire({
          title: 'Sorry!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });

    return success;
  };

  return (
    <>
      <SubscribeForm>
        <h4>
          JOIN OUR MAILING LIST.
          <br />
          WE WON’T SPAM YOU!
        </h4>
        <form id="subscribe" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={email}
          />
          <button className="subscribe-btn" type="submit">
            OK
          </button>
        </form>
      </SubscribeForm>

      <Modal size="tiny" open={open}>
        <Modal.Content>
          <Modal.Description>
            {success ? (
              <p style={{ color: '#000000' }}>Thanks for signing up!</p>
            ) : (
              <p>{errorMessage}</p>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button content="OK" color="brown" />
        </Modal.Actions>
      </Modal>
    </>
  );
}

const SubscribeForm = styled.div`
  h4 {
    color: #fff;
    font-family: ${(props) => props.theme.font.primary};
    font-weight: 700;
    font-size: 20px;
    margin: 0 0 6px 0;
  }

  form {
    display: flex;
  }

  input[type='email'] {
    font-family: ${(props) => props.theme.font.primary};
    font-size: 11px;
    border: 1px solid #000;
    height: 28px;
    width: 189px;
    padding: 5px;
  }

  button {
    height: 28px;
    border-radius: 0;
    border: 1px solid #000;
    font-family: ${(props) => props.theme.font.primary};
  }
`;
