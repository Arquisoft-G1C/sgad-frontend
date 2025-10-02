"use client";

import { Sidebar } from "@/components/sidebar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArbitroAgenda } from "@/components/arbitro-agenda";

// Eventos de ejemplo
const events = [
    {
        title: "Real Madrid vs Barcelona",
        start: new Date(2025, 8, 14, 15, 0),
        end: new Date(2025, 8, 14, 17, 0),
        valor: "$150",
    },
    {
        title: "Athletic vs Sociedad",
        start: new Date(2025, 8, 27, 19, 0),
        end: new Date(2025, 8, 27, 21, 0),
        valor: "$150",
    },
    {
        title: "Alianza Petrolera vs Millonarios",
        start: new Date(2025, 8, 28, 13, 0),
        end: new Date(2025, 8, 28, 15, 0),
        valor: "100.000",
    },
];

export default function ArbitroDashboard() {
    return (
        <div className="flex h-screen bg-background">
            <Sidebar />

            <main className="flex-1 md:ml-64 overflow-auto">
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                                <CalendarIcon className="h-8 w-8" />
                                Agenda de Partidos
                            </h1>
                            <p className="text-muted-foreground">
                                Consulta tus próximos compromisos y valores a cobrar
                            </p>
                        </div>
                    </div>

                    {/* Calendario dentro de un Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Calendario</CardTitle>
                            <CardDescription>
                                Visualiza tus partidos por día, semana o mes
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                            <ArbitroAgenda events={events} />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
