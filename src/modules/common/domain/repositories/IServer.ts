import { IModule } from "./IModule";
import express from "express";

export interface IServer {
  addModules(modules: IModule[]): void;
  startServer(port: string): void;
  get app(): express.Application;
}