import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import ProfileUser from '../pages/ProfileUser';
import Followers from '../pages/Followers';
import Repositories from '../pages/Repositories';
import Contributors from '../pages/Contributors';
import Repository from '../pages/Repository';
import Suggestions from '../pages/Suggestions';
import ProjectDocumentation from '../pages/ProjectDocumentation';

import News from '../pages/News';
import NewsAlura from '../pages/News/alura';
import NewsLawProject from '../pages/News/projetoLei';
import NewsMetaVerso from '../pages/News/metaverso';
import NewsDevelopers from '../pages/News/desenvolvedores';

import MyProjects from '../pages/MyProjects'

import Message from '../pages/Message';
import NotFound from '../pages/NotFound';

export default function MyRoutes() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/register" component={SignUp} />
                <Route exact path="/forgot-password" component={ForgotPassword} />

                <Route exact path="/dashboard" component={Dashboard} isPrivate />
                <Route exact path="/profile" component={Profile} isPrivate />
                <Route exact path="/user/:id" component={ProfileUser} isPrivate />
                <Route exact path="/followers" component={Followers} isPrivate />
                <Route exact path="/repositories" component={Repositories} isPrivate />
                <Route exact path="/repository/:repository" component={Repository} isPrivate />
                <Route exact path="/contributors" component={Contributors} isPrivate />
                <Route exact path="/suggestions" component={Suggestions} isPrivate/>
                <Route exact path="/documentation" component={ProjectDocumentation} isPrivate />

                <Route exact path="/news" component={News} isPrivate />
                <Route exact path="/news/alura" component={NewsAlura} isPrivate />
                <Route exact path="/news/law-project" component={NewsLawProject} isPrivate />
                <Route exact path="/news/metaverso" component={NewsMetaVerso} isPrivate />
                <Route exact path="/news/developers-lack" component={NewsDevelopers} isPrivate />

                <Route exact path="/myprojects" component={MyProjects} isPrivate />
                <Route exact path="/message" component={Message} isPrivate />

                <Route path="*" component={NotFound} />
            </Switch>
        </>
    )
}