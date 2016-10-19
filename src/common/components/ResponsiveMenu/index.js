import { PropTypes, Component } from 'react';
import cx from 'classnames';

import { addEvent, isDescendant } from 'lib/dom';
import SvgIcon from 'common/components/Icon/Svg';

import styles from './styles.less';

export default class ResponsiveMenu extends Component {
  static propTypes = {
    children: PropTypes.array,
    itemClassName: PropTypes.string,
    className: PropTypes.string,
  };

  state = {
    shown: false,
  };

  componentDidMount () {
    this.detatch = addEvent('click', this.onWindowClick);
  }

  componentWillUnmount () {
    this.detatch();
  }


  onWindowClick = (e) => {
    if (!this.state.shown || isDescendant(this._root, e.target)) {
      return;
    }

    this.reset();
  }

  reset = () => {
    this.setState({
      shown: false,
    });
  };

  toggle = (e) => {
    e.stopPropagation();

    this.setState({
      shown: !this.state.shown,
    });
  }

  render () {
    const { children, className, itemClassName, ...props } = this.props;
    const { shown } = this.state;

    return (
      <div
        ref={(e) => (this._root = e)}
        className={cx(styles.root, className, shown ? styles.shown : styles.hidden)}
      >
        <button className={styles.toggleButton} onClick={this.toggle}>
          <span>{shown ? 'Hide Menu' : 'Show Menu'}</span>
          <SvgIcon name="more-vert" />
        </button>

        <ul className={styles.listRoot} {...props}>
          {children.map((item, index) => (
            <li
              key={index}
              onClick={this.reset}
              className={cx(styles.item, itemClassName)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
