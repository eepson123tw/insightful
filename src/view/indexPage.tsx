import  { useState, useEffect } from 'react';
import {
	Settings,
	RefreshCw,
	Clock,
	Globe,
	ExternalLink,
	Loader2,
	AlertTriangle,

	Search,
	BarChart3,
	Timer,
	Link,
	TrendingUp,
	Eye,
	EyeOff,
	BookOpen,
	FileText
} from 'lucide-react';

// shadcn/ui 風格組件
const Card = ({ children, className = "" }) => (
	<div className={`bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
		{children}
	</div>
);

const CardHeader = ({ children }) => (
	<div className="p-6 pb-4">
		{children}
	</div>
);

const CardContent = ({ children }) => (
	<div className="p-6 pt-0">
		{children}
	</div>
);

const CardTitle = ({ children, className = "" }) => (
	<h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
		{children}
	</h3>
);

const CardDescription = ({ children }) => (
	<p className="text-sm text-gray-600 mt-1">
		{children}
	</p>
);

const Button = ({ children, variant = "default", size = "default", className = "", disabled = false, onClick, ...props }) => {
	const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

	const variants = {
		default: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white focus:ring-indigo-500",
		outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-indigo-500",
		ghost: "hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
		destructive: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
		secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500"
	};

	const sizes = {
		default: "px-4 py-2 text-sm",
		sm: "px-3 py-1.5 text-xs",
		lg: "px-6 py-3 text-base",
		icon: "p-2"
	};

	return (
		<button
			className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
			disabled={disabled}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	);
};

const Badge = ({ children, variant = "default" }) => {
	const variants = {
		default: "bg-gray-100 text-gray-800",
		success: "bg-green-100 text-green-800",
		error: "bg-red-100 text-red-800",
		warning: "bg-yellow-100 text-yellow-800",
		info: "bg-blue-100 text-blue-800",
		purple: "bg-purple-100 text-purple-800"
	};

	return (
		<span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
			{children}
		</span>
	);
};

const Alert = ({ children, variant = "default", className = "" }) => {
	const variants = {
		default: "border-gray-200 bg-gray-50 text-gray-800",
		success: "border-green-200 bg-green-50 text-green-800",
		error: "border-red-200 bg-red-50 text-red-800",
		warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
		info: "border-blue-200 bg-blue-50 text-blue-800"
	};

	return (
		<div className={`border rounded-lg p-4 ${variants[variant]} ${className}`}>
			{children}
		</div>
	);
};

// 新聞項目組件
const NewsCard = ({ title, content, source, timestamp, citations = [] }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [showCitations, setShowCitations] = useState(false);

	const truncateContent = (text, maxLength = 200) => {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + '...';
	};

	return (
		<Card className="mb-4">
			<CardContent className="p-6">
				<div className="flex items-start justify-between mb-3">
					<div className="flex-1">
						<h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
							{title}
						</h3>
						<div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
							<div className="flex items-center gap-1">
								<Globe className="w-4 h-4" />
								<span>{source}</span>
							</div>
							<div className="flex items-center gap-1">
								<Clock className="w-4 h-4" />
								<span>{timestamp}</span>
							</div>
							{citations.length > 0 && (
								<div className="flex items-center gap-1">
									<Link className="w-4 h-4" />
									<span>{citations.length} 來源</span>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="prose prose-sm max-w-none">
					<p className="text-gray-700 leading-relaxed">
						{isExpanded ? content : truncateContent(content)}
					</p>
				</div>

				<div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
					<div className="flex items-center gap-2">
						{content.length > 200 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setIsExpanded(!isExpanded)}
							>
								{isExpanded ? (
									<>
										<EyeOff className="w-4 h-4 mr-1" />
										收起
									</>
								) : (
									<>
										<Eye className="w-4 h-4 mr-1" />
										展開
									</>
								)}
							</Button>
						)}

						{citations.length > 0 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setShowCitations(!showCitations)}
							>
								<Link className="w-4 h-4 mr-1" />
								{showCitations ? '隱藏來源' : '查看來源'}
							</Button>
						)}
					</div>

					<div className="flex items-center gap-1">
						<Button variant="ghost" size="icon">
							<BookOpen className="w-4 h-4" />
						</Button>
					</div>
				</div>

				{showCitations && citations.length > 0 && (
					<div className="mt-4 pt-4 border-t border-gray-100">
						<h4 className="text-sm font-medium text-gray-900 mb-2">參考來源：</h4>
						<div className="space-y-1">
							{citations.map((citation, index) => (
								<a
									key={index}
									href={citation}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline p-2 rounded border border-blue-100 hover:border-blue-200 transition-colors"
								>
									<span className="text-xs font-mono text-gray-500">
										{String(index + 1).padStart(2, '0')}
									</span>
									<span className="flex-1 truncate">{citation}</span>
									<ExternalLink className="w-3 h-3 flex-shrink-0" />
								</a>
							))}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

// 統計儀表板組件
const StatsDashboard = ({ stats }) => {
	if (!stats) return null;

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
			<Card className="p-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-blue-100 rounded-lg">
						<Timer className="w-5 h-5 text-blue-600" />
					</div>
					<div>
						<div className="text-sm font-medium text-gray-600">響應時間</div>
						<div className="text-lg font-bold text-gray-900">{stats.responseTime}ms</div>
					</div>
				</div>
			</Card>

			<Card className="p-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-green-100 rounded-lg">
						<BarChart3 className="w-5 h-5 text-green-600" />
					</div>
					<div>
						<div className="text-sm font-medium text-gray-600">Token 使用</div>
						<div className="text-lg font-bold text-gray-900">{stats.totalTokens}</div>
					</div>
				</div>
			</Card>

			<Card className="p-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-purple-100 rounded-lg">
						<Search className="w-5 h-5 text-purple-600" />
					</div>
					<div>
						<div className="text-sm font-medium text-gray-600">搜尋次數</div>
						<div className="text-lg font-bold text-gray-900">{stats.searchCount}</div>
					</div>
				</div>
			</Card>

			<Card className="p-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-orange-100 rounded-lg">
						<Link className="w-5 h-5 text-orange-600" />
					</div>
					<div>
						<div className="text-sm font-medium text-gray-600">引用來源</div>
						<div className="text-lg font-bold text-gray-900">{stats.citationsCount}</div>
					</div>
				</div>
			</Card>
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

	async search(settings) {
		try {
			const searchSources = this._buildSearchSources(settings);
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
				max_tokens: 1000
			};

			const startTime = Date.now();
			const response = await fetch(`${this.baseUrl}/chat/completions`, {
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
				searchQuery,
				timestamp: new Date().toISOString()
			};
		} catch (error) {
			return {
				success: false,
				error: error.message,
				responseTime: 0,
				timestamp: new Date().toISOString()
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

// 主要索引頁面組件
const IndexPage = () => {
	const [settings, setSettings] = useState(null);
	const [searchResult, setSearchResult] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState(null);
	const [lastUpdated, setLastUpdated] = useState(null);

	// 載入設定
	const loadSettings = () => {
		try {
			const savedSettings = localStorage.getItem('interestRadarSettings');
			if (savedSettings) {
				const parsed = JSON.parse(savedSettings);
				setSettings(parsed);
				return parsed;
			}
			return null;
		} catch (error) {
			console.error('載入設定失敗:', error);
			setError('無法載入設定，請檢查設定頁面');
			return null;
		}
	};

	// 執行搜尋
	const performSearch = async (settingsData) => {
		if (!settingsData?.apiKey) {
			setError('請先在設定頁面配置 API Key');
			setIsLoading(false);
			return;
		}

		try {
			const xaiService = new XAIService(settingsData.apiKey);
			const result = await xaiService.search(settingsData);

			if (result.success) {
				setSearchResult(result);
				setLastUpdated(new Date());
				setError(null);
			} else {
				setError(result.error);
			}
		} catch (error) {
			setError('搜尋時發生錯誤: ' + error.message);
		} finally {
			setIsLoading(false);
			setIsRefreshing(false);
		}
	};

	// 手動刷新
	const handleRefresh = async () => {
		if (!settings) return;

		setIsRefreshing(true);
		setError(null);
		await performSearch(settings);
	};

	// 初始載入
	useEffect(() => {
		const settingsData = loadSettings();
		if (settingsData) {
			performSearch(settingsData);
		} else {
			setIsLoading(false);
		}
	}, []);

	// 分析搜尋結果內容
	const parseSearchContent = (content) => {
		if (!content) return [];

		// 簡單的內容分析，將結果分割成段落
		const sections = content.split(/\n\n|\d+\.\s+/).filter(section => section.trim().length > 0);

		return sections.map((section, index) => {
			// 嘗試提取標題（通常是粗體文字或第一行）
			const lines = section.trim().split('\n');
			const title = lines[0].replace(/^\*\*|\*\*$/g, '').trim() || `新聞 ${index + 1}`;
			const content = lines.slice(1).join('\n').trim() || lines[0];

			return {
				id: index,
				title,
				content,
				source: 'AI 整合報告',
				timestamp: new Date().toLocaleString('zh-TW')
			};
		});
	};

	const newsItems = searchResult ? parseSearchContent(searchResult.content) : [];
	const stats = searchResult ? {
		responseTime: searchResult.responseTime,
		totalTokens: searchResult.usage?.total_tokens || 0,
		searchCount: searchResult.usage?.number_searches || 0,
		citationsCount: searchResult.citations?.length || 0
	} : null;

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
				<div className="text-center">
					<Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
					<h2 className="text-xl font-semibold text-gray-900 mb-2">正在載入您的個人化新聞...</h2>
					<p className="text-gray-600">請稍候，AI 正在為您搜集最新資訊</p>
				</div>
			</div>
		);
	}

	if (!settings) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
				<div className="max-w-md mx-auto text-center p-6">
					<AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-4">尚未設定</h2>
					<p className="text-gray-600 mb-6">
						請先完成設定頁面的配置，包括 API Key 和搜尋偏好。
					</p>
					<Button
						onClick={() => window.location.href = 'setting'}
						className="w-full"
					>
						<Settings className="w-4 h-4 mr-2" />
						前往設定頁面
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
			<div className="max-w-6xl mx-auto p-6">
				{/* 頁面標題和控制 */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<div className="flex items-center gap-3 mb-2">
							<div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
								<TrendingUp className="w-6 h-6" />
							</div>
							<h1 className="text-3xl font-bold text-gray-900">Insightful</h1>
						</div>
						<p className="text-gray-600">
							基於您的搜尋偏好：「{settings.customSearchQuery?.slice(0, 50)}...」
						</p>
						{lastUpdated && (
							<div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
								<Clock className="w-4 h-4" />
								<span>最後更新：{lastUpdated.toLocaleString('zh-TW')}</span>
							</div>
						)}
					</div>

					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							onClick={() => window.location.href = 'setting'}
						>
							<Settings className="w-4 h-4 mr-2" />
							設定
						</Button>
						<Button
							onClick={handleRefresh}
							disabled={isRefreshing}
						>
							{isRefreshing ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									刷新中...
								</>
							) : (
								<>
									<RefreshCw className="w-4 h-4 mr-2" />
									刷新
								</>
							)}
						</Button>
					</div>
				</div>

				{/* 搜尋來源和設定摘要 */}
				<Card className="mb-6">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<Globe className="w-4 h-4 text-gray-500" />
									<span className="text-sm text-gray-600">搜尋來源：</span>
									<div className="flex gap-1">
										{settings.searchSources?.map((source, index) => (
											<Badge key={index} variant="info">
												{source === 'web' ? '網頁' :
													source === 'news' ? '新聞' :
														source === 'x' ? 'X' :
															source === 'rss' ? 'RSS' : source}
											</Badge>
										))}
									</div>
								</div>

								{settings.countryCode && (
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-600">地區：</span>
										<Badge variant="default">{settings.countryCode}</Badge>
									</div>
								)}
							</div>

							<div className="text-sm text-gray-500">
								{settings.dateRange} 天內的資訊
							</div>
						</div>
					</CardContent>
				</Card>

				{/* 錯誤提示 */}
				{error && (
					<Alert variant="error" className="mb-6">
						<div className="flex items-start gap-2">
							<AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
							<div>
								<div className="font-medium">發生錯誤</div>
								<div className="text-sm mt-1">{error}</div>
							</div>
						</div>
					</Alert>
				)}

				{/* 統計儀表板 */}
				{stats && <StatsDashboard stats={stats} />}

				{/* 新聞內容 */}
				{searchResult && (
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold text-gray-900">
								為您精選的資訊
							</h2>
							<Badge variant="success">
								{newsItems.length} 條內容
							</Badge>
						</div>

						{newsItems.length > 0 ? (
							<div className="space-y-4">
								{newsItems.map((item) => (
									<NewsCard
										key={item.id}
										title={item.title}
										content={item.content}
										source={item.source}
										timestamp={item.timestamp}
										citations={searchResult.citations}
									/>
								))}
							</div>
						) : (
							<Card className="p-8 text-center">
								<BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									暫無內容
								</h3>
								<p className="text-gray-600">
									嘗試調整您的搜尋設定或稍後再試
								</p>
							</Card>
						)}

						{/* 完整搜尋結果 */}
						{searchResult.content && (
							<Card className="mt-8">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<FileText className="w-5 h-5" />
										完整 AI 分析報告
									</CardTitle>
									<CardDescription>
										基於 {searchResult.citations?.length || 0} 個來源的綜合分析
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="prose prose-sm max-w-none">
										<div className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border">
											{searchResult.content}
										</div>
									</div>
								</CardContent>
							</Card>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default IndexPage;
