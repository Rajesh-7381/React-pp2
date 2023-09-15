const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS middleware
app.use(cors());

// Create a MySQL connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "responsiveform3",
  port: 3307, // Replace with your MySQL port number
});

// Test route
app.get('/', (req, res) => {
  return res.json({ message: 'Hello from the backend' });
});

// Handle form submission
app.post("/api/register", (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);

  // Insert data into the database
  db.query(
    "INSERT INTO Register(fullname, phone, fatherName, fathernumber, email, address, standard, schoolname, Board, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      formData.fullname,
      formData.phone,
      formData.fatherName,
      formData.fathernumber,
      formData.email,
      formData.address,
      formData.standard,
      formData.schoolname,
      formData.Board,
      formData.gender,
    ],
    (error, results) => {
      if (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
      }

      console.log("Data inserted successfully:", results);
      return res.json({ message: "Form data inserted successfully" });
    }
  );
});

app.post("/api/contact",(req,res)=>{
  const cdata=req.body;
  db.query(
    "insert into Contacts(fullname,email,phone,altphone,message) values(?,?,?,?,?)",
    [
      cdata.fullname,
      cdata.email,
      cdata.phone,
      cdata.altphone,
      cdata.message,
    ],
    (error,results)=>{
      if(error){
        console.error('error inserting data',error);
        return res.status(500).json({message:"internal server error",error:error.message});
      }
      console.log("data inserted successfully:",results);
      return res.json({message:"form data inserted successfully"});
    }
  );
});

app.post('/api/testimonial', (req, res) => {
  const testimonialdata = req.body;
  db.query(
    "INSERT INTO Testimonials(fullname, phone, email, passing_year, present_status, working_place, memorableevent) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      testimonialdata.fullname,
      testimonialdata.phone,
      testimonialdata.email,
      testimonialdata.passing_year,
      testimonialdata.present_status,
      testimonialdata.working_place,
      testimonialdata.memorableEvent, // Corrected column name
    ],
    (error, results) => {
      if (error) {
        console.error('Error inserting data', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
      }
      console.log('Data inserted successfully:', results);
      return res.json({ message: 'Form data inserted successfully' });
    }
  );
});


// Start the server
app.listen(8082, () => {
  console.log("Server is listening on port 8082");
});
