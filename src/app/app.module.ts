import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// carbon-components-angular default imports
import { UIShellModule } from 'carbon-components-angular';
import { Notification20Module } from '@carbon/icons-angular/lib/notification/20';
import { UserAvatar20Module } from '@carbon/icons-angular/lib/user--avatar/20';
import { AppSwitcher20Module } from '@carbon/icons-angular/lib/app-switcher/20';
import { HeaderComponent } from './header/header.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { DocsComponent } from './pages/docs/docs.component';

import {
	TableModule,

	TabsModule,
	GridModule,
	ContentSwitcherModule,
	TilesModule,
	ButtonModule,
	RadioModule,
	InputModule,
	SelectModule,
	NumberModule,
	CheckboxModule,
	PaginationModule,
	ModalModule,

} from 'carbon-components-angular';

@NgModule({

	declarations: [

		AppComponent,
		HeaderComponent,
		CatalogComponent,
		DocsComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		AppRoutingModule,
		UIShellModule,
		Notification20Module,
		UserAvatar20Module,
		AppSwitcher20Module,
		TableModule,
		TabsModule,
		GridModule,
		ContentSwitcherModule,
		SelectModule,
		TilesModule,
		ButtonModule,
		InputModule,
		RadioModule,
		NumberModule,
		ReactiveFormsModule,
		CheckboxModule,
		PaginationModule,
		ModalModule
	],
	exports: [

	],
	providers: [
	],

	bootstrap: [AppComponent]
})
export class AppModule { }
