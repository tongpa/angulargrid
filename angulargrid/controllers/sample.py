# -*- coding: utf-8 -*-
""" controller module"""

from tg import expose, redirect, validate, flash, url, request, response
import sys
import json
from angulargrid import model
# from tg.i18n import ugettext as _
# from tg import predicates

from angulargrid.lib.base import BaseController
# from angulargrid.model import DBSession
from angulargrid.service import AuthenService

class SampleController(BaseController):
    # Uncomment this line if your controller requires an authenticated user
    # allow_only = predicates.not_anonymous()
    
    def __init__(self):
        self.authenService = AuthenService()
    @expose('angulargrid.templates.sample')
    def index(self, **kw):
        return dict(page='sample-index')
    
    
    @expose('angulargrid.templates.samplepage')
    def samplepaging(self, **kw):
        return dict(page='sample-index')
    
    
    @expose('json')#,  content_type='application/json;charset=utf-8')
    def angular_data(self, *args, **kw):
        #print kw
        #print args
        #print len(request.body)
        #print type(request.body)
        self.values = []
        self.total=0
        NAMES = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple','fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
  
        if len(request.body) >0:
            self.questionGroup =  json.loads(request.body, encoding=request.charset )
            #print self.questionGroup
            
            self.values,self.total =  self.authenService.getUserBySearch(page=self.questionGroup.get('pageIndex'), page_size=self.questionGroup.get('pageSize'))
            temp = []
            import random

            for v in self.values:
                temp.append({  'id': v.user_id,
                              'name': v.user_name,
                              'progress': str(random.randint(1,100)) ,
                              'color': random.sample(NAMES, 1)[0]  })
                
            self.values = temp
                
            
        #print "show : %s total : %s" %(len(self.values), self.total)   
        reload(sys).setdefaultencoding("utf-8");
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["AAccess-Control-Allow-Methods"] = "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Origin, Content-Type, X-Auth-Token"

        
        
        return dict(success=True,data=self.values, total = self.total );