<template>
  <div>
    <BaseArticle>
      <template v-slot:header>
        <h1>
          Hoppala...
        </h1>
      </template>
      <template v-slot:body>
        <p>
          Das hätte nicht passieren sollen. Während wir den Fehler beheben, kannst du auf der
          <BaseLink to="/"
                    v-text="`Startseite`" /> weitersurfen.
        </p>
      </template>
    </BaseArticle>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ViewMixin } from '~src/global/mixins'

@Component
export default class ErrorView extends Mixins(ViewMixin) {}
</script>
