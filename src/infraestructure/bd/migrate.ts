require("dotenv").config()
import { db } from "./adapter/adapter";
import fs from 'fs'
import path from 'path'
const file1 = fs.readFileSync(path.resolve(__dirname,"./scripts/ddl/migracion_001.sql"))
// const file2 = fs.readFileSync(path.resolve(__dirname,"../../../../scripts/ddl/migration_creacion_tablas_26052024010300.sql"))

db.any(file1.toString())
.then(()=>console.log("Migracion exitosa"))
.catch((err)=>console.log("Error en migracion", err))