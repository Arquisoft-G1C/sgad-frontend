"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Dashboard Error:", error)
    }, [error])

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <div className="flex items-center gap-2 text-destructive mb-2">
                        <AlertTriangle className="h-6 w-6" />
                        <CardTitle>Algo salió mal</CardTitle>
                    </div>
                    <CardDescription>
                        Ha ocurrido un error al cargar el dashboard. Esto puede deberse a que los servicios backend no están disponibles.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-3 bg-muted rounded-md">
                        <p className="text-sm font-mono text-muted-foreground">
                            {error.message || "Error desconocido"}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Posibles causas:
                        </p>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                            <li>Los servicios backend no están iniciados</li>
                            <li>Problema de conexión con la base de datos</li>
                            <li>Configuración incorrecta de variables de entorno</li>
                        </ul>
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={reset} className="flex-1">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reintentar
                        </Button>
                        <Button variant="outline" onClick={() => window.location.href = "/"}>
                            <Home className="h-4 w-4 mr-2" />
                            Inicio
                        </Button>
                    </div>

                    <div className="text-xs text-muted-foreground text-center">
                        Si el problema persiste, verifica que todos los servicios estén ejecutándose.
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

