// All icons are available at https://github.com/FortAwesome/Font-Awesome/tree/master/svgs
import {
  faBook as book,
  faFolderPlus as folder,
  faPalette as paint
} from '@fortawesome/free-solid-svg-icons';
import { faQq as penguin } from '@fortawesome/free-brands-svg-icons';

interface Icons {
  [key: string]: any;
}

const icons: Icons = {
  book,
  folder,
  paint,
  penguin
};

export function getIcon(name: any) {
  return icons[name];
}
