const db = require("../DATABASE/db");

//get all student controll
exports.getstudent = async(req,res)=>{
    try {
        const data = await db.query('SELECT * FROM student')
        if(!data){
            return res.status(404).send({message:'not found'})
        }
        res.status(200).send(
           
            data[0]
        )
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
        
    }

}



exports.getStudentById = async (req, res) => {
    
    const studentId = req.params.id;
    try {
        
        if (!studentId) {
             res.status(400).send({
                message: 'Student ID is required'
            });
        }

        const data = await db.query('SELECT * FROM student WHERE id = ?', [studentId]);
        if (!data || data.length === 0) {
             res.status(404).send({
                message: 'Student not found'
            });
        }

        res.status(200).send(
            data[0]
        );
    } catch (error) {
        console.error("Error fetching student by ID:", error);
        res.status(500).send({
            message: 'Internal server error'
        });
    }
};



//create student
exports.addstudent = async(req,res)=>{
    
    try {
        const {name,rollno,fees,Class,medium} = req.body
        if(!name || !rollno ||!fees||!Class||!medium){
        res.status(500).send({message:"fill properly"})
        }
        const data = await db.query(`INSERT INTO student (name,rollno,Class,fees,medium) VALUES (? , ? , ? ,? ,?) `,[name,rollno,fees,Class,medium])
        if(!data){
            res.status(404).send({message:"error whileinsertion"})
        }
        res.status(200).send(data)
        
    } catch (error) {
        res.status(500).send({error})
    }
}

//update
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send({ message: 'ID not found' });
        }
        
        const { name, rollno, fees, Class, medium } = req.body;
        const data = await db.query(`UPDATE student SET name = ?, rollno = ?, fees = ?, Class = ?, medium = ? WHERE id = ?`, [name, rollno, fees, Class, medium, id]);
        
        if (!data) {
            return res.status(500).send({ message: 'Error while updating' });
        }
        
        res.status(200).send({ message: 'Updation success' });
    } catch (error) {
        res.status(500).send({ error });
    }
};

//delete

exports.deletestudent = async(req,res)=>{
    try {
        const {id} = req.params
        if(!id){
            res.status(404).send({message:"id not found"})
        }
        await db.query(`DELETE FROM student WHERE id = ?`,[id])
        res.status(200).send({message:'deletion success'})
    } catch (error) {
        res.status(500).send({message:'error while delteion'})
    }
}