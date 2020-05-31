def _(text: str):
    """Translation function.
    Translates basedon LANG defined in settings.
    """
    return text


class Dict(dict):
    """Wrapper for python dictionary to access keys by dot like in JS.
    Also implements an extra map method.
    """
    def __getattr__(self, x):
        return self.get(x)

    def map(self, f):
        return Dict({x: f(v) for x, v in self.items()})


_STRINGS = Dict(
    CASH='Cash',
    CHEQUE='Cheque',
    INVESTMENT='Investment',
    RETURN='Return',
    PRINCIPAL='Principal',
    INSTALLMENT='Installment',
    LOAN_NORMAL='Normal',
    LOAN_SPECIAL='Special',
)

STRINGS = _STRINGS.map(_)
