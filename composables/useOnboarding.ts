import { onMounted, useRoute, useRouter, watch } from '@nuxtjs/composition-api'

const exceptions = ['profile/account', 'verify-email', 'onboarding', 'widget']
export default function () {
  const route = useRoute()
  const router = useRouter()

  function checkIfOnboardingIsNeeded() {
    if (exceptions.some((e) => route.value.path.includes(e))) {
      return
    }

    if (localStorage.getItem('onboarding.tutorial') !== '1') {
      router!.push('/onboarding/tutorial')
    } else if (localStorage.getItem('onboarding.login') !== '1') {
      router!.push('/onboarding/login')
    }
  }

  watch(
    () => route.value.path,
    () => {
      checkIfOnboardingIsNeeded()
    }
  )

  onMounted(() => {
    checkIfOnboardingIsNeeded()
  })

  return {
    checkIfOnboardingIsNeeded
  }
}
