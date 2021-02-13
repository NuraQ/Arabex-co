//File: server.js
//To run the server:  node server 8081    or any port number

var express = require('express');
var app = express();
var fs = require("fs");
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var Cookies = require('cookies');
const session = require('express-session');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


const TWO_HOURS  = 60 * 2 * 1000  * 60;
const secret = 'mysecretsshhh';


const {
     NODE_ENV = 'development',
     SESS_LIFETIME = TWO_HOURS,
     SESS_SECRET = "generateNonce(),",
     SESS_NAME = 'sid',
     CLEARDB_DATABASE_HOST = 'localhost',
     CLEARDB_DATABASE_USERNAME = 'root',
     CLEARDB_DATABASE_PASSWORD = '',
     CLEARDB_DATABASE_NAME = 'Sami'
     
 } = process.env
 //const IN_PROD = NODE_ENV === 'production'
 app.use(session({
     name: SESS_NAME,
     resave:false,
     saveUninitialized:false,
     secret:SESS_SECRET,
     
     cookie : {
         maxAge: SESS_LIFETIME,
         sameSite: true,
         secure: true,
         secret: SESS_SECRET
     }

 }))

let checkId=""
var db = mysql.createConnection({
    host: CLEARDB_DATABASE_HOST,
    user: CLEARDB_DATABASE_USERNAME,
    password: CLEARDB_DATABASE_PASSWORD,
    database: CLEARDB_DATABASE_NAME
});
//now connect to database
db.connect(function (err) {
    console.log(CLEARDB_DATABASE_HOST);
    console.log(CLEARDB_DATABASE_USERNAME);
    console.log(CLEARDB_DATABASE_PASSWORD);
    console.log(CLEARDB_DATABASE_NAME);
    if (err) throw err;
    console.log("Database Connected!");
});


const args = process.argv;   // needed for args
var port = process.env.PORT || 9999;             // default port number 
// if (args.length > 2) port = parseInt(args[2]);

var bodyParser = require('body-parser');
var multer = require('multer');
const { strict } = require('assert');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//put static html pages in a folder named public create the folder in your project folder
app.use(cookieParser());
app.use(express.static('public'));  // add the public folder with static pages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: __dirname + '/Villas/' }).any());//added the .any, modified from /tmp to dir .. etc
//console.log(__dirname)
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);

    

    next();
  }
  app.use(allowCrossDomain);
// This responds with "Hello World" on the homepage
// to test type 
//app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
const withAuth = function(req, res, next) {
    console.log("yllaaaaaaa");
    const token = req.cookies.token;
    console.log(token+"blaaaa");
    console.log("secret         "+secret);
    if (!token) {
      res.status(401).json({error:"error with token"})
    } else {
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
          res.status(401).json({error:"NOT ALLOWED, INNCORRECT PASSWORD"})
        } else {
          req.email = decoded.email;
          next();
        }
      });
    }
  }
app.get('/', function (req, res) {
    console.log("Ds"+req.query.type);
   var table_name =  req.query.type
   console.log(req.query.type)
  executeQuery(res,table_name);// execute the connection script after cpnnetin is established

})

//middleware for authenitication
/*function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
  }*/

const redirectPage = (req,res,next) => {
    console.log("OOOOO");
    var response = {
        status:"logged in"
    }
    if (!req.session.userId){
        console.log("AAAAAAAAA");
         response = {
            status:"redirect"
        }
    }
    res.send(response);
}
app.post('/redirectPage/', (req, res) => {
    console.log(req.session.userId+"id");
    console.log(SESS_LIFETIME+"SESS_LIFETIME");

    response = {
        status:"thing"
    }
    if (req.session.userId == null){
        console.log("AAAAAAAAA");
         response = {
            status:"redirect"
        }
    }
    console.log(response.status+"resp")
    res.send(response);
        
    })
 async function generateNonce(){
    var NONCE2  = await bcrypt.genSalt();
    return NONCE2;
}
app.post('/process_post/:id/', express.json({ type: '*/*' }), (req, res) => {
    console.log("ylla ymma");
        var jsonObj = req.body;  
        let namee = jsonObj.Name;
        let exp = jsonObj.ExpirationDate;
        let prod = jsonObj.ProductionDate;
        let desc = jsonObj.Description;
      let IDD = jsonObj.ID;
        updateQuery(IDD,prod,exp,namee,desc,res);
    })
//,address=${addresse},name=${namee}
function updateQuery(ID,ages,addresse,namee,res){

    console.log("ylla ya 3m :)")
    var sql = `UPDATE Products SET age = ${ages},address='${addresse}' ,name='${namee}' WHERE id = ${ID}`; //get the first 3 records only
    db.query(sql,function(err,result){
        if(err) throw err

        response = {
            id: ID,
            age:ages,
            address:addresse,
            name:namee
        }
      
        res.send(response);

    })
}

function updateQuery(ID,prod,exp,namee,desc,res){
    
    var sql = `UPDATE Products SET ProductionDate = '${prod}',ExpirationDate='${exp}' ,Name='${namee}' ,Description='${desc}' WHERE id = ${ID}`; //get the first 3 records only
    db.query(sql,function(err,result){
        if(err) throw err

        response = {
            ID: ID,
            ProductionDate:prod,
            ExpirationDate:exp,
            Name:namee,
            Description:desc
        }
      
        res.send(response);

    })
}

app.get('/process_get/:id', async function (req, res) {

    // Prepare output in JSON format, we are reading info from the request
  try{  console.log("Dsdsdsdsddsdsdsdsds--------");
    let ID = req.query.id;
    let p = req.query.pass;


    console.log(ID,p);
    checkLogin(ID,p,res,req);
}
catch(err){
    console.log("error"+err);
}

})

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
  });
app.post('/add_admin/:id/', express.json({ type: '*/*' }), async (req, res) => {
    console.log("ylla ymma");
    var user_json= req.body;
    var ID = user_json.id;
    var password = user_json.password;
    const salt  = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt);
    console.log(salt);
    console.log(hashedPassword);
     require('crypto').randomBytes(64).toString('hex')

// '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'
    add_admin_query(ID,hashedPassword,res);
       
    })

function add_admin_query(ID,password,res){
    console.log("ID"+ID);
    console.log("p"+password);

    var sql = `INSERT INTO users(Email,Password) VALUES('${ID}', '${password}') `;

    db.query(sql,function(err,result){

        if(err) { response={success:"fail"}} else{
        response = {
            success:"success",
        };

         //console.log("record contents",JSON.stringify(result,null,4));
        console.log("res"+result);
        res.send(JSON.stringify(response));
    }
    })
}


async function checkLogin(name,pass,res,req)
{       console.log(SESS_LIFETIME+"SESS_LIFETIME login");

    console.log(name,pass);
    var sql = `SELECT * FROM users where Email='${name}' `; //get the first 3 records only
    const {userId} = req.session;
    const salt  = await bcrypt.genSalt();
    const nonce  = await bcrypt.genSalt();
 

   
    console.log("nonce"+salt);
    try{db.query(sql,async function(err,result){
       if(err){
        res.status(500)
        .json({
        error: 'Internal error please try again'
      });

       }
       else if(result[0] == null){
        res.status(401)
        .json({
        error: 'NOT ALLOWED GO AWAAY!!!!!!'
      });
       }
       else{
      if( await bcrypt.compare(pass, result[0].Password) ){

     try{   req.session.userId = result[0].id;
        console.log(req.session.userId +"THIS IS THE ID");
        const payload = result[0].id;
        const token = jwt.sign({payload}, secret, {
          expiresIn: TWO_HOURS
        });
        res.cookie('token', token, { httpOnly: true,secure: false,sameSite:'None' }).sendStatus(200);
        //  response={response:"success",nonce:salt};
        var keys = result[0].id;

        

          // Create a cookies object
         // var cookies = new Cookies(req, res, { keys: 0 })
          // Get a cookie
          //var cookieFromUser = cookies.get(name, { signed: true })
         
          // Set the cookie to a value
          //cookies.set('name', 'name', { signed: true })
         // res.setHeader('Content-Type', 'text/plain')

        
        console.log("goto");
     }
     catch(err){

         console.log(err)
     }
    }
    else{
        req.session.userId = null;
       res.status(401).json({
            error: 'NOT ALLOWED GO AWAY!!!!!!'
          });

        console.log("NOT");

    }
}
    })
}
catch{
    res.status(401).json({
        error: 'NOT ALLOWED GO AWAY!!!!!!'
      });
//res.send(response);

}

}

    
function findQuery(ID,res){

    var sql = "Select * FROM Villa where id = ID "; //get the first 3 records only
    db.query(sql, function (err, result){
        if(err) throw err;

        response = {
            id : ID,
            
            


        };
        console.log(result);
        res.send(response);
        return response;
     })


}
function findQueryy(ID){

    var sql = "Select * FROM test where id = ID "; //get the first 3 records only
    db.query(sql, function (err, result){
        if(err) throw err;

      /*  response = {
            id : result[0].id,
            age: result[0].age,


        };*/
if(result[0].id !=""){
    checkId="exists";
}
        //return response;
     })


}

app.delete('/item_del/:id', express.json({ type: '*/*' }), (req, res) => { 
    let jsonn = req.body;
    let ID = jsonn.ID;
    console.log(jsonn);
    console.log(ID);

    deleteQuery(ID,res);
    //console.log(response); // this is for debugging only, prints on the server screen
    //res.end(JSON.stringify(response)); //send the response to the client
})


function deleteQuery(ID,res){
   
    console.log("5lls smay");
    var sql = `delete from Villa WHERE id  > ${ID}`; //get the first 3 records only
    db.query(sql,function(err,result){
        if(err) throw err;
        response = {
            id: ID,
        };
        res.send(response);
       // res.end(JSON.stringify(response));

    })
}



app.put('/add_items/:id', express.json({ type: '*/*' }), (req, res) => {
    // Prepare output in JSON format, we are reading info from the request
    console.log("bobobo");
    console.log(req.body);
    var jsonObj = req.body;  
    let name = jsonObj.name;
    let location = jsonObj.location;
    let year = jsonObj.year;
    let area = jsonObj.area;
    let cat_id = jsonObj.type;
    addQuery(area,name,location,year,cat_id,res);
})



function addQuery(areaa,namee,locationn,yearr,cat_id,res){
            var sql = `INSERT INTO ${cat_id} (area,name,location,year,image,category_id,images) VALUES('${areaa}','${namee}','${locationn}','${yearr}','""','${cat_id}','""') `; //get the first 3 records only

            console.log("Dddddd");
            console.log(sql);

        db.query(sql,function(err,result){

            if(err) { response={success:"fail"}}
            response = {
                id:"",
                name: namee,
                location: locationn,
                year:yearr,
                area:areaa,
                success:"success"
            };
             console.log("Employee Id:- " + result.insertId);
             response.id=result.insertId;
             console.log("Employee Id:- " + response.id);

             //console.log("record contents",JSON.stringify(result,null,4));

            res.send(JSON.stringify(response));
        })
      //  return response;

    }
    function getID(result,response){
        console.log(result);

        console.log(result);

    }
app.post('/add_json', express.json({ type: '*/*' }), (req, res) => {
    //console.log(req.body); // the body is json 
    var jsonObj = req.body;  
    console.log(jsonObj); // debug info on the server
    // prepare the response json
    //here I am adding some key to the JSOn sent and sending back the response
    // replace with actual data, for example from dbase
    var jsonResp = {serkey : 111, ...jsonObj};
    res.json(jsonResp);
});

app.get('/process_get/', express.json({ type: '*/*' }), (req, res) => {
    //console.log(req.body); // the body is json 
    var jsonObj = req.body;  
    var ID = jsonObj.id;
    console.log(jsonObj); // debug info on the server
    // prepare the response json
    //here I am adding some key to the JSOn sent and sending back the response
    // replace with actual data, for example from dbase
    var jsonResp = {serkey : 111, ...jsonObj};
    res.json(jsonResp);
});
app.post('/file_upload', function (req, res) {
    //    console.log(req.files.file.name);
    //    console.log(req.files.file.path);
    //    console.log(req.files.file.type);
    //var filejs = req.files[0]; 
    console.log("thsi");
    console.log("mtyalla yad enta yad");

  //  var type = req.type;
    console.log(req.body.id);
    console.log(req.body.cat_id);
    var table = req.body.cat_id;
   // var folder =type.substring(1,6);

    var file = __dirname +'/'+ table +'/' + req.files[0].originalname;//__dirname + "/" + req.files.file.name;
    console.log("filessss"+file);
    console.log(req.files[0].originalname);
    console.log(req.files[0]);
    IDD=req.body.id;
    var c = "";
    var image_column = req.body.mainImage;
    // fs.readFile( req.files[0].file.path, function (err, data) {
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("yllaaaaaaa"+req.body.mainImage);

                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].filename,
                };
                if(image_column.localeCompare("images")==0){
                    c  = c+ req.body.images;

                    console.log("kckc")
             }
             else{
                c  = req.files[0].originalname;

             }
                var sql = `update  ${table} set ${image_column}='${c}'  where  id='${IDD}' `; //get the first 3 records only
              

                db.query(sql,function(err,result){
                    if(err) throw err;
                    response = {
                        file:req.files[0].originalname
                    };

                    //res.send(response);
                    //res.end(JSON.stringify(response));
            
                })
            }
           fs.unlink(req.files[0].path, function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
            });
            //console.log(response);

            res.end(JSON.stringify(response));
        });
    });
})

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Server listening at http://%s:%s", host, port)

})

app.get('/load_image', function (req, res) {
    console.log(req.query.img);
    console.log("In Load Image")
    let img = req.query.img;
    let type = req.query.type;
    console.log("type"+type);

  //  if(req.query.img.charAt(0) == 'V'){
   // var file = __dirname + "/Villas/" + img;
    //} else{
    var file = __dirname + "/"+type+"/" + img;
    //}
    console.log(file);

    const stats = fs.statSync(file);
    const fileSizeInBytes = stats.size;
    res.set('Content-Type', 'image/*')
    res.set('Content-Length',stats.size)
    var data = fs.readFileSync(file);
    console.log(data);
    res.end(data);
    
   })

function executeQuery(res,table_name) {
    var sql = `Select * FROM ${table_name}`; //get the first 3 records only
    console.log("sql"+sql);
    let finalstr = '';
    let str = "test";
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(`>>-- result:  of length = ${result.length}`);
        console.log("result: ", result);
        res.send(result);

        console.log("\nFirst   (result[0]) ", result[0]);
      /*  var fileString = ''; //empty
        let id, age;  //actually apparent power
        for (let item of result) {
            id = parseFloat(item.id);//floating point number
            age = parseFloat(item.age);
            str = `id = ${item.id}, age = ${age} \n,name = ${item.name},address=${item.address}`;


        }
        return str;*/

    });
    
    

}