"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Euro, MoreHorizontal, Download, Send, Eye, CheckCircle } from "lucide-react"

const mockPayments = [
  {
    id: 1,
    referee: {
      firstName: "Carlos",
      lastName: "Pérez García",
      email: "carlos.perez@email.com",
    },
    period: "Enero 2024",
    matches: [
      { date: "2024-01-15", teams: "Real Madrid vs Barcelona", fee: 150 },
      { date: "2024-01-20", teams: "Sevilla vs Betis", fee: 180 },
      { date: "2024-01-25", teams: "Valencia vs Athletic", fee: 150 },
    ],
    totalAmount: 480,
    status: "pending",
    dueDate: "2024-02-05",
    createdAt: "2024-01-31T10:00:00Z",
  },
  {
    id: 2,
    referee: {
      firstName: "María",
      lastName: "González López",
      email: "maria.gonzalez@email.com",
    },
    period: "Enero 2024",
    matches: [
      { date: "2024-01-18", teams: "Atlético vs Valencia", fee: 150 },
      { date: "2024-01-28", teams: "Real Sociedad vs Villarreal", fee: 150 },
    ],
    totalAmount: 300,
    status: "paid",
    dueDate: "2024-02-05",
    createdAt: "2024-01-31T10:00:00Z",
    paidAt: "2024-02-03T14:30:00Z",
  },
  {
    id: 3,
    referee: {
      firstName: "Ana",
      lastName: "Martín Ruiz",
      email: "ana.martin@email.com",
    },
    period: "Enero 2024",
    matches: [{ date: "2024-01-22", teams: "Getafe vs Osasuna", fee: 120 }],
    totalAmount: 120,
    status: "processing",
    dueDate: "2024-02-05",
    createdAt: "2024-01-31T10:00:00Z",
  },
]

const statusColors = {
  pending: "destructive",
  processing: "secondary",
  paid: "default",
  cancelled: "outline",
} as const

const statusLabels = {
  pending: "Pendiente",
  processing: "Procesando",
  paid: "Pagado",
  cancelled: "Cancelado",
}

interface PaymentListProps {
  filters: any
  onViewDetails: (payment: any) => void
  onProcessPayment: (paymentId: number) => void
  onDownloadInvoice: (paymentId: number) => void
}

export function PaymentList({ filters, onViewDetails, onProcessPayment, onDownloadInvoice }: PaymentListProps) {
  const [payments] = useState(mockPayments)

  const filteredPayments = payments.filter((payment) => {
    if (
      filters.search &&
      !`${payment.referee.firstName} ${payment.referee.lastName}`.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }
    if (filters.status && filters.status !== "all" && payment.status !== filters.status) return false
    if (filters.period && payment.period !== filters.period) return false
    return true
  })

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="space-y-4">
      {filteredPayments.map((payment) => (
        <Card key={payment.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(payment.referee.firstName, payment.referee.lastName)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">
                      {payment.referee.firstName} {payment.referee.lastName}
                    </h3>
                    <Badge variant={statusColors[payment.status as keyof typeof statusColors]}>
                      {statusLabels[payment.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div>Período: {payment.period}</div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Vence: {new Date(payment.dueDate).toLocaleDateString("es-ES")}
                    </div>
                    <div>{payment.matches.length} partidos</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Partidos arbitrados:</div>
                    <div className="space-y-1">
                      {payment.matches.map((match, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              {new Date(match.date).toLocaleDateString("es-ES")}
                            </span>
                            <span>{match.teams}</span>
                          </div>
                          <div className="flex items-center gap-1 font-medium">
                            <Euro className="h-3 w-3" />
                            {match.fee}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {payment.paidAt && (
                    <div className="text-sm text-muted-foreground">
                      Pagado el {new Date(payment.paidAt).toLocaleDateString("es-ES")}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold flex items-center gap-1">
                    <Euro className="h-5 w-5" />
                    {payment.totalAmount}
                  </div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>

                <div className="flex items-center gap-2">
                  {payment.status === "pending" && (
                    <Button size="sm" onClick={() => onProcessPayment(payment.id)}>
                      <Send className="h-4 w-4 mr-1" />
                      Procesar
                    </Button>
                  )}

                  {payment.status === "paid" && (
                    <Button size="sm" variant="outline" onClick={() => onDownloadInvoice(payment.id)}>
                      <Download className="h-4 w-4 mr-1" />
                      Factura
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewDetails(payment)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDownloadInvoice(payment.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Descargar factura
                      </DropdownMenuItem>
                      {payment.status === "pending" && (
                        <DropdownMenuItem onClick={() => onProcessPayment(payment.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Marcar como pagado
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredPayments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Euro className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No se encontraron pagos</h3>
            <p className="text-muted-foreground">No hay pagos que coincidan con los filtros seleccionados.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
