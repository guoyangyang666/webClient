import React, { Component } from 'react';
import { Router,Route, IndexRoute, browserHistory,hashHistory} from 'react-router';

import './App.less';
import './Util';

import MainPage from  '../routes/MainPage';
import Home from '../routes/Home/components/Home';
import Messages from '../routes/Messages/components/Messages';
import LoginInfo from '../routes/Home/components/LoginInfo';
import LabAdmin from '../routes/Home/components/LabInfo/LabAdmin';
import LabEquipEdit from '../routes/Home/components/LabInfo/LabEquipEdit';
import ReserveProcess from '../routes/Home/components/ReserveProcess/ReserveProcess';
import LabNoticeList from '../routes/Home/components/IndexBrowse/LabNoticeList';
import LabNoticeDetail from '../routes/Home/components/IndexBrowse/LabNoticeDetail';
import NewsDetail from '../routes/Home/components/News/NewsDetail';
import EquipList from '../routes/Home/components/IndexBrowse/EquipList';
import EquipBar from '../routes/Home/components/IndexBrowse/EquipBar';
import EquipDetail from '../routes/Home/components/IndexBrowse/EquipDetail';
import EquipLeftBar from '../routes/Home/components/IndexBrowse/EquipLeftBar';
import TeacherAppoint from '../routes/Home/components/IndexBrowse/TeacherAppoint';
global.$history = hashHistory;
const routes = (
  <Router history={$history}>
    <Route path="/" component={MainPage}>
      <Route path="/home/:id" component={Home} />
      <Route path="/LabAdmin/:id" component={LabAdmin} />
      <Route path="/ReserveProcess/:barId" component={ReserveProcess} />
      <Route path="/LabNoticeDetail/:notice_id" component={LabNoticeDetail}/>
      <Route path="/EquipList/:laboratory_id" component={EquipList}/>
      <Route path="/EquipDetail/:equip_id" component={EquipDetail}/>
      <Route path="/NewsDetail/:news_id" component={NewsDetail}/>
      <Route path="/EquipBar" component={EquipLeftBar} />
      <IndexRoute component={Home} />
    </Route>
    <Route path="/LoginInfo" component={LoginInfo} />
    <Route path="/LabNoticeList" component={LabNoticeList} />
    <Route path="/TeacherAppoint" component={TeacherAppoint} />
    <Route path="/LabEquipEdit/:LabEquipid" component={LabEquipEdit} />
  </Router>
);

class App extends Component {
  render() {
    return <div>{routes}</div> ;
  }
}
export default App;
