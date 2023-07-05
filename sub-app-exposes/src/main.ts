import './public-path';

const {
  mount,
  unmount,
  bootstrap,
  update,
} = await import('./init');
export {
  update,
  mount,
  unmount,
  bootstrap,
}
