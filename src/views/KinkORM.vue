<template>

  <h1>ORM</h1>
  <div
    class="
           "
    >

    <div id="initialize-tag">
  <!-- `greet` is the name of a method defined below -->
  <button @click="initializeTag">Initialize Tag</button>
</div>

    <div id="initialize-variant">
  <!-- `greet` is the name of a method defined below -->
  <button @click="initializeVariant">Initialize Variant</button>
</div>

    <div id="initialize-tag-variant-with-objects">
  <!-- `greet` is the name of a method defined below -->
  <button @click="initializeTagVariantWithObjects">Initialize TagVariant with Objects</button>
</div>

    <div id="initialize-tag-variant-with-values">
  <!-- `greet` is the name of a method defined below -->
  <button @click="initializeTagVariantWithValues">Initialize TagVariant with Values</button>
</div>

    <div id="delete-all">
  <!-- `greet` is the name of a method defined below -->
  <button @click="deleteAll">Delete all</button>
</div>

    <div id="load-all-variants">
  <!-- `greet` is the name of a method defined below -->
  <button @click="loadAllVariants">Load all variants</button>
</div>

    <div id="load-all-tags">
  <!-- `greet` is the name of a method defined below -->
  <button @click="loadAllTags">Load all tags</button>
</div>

<div>
  TAGS:
    {{ this.tagRepoAll }}
</div>
<div>
  VARIANTS:
    {{ this.variantRepoAll }}
</div>
<div>
  TAGVARIANTS:
    {{ this.tagVariantRepoAll }}
</div>
<div>
  TAGVARIANTS with ALL:
    {{ this.tagVariantsWithAll }}
</div>
<div>
  PREFERENCE:
    {{ this.preferenceRepoAll }}
</div>


<!--    <KinkCategory
      v-for="categoryName in categoryNames"
      :id="categoryName"
      :key="'category-'+categoryName"
      :name="categoryName"
      :categoryName="categoryName"
      :selectedProfile="selectedProfile"
      /> -->
  </div>
</template>

<script>
import { defineAsyncComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';

import { mapRepos } from '@vuex-orm/core';
import TagVariant from '@/models/TagVariant';
import Tag from '@/models/Tag';
import Variant from '@/models/Variant';

import PreferenceModel from '@/store/modules/AllKinks/models/Preference';

import kinks from '@/assets/kinks_reduced.yaml';
import {flattenKinks} from '@/tools/flattenKinks';
import {getKinkTags} from '@/tools/getKinkTags';

import LoaderBar from '@/components/LoaderBar.vue';

export default {
  name: 'KinkORM',
  components: {
    KinkCategory: defineAsyncComponent({
      loader: () => import('@/components/KinkCategory.vue'),
      loadingComponent: LoaderBar,
    }),
  },
  computed: {
    ...mapRepos({
    tagVariantRepo: TagVariant,
    tagRepo: Tag,
    variantRepo: Variant,
    preferenceRepo: PreferenceModel,
  }),
    preferenceRepoAll () {
      return this.preferenceRepo.all()
    },
    tagRepoAll () {
      return this.tagRepo.all()
    },
    variantRepoAll () {
      return this.variantRepo.all()
    },
    tagVariantRepoAll () {
      return this.tagVariantRepo.all()
    },
    tagVariantsWithAll () {
      return this.tagVariantRepo.query().with('tag').with('variant').first()
    },
  },

  setup() {
    const profile = ref('CURRENT');

    // https://learnvue.co/2019/12/mastering-computed-properties-in-vuejs/
    const selectedProfile = computed({
      get: () => (
        profile.value
      ),
      set: (value) => {
        profile.value = value;
      },
    });

    const store = useStore();
    const categoryNames = computed({
      get: () => (
        store.getters[
          'AllKinks/getCategoryNamesForUser'
        ]({ username: selectedProfile.value })
      ),
    });

    const deleteAll = () => (store.dispatch('entities/deleteAll'))

    return {
      selectedProfile,
      categoryNames,
    };
  },

  methods: {

    loadAllTags () {

      const tags = getKinkTags(kinks);
      console.log({
        tags
      });
      this.tagRepo.save(
        tags
        );

    },

    loadAllVariants () {
      const flattened = flattenKinks(kinks);
      this.variantRepo.save(
        flattened
      )

    },

    deleteAllMethod () {
      this.tagRepo.deleteAll()
      this.variantRepo.deleteAll()
      this.tagVariantRepo.deleteAll()
    },

    initializeTag () {
      this.tagRepo.save({tag:'test_tag'})
    },

    initializeVariant () {
      this.variantRepo.save({key:'test_variant'})
    },

    initializeTagVariantWithObjects () {
      this.tagVariantRepo.save(
        {
          'tag_key': 'test_tag',
          'variant_key': 'test_variant',
          'tag': {tag: 'test_tag'},
          'variant': {variant: 'test_variant'},
        },
      )
    },

    initializeTagVariantWithValues () {
      this.tagVariantRepo.save(
        {
          'tag_key': 'test_tag',
          'variant_key': 'test_variant'
        },
      )
    },

  },

  data() {
    return {
      debug: false,
    };
  },

};

</script>
