
import  { useState } from 'react';

import {
	Globe,
	Search,
	Shield,
	Check,
	X,
	AlertTriangle,
	Info,
	Eye,
	EyeOff,
	ExternalLink,
	BarChart3,
	Timer,
	FileText,
	Link,
} from 'lucide-react';
import { Badge } from "@/components/ui/badge"

import {  type SuccessContent, type ErrorContent } from '@/server/api';
export default function EnhancedResults({ testResults }: { testResults: SuccessContent | ErrorContent }) {
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
						<Badge variant="default">
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
									{testResults.sources.map((source:string, index:number) => (
										<Badge key={index} variant="secondary">{source}</Badge>
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
							<Badge variant={testResults.proxyUsed ? "default" : "destructive"}>
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
											{testResults.citations.map((citation:string, index:number) => (
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
