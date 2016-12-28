import React from 'react'
import { Link } from 'react-router'
import { Row, Col} from 'antd';

const MenuItem = React.createClass({

  getInitialState() {
    return {
      currenKey: '',
      imgUp : '',
      imgDown : '',
      key : '',
    };
  },
  handleClick() {
    this.props.onHungry(this.props.menuKey);
  },
  render() {

    const style = {
      width : 18
    }

    const {imgUp} = this.props
    const {imgDown} = this.props
    const {menuKey} = this.props
    const {currenKey} = this.props
    const {menuDesc} = this.props
    const {menuGoTo} = this.props

    return(
      <div onClick={this.handleClick} className="page-menu-item-div">
        <Link to={menuGoTo} >
          <img  src={currenKey == menuKey ? imgDown : imgUp} style={style} />
        </Link>
        <span className="page-menu-item-span" >{menuDesc}</span>
      </div>
    );
  }
});

const PageMenu = React.createClass({
  getInitialState() {
    return {
      current: '0',
    };
  },
  handleClick(e) {
    this.setState({
      current: e.key
    });
  },
  onHungry: function(onKey) {

    this.setState({
      current: onKey
    });
  },

render() {
  return (
       <div>
        <Row>
          <Col span="6"className="page-menu-item center">
            <MenuItem menuDesc="健康服务" menuGoTo="/home" onHungry={this.onHungry}   menuKey="1" currenKey={this.state.current} />
          </Col>
          <Col span="6" className="page-menu-item center">
            <MenuItem menuDesc="慧生活" menuGoTo="/msg" onHungry={this.onHungry}   menuKey="2" currenKey={this.state.current} />
          </Col>
          <Col span="6" className="page-menu-item center">
            <MenuItem menuDesc="消息" menuGoTo="/proposal" onHungry={this.onHungry}  menuKey="3" currenKey={this.state.current} />
          </Col>
          <Col span="6" className="page-menu-item center">
            <MenuItem menuDesc="我" menuGoTo="/register" onHungry={this.onHungry} menuKey="4" currenKey={this.state.current} />
          </Col>
        </Row>
      </div>
  );
}
});


export default PageMenu
