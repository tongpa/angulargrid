# -*- coding: utf-8 -*-
"""Main Controller"""

from tg import expose, flash, require, url, lurl
from tg import request, redirect, tmpl_context
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from angulargrid import model
from angulargrid.controllers.secure import SecureController
from angulargrid.model import DBSession
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController

from angulargrid.lib.base import BaseController
from angulargrid.controllers.error import ErrorController

from .sample import SampleController
__all__ = ['RootController']


class RootController(BaseController):
    """
    The root controller for the angulargrid application.

    All the other controllers and WSGI applications should be mounted on this
    controller. For example::

        panel = ControlPanelController()
        another_app = AnotherWSGIApplication()

    Keep in mind that WSGI applications shouldn't be mounted directly: They
    must be wrapped around with :class:`tg.controllers.WSGIAppController`.

    """
    secc = SecureController()
    admin = AdminController(model, DBSession, config_type=TGAdminConfig)

    error = ErrorController()
    sample = SampleController()
    
    def _before(self, *args, **kw):
        tmpl_context.project_name = "angulargrid"
    
    @expose(content_type='text/plain')
    def exenv(self):
        #print "HTTP_X_FORWARDED_FOR : %s" %(request.environ.get('HTTP_X_FORWARDED_FOR',  request.environ.get('REMOTE_ADDR')))
        return 'Past Greetings\n' + '\n'.join(['%s - %s' % (key, request.environ[key] ) for key in request.environ])
        
    @expose('angulargrid.templates.index')
    def index(self):
        """Handle the front-page."""       

        #print "request.headers : %s" % request.headers
        
        #for key in request.headers:
        #    print "key : %s \t value : %s" % (key, request.headers[key])
        
        #print "--------------------------------"
        #for key in request.environ:
        #    print "key : %s \t value : %s" % (key, request.environ[key])
        #http://192.168.1.73:8080/sample/samplepaging
        redirect('/sample/samplepaging' )
        #return dict(page='index')
    

    @expose('angulargrid.templates.data')
    @expose('json')
    def data(self, **kw):
        """
        This method showcases how you can use the same controller
        for a data page and a display page.
        """
        return dict(page='data', params=kw)
    @expose('angulargrid.templates.index')
    @require(predicates.has_permission('manage', msg=l_('Only for managers')))
    def manage_permission_only(self, **kw):
        """Illustrate how a page for managers only works."""
        return dict(page='managers stuff')

    @expose('angulargrid.templates.index')
    @require(predicates.is_user('editor', msg=l_('Only for the editor')))
    def editor_user_only(self, **kw):
        """Illustrate how a page exclusive for the editor works."""
        return dict(page='editor stuff')

    @expose('angulargrid.templates.login')
    def login(self, came_from=lurl('/'), failure=None, login=''):
        """Start the user login."""
        if failure is not None:
            if failure == 'user-not-found':
                flash(_('User not found'), 'error')
            elif failure == 'invalid-password':
                flash(_('Invalid Password'), 'error')

        login_counter = request.environ.get('repoze.who.logins', 0)
        if failure is None and login_counter > 0:
            flash(_('Wrong credentials'), 'warning')

        return dict(page='login', login_counter=str(login_counter),
                    came_from=came_from, login=login)

    @expose()
    def post_login(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on successful
        authentication or redirect her back to the login page if login failed.

        """
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                     params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
        flash(_('Welcome back, %s!') % userid)

        # Do not use tg.redirect with tg.url as it will add the mountpoint
        # of the application twice.
        return HTTPFound(location=came_from)

    @expose()
    def post_logout(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on logout and say
        goodbye as well.

        """
        flash(_('We hope to see you soon!'))
        return HTTPFound(location=came_from)
