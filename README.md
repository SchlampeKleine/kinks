# kinks

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Datastructure

```plantuml
@startuml
' hide the spot
hide circle

' avoid problems with angled crows feet
skinparam linetype ortho

entity "User" as user {
  *username : String
  --
}


entity "Variant" as variant {
  *key: String
  --
  *category: String
  subcategory: String
  *kind: String
  variant: String
}

entity "Tag" as tag {
  *tag: String
  --
}

entity "TagVariant" as tagvariant {
  *variant_tag_id: int <<generated>>
  --
  *variant: String <<FK>>
  *tag: String <<FK>>
}

entity "PreferenceLevel" as preferencelevel {
  *name: String
  --
  sortKey: int
  color: String
}

tag }o--|| tagvariant
tagvariant ||-o{ variant

entity "Role" as role {
  *key: String
  --
  sideByside: String <<FK>>
}

role |o--|| role

entity "VariantRole" as variantrole {
  *variant_role_id: int <<generated>>
  --
  *variant_key: String <<FK>>
  *role_key: String <<FK>>
}

variant }|--|| variantrole
role }|--|| variantrole

entity "UserPreference" as userpreference {
  *id: int <<generated>>
  --
  *variant_role: int <<FK>>
  *username: String <<FK>>
  *preferencelevel: String <<FK>>
}

preferencelevel }o--|| userpreference
user }o--|| userpreference
variantrole }|--|| userpreference
@enduml
```

as seen on [plantuml](//www.plantuml.com/plantuml/png/ZLDDZvmm3BtdLrXxgRGIVw1QhLOzzB8zLFteTPG5BqGJ4kIO6Q61_zuaD0GeAyq5sSzstlCBUN4iYVjMYq_Gg0g16mJNMHOnAnML6eKloejL5NHatpIs3gwA6v2crbX1IVRgu1sHXJihqqcIBMXba8SEmH8tLWWqh7Y0XzyEwG6aWzu7S1C0Zo4oiaNu33-PbAazM1HY4ddgZoGb3SV1onpFisSSDbC1AoLZRMbTSFtR0VherLOvJoSlo9G5_99r96TPpyG-s13lchFWEBFH_2yvUVoaFB_oXQUd6WsIPAoUdvTDTe9yrzVNKCxq6LqB-4xuZeIcn6zuGHrLT0kc0pPB2RRl_NEM-1M7gCkdfTMM5Yu8DC64oHR5EAvs4pc4SIpiBTcPPVsm6gCMyi67z-TKXL-6y3tOC4wECtU8__j54aTYJrJPze3Sv_ifgrjx7mv8fPsyPC0q1eLh3L7v4Rvv6VdYbZUIxsrUupxbuUZKbtIdTtQmqkxdEDXirv7kVwjGXFIubAn9DXnqlA2f-bR_1G00)
