require("dotenv").config()
import { db } from "./adapter/adapter";
import fs from 'fs'
import path from 'path'
const file1 = fs.readFileSync(
  path.resolve(__dirname, "./scripts/ddl/migracion_001.sql")
);

db.any(file1.toString())
.then(()=>console.log("Migracion exitosa"))
.catch((err)=>console.log("Error en migracion", err))