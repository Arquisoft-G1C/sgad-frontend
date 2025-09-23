"use client"

import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Bell, Euro, Users, Shield } from "lucide-react"

export default function ConfiguracionPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Settings className="h-8 w-8" />
                Configuración
              </h1>
              <p className="text-muted-foreground">Configura los parámetros del sistema</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList>
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notificaciones
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <Euro className="h-4 w-4" />
                Pagos
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Usuarios
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Seguridad
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración General</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Nombre de la Organización</Label>
                      <Input id="orgName" placeholder="Federación de Fútbol" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="season">Temporada Actual</Label>
                      <Input id="season" placeholder="2023-2024" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea id="description" placeholder="Descripción de la organización..." />
                  </div>
                  <Button>Guardar Cambios</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Notificaciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Alertas de Conflictos</Label>
                      <p className="text-sm text-muted-foreground">Notificar cuando se detecten conflictos</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Recordatorios de Pago</Label>
                      <p className="text-sm text-muted-foreground">Enviar recordatorios de pagos pendientes</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Asignaciones Nuevas</Label>
                      <p className="text-sm text-muted-foreground">Notificar a árbitros sobre nuevas asignaciones</p>
                    </div>
                    <Switch />
                  </div>
                  <Button>Guardar Configuración</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Pagos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="defaultFee">Tarifa por Defecto (€)</Label>
                      <Input id="defaultFee" type="number" placeholder="150" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentDay">Día de Pago</Label>
                      <Input id="paymentDay" type="number" min="1" max="31" placeholder="5" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Pagos Automáticos</Label>
                      <p className="text-sm text-muted-foreground">Procesar pagos automáticamente</p>
                    </div>
                    <Switch />
                  </div>
                  <Button>Guardar Configuración</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Funcionalidad de gestión de usuarios próximamente.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Seguridad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Configuración de seguridad próximamente.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
