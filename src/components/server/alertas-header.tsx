import { AlertTriangle } from "lucide-react"

interface AlertasHeaderProps {
    highPriorityCount: number
    activeCount: number
}

export function AlertasHeader({ highPriorityCount, activeCount }: AlertasHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <AlertTriangle className="h-8 w-8" />
                    Sistema de Alertas
                </h1>
                <p className="text-muted-foreground">Monitorea conflictos y problemas en las asignaciones</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span>{highPriorityCount} alertas críticas</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span>{activeCount} alertas activas</span>
                </div>
            </div>
        </div>
    )
}
