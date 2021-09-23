<template>
  <nav>
    <div class="btn ripple" :class="{ active: $route.name === 'index' }" @click="$router.push('/')">
      <div class="icon">
        <img :src="`/icons/navigation/home${$route.name === 'index' ? '_active' : ''}.svg`" alt="Home" />
        <!--        <object data="/icons/navigation/home.svg" type="image/svg+xml">-->
        <!--          <img src="/icons/navigation/home.svg" alt="Home" />-->
        <!--        </object>-->
      </div>
      <div class="label">Home</div>
    </div>

    <div class="btn ripple" :class="{ active: $route.name.startsWith('statement-id') }">
      <div class="icon">
        <img
          :src="`/icons/navigation/bills${$route.name.startsWith('statement-id') ? '_active' : ''}.svg`"
          alt="Anträge"
        />
      </div>
      <div class="label">Anträge</div>
    </div>

    <div class="btn ripple">
      <div class="icon">
        <img src="/icons/navigation/news.svg" alt="News" />
      </div>
      <div class="label">News</div>
    </div>

    <div class="btn ripple">
      <div class="icon">
        <img src="/icons/navigation/petitions.svg" alt="Petitionen" />
      </div>
      <div class="label">Petitionen</div>
    </div>

    <div
      class="btn ripple"
      :class="{ active: $route.name.startsWith('profile') }"
      @click="$router.push('/profile/political')"
    >
      <div class="icon">
        <img :src="`/icons/navigation/profile${$route.name.startsWith('profile') ? '_active' : ''}.svg`" alt="Profil" />
      </div>
      <div class="label">Profil</div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
@import '/assets/_variables.scss';
@import '/assets/_animations.scss';

nav {
  height: 50px;
  border-top: 1px solid #cccccc;
  @apply bg-white w-full flex flex-row;

  .btn {
    height: 40px;
    margin: 5px 0;
    @apply flex-grow text-center cursor-pointer outline-none select-none ripple;

    .icon {
      svg,
      img,
      object {
        height: 25px;
        @apply mx-auto;
      }
    }

    &.active .label {
      color: $primary;
    }

    .label {
      height: 15px;
      line-height: 15px;
    }
  }
}

nav > div > section.btn.active {
  color: black;
}
</style>
