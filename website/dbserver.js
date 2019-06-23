var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";



(function() {
	var fs, http, qs, server, url;
	http = require('http');
	url = require('url');
	qs = require('querystring');
	fs = require('fs');
	
	var loginStatus = false, loginUser = "";
	
	server = http.createServer(function(req, res) {
		var action, form, formData, msg, publicPath, urlData, stringMsg;
		urlData = url.parse(req.url, true);
		action = urlData.pathname;
		publicPath = __dirname + "\\public\\";
		console.log(req.url);

		if (action === "/register") {
			console.log("[Register page]");
			if (req.method === "POST") {
				console.log("=================================================");
				console.log("~Action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("[Form Data] = "+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var tempSplitPassword = splitMsg[1];
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = "Name : " + splitName[1];
						var searchPW = "Password : " + splitPassword[1];
						
						console.log("[Stringify] mess= "+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("[Search = " + searchDB + " / " + searchPW + "]");
						
						
						
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							dbo.collection("user").count({"Name" : splitName[1]}, function(err, count){
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									if(err) throw err;
									console.log("[User exist]");
									db.close();
									return res.end("fail");
								}
								else
								{
									dbo.collection("user").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("1 document inserted");
										
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			} 
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "register.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		else if (action === "/favoritelist")
		{
			console.log("=================================================");
			console.log("[Favorite List Page]");
			if (req.method === "POST") {
				
				console.log("~Action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("[Form Data] = "+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("=");
						var tempSplitName = splitMsg[1];
						
						
						
						var searchDB = "Name : " +  splitMsg[1];;
						
						
						console.log("[Stringify] mess= "+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						console.log("["+ searchDB + "]");
						
						
						
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							var myobj = stringMsg;
							dbo.collection("user-favoritelist").find({}).toArray(function(err, result) 
									{
										if(err)
										{
											throw err;
											console.log("[Read Favorite List Data Fail]");
											
											
										}
										else
										{
											console.log("-------------------------------------");
											console.log("[Read Favorite List Data Success]");
											
											db.close();
											var array = [];
											
											console.log(result.length);
											if(result.length != 0)
											{
											
											for (var i=0; i<result.length; i++)
											{
											
											array.push("</div><li class='list-unstyled-item list-hours-item d-flex'>"+result[i].Title+"<span class='ml-auto'>"+result[i].ID+"</span> </li><div style='display:none'> ");
											
											
											
											
	
											 
											
											
											}
											
											
											
											console.log(array);
											
											//return res.end(array[0].toString());
											return res.end(array.toString());
											}
											else
											{
												return res.end(array.toString());
											}
											
										}
																
								
								
							});
						});
					});
				});
				
			} else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "store.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		
		
		else if( action ==="/addfavourlist")
		{
			console.log("=================================================");
			console.log("[Add Favorite List]");
			if (req.method === "POST") {
				
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitTitle = splitMsg[0];
						var tempSplitID = splitMsg[1];
						var tempSplitImg = splitMsg[2];
						
						var splitTitle = tempSplitTitle.split("=");
						var splitID = tempSplitID.split("=");
						var splitImg = tempSplitImg.split("=");
						
						
						
						//var searchDB = "ID : " + splitMsg[1];
						
						
						console.log("[Stringify]mess="+msg);
						//console.log("mess="+formData);
						//console.log("split=" + msg[1]);
						//console.log(searchDB);
						//console.log(searchTitle);
						res.writeHead(200, {
							"Content-Type": "application/json"
							
						});
						MongoClient.connect(dbUrl, function(err, db) {
							
							if (err) throw err;
							var dbo = db.db("database");
							//console.log(dbo);
							var myobj = stringMsg;
									var finalcount;
									dbo.collection("user-favoritelist").count({"ID" : splitID[1]}, function(err, count){
								
								finalcount = count;
								if(finalcount > 0)
								{
									
									var myquery = {"ID": splitID[1]};
									dbo.collection("user-favoritelist").deleteOne(myquery, function(err, obj) {
										if (err) throw err;
										console.log("[User Favoritelist inserted]");
										
										db.close();
										//return res.end(msg);
									});
									return res.end("fail");
									

								}
								else
								{
									dbo.collection("user-favoritelist").insertOne(myobj, function(err, res) {
										if (err) throw err;
										console.log("[User Favoritelist inserted]");
										
										db.close();
										//return res.end(msg);
									});
									return res.end(msg);
								}
							});
						});
					});
				});
				
			}
				
			
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "product.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
		}
		
		else if (action === "/members"){
			console.log("[Login page]");
			console.log("=================================================");
			if (req.method === "POST") {
				console.log("action = post");
				formData = '';
				msg = '';
				return req.on('data', function(data) {
					formData += data;
					console.log("form data="+ formData);
					return req.on('end', function() {
						var user;
						user = qs.parse(formData);
						user.id = "0";
						msg = JSON.stringify(user);
						stringMsg = JSON.parse(msg);
						var splitMsg = formData.split("&");
						var tempSplitName = splitMsg[0];
						var tempSplitPassword = splitMsg[1];
						var splitName = tempSplitName.split("=");
						var splitPassword = tempSplitPassword.split("=");
						var searchDB = "Name : " + splitName[1];
						var searchPW = "Password : " + splitPassword[1];
						
						console.log("[Stringify]mess="+msg);
						console.log("search = " + searchDB);
						console.log("search = " + searchPW);
						res.writeHead(200, {
							"Content-Type": "application/json",
							"Content-Length": msg.length
						});
						MongoClient.connect(dbUrl, function(err, db) {
							var finalcount;
							if (err) throw err;
							var dbo = db.db("database");
							//console.log(dbo);
							var myobj = stringMsg;
							dbo.collection("user").count({"Name" : splitName[1], "Password" : splitPassword[1]}, function(err, count){
								console.log(err, count);
								finalcount = count;
								if(finalcount > 0)
								{
									console.log("Login Successful");
									
									db.close();
									return res.end(msg);
									loginStatus = true;

								}
								else
								{
									if(err) throw err;
									console.log("Login Fail : username and password wrong");
									db.close();
									return res.end("fail");
								}
							});
						});
					});
				});
				
			} 
			else 
			{
				//form = publicPath + "ajaxSignupForm.html";
				form = "members.html";
				return fs.readFile(form, function(err, contents) {
					if (err !== true) 
					{
						res.writeHead(200, {
							"Content-Type": "text/html"
						});
						return res.end(contents);
					} 
					else 
					{
						res.writeHead(500);
						return res.end;
					}
				});
			}
	
		}

		//read favourlist action
		else if (action === "/readfavourlist")
		{
			if(!loginStatus)
			{
				console.log("no logged in user found");
			}
			else
			{
				console.log("read favour");
				MongoClient.connect(dbUrl, function(err, db) 
				{
					var finalcount;
					if (err) throw err;
					var dbo = db.db("apexdb");
					var myobj = stringMsg;
					dbo.collection("favourlist").find({"username" : loginUser}).toArray(function(err, result) 
					{
    				if (err) throw err;
    				console.log("result" + result);
    				db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
            return res.end(resultReturn);
					});
				});
			}
		}

		else if (action === "/addfavourlist")
		{
      
			if(!loginStatus)
			{
				console.log("no logged in user found");
			}
			else
			{
				
        
          console.log("action = post");
          formData = '';
          msg = '';
          return req.on('data', function(data) 
          {
            
            formData += data;

            console.log("form data="+ formData);
            return req.on('end', function() 
            {
              var fav;
              
              formData += "&username="+loginUser;
              fav = qs.parse(formData);
                                         
              msg = JSON.stringify(fav);
              stringMsg = JSON.parse(msg);              
              
              var splitMsg = formData.split("&");
              var tempSplitName = splitMsg[0];
              var splitName = tempSplitName.split("=");
              var searchDB = "texttitle : " + splitName[0];
              
              //console.log("mess="+msg);
              //console.log("mess="+formData);
              //console.log("split=" + msg[1]);
              //console.log("search=" + searchDB);
              
              res.writeHead(200, 
              {
                "Content-Type": "application/json",
                "Content-Length": msg.length
              });
              MongoClient.connect(dbUrl, function(err, db) 
              {
                var finalcount;
                if (err) throw err;
                var dbo = db.db("apexdb");
                var myobj = stringMsg;
                dbo.collection("favourlist").count({"texttitle" : splitName[0]}, function(err, count)
                {
                  console.log(err, count);
                  finalcount = count;
                  if(finalcount > 0)
                  {
                    if(err) throw err;
                    db.close();
                    return res.end("fail");
                  }
                  else
                  {
                    dbo.collection("favourlist").insertOne(myobj, function(err, favres) 
                    {
                      if (err) throw err;
                      console.log("1 document inserted");
                      db.close();
                    });
                    return res.end("success");
                  }
                });
                
              });
            });
          });
        
        
			}
		}
		
		else if (action === "/delfavourlist")
		{
      
			if(!loginStatus)
			{
				console.log("no logged in user found");
			}
			else
			{
				
          console.log("action = post" + " delete list");
          formData = '';
          msg = '';
          return req.on('data', function(data) 
          {
            
            formData += data;

            console.log("form data="+ formData);
            return req.on('end', function() 
            {
              var fav;
              
              formData += "&username="+loginUser;
              fav = qs.parse(formData);
                                         
              msg = JSON.stringify(fav);
              stringMsg = JSON.parse(msg);              
              
              var splitMsg = formData.split("&");
              var tempSplitName = splitMsg[0];
              var splitName = tempSplitName.split("=");
              var searchDB = "texttitle : " + splitName[0];
              
              //console.log("mess="+msg);
              //console.log("mess="+formData);
              //console.log("split=" + msg[1]);
              //console.log("search=" + searchDB);
              
              res.writeHead(200, 
              {
                "Content-Type": "application/json",
                "Content-Length": msg.length
              });
              MongoClient.connect(dbUrl, function(err, db) 
              {
                var finalcount;
                if (err) throw err;
                var dbo = db.db("apexdb");
                var myobj = stringMsg;
                dbo.collection("favourlist").remove({"_id" : ObjectId( + "\"" + splitName[0] + "\"" )}, function(err, count)
                {
    				if (err) throw err;
    				console.log("result" + result);
    				db.close();
						var resultReturn = JSON.stringify(result);
						console.log("resultReturn" + resultReturn);
            return res.end(resultReturn);
					});
                
              });
            });
          });
        
        
			}
		}
		else 
		{
      //handle redirect
			if(req.url === "/index")
			{

				if(loginStatus)
				{
					sendFileContent(res, "index.html", "text/html");
				}
				else
				{
					sendFileContent(res, "index.html", "text/html");
				}
			}
			//Custom setting from here
			else if (req.url === "/members")
			{
				sendFileContent(res, "members.html", "text/html");
			}
			else if (req.url === "/login")
			{
				sendFileContent(res, "login.html", "text/html");
			}
			else if (req.url === "/logout")
			{
				loginStatus = false;
				loginUser = "";
				sendFileContent(res, "finalindex.html", "text/html");
			}

			else if (req.url === "/register")
			{
				sendFileContent(res, "register.html", "text/html");
			}

			else if (req.url === "/about")
			{
				sendFileContent(res, "about.html", "text/html");
			}
      else if (req.url === "/products")
			{
				sendFileContent(res, "products.html", "text/html");
			}
      else if (req.url === "/store")
			{
				sendFileContent(res, "store.html", "text/html");
			}
      else if (req.url === "/favouritelist")
			{
				sendFileContent(res, "favouritelist.html", "text/html");
			}
			
			else if (req.url === "/use")
			{
				sendFileContent(res, "article2.html", "text/html");
			}
			else if (req.url === "/signup2")
			{
				sendFileContent(res, "signup2.html", "text/html");
			}

			else if(req.url === "/"){
				console.log("Requested URL is url" + req.url);
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write('<b>testpage</b><br /><br />This is the default response.');
			}else if(/^\/[a-zA-Z0-9\/]*.js$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/javascript");
			}else if(/^\/[a-zA-Z0-9\/]*.css$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "text/css");
			}else if(/^\/[a-zA-Z0-9\/]*.jpg$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/jpg");
			}else if(/^\/[a-zA-Z0-9\/]*.png$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "image/png");
			}else if(/^\/[a-zA-Z0-9\/]*.mp3$/.test(req.url.toString())){
				sendFileContent(res, req.url.toString().substring(1), "audio/mp3");
			}
			else{
				console.log("Requested URL is: " + req.url);
				res.end();
			}
		}
	});

	server.listen(4242);

	console.log("Server is running，time is" + new Date());


	function sendFileContent(response, fileName, contentType){
		fs.readFile(fileName, function(err, data){
			if(err){
				response.writeHead(404);
				response.write("Not Found!");
			}else{
				response.writeHead(200, {'Content-Type': contentType});
				response.write(data);
			}
			response.end();
		});
	}
 }).call(this);