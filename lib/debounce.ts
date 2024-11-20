export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T => {
  let timer: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  }) as T;
};
