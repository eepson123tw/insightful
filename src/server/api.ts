// xAI API Service Class - TypeScript Implementation

export interface SuccessContent {
    success: boolean;
    content: any;
    citations: any;
    responseTime: number;
    usage: any;
    sources: any[];
    proxyUsed: any;
    error?: undefined;
}

export interface ErrorContent {
    success: boolean;
    error: any;
    responseTime: number;
    proxyUsed: any;
    content?: undefined;
    citations?: undefined;
    usage?: undefined;
    sources?: undefined;
}

export type ApiResponse = SuccessContent | ErrorContent;

export interface SearchSettings {
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

export interface SearchSource {
    type: string;
    country?: string;
    excluded_websites?: string[];
    safe_search?: boolean;
    x_handles?: string[];
    links?: string[];
}

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface SearchParameters {
    mode: 'auto' | 'manual';
    sources: SearchSource[];
    max_search_results: number;
    return_citations: boolean;
    from_date?: string;
}

export interface ApiPayload {
    messages: ChatMessage[];
    search_parameters: SearchParameters;
    model: string;
    max_tokens: number;
}

export interface ApiUsage {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
}

export interface ApiResponseData {
    choices?: Array<{
        message?: {
            content?: string;
        };
    }>;
    citations?: any[];
    usage?: ApiUsage;
}

export class XAIService {
    private apiKey: string;
    private useProxy: boolean;
    private baseUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.useProxy = this.detectProxyAvailability();
        this.baseUrl = 'https://api.x.ai/v1';
    }

    private detectProxyAvailability(): boolean {
        return window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1' ||
            import.meta.env.REACT_APP_USE_PROXY === 'true';
    }

    async testSearch(settings: SearchSettings): Promise<ApiResponse> {
        try {
            const searchSources: SearchSource[] = this._buildSearchSources(settings);

            // Use user-configured search query
            const searchQuery: string = settings.customSearchQuery || 'Provide a brief summary of the latest technology news.';

            const payload: ApiPayload = {
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

            const startTime: number = Date.now();
            let response: Response;

            response = await fetch(`${this.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(payload)
            });

            const responseTime: number = Date.now() - startTime;

            if (!response.ok) {
                const errorText: string = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data: ApiResponseData = await response.json();

            const successResponse: SuccessContent = {
                success: true,
                content: data.choices?.[0]?.message?.content || 'No content received',
                citations: data.citations || [],
                responseTime,
                usage: data.usage,
                sources: searchSources.map((s: SearchSource) => s.type),
                proxyUsed: this.useProxy
            };

            return successResponse;

        } catch (error: unknown) {
            const errorResponse: ErrorContent = {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                responseTime: 0,
                proxyUsed: this.useProxy
            };

            return errorResponse;
        }
    }

    private _buildSearchSources(settings: SearchSettings): SearchSource[] {
        const sources: SearchSource[] = [];

        settings.searchSources?.forEach((sourceType: string) => {
            const source: SearchSource = { type: sourceType };

            if (sourceType === 'web' || sourceType === 'news') {
                if (settings.countryCode) {
                    source.country = settings.countryCode;
                }
                if (settings.excludedWebsites) {
                    source.excluded_websites = settings.excludedWebsites
                        .split(',')
                        .map((site: string) => site.trim())
                        .filter((site: string) => site.length > 0)
                        .slice(0, 5);
                }
                if (settings.safeSearch !== undefined) {
                    source.safe_search = settings.safeSearch;
                }
            }

            if (sourceType === 'x' && settings.xHandles) {
                source.x_handles = settings.xHandles
                    .split(',')
                    .map((handle: string) => handle.trim().replace('@', ''))
                    .filter((handle: string) => handle.length > 0);
            }

            if (sourceType === 'rss' && settings.rssLinks) {
                const firstRssLink: string | undefined = settings.rssLinks.split(',')[0]?.trim();
                source.links = firstRssLink ? [firstRssLink] : [];
            }

            sources.push(source);
        });

        return sources.length > 0 ? sources : [{ type: 'web' }, { type: 'news' }];
    }
}
