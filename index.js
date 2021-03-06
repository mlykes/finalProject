// setup server
var express = require('express');
var app = express();
// setup directory used to serve static files
app.use(express.static('public'));

// setup data store
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);

db.defaults({ accounts: [{username:'',res1:'',res2:'',res3:'', res4:'',res5:'',userLat:'',userLong:''}] }).write();
// required data store structure

app.get('/account/create/:username/:res1/:res2/:res3/:res4/:res5/:userLat/:userLong', function (req, res) {
    var new_account = {
        "username" : req.params.username,
        "res1" : req.params.res1,
        "res2" : req.params.res2,
        "res3" : req.params.res3,
        "res4" : req.params.res4,
        "res5" : req.params.res5,
        "userLat":req.params.userLat,
        "userLong":req.params.userLong
    };
    db.get('accounts').push(new_account).write();
});

app.get('/usersLoc/:firstUser/:secondUser/:thirdUser', function (req, res) {
    var firstuserNameData = db.get('accounts').find({username:req.params.firstUser}).value();
    var seconduserNameData = db.get('accounts').find({username:req.params.secondUser}).value();
    var thirduserNameData = db.get('accounts').find({username:req.params.thirdUser}).value();

    var bulk_data = {firstuserNameData,seconduserNameData,thirduserNameData};
    res.send(bulk_data);

});

// start server
app.listen(3030,function(){
    console.log('Running on 3030');
}
)