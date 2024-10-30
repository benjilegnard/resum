import { CanActivateFn } from '@angular/router';
import { AvailableLang, availableLangs } from '../model';

export const availableLangGuard: CanActivateFn = (route) => {
  return availableLangs.includes(route.params['lang'] as AvailableLang);
};
