function isEqual(diff, name) {
  return (
    diff ===
    `Index: ${name}
===================================================================
--- ${name}
+++ ${name}
`
  );
}

module.exports = {
  isEqual,
};
