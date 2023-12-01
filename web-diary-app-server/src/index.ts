import express from "express";
import cors from "cors";
import { Prisma, PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

//retrieve the diary entries
app.get("/api/diaryEntries", async (req, res) => {
    const diaryEntries= await prisma.diaryEntry.findMany();
  res.json({ diaryEntries });
});

//create the diary entry
app.post("/api/diaryEntries", async (req, res) => {
   const { title, content, selectedDate } = req.body;

     if (!title || !content || !selectedDate)
    {
      return res.status(400).send("title, content, and date fields required");
    }
  
    try {
      const diaryEntry = await prisma.diaryEntry.create({
        data: { title, content ,selectedDate},

      });
      res.json(diaryEntry);
    } catch (error) {
      res.status(500).send("Oops, something went wrong");
    }
  });
//update diary entry
  app.put("/api/diaryEntries/:id", async (req, res) => {
     const { title, content,selectedDate } = req.body;
   
    const id = parseInt(req.params.id);
  
    if (!title || !content|| !selectedDate) {
   
      return res.status(400).send("title,content,date fields required");
    }
  
    if (!id || isNaN(id)) {
      return res.status(400).send("ID must be a valid number");
    }
  
    try {
      const updatedDiaryEntry = await prisma.diaryEntry.update({
        where: { id },
         data: { title, content ,selectedDate},
      
      });
      res.json(updatedDiaryEntry);
    } catch (error) {
      res.status(500).send("Oops, something went wrong");
    }
  });

  app.delete("/api/diaryEntries/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send("ID field required");
  }

  try {
    await prisma.diaryEntry.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Oops, something went wrong");
  }
});

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});