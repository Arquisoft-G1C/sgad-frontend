"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authService } from "@/services"

export default function LoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (error) setError("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        // Validacion basica
        if (!formData.email || !formData.password) {
            setError("Por favor, completa todos los campos")
            setIsLoading(false)
            return
        }

        try {
            // Call auth service
            await authService.login(formData)
            
            // Redirect to dashboard on success
            router.push("/")
        } catch (err: any) {
            setError(err.message || "Error al conectar con el servidor. Intenta nuevamente.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary-foreground">SGAD</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">LogIn</CardTitle>
                    <CardDescription>Sistema de Gestión de Árbitros Deportivos</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="usuario@ejemplo.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-border text-primary focus:ring-primary"
                                />
                                <span className="text-muted-foreground">Recordarme</span>
                            </label>
                            <a href="#" className="text-primary hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Iniciando sesión...
                                </>
                            ) : (
                                "Iniciar Sesión"
                            )}
                        </Button>

                        <div className="text-center text-sm text-muted-foreground">
                            <p>
                                ¿No tienes cuenta?{" "}
                                <a href="#" className="text-primary hover:underline font-medium">
                                    Contacta al administrador
                                </a>
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Card>

            {/* Informacion de prueba (remover en produccion) */}
            <div className="fixed bottom-4 right-4 p-4 bg-muted rounded-lg text-xs max-w-xs">
                <p className="font-semibold mb-2">Credenciales de prueba:</p>
                <p>Email: admin@sgad.com</p>
                <p>Password: admin123</p>
            </div>
        </div>
    )
}