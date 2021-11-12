// check_yaml_keys.js

const fs = require('fs');
const yaml = require('js-yaml');

import {flattenKinks} from './flattenKinks';

let data;

// read the file
try {
  const fileContents = fs.readFileSync('src/assets/kinks.yaml', 'utf8');
  data = yaml.load(fileContents);

  console.log(data);
} catch (e) {
  console.log(e);
}

// flatten the file
let kinks;

export function getRoles(d) {
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
                        (skv.preferences || []).roles || []
                      ),
                    ).flat(),
                    (sk.preferences || []).roles || [],
                  ].flat()
                ),
              ).flat(),
            ].flat()
          ),
        ).flat(),
        (c.kinds || []).map(
          (k) => (
            [
              ((k.preferences || []).roles || []).flat(),
              (k.variants || []).map(
                (kv) => (
                  (kv.preferences || []).roles || []
                ),
              ).flat(),
            ].flat()
          ),
        ).flat(),
      ].flat()
    ),
  ).flat();
}

kinks = flattenKinks(data);

let roles;
roles = getRoles(data);

const get_messages_per_lang_with_prefix = (m, id) => (
  m ? Object.entries(m).map(
    ([mlk, ml]) => (
      Object.entries(ml).map(
        ([mk, mv]) => (
          {
            [`${mlk}_${

              mk == id
                ? ''
                : `${id}_`
            }${mk}`]: mv,
            lang: mlk,
            id,
            orig_key: mk,
            orig_value: mv,
          }
        ),
      ).flat()
    ),
  ).flat()
    : null
);

let all_messages;

all_messages = data.categories.map(
  (c) => (
    [
      get_messages_per_lang_with_prefix(c.messages, c.name),
      (c.subcategories || []).map(
        (s) => (
          [

            ((s.preferences || []).roles || []).map(
              (r) => (
                get_messages_per_lang_with_prefix(r.messages, r.name)
              ),
            ).flat(),
            get_messages_per_lang_with_prefix(s.messages, s.name),
            (s.kinds || []).map(
              (sk) => (
                [

                  ((sk.preferences || []).roles || []).map(
                    (r) => (
                      get_messages_per_lang_with_prefix(r.messages, r.name)
                    ),
                  ).flat(),
                  get_messages_per_lang_with_prefix(sk.messages, sk.name),
                  (sk.variants || []).map(
                    (skv) => (
                      [
                        ((skv.preferences || []).roles || []).map(
                          (r) => (
                            get_messages_per_lang_with_prefix(r.messages, r.name)
                          ),
                        ).flat(),
                        get_messages_per_lang_with_prefix(skv.messages, skv.name),
                      ].flat()
                    ),
                  ).flat(),
                ].flat()
              ),
            ).flat(),
          ].flat()
        ),
      ).flat(),
      (c.kinds || []).map(
        (k) => (
          [
            ((k.preferences || []).roles || []).map(
              (r) => (
                get_messages_per_lang_with_prefix(r.messages, r.name)
              ),
            ).flat(),
            get_messages_per_lang_with_prefix(k.messages, k.name),
            (k.variants || []).map(
              (kv) => (
                [
                  ((kv.preferences || []).roles || []).map(
                    (r) => (
                      get_messages_per_lang_with_prefix(r.messages, r.name)
                    ),
                  ).flat(),
                  get_messages_per_lang_with_prefix(kv.messages, kv.name),
                ].flat()
              ),
            ).flat(),

          ].flat()
        ),
      ).flat(),
    ].flat()
  ),
).flat();

console.log(all_messages);

console.log(roles);
