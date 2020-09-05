import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatBadgeModule } from "@angular/material/badge";
import { ScrollingModule } from "@angular/cdk/scrolling";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatBadgeModule,
    ScrollingModule
  ],
  exports: [
      ReactiveFormsModule,
      FormsModule,
      MatExpansionModule,
      MatIconModule,
      MatToolbarModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatMenuModule,
      MatBadgeModule,
      ScrollingModule
  ],
  providers: [

  ],
})
export class MaterialModule { }
