"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageActionsProps {
    showCreateButton?: boolean
    onCreateClick?: () => void
    createButtonText?: string
    additionalActions?: React.ReactNode
}

export function PageActions({
    showCreateButton = false,
    onCreateClick,
    createButtonText = "Crear",
    additionalActions
}: PageActionsProps) {
    return (
        <div className="flex items-center gap-2">
            {additionalActions}
            {showCreateButton && onCreateClick && (
                <Button onClick={onCreateClick}>
                    <Plus className="h-4 w-4 mr-2" />
                    {createButtonText}
                </Button>
            )}
        </div>
    )
}
