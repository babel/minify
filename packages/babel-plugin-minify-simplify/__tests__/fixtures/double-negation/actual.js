if (!!foo) {
  const thisIs = aStatement;
}
if (!!foo && bar) {
  const thisIs = aStatement;
}
if (!!some.complex({ expression: () => "obviously" })) {
  const thisIs = aStatement;
}

// --------------------------------------

!!foo && an.expression();
(!!foo && bar) && an.expression();
!!some.complex({ expression: () => "obviously" }) && an.expression();

!!foo || an.expression();
(!!foo && bar) || an.expression();
!!some.complex({ expression: () => "obviously" }) || an.expression();
