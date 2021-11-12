export function flattenKinks(d) {
  console.log({
    d,
  });
  return d.categories.map(
    (c) => (
      [
        (c.subcategories || []).map(
          (s) => (
            [
              s.kinds.map(
                (sk) => (
                  [
                    (sk.variants || []).map(
                      (skv) => (
                        {
                          key: skv.name,
                          category: c.name,
                          subcategory: s.name,
                          kink: sk.name,
                          variant: skv.name,
                          roles: (skv.preferences || []).roles || [],
                        }
                      ),
                    ).flat(),
                    {
                      key: sk.name,
                      category: c.name,
                      subcategory: s.name,
                      kink: sk.name,
                      roles: (sk.preferences || []).roles || [],
                    },
                  ].flat()
                ),
              ).flat(),
            ].flat()
          ),
        ).flat(),
        (c.kinds || []).map(
          (k) => (
            [
              {
                key: k.name,
                category: c.name,
                kink: k.name,
                roles: (k.preferences || []).roles || [],
              },
              (k.variants || []).map(
                (kv) => (
                  {
                    key: kv.name,
                    category: c.name,
                    kink: k.name,
                    variant: kv.name,
                    roles: (kv.preferences || []).roles || [],
                  }
                ),
              ).flat(),
            ].flat()
          ),
        ).flat(),
      ].flat()
    ),
  ).flat();
}
