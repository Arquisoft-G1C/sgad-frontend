"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentSummary } from "@/components/payments/payment-summary"
import { PaymentList } from "@/components/payments/payment-list"
import { PaymentFilters } from "@/components/payments/payment-filters"
import { CreditCard, Plus, FileText, TrendingUp } from "lucide-react"

export default function CobrosPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    period: "",
    amount: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "",
      period: "",
      amount: "",
    })
  }

  const handleViewDetails = (payment: any) => {
    console.log("Viewing payment details:", payment)
    // Here you would typically open a detailed view modal
  }

  const handleProcessPayment = (paymentId: number) => {
    console.log("Processing payment:", paymentId)
    // Here you would typically process the payment
  }

  const handleDownloadInvoice = (paymentId: number) => {
    console.log("Downloading invoice:", paymentId)
    // Here you would typically generate and download the invoice
  }

  const handleGeneratePayroll = () => {
    console.log("Generating payroll")
    // Here you would typically generate payroll for all pending payments
  }

  const handleExportReports = () => {
    console.log("Exporting reports")
    // Here you would typically export payment reports
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <CreditCard className="h-8 w-8" />
                Gestión de Cobros
              </h1>
              <p className="text-muted-foreground">Administra los pagos y cobros de los árbitros</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleExportReports}>
                <FileText className="h-4 w-4 mr-2" />
                Exportar Reportes
              </Button>
              <Button onClick={handleGeneratePayroll}>
                <Plus className="h-4 w-4 mr-2" />
                Generar Nómina
              </Button>
            </div>
          </div>

          {/* Summary */}
          <PaymentSummary />

          {/* Tabs */}
          <Tabs defaultValue="payments" className="space-y-6">
            <TabsList>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Pagos
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Reportes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="payments" className="space-y-6">
              <PaymentFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />

              <PaymentList
                filters={filters}
                onViewDetails={handleViewDetails}
                onProcessPayment={handleProcessPayment}
                onDownloadInvoice={handleDownloadInvoice}
              />
            </TabsContent>

            <TabsContent value="reports">
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Reportes Financieros</h3>
                <p className="text-muted-foreground">Funcionalidad de reportes detallados próximamente.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
