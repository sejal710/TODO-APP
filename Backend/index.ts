// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const {connection} = require("./db")
// const {todoModel} = require("./model/todo.model")

// const app = express();
// app.use(express.json());
// app.use(cors());


// app.get("/",(req,res) => {
//     res.send("Hello World");
// })

// app.post("/addTodo",async(req,res) => {
//     const data = req.body;
//     try{
//        const todo = new todoModel(data);
//        await todo.save();
//        res.send({Message:"Data Sucessfully Added"})
//     }
//     catch(e){
//        res.send({Message:e.message})
//     }
// })

// app.get("/todo", async (req, res) => {
//     try {
//       const page = parseInt(req.query.page) || 1; 
//       const limit = parseInt(req.query.limit) || 3;
//       const skip = (page - 1) * limit; 
  
//       const totalItems = await todoModel.countDocuments(); 
//       const totalPages = Math.ceil(totalItems / limit);
  
//       const todo = await todoModel.find().skip(skip).limit(limit);
  
//       res.send({ data: todo, length: todo.length, totalItems, totalPages, currentPage: page });
//     } catch (e) {
//       res.send({ Message: e.message });
//     }
//   });

// app.patch("/updateTodo/:id", async (req, res) => {
//     const { id } = req.params;
//     const data = req.body;
  
//     try {
//       const updatedTodo = await todoModel.findByIdAndUpdate(id, data, { new: true });
//       res.send({ Message: "Data Successfully Updated", data: updatedTodo });
//     } catch (e) {
//       res.send({ Message: e.message });
//     }
// });

// app.delete("/deleteTodo/:id", async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       await todoModel.findByIdAndDelete(id);
//       res.send({ Message: "Data Successfully Deleted" });
//     } catch (e) {
//       res.send({ Message: e.message });
//     }
// });  


// app.listen(process.env.PORT,async(req,res) => {
//     console.log(`Server is runing in ${process.env.PORT}`);
//     try{
//         await connection;
//         console.log("DB is connected");
//     }
//     catch(e){
//         console.log("Error Messaage",e.message);
//     }
// })



import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./db";
import { todoModel, Todo } from "./model/todo.model";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/addTodo", async (req: Request, res: Response) => {
  const data: Todo = req.body;
  try {
    const todo = new todoModel(data);
    await todo.save();
    res.send({ Message: "Data Successfully Added" });
  } catch (e: any) {
    res.send({ Message: e.message });
  }
});

app.get("/todo", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const skip = (page - 1) * limit;

    const totalItems = await todoModel.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    const todo = await todoModel.find().skip(skip).limit(limit);

    res.send({
      data: todo,
      length: todo.length,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (e: any) {
    res.send({ Message: e.message });
  }
});

app.patch("/updateTodo/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Todo = req.body;

  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(id, data, { new: true });
    res.send({ Message: "Data Successfully Updated", data: updatedTodo });
  } catch (e: any) {
    res.send({ Message: e.message });
  }
});

app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await todoModel.findByIdAndDelete(id);
    res.send({ Message: "Data Successfully Deleted" });
  } catch (e: any) {
    res.send({ Message: e.message });
  }
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  try {
    await connection;
    console.log("DB is connected");
  } catch (e:any) {
    console.log("Error Message", e.message);
  }
});
