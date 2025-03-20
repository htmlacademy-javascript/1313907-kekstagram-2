const onEscKeydown = (evt, cb) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    cb();
  }
};

export {
  onEscKeydown
};
