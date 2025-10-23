import { LoginClient } from "@/components/client/login-client"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
            <LoginClient />

            {/* Informacion de prueba (remover en produccion) */}
            <div className="fixed bottom-4 right-4 p-4 bg-muted rounded-lg text-xs max-w-xs">
                <p className="font-semibold mb-2">Credenciales de prueba:</p>
                <p>Email: admin@sgad.com</p>
                <p>Password: admin123</p>
            </div>
        </div>
    )
}