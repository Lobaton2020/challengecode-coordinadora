import { IModule } from "./IModule";
import express from "express";
import * as http from "http";

export interface IServer {
  addModules(modules: IModule[]): void;
  startServer(port: string): void;
  get app(): express.Application;
  get server(): http.Server;
  get prefix(): string;
}