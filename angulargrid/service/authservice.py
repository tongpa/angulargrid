# -*- coding: utf-8 -*-
from angulargrid import model

class AuthenService(object):
    
    def __init__(self):
        pass
    
    
    def getUserBySearch(self,search="",act=1, page=0, page_size=None ):
        query = model.DBSession.query(model.User).filter(model.User.user_name.like('%' + str(search) + '%')) #, cls.active == str(act)
        query_total = query;                
        if page_size:
            query = query.limit(page_size)
        if page: 
            page = 0 if page < 0 else page;
            query = query.offset(page*page_size)
        values = query.all();  
        total = query_total.count();
        #data = [];
        #for v in values:
        #    data.append(v.to_content_json());
        return values,total;