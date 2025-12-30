import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
    OnInit,
    signal
} from '@angular/core';

@Component({
  selector: 'app-heavy-report',
  standalone: true,
  imports: [NgOptimizedImage, DecimalPipe],
  template: `
    <div class="heavy-report-container animate-fade-in p-6 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 mt-8 relative overflow-hidden">
      <!-- Background Ambient Glow -->
      <div class="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/20 blur-[100px] pointer-events-none"></div>
      <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-600/20 blur-[100px] pointer-events-none"></div>

      <div class="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h2 class="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Intelligence Report v2.1
          </h2>
          <p class="text-slate-400 text-sm mt-1 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Real-time Signal synchronization active
          </p>
        </div>
        <div class="flex flex-col items-end">
          <div class="badge badge-secondary badge-outline p-4 font-mono mb-1">SECURE NODE: 782-X</div>
          <span class="text-[10px] text-slate-500 font-mono tracking-tighter">LATENCY: {{ latency() }}ms</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
        <!-- Live Visualization Overlay -->
        <div class="glass-card p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden group">
          <h3 class="text-lg font-semibold mb-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
               <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
               Global Network Traffic
            </div>
            <span class="text-xs font-mono text-cyan-400/70">{{ activeConnections() | number:'1.0-0' }} ACTIVE_CONNS</span>
          </h3>

          <div class="relative">
            <img 
              ngSrc="/data_dashboard_visualization.png" 
              width="800" 
              height="800"
              alt="Data Dashboard" 
              class="rounded-lg shadow-lg opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
            
            <!-- Dynamic Data Overlays (Absolute Positioned) -->
            <div class="absolute top-[28%] left-[20%] pointer-events-none">
               <div class="flex flex-col items-center">
                  <div class="w-3 h-3 bg-purple-500 rounded-full animate-ping absolute"></div>
                  <div class="w-3 h-3 bg-purple-500 rounded-full relative"></div>
                  <div class="mt-1 bg-black/60 backdrop-blur-sm border border-purple-500/50 px-2 py-0.5 rounded text-[10px] font-mono text-purple-300">
                    LOAD: {{ networkLoad() }}%
                  </div>
               </div>
            </div>

            <div class="absolute bottom-[35%] right-[25%] pointer-events-none">
               <div class="flex flex-col items-center">
                  <div class="w-3 h-3 bg-cyan-500 rounded-full animate-ping absolute"></div>
                  <div class="w-3 h-3 bg-cyan-500 rounded-full relative"></div>
                  <div class="mt-1 bg-black/60 backdrop-blur-sm border border-cyan-500/50 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300">
                    UPLINK: {{ throughput() | number:'1.2-2' }} GB/s
                  </div>
               </div>
            </div>

            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
          </div>
        </div>

        <!-- Live Stats & Terminal -->
        <div class="space-y-6">
          <div class="stat-group grid grid-cols-2 gap-4">
            <div class="stat bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
              <div class="text-slate-400 text-xs uppercase tracking-wider">Uptime</div>
              <div class="text-2xl font-bold text-cyan-400 font-mono">{{ uptime() }}</div>
              <div class="text-[10px] text-slate-500 mt-1">SLA ADHERENCE: 100%</div>
            </div>
            <div class="stat bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors">
              <div class="text-slate-400 text-xs uppercase tracking-wider">Throughput</div>
              <div class="text-2xl font-bold text-purple-400 font-mono">{{ throughput() | number:'1.2-2' }} <span class="text-xs">GB/s</span></div>
              <div class="text-[10px] text-slate-500 mt-1">PEAK: 14.2 GB/s</div>
            </div>
          </div>

          <div class="data-terminal bg-black p-4 rounded-xl font-mono text-[11px] border border-green-500/30 overflow-hidden shadow-inner h-32">
             <div class="text-green-500 mb-1 font-bold flex justify-between items-center">
               <span>SYSTEM_LOG</span>
               <span class="text-[9px] opacity-50">{{ currentTime() }}</span>
             </div>
             <div class="text-green-800/80 overflow-y-auto h-full scrollbar-none">
                @for (log of logs(); track $index) {
                  <div class="mb-0.5 animate-in fade-in slide-in-from-left-2 duration-300">
                    <span class="text-green-600">[{{ log.time }}]</span> {{ log.msg }}
                  </div>
                }
             </div>
          </div>

          <div class="p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl relative">
            <div class="absolute top-2 right-3">
               <div class="tooltip tooltip-left" data-tip="Zoneless Change Detection Enabled">
                  <span class="text-xs text-indigo-400 cursor-help underline decoration-dotted">v21 Optimized</span>
               </div>
            </div>
            <h4 class="font-bold text-indigo-300 mb-1 text-sm italic">Signal Intelligence</h4>
            <p class="text-[13px] text-slate-400 leading-relaxed">
              Updating <code class="text-purple-300">throughput()</code> every 2s. In **Zoneless** mode, only these specific DOM nodes are refreshed. No global change detection cycle is triggered.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .scrollbar-none::-webkit-scrollbar {
      display: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeavyReportComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  // Live Data Signals
  throughput = signal(12.42);
  activeConnections = signal(2856);
  latency = signal(12);
  networkLoad = signal(64);
  
  // Terminal Logs
  logs = signal<{time: string, msg: string}[]>([
    { time: '10:30:01', msg: 'System initialized.' },
    { time: '10:30:05', msg: 'Neural mapping complete.' },
    { time: '10:30:12', msg: 'Uplink established.' }
  ]);

  // Derived Values
  currentTime = signal(new Date().toLocaleTimeString());
  
  // Uptime simulation
  startTime = Date.now();
  uptime = signal('00:00:00');

  ngOnInit() {
    // Simulated real-time updates
    const interval = setInterval(() => {
      // Perturb throughput
      this.throughput.update(v => Math.max(8, Math.min(15, v + (Math.random() - 0.5) * 0.5)));
      
      // Update connections
      this.activeConnections.update(v => v + Math.floor((Math.random() - 0.5) * 10));
      
      // Update load
      this.networkLoad.update(v => Math.max(40, Math.min(95, v + Math.floor((Math.random() - 0.5) * 5))));

      // Update latency
      this.latency.update(() => Math.floor(Math.random() * 20) + 5);

      // Update current time
      const now = new Date();
      this.currentTime.set(now.toLocaleTimeString());

      // Update uptime string
      const diff = Math.floor((Date.now() - this.startTime) / 1000);
      const h = Math.floor(diff / 3600).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
      const s = (diff % 60).toString().padStart(2, '0');
      this.uptime.set(`${h}:${m}:${s}`);

      // Periodic Log
      if (Math.random() > 0.8) {
        const msgs = [
          'Packet burst detected in Sector 7',
          'Syncing neural weights...',
          'Uplink optimization in progress',
          'Heuristic analysis: NOMINAL',
          'Bridge node 0xFA3 recycling...'
        ];
        this.addLog(msgs[Math.floor(Math.random() * msgs.length)]);
      }
    }, 1000);

    // Clean up interval when component is destroyed
    this.destroyRef.onDestroy(() => clearInterval(interval));
  }

  private addLog(msg: string) {
    this.logs.update(current => {
      const newLogs = [{ time: new Date().toLocaleTimeString(), msg }, ...current];
      return newLogs.slice(0, 10); // Keep last 10
    });
  }
}
