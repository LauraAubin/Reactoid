// All icons are available at https://github.com/FortAwesome/Font-Awesome/tree/master/svgs
import { faBook as book } from '@fortawesome/free-solid-svg-icons';
import { faQq as penguin } from '@fortawesome/free-brands-svg-icons';

interface Icons {
  [key: string]: any;
}

const icons: Icons = {
  book,
  penguin
};

export function getIcon(name: any) {
  return icons[name];
}
