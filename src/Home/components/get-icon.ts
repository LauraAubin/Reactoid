// All icons are available at https://github.com/FortAwesome/Font-Awesome/tree/master/svgs
import {
  faBook as book,
  faFolderPlus as folder
} from '@fortawesome/free-solid-svg-icons';
import { faQq as penguin } from '@fortawesome/free-brands-svg-icons';

interface Icons {
  [key: string]: any;
}

const icons: Icons = {
  book,
  folder,
  penguin
};

export function getIcon(name: any) {
  return icons[name];
}
