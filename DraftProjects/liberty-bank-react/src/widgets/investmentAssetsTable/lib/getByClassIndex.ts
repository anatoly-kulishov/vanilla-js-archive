export const getClassByIndex = (
  index: number,
  styles: CSSModuleClasses,
  shouldColorRed?: boolean,
) => {
  switch (index) {
    case 0:
      return shouldColorRed ? styles.first_red_column : styles.first_column;
    case 1:
      return styles.second_column;
    case 2:
      return shouldColorRed ? styles.third_red_column : styles.third_column;
    default:
      return '';
  }
};
