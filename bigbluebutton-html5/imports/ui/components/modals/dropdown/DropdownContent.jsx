import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Icon from '/imports/ui/components/icon/component';
import classNames from 'classnames';
import styles from './styles';
import SettingsModal from '../settings/SettingsModal';
import SessionMenu from '../settings/submenus/SessionMenu';

export default class DropdownContent extends Component {

  constructor(props) {
    super(props);
    this.menus = [];
  }

  componentWillMount() {
    this.setState({ activeMenu: -1, focusMenu: 0, });
    this.menus.push({ className: '',
      props: { title: 'Fullscreen', prependIconName: 'icon-',
                icon: 'bbb-full-screen', }, tabIndex: 1, });
    this.menus.push({ className: SettingsModal,
      props: { title: 'Settings/Options', prependIconName: 'icon-',
                icon: 'bbb-more', }, tabIndex: 2, });
    this.menus.push({ className: SessionMenu,
      props: { title: 'Leave Session', prependIconName: 'icon-',
                icon: 'bbb-logout', }, tabIndex: 3, });
  }

  handleListKeyDown(event) {
    const pressedKey = event.keyCode;
    let menusLength = this.menus.length - 1;

    // tab
    if (pressedKey === 9) {
      let newIndex = 0;
      if (this.state.focusMenu >= menusLength) {
        newIndex = menusLength;
      } else {
        newIndex = this.state.focusMenu + 1;
      }

      this.setState({ focusMenu: newIndex });
      return;
    }

    // shift + tab
    if (event.shiftKey && pressedKey === 9) {
      let newIndex = 0;
      if (this.state.focusMenu <= 0) {
        newIndex = 0;
      } else {
        newIndex = this.state.focusMenu - 1;
      }

      this.setState({ focusMenu: newIndex });
      return;
    }

    // Up key
    if (pressedKey === 38) {
      if (this.state.focusMenu <= 0) { // checks if at end of menu
        this.setState({ focusMenu: menusLength },
           function () { ReactDOM.findDOMNode(this.refs[`menu${this.state.focusMenu}`]).focus();
         });
      } else {
        this.setState({ focusMenu: this.state.focusMenu - 1 },
           function () { ReactDOM.findDOMNode(this.refs[`menu${this.state.focusMenu}`]).focus(); });
      }

      return;
    }

    // Down key
    if (pressedKey === 40) {
      if (this.state.focusMenu >= menusLength) { // checks if at end of menu
        this.setState({ focusMenu: 0 },
           function () { ReactDOM.findDOMNode(this.refs[`menu${this.state.focusMenu}`]).focus();
         });
      } else {
        this.setState({ focusMenu: this.state.focusMenu + 1 },
           function () { ReactDOM.findDOMNode(this.refs[`menu${this.state.focusMenu}`]).focus(); });
      }

      return;
    }

    // Enter and SpaceBar
    if (pressedKey === 13 || pressedKey === 32) {
      this.clickMenu(this.state.focusMenu);
      return;
    }
  }

  clickMenu(i) {
    if (i < 0) {
      this.setState({ activeMenu: -1, focusMenu: 0, });
    }

    if (i >= this.menus.length) {
      this.setState({ activeMenu: this.menus.length - 1,
          focusMenu: this.menus.length - 1, });
    } else {
      this.setState({ activeMenu: i, focusMenu: i, });
    }
  }

  createMenu() {
    const curr = this.state.activeMenu;
    console.log(curr);

    if(curr === 0) {
      return console.log('full screen trigger');
    }

    if(curr === 1) {
      return <SettingsModal />;
    }

    if (curr == 2) {
      return <SessionMenu />;
    }

  }

  render() {
    return (
      <div className={styles.dropdown__active__content}>
        <p id="dropdownModal" className={styles.descModal}>Setting dropdown</p>
        <ul className={styles.menuList} role="menu">
          {this.menus.map((value, index) => (
            <li key={index} role='menuitem'
              tabIndex={value.tabIndex}
              onClick={this.clickMenu.bind(this, index)}
              onKeyDown={this.handleListKeyDown.bind(this)}
              ref={'menu' + index}
              className={styles.settingsMenuItem}>
              <Icon key={index} prependIconName={value.props.prependIconName}
                iconName={value.props.icon} title={value.props.title}/>
              <span className={styles.settingsMenuItemText}>{value.props.title}</span>
              {index == '0' ? <hr /> : null}
            </li>
          ))}
        </ul>
        <div>{this.createMenu()}</div>
      </div>
    );
  }
}
