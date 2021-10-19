<template>
  <nav>
    <div class="btn ripple" :class="{ active: homeActive }" @click="$router.push('/')">
      <div class="icon">
        <img :src="`/icons/navigation/home${homeActive ? '_active' : ''}.svg`" alt="Home" />
        <!--        <object data="/icons/navigation/home.svg" type="image/svg+xml">-->
        <!--          <img src="/icons/navigation/home.svg" alt="Home" />-->
        <!--        </object>-->
      </div>
      <div class="label">Home</div>
    </div>

    <div class="btn ripple" :class="{ active: proposalsActive }" @click="$router.push('/feed/proposals')">
      <div class="icon">
        <img :src="`/icons/navigation/bills${proposalsActive ? '_active' : ''}.svg`" alt="Anträge" />
      </div>
      <div class="label">Anträge</div>
    </div>

    <div class="btn ripple" :class="{ active: newsActive }" @click="$router.push('/feed/news')">
      <div class="icon">
        <img :src="`/icons/navigation/news${newsActive ? '_active' : ''}.svg`" alt="News" />
      </div>
      <div class="label">News</div>
    </div>

    <div class="btn ripple" :class="{ active: petitionsActive }" @click="$router.push('/feed/petitions')">
      <div class="icon">
        <img :src="`/icons/navigation/petitions${petitionsActive ? '_active' : ''}.svg`" alt="Petitionen" />
      </div>
      <div class="label">Petitionen</div>
    </div>

    <div class="btn ripple" :class="{ active: profileActive }" @click="$router.push('/profile')">
      <div class="icon">
        <img :src="`/icons/navigation/profile${profileActive ? '_active' : ''}.svg`" alt="Profil" />
      </div>
      <div class="label">Profil</div>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const route = useRoute()

    return {
      homeActive: computed(() => route.value.name === 'index'),
      proposalsActive: computed(
        () =>
          (route.value.name && route.value.name.startsWith('proposal-id')) ||
          (route.value.name === 'feed-type' && route.value.params.type === 'proposals')
      ),
      newsActive: computed(
        () =>
          // route.value.name!.startsWith('statement-id') ||
          route.value.name === 'feed-type' && route.value.params.type === 'news'
      ),
      petitionsActive: computed(() => route.value.name === 'feed-type' && route.value.params.type === 'petitions'),
      profileActive: computed(() => route.value.name === 'profile')
    }
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
    flex-basis: 0;
    @apply flex-grow text-center cursor-pointer outline-none select-none ripple rounded;

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
      font-size: 10px;
      height: 15px;
      line-height: 15px;
    }
  }
}

nav > div > section.btn.active {
  color: black;
}
</style>
