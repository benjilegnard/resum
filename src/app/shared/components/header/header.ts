import {
  afterNextRender,
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  inject,
  makeStateKey,
  OnInit,
  PLATFORM_ID,
  signal,
  TransferState,
  viewChild,
} from '@angular/core';
import { css } from '@styled-system/css';
import { token } from '@styled-system/tokens';
import { flavors } from '@catppuccin/palette';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

const MAX_BUBBLES = 24;
const WIDTH = 160;
const HEIGHT = 20;
const SPEED = 0.4;
/** velocities are expressed per frame at 60fps */
const FRAME_MS = 1000 / 60;
/** longest elapsed time applied in one step, avoids jumps after a pause */
const MAX_STEP_MS = 100;
const CIRCLES_KEY = makeStateKey<Particle[]>('headerCircles');
/**
 * Velocity is a vector applied on
 * It represents direction + speed.
 * Values range from -1 to +1
 */
export interface Velocity {
  dx: number;
  dy: number;
}
export interface Particle {
  id: string;
  x: number;
  y: number;
  r: number;
  d: number;
  f: string;
  v: Velocity;
}

@Component({
  selector: 'bl-header',
  imports: [],
  template: `
    <svg:svg
      #aquarium
      [class]="styles.svg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      class="aquarium"
      viewBox="0 0 ${WIDTH} ${HEIGHT}"
    >
      <defs>
        <filter id="fluid">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="fluid"
          />
          <feComposite in="SourceGraphic" in2="fluid" operator="atop" />
        </filter>
      </defs>
      <!-- crust background -->
      @if (isClient()) {
        <rect
          id="header-background"
          [class]="styles.background"
          x="0"
          y="0"
          width="${WIDTH}"
          [attr.height]="rectHeight()"
          [attr.fill]="mocha.crust.hex"
          stroke="none"
        ></rect>
      }
      @for (circle of circles(); track circle.id) {
        <circle
          class="fluid circle"
          [attr.cx]="circle.x"
          [attr.cy]="circle.y"
          [attr.r]="circle.r"
          [attr.fill]="mocha.crust.hex"
          stroke="none"
        ></circle>
      }
    </svg:svg>
    @if (isClient()) {
      <div [class]="styles.header" id="header-overlay"></div>
    }
  `,
  host: {
    '[class]': 'styles.host',
  },
})
export class Header implements OnInit {
  protected readonly styles = {
    host: css({ w: '100%', position: 'relative' }),
    header: css({
      display: 'block',
      height: 'menu',
      bg: 'crust',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      transform: 'translateY(0)',
      transition: 'transform 0.3s ease-out',
      _starting: { transform: 'translateY(-100%)' },
    }),
    background: css({
      // percentages relative to the rect itself, not the svg viewBox
      transformBox: 'fill-box',
      transform: 'translateY(0)',
      transition: 'transform 0.3s ease-out',
      _starting: { transform: 'translateY(-100%)' },
    }),
    svg: css({
      filter: 'url(#fluid)',
      //position: 'absolute',
    }),
  };
  public circles = signal<Particle[]>([]);

  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private transferState = inject(TransferState);
  protected mocha = flavors.mocha.colors;
  private svg = viewChild.required<ElementRef<SVGSVGElement>>('aquarium');
  /** menu height token converted from css pixels to viewBox units */
  protected rectHeight = signal(HEIGHT);
  /** false during SSR and hydration, true once rendered in the browser */
  protected isClient = signal(false);

  constructor() {
    afterNextRender(() => {
      this.isClient.set(true);

      // animation loop, browser only
      const view = this.document.defaultView;
      let last: number | undefined;
      const tick = (now: number) => {
        const elapsed = Math.min(now - (last ?? now - FRAME_MS), MAX_STEP_MS);
        last = now;
        this.moveCircles(elapsed / FRAME_MS);
        frame = view?.requestAnimationFrame(tick);
      };
      let frame = view?.requestAnimationFrame(tick);
      this.destroyRef.onDestroy(() => {
        if (frame !== undefined) view?.cancelAnimationFrame(frame);
      });

      // observe resize so that the header overlay is always 50px, (svg size is fluid)
      const observer = new ResizeObserver(([entry]) => {
        const renderedWidth = entry?.contentRect.width ?? 0;
        if (renderedWidth > 0) {
          this.rectHeight.set(
            (parseFloat(token('sizes.menu')) * WIDTH) / renderedWidth,
          );
        }
      });
      observer.observe(this.svg().nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  ngOnInit() {
    if (
      isPlatformBrowser(this.platformId) &&
      this.transferState.hasKey(CIRCLES_KEY)
    ) {
      this.circles.set(this.transferState.get(CIRCLES_KEY, []));
    } else {
      this.circles.set(
        Array.from({ length: MAX_BUBBLES }, () => this.generateBubble()),
      );
    }
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(CIRCLES_KEY, this.circles());
    }
  }

  /**
   * Moves every circle, new objects so the signal notifies.
   * @param step number of 60fps frames elapsed since the last move
   */
  public moveCircles(step = 1) {
    this.circles.update((circles) =>
      circles.map((particle) => {
        const x = particle.x + particle.v.dx * step;
        // vertical movement
        const y = particle.y + particle.v.dy * step;
        // reverse direction when out of bounds
        const dx = x <= 0 || x >= WIDTH ? -particle.v.dx : particle.v.dx;
        const dy = y <= 0 || y >= HEIGHT ? -particle.v.dy : particle.v.dy;
        return { ...particle, x, y, v: { dx, dy } };
      }),
    );
  }

  public generateBubble(): Particle {
    return {
      x: Math.floor(Math.random() * WIDTH),
      y: Math.floor(Math.random() * HEIGHT - 10) + 5,
      r: Math.floor(2 + Math.random() * 4),
      v: {
        dx: ((Math.random() * 2 - 1) * SPEED) / 5,
        dy: (Math.random() * 2 - 1) * SPEED,
      },
      d: Math.random(),
      f: Math.random() > 0.5 ? '#00003f' : 'white',
      id: crypto.randomUUID(),
    };
  }
}
