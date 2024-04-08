$(document).ready(function() {

  $("main#spapp > section").height($(document).height() - 60);

  var app = $.spapp({
    defaultView: "#indexofficer",
    templateDir : "AdminOfficer/",
    pageNotFound : 'error_404'
  }); 

  // ADMIN routes
  app.route({
    view : 'indexofficer',
    load : "indexofficer.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'activitylogofficer',
    load : "activitylogofficer.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'casesofficer',
    load : "casesofficer.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'equipmentusageofficer',
    load : "equipmentusageofficer.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'profileofficer',
    load : "profileofficer.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'officersofficer',
    load : "officersofficer.html",
    onCreate : function() {  },
    onReady : function() {  }
  });
  
  app.route({
    view : 'incidentsofficer',
    load : "incidentsofficer.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'suspectsofficer',
    load : "suspectsofficer.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'incidentlogofficer',
    load : "incidentlogofficer.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  // USER routes
  app.route({
    view : 'incidentlog',
    load : "incidentlog.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'activitylog',
    load : "activitylog.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'cases',
    load : "cases.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'indexuser',
    load : "indexuser.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  app.route({
    view : 'suspects',
    load : "suspects.html",
    onCreate : function() {  },
    onReady : function() {  }
  });

  // run app
  app.run();

});