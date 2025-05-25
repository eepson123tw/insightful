import React, { useState, useEffect } from 'react';
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

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { XAIService, type SuccessContent, type ErrorContent } from '@/server/api';

interface AppSettings {
	apiKey: string;
	customSearchQuery?: string;
	maxResults?: number;
	dateRange?: number;
	searchSources?: string[];
	countryCode?: string;
	excludedWebsites?: string;
	safeSearch?: boolean;
	xHandles?: string;
	rssLinks?: string;
}

interface NewsItem {
	id: number;
	title: string;
	content: string;
	source: string;
	timestamp: string;
}

interface SearchStats {
	responseTime: number;
	totalTokens: number;
	searchCount: number;
	citationsCount: number;
}

interface SearchResultData extends SuccessContent {
	searchQuery?: string;
	timestamp?: string;
}

interface NewsCardProps {
	title: string;
	content: string;
	source: string;
	timestamp: string;
	citations?: string[];
}

interface StatsDashboardProps {
	stats: SearchStats | null;
}

// News Card Component
const NewsCard: React.FC<NewsCardProps> = ({ 
	title, 
	content, 
	source, 
	timestamp, 
	citations = [] 
}) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const [showCitations, setShowCitations] = useState<boolean>(false);

	const truncateContent = (text: string, maxLength: number = 200): string => {
		if (text.length <= maxLength) return text;
		return text.slice(0, maxLength) + '...';
	};

	return (
		<Card className="mb-4">
			<CardContent className="p-6">
				<div className="flex items-start justify-between mb-3">
					<div className="flex-1">
						<CardTitle className="text-lg mb-2 leading-tight">
							{title}
						</CardTitle>
						<div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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
					<p className="text-foreground leading-relaxed">
						{isExpanded ? content : truncateContent(content)}
					</p>
				</div>

				<div className="flex items-center justify-between mt-4 pt-4 border-t">
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
					<div className="mt-4 pt-4 border-t">
						<h4 className="text-sm font-medium mb-2">參考來源：</h4>
						<div className="space-y-1">
							{citations.map((citation: string, index: number) => (
								<a
									key={index}
									href={citation}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline p-2 rounded border border-blue-100 hover:border-blue-200 transition-colors"
								>
									<span className="text-xs font-mono text-muted-foreground">
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

// Stats Dashboard Component
const StatsDashboard: React.FC<StatsDashboardProps> = ({ stats }) => {
	if (!stats) return null;

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
			<Card className="p-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-blue-100 rounded-lg">
						<Timer className="w-5 h-5 text-blue-600" />
					</div>
					<div>
						<div className="text-sm font-medium text-muted-foreground">響應時間</div>
						<div className="text-lg font-bold">{stats.responseTime}ms</div>
					</div>
				</div>
			</Card>

			<Card className="p-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-green-100 rounded-lg">
						<BarChart3 className="w-5 h-5 text-green-600" />
					</div>
					<div>
						<div className="text-sm font-medium text-muted-foreground">Token 使用</div>
						<div className="text-lg font-bold">{stats.totalTokens}</div>
					</div>
				</div>
			</Card>

			<Card className="p-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-purple-100 rounded-lg">
						<Search className="w-5 h-5 text-purple-600" />
					</div>
					<div>
						<div className="text-sm font-medium text-muted-foreground">搜尋次數</div>
						<div className="text-lg font-bold">{stats.searchCount}</div>
					</div>
				</div>
			</Card>

			<Card className="p-4">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-orange-100 rounded-lg">
						<Link className="w-5 h-5 text-orange-600" />
					</div>
					<div>
						<div className="text-sm font-medium text-muted-foreground">引用來源</div>
						<div className="text-lg font-bold">{stats.citationsCount}</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

// Main Index Page Component
const IndexPage: React.FC = () => {
	const [settings, setSettings] = useState<AppSettings | null>(null);
	const [searchResult, setSearchResult] = useState<SearchResultData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

	// Load settings from localStorage
	const loadSettings = (): AppSettings | null => {
		try {
			const savedSettings = localStorage.getItem('interestRadarSettings');
			if (savedSettings) {
				const parsed: AppSettings = JSON.parse(savedSettings);
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

	// Perform search using XAI service
	const performSearch = async (settingsData: AppSettings): Promise<void> => {
		if (!settingsData?.apiKey) {
			setError('請先在設定頁面配置 API Key');
			setIsLoading(false);
			return;
		}

		try {
			const xaiService = new XAIService(settingsData.apiKey);
			const result = await xaiService.testSearch(settingsData);

			if (result.success) {
				const successResult = result as SuccessContent;
				const searchResultData: SearchResultData = {
					...successResult,
					searchQuery: settingsData.customSearchQuery,
					timestamp: new Date().toISOString()
				};
				
				setSearchResult(searchResultData);
				setLastUpdated(new Date());
				setError(null);
			} else {
				const errorResult = result as ErrorContent;
				setError(errorResult.error);
			}
		} catch (error) {
			setError('搜尋時發生錯誤: ' + (error instanceof Error ? error.message : String(error)));
		} finally {
			setIsLoading(false);
			setIsRefreshing(false);
		}
	};

	// Handle manual refresh
	const handleRefresh = async (): Promise<void> => {
		if (!settings) return;

		setIsRefreshing(true);
		setError(null);
		await performSearch(settings);
	};

	// Initial load effect
	useEffect(() => {
		const settingsData = loadSettings();
		if (settingsData) {
			performSearch(settingsData);
		} else {
			setIsLoading(false);
		}
	}, []);

	// Parse search content into news items
	const parseSearchContent = (content: string): NewsItem[] => {
		if (!content) return [];

		const sections = content.split(/\n\n|\d+\.\s+/).filter(section => section.trim().length > 0);

		return sections.map((section, index) => {
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

	const newsItems: NewsItem[] = searchResult ? parseSearchContent(searchResult.content) : [];
	const stats: SearchStats | null = searchResult ? {
		responseTime: searchResult.responseTime,
		totalTokens: searchResult.usage?.total_tokens || 0,
		searchCount: searchResult.usage?.number_searches || 0,
		citationsCount: searchResult.citations?.length || 0
	} : null;

	// Loading state
	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
				<div className="text-center">
					<Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
					<h2 className="text-xl font-semibold mb-2">正在載入您的個人化新聞...</h2>
					<p className="text-muted-foreground">請稍候，AI 正在為您搜集最新資訊</p>
				</div>
			</div>
		);
	}

	// No settings state
	if (!settings) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
				<div className="max-w-md mx-auto text-center p-6">
					<AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
					<h2 className="text-2xl font-bold mb-4">尚未設定</h2>
					<p className="text-muted-foreground mb-6">
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

	// Main render
	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
			<div className="max-w-6xl mx-auto p-6">
				{/* Page Header */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<div className="flex items-center gap-3 mb-2">
							<div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
								<TrendingUp className="w-6 h-6" />
							</div>
							<h1 className="text-3xl font-bold">Insightful</h1>
						</div>
						<p className="text-muted-foreground">
							基於您的搜尋偏好：「{settings.customSearchQuery?.slice(0, 50)}...」
						</p>
						{lastUpdated && (
							<div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
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

				{/* Search Sources Summary */}
				<Card className="mb-6">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<Globe className="w-4 h-4 text-muted-foreground" />
									<span className="text-sm text-muted-foreground">搜尋來源：</span>
									<div className="flex gap-1">
										{settings.searchSources?.map((source: string, index: number) => (
											<Badge key={index} variant="secondary">
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
										<span className="text-sm text-muted-foreground">地區：</span>
										<Badge variant="outline">{settings.countryCode}</Badge>
									</div>
								)}
							</div>

							<div className="text-sm text-muted-foreground">
								{settings.dateRange} 天內的資訊
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Error Alert */}
				{error && (
					<Alert variant="destructive" className="mb-6">
						<AlertTriangle className="h-4 w-4" />
						<AlertDescription>
							<div className="font-medium">發生錯誤</div>
							<div className="text-sm mt-1">{error}</div>
						</AlertDescription>
					</Alert>
				)}

				{/* Stats Dashboard */}
				{stats && <StatsDashboard stats={stats} />}

				{/* News Content */}
				{searchResult && (
					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold">
								為您精選的資訊
							</h2>
							<Badge variant="default">
								{newsItems.length} 條內容
							</Badge>
						</div>

						{newsItems.length > 0 ? (
							<div className="space-y-4">
								{newsItems.map((item: NewsItem) => (
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
								<BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
								<CardTitle className="mb-2">暫無內容</CardTitle>
								<CardDescription>
									嘗試調整您的搜尋設定或稍後再試
								</CardDescription>
							</Card>
						)}

						{/* Full Search Result */}
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
										<div className="whitespace-pre-wrap text-foreground leading-relaxed bg-muted/50 p-4 rounded-lg border">
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
