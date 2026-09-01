import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  effect,
  linkedSignal,
  signal,
  untracked,
  ChangeDetectionStrategy,
} from '@angular/core';

type ServerTier = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-signals',
  imports: [NgClass],
  templateUrl: './signals.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './signals.css',
})
export class Signals {
  serverName = signal('Server 1');
  cpuTemp = signal(45);
  isPowerOn = signal(true);

  status = computed(() => {
    if (!this.isPowerOn()) {
      return 'OFFLINE';
    }
    return this.cpuTemp() > 90 ? 'CRITICAL' : 'STABLE';
  });

  statusColor = computed(() => {
    if (this.status() === 'CRITICAL') {
      return 'text-red-500';
    }
    return 'text-green-500';
  });

  fanSpeed = linkedSignal({
    source: this.serverName,
    computation: () => 'auto',
  });

  TIER_DEFAULTS: Record<ServerTier, { ram: number; cpu: number }> = {
    small: { ram: 2, cpu: 1 },
    medium: { ram: 8, cpu: 4 },
    large: { ram: 32, cpu: 16 },
  };

  selectedTier = signal<ServerTier>('small');

  assignedRam = linkedSignal<ServerTier, number>({
    source: this.selectedTier,
    computation: (newTier, previous) => this.TIER_DEFAULTS[newTier].ram,
  });

  assignedCpu = linkedSignal(() => this.TIER_DEFAULTS[this.selectedTier()].cpu);

  constructor() {
    effect(() => {
      if (this.status() === 'CRITICAL') {
        console.log(`[ALERT]: ${this.serverName()} está sobrecalentado: ${this.cpuTemp()}°C`);
      }

      untracked(() => {
        console.log('assignedRam', this.assignedRam());
      });
    });
  }

  increaseTemp() {
    this.cpuTemp.update((v) => v + 1);
  }

  decreaseTemp() {
    this.cpuTemp.update((v) => v - 1);
  }

  togglePower() {
    this.isPowerOn.set(!this.isPowerOn());
  }

  switchServer() {
    this.serverName.set(this.serverName() === 'Server 1' ? 'Server 2' : 'Server 1');
  }

  switchFanSpeed() {
    this.fanSpeed.set(this.fanSpeed() === 'auto' ? 'manual' : 'auto');
  }

  updateTier($event: Event) {
    this.selectedTier.set(($event.target as HTMLSelectElement).value as ServerTier);
  }

  increaseRam(ram: number) {
    this.assignedRam.update((ram) => ram + 1);
  }

  decreaseRam(ram: number) {
    this.assignedRam.update((ram) => ram - 1);
  }
}
