"use client"

interface PageHeaderProps {
    title: string
    description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    {title}
                </h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}
