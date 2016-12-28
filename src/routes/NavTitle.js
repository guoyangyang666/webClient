import React from 'react'
import { Link } from 'react-router'
import { Row, Col , Icon} from 'antd';


const NavTitle = React.createClass({

  getInitialState() {
    return {
    };
  },

  render() {

    const {navDesc} = this.props
    const {navTo} = this.props

    const style = {
      nav : {
        //backgroundImage: "url(" + $IMAGE_ROOT_PATH + "home_01/bg_menu.png)"
        background : "#008b6b"
      },
      back :{
        margin: "0 auto",
        position: "absolute",
        left : 10,
        top : "15%"
      }
    }

    return(
        <div>
          <Row style={style.nav}>
            <Col span="4" className="home-title center" >
              <Link to={navTo} style={style.back}><Icon type="left" /></Link><span>{navDesc}</span>
            </Col>
          </Row>
        </div>
    );
  }
});

module.exports = NavTitle
