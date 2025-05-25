
import {Info} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertBlock(){
	return (
		<Alert variant = "default" className = "mb-6" >
			<Info></Info>
			<AlertTitle> 連接狀態!</AlertTitle>
			<AlertDescription>
				<div>
					當前使用：<strong>
						{(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
							? '代理服務器模式'
							: '直接連接模式'
						}
					</strong>
				</div>
			</AlertDescription>
		</Alert>
	)
}
