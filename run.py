#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''Start the Paster server

Given command line arguments will be passed through
'''
#
## SAUCE - System for AUtomated Code Evaluation
## Copyright (C) 2013 Moritz Schlarb
##
## This program is free software: you can redistribute it and/or modify
## it under the terms of the GNU Affero General Public License as published by
## the Free Software Foundation, either version 3 of the License, or
## any later version.
##
## This program is distributed in the hope that it will be useful,
## but WITHOUT ANY WARRANTY; without even the implied warranty of
## MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
## GNU Affero General Public License for more details.
##
## You should have received a copy of the GNU Affero General Public License
## along with this program.  If not, see <http://www.gnu.org/licenses/>.
#

import sys
import gearbox
#from gearbox.commands.serves import ServeCommand
#from paste.script.serve import ServeCommand

if __name__ == '__main__':
    print "2222"
    gearbox.command
 #   ServeCommand("serve").run(sys.argv[1:] or ['--reload', 'development.ini'])
