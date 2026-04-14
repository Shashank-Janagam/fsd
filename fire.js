import express from "express"
import admin from "firebase-admin"
import serviceAccount from "./serviceaccountkey.json" with { type: "json" }

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
})

const db=admin.firestore()

const app=express()
app.use(express.json())


app.post("/users",async (req,res)=>{
    try{
        const user=req.body
        const docRef=await db.collection("users").add(user)

        res.send({message:"user added successfully",id:docRef.id})
    }catch(err){
        console.log(err)
        res.send({message:"error"})
    }
})
app.get("/users",async (req,res)=>{
    try{
        const userRef=db.collection("users")
        const data=await userRef.get()
        res.send(data.docs.map(doc=>doc.data()))
    }catch(err){
        console.log(err)
        res.send({message:"error"})
    }
})
app.put("/users/:id",async (req,res)=>{
    try{
        const id=req.params.id
        const user=req.body
        await db.collection("users").doc(id).update(user)
        res.send({message:"user updated successfully"})

    }catch(err){
        console.log(err)
        res.send({message:"error"})
    }
})

app.delete("/users/:id",async (req,res)=>{
    try{
        const id=req.params.id
        await db.collection("users").doc(id).delete()
        res.send({message:"user deleted successfully"})

    }catch(err){
        console.log(err)
        res.send({message:"error"})
    }
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

