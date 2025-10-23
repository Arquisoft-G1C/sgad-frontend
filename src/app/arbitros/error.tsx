"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, RefreshCw, Home, Server } from "lucide-react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("Árbitros Error:", error)
    }, [error])

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <div className="flex items-center gap-2 text-destructive mb-2">
                        <Users className="h-6 w-6" />
                        <CardTitle>Error al cargar árbitros</CardTitle>
                    </div>
                    <CardDescription>
                        No se pudo conectar con el servicio de árbitros. Verifica que el backend esté ejecutándose.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-3 bg-muted rounded-md">
                        <p className="text-sm font-mono text-muted-foreground break-words">
                            {error.message || "Error de conexión"}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-semibold">Pasos para resolver:</p>
                        <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                            <li>Verifica que el servicio de árbitros esté ejecutándose en el puerto 8001</li>
                            <li>Confirma que la variable REFEREE_SERVICE_URL esté configurada</li>
                            <li>Revisa los logs del servicio backend</li>
                        </ol>
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={reset} className="flex-1">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reintentar
                        </Button>
                        <Button variant="outline" onClick={() => window.location.href = "/"}>
                            <Home className="h-4 w-4 mr-2" />
                            Dashboard
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

