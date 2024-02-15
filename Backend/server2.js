const express=require("express")
const mysql=require("mysql")
const cors=require("cors")

const app =express()
app.use(cors())

const db=mysql.createPool({
	"host":"localhost",
	"user":"root",
	"port":"3306",
	
	"database":"ecomorce23"
})

app.get('/users',(req,res)=>{
	const sql="select * from admins";
	db.query(sql,(err,data)=>{
		if(err) return res.json(err);
		return res.json(data);
	})
})

app.get('/',(req,res)=>{
	return res.json("from backend");
});
app.listen(8081,()=>{
	console.log("listen");
});
