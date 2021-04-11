import { create } from 'tailwind-rn';
import styles from '../styles.json';
import fonts from '../font-styles.json';

const { tailwind, getColor } = create({ ...styles, ...fonts });
export { tailwind, getColor };
