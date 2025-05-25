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
	AlertTriangle,
	Info,
	Plus,
	Trash2,
	Eye,
	EyeOff,
	ExternalLink,
	BarChart3,
	Timer,
	FileText,
	Link
} from 'lucide-react';
import { Textarea } from "@/components/ui/textarea"
import {
	Select
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert} from "@/components/ui/alert"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"


// 增強的結果顯示組件
const EnhancedResultsDisplay = ({ testResults }) => {
	const [showFullContent, setShowFullContent] = useState(false);
	const [showCitations, setShowCitations] = useState(false);

	if (!testResults) return null;

	return (
		<div className={`mt-4 border rounded-lg overflow-hidden ${testResults.success
			? 'bg-green-50 border-green-200'
			: 'bg-red-50 border-red-200'
			}`}>

			{/* 狀態標題 */}
			<div className={`px-4 py-3 border-b ${testResults.success ? 'border-green-200 bg-green-100' : 'border-red-200 bg-red-100'}`}>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						{testResults.success ? (
							<Check className="w-5 h-5 text-green-600" />
						) : (
							<X className="w-5 h-5 text-red-600" />
						)}
						<span className={`font-medium ${testResults.success ? 'text-green-800' : 'text-red-800'}`}>
							{testResults.success ? '搜尋測試成功' : '搜尋測試失敗'}
						</span>
					</div>
					{testResults.success && (
						<Badge variant="success">
							{testResults.responseTime}ms
						</Badge>
					)}
				</div>
			</div>

			<div className="p-4 space-y-4">
				{testResults.success ? (
					<>
						{/* 統計資訊 */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="bg-white rounded-lg p-3 border border-green-200">
								<div className="flex items-center gap-2 mb-1">
									<Timer className="w-4 h-4 text-green-600" />
									<span className="text-xs font-medium text-green-700">響應時間</span>
								</div>
								<div className="text-lg font-bold text-green-800">{testResults.responseTime}ms</div>
							</div>

							<div className="bg-white rounded-lg p-3 border border-green-200">
								<div className="flex items-center gap-2 mb-1">
									<BarChart3 className="w-4 h-4 text-green-600" />
									<span className="text-xs font-medium text-green-700">Token 使用</span>
								</div>
								<div className="text-lg font-bold text-green-800">
									{testResults.usage?.total_tokens || 0}
								</div>
							</div>

							<div className="bg-white rounded-lg p-3 border border-green-200">
								<div className="flex items-center gap-2 mb-1">
									<Search className="w-4 h-4 text-green-600" />
									<span className="text-xs font-medium text-green-700">搜尋次數</span>
								</div>
								<div className="text-lg font-bold text-green-800">
									{testResults.usage?.number_searches || 0}
								</div>
							</div>

							<div className="bg-white rounded-lg p-3 border border-green-200">
								<div className="flex items-center gap-2 mb-1">
									<Link className="w-4 h-4 text-green-600" />
									<span className="text-xs font-medium text-green-700">引用來源</span>
								</div>
								<div className="text-lg font-bold text-green-800">
									{testResults.citations?.length || 0}
								</div>
							</div>
						</div>

						{/* 來源類型 */}
						{testResults.sources && (
							<div className="bg-white rounded-lg p-3 border border-green-200">
								<div className="flex items-center gap-2 mb-2">
									<Globe className="w-4 h-4 text-green-600" />
									<span className="text-sm font-medium text-green-700">搜尋來源</span>
								</div>
								<div className="flex flex-wrap gap-1">
									{testResults.sources.map((source, index) => (
										<Badge key={index} variant="info">{source}</Badge>
									))}
								</div>
							</div>
						)}

						{/* 連接方式 */}
						<div className="bg-white rounded-lg p-3 border border-green-200">
							<div className="flex items-center gap-2 mb-1">
								<Shield className="w-4 h-4 text-green-600" />
								<span className="text-sm font-medium text-green-700">連接方式</span>
							</div>
							<Badge variant={testResults.proxyUsed ? "info" : "warning"}>
								{testResults.proxyUsed ? '代理服務器' : '直接連接'}
							</Badge>
						</div>

						{/* 搜尋結果內容 */}
						<div className="bg-white rounded-lg border border-green-200">
							<div className="px-4 py-3 border-b border-green-200 bg-green-50">
								<button
									onClick={() => setShowFullContent(!showFullContent)}
									className="flex items-center gap-2 text-sm font-medium text-green-800 hover:text-green-900 transition-colors"
								>
									<FileText className="w-4 h-4" />
									搜尋結果內容
									{showFullContent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
								</button>
							</div>
							{showFullContent && (
								<div className="p-4">
									<div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto bg-gray-50 p-3 rounded border">
										{testResults.content}
									</div>
								</div>
							)}
						</div>

						{/* 引用來源 */}
						{testResults.citations?.length > 0 && (
							<div className="bg-white rounded-lg border border-green-200">
								<div className="px-4 py-3 border-b border-green-200 bg-green-50">
									<button
										onClick={() => setShowCitations(!showCitations)}
										className="flex items-center gap-2 text-sm font-medium text-green-800 hover:text-green-900 transition-colors"
									>
										<Link className="w-4 h-4" />
										引用來源 ({testResults.citations.length})
										{showCitations ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
									</button>
								</div>
								{showCitations && (
									<div className="p-4">
										<div className="space-y-2 max-h-48 overflow-y-auto">
											{testResults.citations.map((citation, index) => (
												<div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded border">
													<span className="text-xs font-mono text-gray-500 mt-1">
														{String(index + 1).padStart(2, '0')}
													</span>
													<a
														href={citation}
														target="_blank"
														rel="noopener noreferrer"
														className="flex-1 text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
													>
														{citation}
													</a>
													<ExternalLink className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						)}
					</>
				) : (
					<>
						{/* 錯誤訊息 */}
						<div className="bg-white rounded-lg p-4 border border-red-200">
							<div className="flex items-start gap-2">
								<AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
								<div className="flex-1">
									<div className="font-medium text-red-800 mb-1">錯誤詳情</div>
									<div className="text-sm text-red-700 font-mono bg-red-50 p-2 rounded border">
										{testResults.error}
									</div>
								</div>
							</div>
						</div>

						{/* 故障排除建議 */}
						{!testResults.proxyUsed && testResults.error?.includes('CORS') && (
							<div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
								<div className="flex items-start gap-2">
									<Info className="w-5 h-5 text-yellow-600 mt-0.5" />
									<div>
										<div className="font-medium text-yellow-800 mb-2">建議解決方案</div>
										<div className="text-sm text-yellow-700 mb-2">
											檢測到 CORS 問題，建議啟動代理服務器：
										</div>
										<code className="text-xs bg-yellow-100 p-2 rounded border block">
											node xai-proxy-server.js
										</code>
									</div>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

// xAI API 服務類
class XAIService {
	constructor(apiKey) {
		this.apiKey = apiKey;
		this.useProxy = this.detectProxyAvailability();
		this.baseUrl = 'https://api.x.ai/v1';
	}

	detectProxyAvailability() {
		return window.location.hostname === 'localhost' ||
			window.location.hostname === '127.0.0.1' ||
			process.env.REACT_APP_USE_PROXY === 'true';
	}

	async testSearch(settings) {
		try {
			const searchSources = this._buildSearchSources(settings);

			// 使用用戶設定的搜尋查詢
			const searchQuery = settings.customSearchQuery || 'Provide a brief summary of the latest technology news.';

			const payload = {
				messages: [
					{
						role: 'user',
						content: searchQuery
					}
				],
				search_parameters: {
					mode: 'auto',
					sources: searchSources,
					max_search_results: Math.min(settings.maxResults || 10, 20),
					return_citations: true,
					...(settings.dateRange && {
						from_date: new Date(Date.now() - settings.dateRange * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
					})
				},
				model: 'grok-3-latest',
				max_tokens: 500
			};

			console.log('Search payload:', JSON.stringify(payload, null, 2));

			const startTime = Date.now();
			let response;

			response = await fetch(`${this.baseUrl}/chat/completions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.apiKey}`
				},
				body: JSON.stringify(payload)
			});

			const responseTime = Date.now() - startTime;

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`HTTP ${response.status}: ${errorText}`);
			}

			const data = await response.json();

			return {
				success: true,
				content: data.choices?.[0]?.message?.content || 'No content received',
				citations: data.citations || [],
				responseTime,
				usage: data.usage,
				sources: searchSources.map(s => s.type),
				proxyUsed: this.useProxy
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
				responseTime: 0,
				proxyUsed: this.useProxy
			};
		}
	}

	_buildSearchSources(settings) {
		const sources = [];

		settings.searchSources?.forEach(sourceType => {
			const source = { type: sourceType };

			if (sourceType === 'web' || sourceType === 'news') {
				if (settings.countryCode) {
					source.country = settings.countryCode;
				}
				if (settings.excludedWebsites) {
					source.excluded_websites = settings.excludedWebsites
						.split(',')
						.map(site => site.trim())
						.filter(site => site.length > 0)
						.slice(0, 5);
				}
				if (settings.safeSearch !== undefined) {
					source.safe_search = settings.safeSearch;
				}
			}

			if (sourceType === 'x' && settings.xHandles) {
				source.x_handles = settings.xHandles
					.split(',')
					.map(handle => handle.trim().replace('@', ''))
					.filter(handle => handle.length > 0);
			}

			if (sourceType === 'rss' && settings.rssLinks) {
				source.links = [settings.rssLinks.split(',')[0]?.trim()].filter(Boolean);
			}

			sources.push(source);
		});

		return sources.length > 0 ? sources : [{ type: 'web' }, { type: 'news' }];
	}
}

// 主要設定頁面組件
const SettingsPage = () => {
	const [settings, setSettings] = useState({
		// API 設定
		apiKey: '',
		apiKeyStatus: 'unchecked',
		apiKeyError: '',

		// 自訂搜尋查詢
		customSearchQuery: 'Provide a brief summary of the latest technology news.',
		searchQueryTemplates: [
			'Provide a brief summary of the latest technology news.',
			'What are the latest developments in AI and machine learning?',
			'Show me recent news about cryptocurrency and blockchain.',
			'What are the latest trends in web development?',
			'Give me updates on climate change and environmental technology.'
		],

		// 搜尋偏好
		searchFrequency: 'daily',
		maxResults: 20,
		searchSources: ['web', 'news'],

		// 地區設定
		countryCode: 'TW',
		language: 'zh-TW',

		// 時間設定
		dateRange: 7,
		searchTime: '09:00',

		// 通知設定
		emailNotifications: true,
		pushNotifications: false,
		summaryNotifications: true,

		// 高級設定
		safeSearch: true,
		excludedWebsites: '',
		xHandles: '',
		rssLinks: '',
		maxSearchResults: 20
	});

	const [isSaving, setIsSaving] = useState(false);
	const [isTesting, setIsTesting] = useState(false);
	const [saveStatus, setSaveStatus] = useState('');
	const [testResults, setTestResults] = useState(null);

	// 更新設定
	const updateSetting = (key, value) => {
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
	const removeSearchTemplate = (index) => {
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

		try {
			localStorage.setItem('interestRadarSettings', JSON.stringify(settings));
			setSaveStatus('success');
			setTimeout(() => setSaveStatus(''), 3000);
		} catch (error) {
			setSaveStatus('error');
			console.error('保存設定失敗:', error);
		} finally {
			setIsSaving(false);
		}
	};

	// 重置設定
	const resetSettings = () => {
		const defaultSettings = {
			apiKey: '',
			apiKeyStatus: 'unchecked',
			apiKeyError: '',
			customSearchQuery: 'Provide a brief summary of the latest technology news.',
			searchQueryTemplates: [
				'Provide a brief summary of the latest technology news.',
				'What are the latest developments in AI and machine learning?',
				'Show me recent news about cryptocurrency and blockchain.',
				'What are the latest trends in web development?',
				'Give me updates on climate change and environmental technology.'
			],
			searchFrequency: 'daily',
			maxResults: 20,
			searchSources: ['web', 'news'],
			countryCode: 'TW',
			language: 'zh-TW',
			dateRange: 7,
			searchTime: '09:00',
			emailNotifications: true,
			pushNotifications: false,
			summaryNotifications: true,
			safeSearch: true,
			excludedWebsites: '',
			xHandles: '',
			rssLinks: '',
			maxSearchResults: 20
		};
		setSettings(defaultSettings);
		setTestResults(null);
	};

	// 處理搜尋來源變更
	const handleSourceChange = (source, checked) => {
		const newSources = checked
			? [...settings.searchSources, source]
			: settings.searchSources.filter(s => s !== source);
		updateSetting('searchSources', newSources);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
			<div className="max-w-4xl mx-auto p-6">
				{/* 頁面標題 */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-2">
						<div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
							<Settings className="w-6 h-6" />
						</div>
						<h1 className="text-3xl font-bold text-gray-900">Setting</h1>
					</div>
					<p className="text-gray-600">配置您的個人興趣雷達，讓AI為您量身打造資訊收集服務</p>
				</div>

				{/* 連接狀態提示 */}
				<Alert variant="default" className="mb-6">
					<div className="flex items-start gap-2">
						<Info className="w-4 h-4 mt-0.5" />
						<div>
							<div className="font-medium">連接狀態</div>
							<div className="text-sm mt-1">
								當前使用：<strong>
									{(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
										? '代理服務器模式'
										: '直接連接模式'
									}
								</strong>
							</div>
						</div>
					</div>
				</Alert>

				{/* 保存狀態提示 */}
				{saveStatus && (
					<div className="mb-6">
						<Alert variant={saveStatus}>
							<div className="flex items-center gap-2">
								{saveStatus === 'success' ? (
									<>
										<Check className="w-4 h-4 text-green-600" />
										<span className="text-green-800">設定已成功保存！</span>
									</>
								) : (
									<>
										<X className="w-4 h-4 text-red-600" />
										<span className="text-red-800">保存失敗，請重試</span>
									</>
								)}
							</div>
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
					<EnhancedResultsDisplay testResults={testResults} />
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
