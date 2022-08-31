import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import ForgotPassword from '../pages/ForgotPassword';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Company from '../pages/Company';
import Contributors from '../pages/Contributors';
import Dashboard from '../pages/Dashboard';
import Followers from '../pages/Followers';
import Home from '../pages/Home';
import Message from '../pages/Message';
import MyProjects from '../pages/MyProjects';
import News from '../pages/News';
import NewsAlura from '../pages/News/alura';
import NewsDevelopers from '../pages/News/desenvolvedores';
import NewsMetaVerso from '../pages/News/metaverso';
import NewsLawProject from '../pages/News/projetoLei';
import Opportunities from '../pages/Opportunities';
import ProjectDocumentation from '../pages/ProjectDocumentation';
import Publication from '../pages/Publication';
import RegisterCompany from '../pages/RegisterCompany';
import Repositories from '../pages/Repositories';
import Repository from '../pages/Repository';
import Suggestions from '../pages/Suggestions';
import Updates from '../pages/Updates';
import User from '../pages/User';

export default function MyRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/register-company" component={RegisterCompany} />

<<<<<<< HEAD
      {/* private routes */}
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/user/:id" component={ProfileUser} />
      <Route exact path="/followers" component={Followers} />
      <Route exact path="/repositories" component={Repositories} />
      <Route exact path="/repository/:repository" component={Repository} />
      <Route exact path="/contributors" component={Contributors} />
      <Route exact path="/suggestions" component={Suggestions} />
      <Route exact path="/documentation" component={ProjectDocumentation} />
      <Route exact path="/updates" component={Updates} />
=======
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      {/* <Route exact path="/profile" component={Profile} isPrivate />
      <Route exact path="/user/:id" component={ProfileUser} isPrivate /> */}
      <Route exact path="/followers" component={Followers} isPrivate />
      <Route exact path="/repositories" component={Repositories} isPrivate />
      <Route exact path="/repository/:repository" component={Repository} isPrivate />
      <Route exact path="/contributors" component={Contributors} isPrivate />
      <Route exact path="/suggestions" component={Suggestions} isPrivate />
      <Route exact path="/documentation" component={ProjectDocumentation} isPrivate />
      <Route exact path="/updates" component={Updates} isPrivate />
>>>>>>> 9828620a7080d38dcae3d10d2e00471babed73dd

      <Route exact path="/news" component={News} />
      <Route exact path="/news/alura" component={NewsAlura} />
      <Route exact path="/news/law-project" component={NewsLawProject} />
      <Route exact path="/news/metaverso" component={NewsMetaVerso} />
      <Route exact path="/news/developers-lack" component={NewsDevelopers} />

<<<<<<< HEAD
      <Route exact path="/myprojects" component={MyProjects} />
      <Route exact path="/message" component={Message} />
      <Route exact path="/publication/:id" component={Publication} />
      <Route exact path="/opportunities" component={Opportunities} />
      <Route exact path="/company/:username" component={Company} />
=======
      <Route exact path="/myprojects" component={MyProjects} isPrivate />
      <Route exact path="/message" component={Message} isPrivate />
      <Route exact path="/publication/:id" component={Publication} isPrivate />
      <Route exact path="/opportunities" component={Opportunities} isPrivate />
      <Route exact path="/company/:username" component={Company} isPrivate />
      <Route exact path="/user/:username" component={User} isPrivate />
>>>>>>> 9828620a7080d38dcae3d10d2e00471babed73dd
    </Switch>
  );
}
