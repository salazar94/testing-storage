import { TwoDigitDecimaNumberDirective } from './numeric.directive';
import { OnlynumberDirective } from './number.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteOffDirective } from './autocomplete-off.directive';

@NgModule({
  declarations: [
  AutocompleteOffDirective,
  TwoDigitDecimaNumberDirective,
  OnlynumberDirective
],
  imports: [
    CommonModule
  ],
  exports: [
    AutocompleteOffDirective,
    TwoDigitDecimaNumberDirective,
    OnlynumberDirective
  ]
})
export class DirectivesModule { }
