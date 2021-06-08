import Router from 'next/router';
import { Component } from 'react';
import { Icon, Input, Modal } from 'semantic-ui-react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ searchQuery: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    Router.push(`/search?q=${this.state.searchQuery}`);
  }

  render() {
    return (
      <>
        <style jsx>{`
          .menu-search {
            cursor: pointer;
          }
        `}</style>
        <Modal
          trigger={<Icon style={{ fontSize: '1.5em', marginTop: 3 }} name="search" />}
          centered={false}>
          <Modal.Content>
            <Modal.Description>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <Input
                    icon
                    placeholder="Search..."
                    size="large"
                    fluid
                    transparent
                    name="keywords"
                    value={this.state.value}
                    onChange={this.handleChange}>
                    <input />
                    <Icon name="search" />
                  </Input>
                </form>
              </div>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}
