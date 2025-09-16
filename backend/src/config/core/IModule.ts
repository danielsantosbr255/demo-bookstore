import express from 'express';

export interface IModule {
  readonly name: string;
  router: express.Router;
}

export interface IModuleConstructor {
  new (router: express.Router): IModule;
  create(): IModule;
}
