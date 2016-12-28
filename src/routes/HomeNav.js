import React from 'react'
import { Link } from 'react-router'
import { Row, Col} from 'antd';

const HomeNav = React.createClass({

  getInitialState() {
  return {
    navKey : ''
  };
},
handleClick() {
  if(this.state.navKey == 1){
    //window.location.href = "http://www.baidu.com";
  }
},
render() {

  const {imgSrc} = this.props
  const {navKey} = this.props
  const {navDesc} = this.props
  const {navTo} = this.props

  this.state.navKey = navKey;

  const style = {
    img :{
     width :38,
     height : 38
    },
    text : {
      fontSize: 14,
      color:'#333333'
    },
    nav : {

    }
  }

  return(
      <Link to={navTo} >
        <table style={style.nav}>
          <tbody>
          <tr>
            <td className="center"><img  src={imgSrc} style={style.img} /></td>
          </tr>
          <tr>
            <td><span style={style.text} >{navDesc}</span></td>
          </tr>
          </tbody>
        </table>
      </Link>
);
}
});


module.exports = HomeNav
