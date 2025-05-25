import  { useState } from 'react';
import {
	Settings,
	Key,
	Globe,
	Bell,
	Search,
	Clock,
	Shield,
	TestTube,
	Check,
	X,
	Loader2,
	Save,
	RefreshCw,
	Plus,
	Trash2,
} from 'lucide-react';
import { Textarea } from "@/components/ui/textarea"
import {
	Select
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

import { Alert, AlertTitle } from "@/components/ui/alert"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import AlertBlock from '@/components/setting/AlertBlock';
import SettingsJson from '@/utils/setting.json'
import EnhancedResults from '@/components/setting/EnhancedResults'
import { XAIService, type SuccessContent, type ErrorContent } from '@/server/api';



// 主要設定頁面組件
const SettingsPage = () => {
	const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('interestRadarSettings')!) as typeof SettingsJson || SettingsJson);

	const [isSaving, setIsSaving] = useState(false);
	const [isTesting, setIsTesting] = useState(false);
	const [saveStatus, setSaveStatus] = useState<'destructive' |'default'|''>('');
	const [testResults, setTestResults] = useState<null | SuccessContent | ErrorContent>(null);

	// 更新設定
	const updateSetting = (key: keyof typeof settings, value: typeof settings[keyof typeof settings] ) => {
		setSettings(prev => ({
			...prev,
			[key]: value
		}));
	};

	// 添加新的搜尋模板
	const addSearchTemplate = () => {
		const newTemplate = settings.customSearchQuery.trim();
		if (newTemplate && !settings.searchQueryTemplates.includes(newTemplate)) {
			updateSetting('searchQueryTemplates', [...settings.searchQueryTemplates, newTemplate]);
		}
	};

	// 刪除搜尋模板
	const removeSearchTemplate = (index:number) => {
		const newTemplates = settings.searchQueryTemplates.filter((_, i) => i !== index);
		updateSetting('searchQueryTemplates', newTemplates);
	};

	// 測試搜尋功能
	const testSearch = async () => {
		setIsTesting(true);
		setTestResults(null);

		const xaiService = new XAIService(settings.apiKey);
		const result = await xaiService.testSearch(settings);

		setTestResults(result);
		setIsTesting(false);
	};

	// 保存設定
	const saveSettings = async () => {
		setIsSaving(true);
		setSaveStatus('');
		const element = document.querySelector(".box")!;

		try {
			localStorage.setItem('interestRadarSettings', JSON.stringify(settings));
			setSaveStatus('default');
			setTimeout(() => setSaveStatus(''), 3000);
		} catch (error) {
			setSaveStatus('destructive');
			console.error('保存設定失敗:', error);
		} finally {
			element.scrollIntoView();
			setIsSaving(false);
		} 
	};

	// 重置設定
	const resetSettings = () => {
		setSettings(SettingsJson);
		setTestResults(null);
	};

	// 處理搜尋來源變更
	const handleSourceChange = (source:string, checked:boolean) => {
		const newSources = checked
			? [...settings.searchSources, source]
			: settings.searchSources.filter(s => s !== source);
		updateSetting('searchSources', newSources);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 box">
			<div className="max-w-4xl mx-auto p-6">

				<div className="mb-8">
					<div className="flex items-center gap-3 mb-2">
						<div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
							<Settings className="w-6 h-6" />
						</div>
						<h2 className="text-3xl font-bold text-gray-900">Setting</h2>
					</div>
					<p className="text-gray-600">配置您的個人興趣雷達，讓AI為您量身打造資訊收集服務</p>
				</div>
				<AlertBlock />


				{/* 保存狀態提示 */}
				{saveStatus && (
					<div className="mb-6">
						<Alert variant={saveStatus}>
							{saveStatus === 'default' ? <Check className="w-4 h-4 stroke-green-600" /> : <X className="w-4 h-4 stroke-red-600" />}
							<AlertTitle className="flex items-center gap-2">
								{saveStatus === 'default' ? (
									<span className="text-green-800">設定已成功保存！</span>
								) : (
									<span className="text-red-800">保存失敗，請重試</span>
								)}
							</AlertTitle>
						</Alert>
					</div>
				)}

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* API 設定 */}
					<Card>
						<CardHeader>
							<div className="flex items-center gap-2">
								<Key className="w-5 h-5 text-indigo-600" />
								<CardTitle>API 設定</CardTitle>
							</div>
							<CardDescription>
								配置您的 xAI API 密鑰以啟用智能搜尋功能
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									xAI API Key
								</label>
								<Input
									type="password"
									placeholder="輸入您的 xAI API Key (xai-...)"
									value={settings.apiKey}
									onChange={(e) => updateSetting('apiKey', e.target.value)}
								/>
							</div>

							{/* 測試搜尋 */}
							<div className="pt-4 border-t">
								<Button
									variant="outline"
									onClick={testSearch}
									className="w-full"
									disabled={!settings.apiKey || isTesting}
								>
									{isTesting ? (
										<>
											<Loader2 className="w-4 h-4 mr-2 animate-spin" />
											測試中...
										</>
									) : (
										<>
											<TestTube className="w-4 h-4 mr-2" />
											測試搜尋功能
										</>
									)}
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* 自訂搜尋查詢 */}
					<Card>
						<CardHeader>
							<div className="flex items-center gap-2">
								<Search className="w-5 h-5 text-indigo-600" />
								<CardTitle>搜尋查詢設定</CardTitle>
							</div>
							<CardDescription>
								自訂您的搜尋提示詞和查詢模板
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									當前搜尋查詢
								</label>
								<Textarea
									placeholder="輸入您的搜尋提示詞..."
									value={settings.customSearchQuery}
									onChange={(e) => updateSetting('customSearchQuery', e.target.value)}
									rows={3}
								/>
								<div className="flex justify-end mt-2">
									<Button
										variant="ghost"
										size="sm"
										onClick={addSearchTemplate}
										disabled={!settings.customSearchQuery.trim()}
									>
										<Plus className="w-4 h-4 mr-1" />
										儲存為模板
									</Button>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									搜尋模板
								</label>
								<div className="space-y-2 max-h-48 overflow-y-auto">
									{settings.searchQueryTemplates.map((template, index) => (
										<div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded border">
											<button
												onClick={() => updateSetting('customSearchQuery', template)}
												className="flex-1 text-left text-sm text-gray-700 hover:text-gray-900 transition-colors"
											>
												{template}
											</button>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => removeSearchTemplate(index)}
												className="flex-shrink-0 p-1 h-auto"
											>
												<Trash2 className="w-3 h-3" />
											</Button>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 搜尋偏好 */}
					<Card>
						<CardHeader>
							<div className="flex items-center gap-2">
								<Globe className="w-5 h-5 text-indigo-600" />
								<CardTitle>搜尋偏好</CardTitle>
							</div>
							<CardDescription>
								自訂您的搜尋行為和結果偏好
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									搜尋頻率
								</label>
								<Select
									value={settings.searchFrequency}
									onValueChange={(value) => updateSetting('searchFrequency', value)}
								>
									<option value="daily">每日</option>
									<option value="weekly">每週</option>
									<option value="monthly">每月</option>
								</Select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									最大結果數量：{settings.maxResults}
								</label>
								<input
									type="range"
									min="5"
									max="50"
									step="5"
									value={settings.maxResults}
									onChange={(e) => updateSetting('maxResults', parseInt(e.target.value))}
									className="w-full"
								/>
								<div className="flex justify-between text-xs text-gray-500 mt-1">
									<span>5</span>
									<span>50</span>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-3">
									搜尋來源
								</label>
								<div className="space-y-2">
									{[
										{ key: 'web', label: '網頁搜尋', icon: Globe },
										{ key: 'news', label: '新聞', icon: Bell },
										{ key: 'x', label: '社群媒體 (X)', icon: Search },
										{ key: 'rss', label: 'RSS 訂閱源', icon: Clock }
									].map(({ key, label, icon: Icon }) => (
										<div key={key} className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Icon className="w-4 h-4 text-gray-500" />
												<span className="text-sm">{label}</span>
											</div>
											<Switch
												checked={settings.searchSources.includes(key)}
												onCheckedChange={(checked) => handleSourceChange(key, checked)}
											/>
										</div>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* 地區與語言設定 */}
					<Card>
						<CardHeader>
							<div className="flex items-center gap-2">
								<Globe className="w-5 h-5 text-indigo-600" />
								<CardTitle>地區與語言</CardTitle>
							</div>
							<CardDescription>
								設定您的地區偏好和語言選項
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									地區 (ISO Alpha-2 代碼)
								</label>
								<Select
									value={settings.countryCode}
									onValueChange={(value) => updateSetting('countryCode', value)}
								>
									<option value="">全球</option>
									<option value="TW">台灣 (TW)</option>
									<option value="US">美國 (US)</option>
									<option value="JP">日本 (JP)</option>
									<option value="CN">中國 (CN)</option>
									<option value="KR">韓國 (KR)</option>
									<option value="CH">瑞士 (CH)</option>
								</Select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									語言
								</label>
								<Select
									value={settings.language}
									onValueChange={(value) => updateSetting('language', value)}
								>
									<option value="zh-TW">繁體中文</option>
									<option value="zh-CN">簡體中文</option>
									<option value="en">English</option>
									<option value="ja">日本語</option>
								</Select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									搜尋時間範圍：{settings.dateRange} 天
								</label>
								<input
									type="range"
									min="1"
									max="30"
									value={settings.dateRange}
									onChange={(e) => updateSetting('dateRange', parseInt(e.target.value))}
									className="w-full"
								/>
								<div className="flex justify-between text-xs text-gray-500 mt-1">
									<span>1天</span>
									<span>30天</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* 測試結果顯示 */}
				{testResults && (
					<EnhancedResults testResults={testResults} />
				)}

				{/* 高級設定 */}
				<Card className="mt-6">
					<CardHeader>
						<div className="flex items-center gap-2">
							<Shield className="w-5 h-5 text-indigo-600" />
							<CardTitle>高級設定</CardTitle>
						</div>
						<CardDescription>
							進階搜尋選項和特殊參數配置
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<div className="flex items-center justify-between mb-2">
									<label className="text-sm font-medium text-gray-700">
										安全搜尋
									</label>
									<Switch
										checked={settings.safeSearch}
										onCheckedChange={(checked) => updateSetting('safeSearch', checked)}
									/>
								</div>
								<p className="text-xs text-gray-500">過濾不適當的內容（預設開啟）</p>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									排除網站
								</label>
								<Input
									placeholder="example.com, test.com"
									value={settings.excludedWebsites}
									onChange={(e) => updateSetting('excludedWebsites', e.target.value)}
								/>
								<p className="text-xs text-gray-500 mt-1">最多5個，以逗號分隔</p>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									X 帳號 (可選)
								</label>
								<Input
									placeholder="@elonmusk, @openai"
									value={settings.xHandles}
									onChange={(e) => updateSetting('xHandles', e.target.value)}
								/>
								<p className="text-xs text-gray-500 mt-1">僅搜尋指定帳號的貼文</p>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									RSS 連結 (可選)
								</label>
								<Input
									placeholder="https://example.com/feed.xml"
									value={settings.rssLinks}
									onChange={(e) => updateSetting('rssLinks', e.target.value)}
								/>
								<p className="text-xs text-gray-500 mt-1">目前僅支援一個 RSS 連結</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* 操作按鈕 */}
				<div className="flex justify-between items-center mt-8 p-6 bg-white rounded-xl border border-gray-200">
					<Button
						variant="ghost"
						onClick={resetSettings}
					>
						<RefreshCw className="w-4 h-4 mr-2" />
						重置為預設值
					</Button>

					<Button
						onClick={saveSettings}
						disabled={isSaving}
						size="lg"
					>
						{isSaving ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								保存中...
							</>
						) : (
							<>
								<Save className="w-4 h-4 mr-2" />
								保存設定
							</>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
