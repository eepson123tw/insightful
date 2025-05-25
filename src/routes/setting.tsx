import { createFileRoute } from '@tanstack/react-router'
import SettingsPage from '@/view/settingPage'

export const Route = createFileRoute('/setting')({
	component: SettingsPage,
})

