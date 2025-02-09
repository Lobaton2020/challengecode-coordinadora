require("dotenv").config()
import { db } from "./adapter/adapter";
import fs from 'fs'
import path from 'path'
const file1 = fs.readFileSync(
  path.resolve(__dirname, "./scripts/dml/sync_data.sql")
);

db.any(file1.toString())
.then(()=>console.log("Seed exitoso"))
.catch((err)=>console.log("Error en migracion", err))