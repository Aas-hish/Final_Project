import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { App } from './app';

/**
 * Optional compatibility module that wires the standalone root component for server rendering.
 * The @angular/ssr builder uses the standalone bootstrap in main.server.ts, but this module is
 * provided for projects or tooling that still look for an AppServerModule entry point.
 */
@NgModule({
  imports: [ServerModule, App],
  bootstrap: [App],
})
export class AppServerModule {}
