import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="max-w-sm w-full">
                <CardContent className="p-12 text-center">
                    <Loader2 className="h-12 w-12 mx-auto text-primary mb-4 animate-spin" />
                    <h3 className="text-lg font-medium mb-2">Cargando...</h3>
                    <p className="text-sm text-muted-foreground">
                        Por favor espera mientras se carga el contenido
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

