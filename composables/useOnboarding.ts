import { onMounted, useRoute, useRouter, watch } from '@nuxtjs/composition-api'

const exceptions = [
  'login',
  'registration',
  'verify-email',
  'onboarding'
]
export default function () {
  const route = useRoute()
  const router = useRouter()

  function checkIfOnboardingIsNeeded () {
    if (localStorage.getItem('onboarding.initial') !== '1') {
      router!.push('/onboarding/initial')
    } else if (localStorage.getItem('onboarding.login') !== '1') {
      router!.push('/onboarding/login')
    }
  }

  watch(() => route.value.path, () => {
    checkIfOnboardingIsNeeded()
  })

  onMounted(() => {
    if (exceptions.some(e => route.value.path.includes(e))) {
      return
    }

    checkIfOnboardingIsNeeded()
  })

  return {
    checkIfOnboardingIsNeeded
  }
}
