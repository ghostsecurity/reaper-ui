import { Ref, computed, ref, onMounted } from 'vue'
import { themes } from '@/lib/registry/themes'
import axios from 'axios'
import moment from 'moment'
import { AxiosInstance } from 'axios'

// axios setup
const BASE_URL = import.meta.env.VITE_BASE_URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'accept': 'application/json',
  }
})


const userLocale = navigator.language || 'en-US'
const loggedIn = ref(false)

const signIn = () => {
	loggedIn.value = true
}

const signOut = () => {
	loggedIn.value = false
}

interface ConfigStore {
  axios: AxiosInstance
  customNumberFormat: (number: number) => string
  customNumberFormatK: (number: number) => string
  isDark: Ref<boolean>
  localeTimestamp: (ts: number) => string
  localeTimestampShort: (ts: number) => string
  localeDate: (ts: number) => string
  loggedIn: Ref<boolean>
  setThemeColor: (color: string) => void
  setThemeData: () => void
  signIn: () => void
  signOut: () => void
  themeColors: string[]
  themePrimary: Ref<string>
  themeSecondary: Ref<string>
  themeBackground: Ref<string>
  theme: Ref<string>
  timeAgoInWords: (ts: number) => string
  toggleThemeDark: () => void
}

interface Theme{
  name: string
  cssVars: {
    dark: {
      primary: string
      secondary: string
      background: string
    }
    light: {
      primary: string
      secondary: string
      background: string
    }
  }

}

export function useConfigStore(): ConfigStore {
	const isDark = ref(true)
	const theme = ref('')
	const themeColors = [
		'zinc',
		'rose',
		'blue',
		'green',
		'orange',
		'red',
		'violet',
		'slate',
		'stone',
		'gray',
		'neutral',
		'yellow',
	]

	// toggl dark mode
	const toggleThemeDark = () => {
		console.log('config store toggle dark')
		isDark.value = !isDark.value
		document.documentElement.classList.toggle('dark')
		localStorage.setItem('ghost.dark', isDark.value.toString())
	}

	// set dark mode
	const setThemeDark = () => {
		isDark.value = true
		document.documentElement.classList.remove('dark')
		document.documentElement.classList.add('dark')
		localStorage.setItem('ghost.dark', isDark.value.toString())
	}

	// set light mode
	const setThemeLight = () => {
		isDark.value = false
		document.documentElement.classList.remove('dark')
		localStorage.setItem('ghost.dark', isDark.value.toString())
	}

	// set theme color
	const setThemeColor = (color: string) => {
		// valid color
		if (!themeColors.includes(color)) {
			return
		}

		// remove any existing theme color
		document.documentElement.classList.remove(...themeColors.map((color) => `theme-${color}`))

		// add new theme color
		document.documentElement.classList.add(`theme-${color}`)

		theme.value = color

		// write it to localStorage
		localStorage.setItem('ghost.theme', color)
	}

	const setThemeData = () => {
		// set dark mode
		const dark = localStorage.getItem('ghost.dark')
		if (dark == 'true') {
			setThemeDark()
		} else {
			setThemeLight()
		}

		// set theme color
		const theme = localStorage.getItem('ghost.theme')
		if (theme) {
			setThemeColor(theme)
		}
	}

	// get theme colors for charts
	// TODO: refactor to a compbined function/map and make it reactive, so color updates on theme change
	const themePrimary = computed(() => {
		const t = themes.find((t: Theme) => t.name === theme.value)
		return `hsl(${t?.cssVars[isDark.value ? 'dark' : 'light'].primary})`
	})
	const themeSecondary = computed(() => {
		const t = themes.find((t: Theme) => t.name === theme.value)
		return `hsl(${t?.cssVars[isDark.value ? 'dark' : 'light'].secondary})`
	})
	const themeBackground = computed(() => {
		const t = themes.find((t: Theme) => t.name === theme.value)
		return `hsl(${t?.cssVars[isDark.value ? 'dark' : 'light'].background})`
	})

  const localeTimestamp = (ts: number) => {
    const date = new Date(ts * 1000)
    const timeString = date.toLocaleTimeString(userLocale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    return timeString
  }

  const localeTimestampShort = (ts: number) => {
    const date = new Date(ts * 1000)
    const timeString = date.toLocaleTimeString(userLocale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    return timeString
  }

  const localeDate = (ts: number) => {
    const date = new Date(ts * 1000)
    const dateString = date.toLocaleDateString(userLocale, {
      month: 'short',
      day: 'numeric',
    })
    return dateString
  }

  const timeAgoInWords = (ts: number) => {
    const d = new Date(ts * 1000)
    return moment(d).fromNow()
  }

  const customNumberFormat = (n: number) => {
    const formatter = new Intl.NumberFormat(userLocale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  
    return formatter.format(n);
  }

  const customNumberFormatK = (n: number) => {
    const formatter = new Intl.NumberFormat(userLocale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1
    })
  
    if (n >= 1000) {
      // Format the number as "K" (thousands) when it's 1000 or greater
      return formatter.format(n / 1000) + 'K';
    }
    return formatter.format(n)
  }

	onMounted(() => {
		// set default theme color if none is set
		if (localStorage.getItem('ghost.dark') === null) {
			// setThemeDark()
			setThemeLight()
		}
		if (localStorage.getItem('ghost.theme') === null) {
			setThemeColor('blue')
		}

		setThemeData()
	})


	return {
		axios: axiosInstance,
    customNumberFormat,
    customNumberFormatK,
		loggedIn,
    localeTimestamp,
    localeTimestampShort,
    localeDate,
		themeColors,
		themePrimary,
		themeSecondary,
		themeBackground,
		isDark,
		theme,
		toggleThemeDark,
		setThemeColor,
    setThemeData,
		signIn,
		signOut,
    timeAgoInWords
	}
}
