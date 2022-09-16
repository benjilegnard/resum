import { AnimationMetadata, animate, group, query, style } from "@angular/animations";

export const timings = '0.25s ease-in-out';

export const leftToRightAnimation: AnimationMetadata[] = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(100%)' }),
        animate(timings, style({ transform: 'translateX(0%)' })),
      ],
      { optional: true },
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate(timings, style({ transform: 'translateX(-100%)' })),
      ],
      { optional: true },
    ),
  ]),
];
export const rightToLeftAnimation: AnimationMetadata[] = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
    optional: true,
  }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateX(-100%)' }),
        animate(timings, style({ transform: 'translateX(0%)' })),
      ],
      { optional: true },
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateX(0%)' }),
        animate(timings, style({ transform: 'translateX(100%)' })),
      ],
      { optional: true },
    ),
  ]),
];
