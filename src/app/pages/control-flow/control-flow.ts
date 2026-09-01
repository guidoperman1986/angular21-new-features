import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeavyReportComponent } from '../../components/heavy-report/heavy-report';

@Component({
  selector: 'app-control-flow',
  imports: [HeavyReportComponent],
  templateUrl: './control-flow.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './control-flow.css',
})
export class ControlFlow {}
